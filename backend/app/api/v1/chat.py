# app/api/v1/chat.py
from datetime import datetime
import uuid
import base64
from pathlib import Path
from flask import Blueprint, request, jsonify, current_app, send_file
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.message import Message
from app.extensions import db
from sqlalchemy import desc, func

# Импорты из сервисов (твои реальные функции)
from app.services.gigachat.giga_text import response_gigachat, SYSTEM_PROMPT
from app.services.salute.salute_speech import speech_syntesis

chat_v1 = Blueprint('chat_v1', __name__, url_prefix='/api/v1/chat')


# ────────────────────────────────────────────────
# ЕДИНЫЙ ЭНДПОИНТ ОТПРАВКИ СООБЩЕНИЯ (только для авторизованных)
# ────────────────────────────────────────────────
@chat_v1.post('/send')
@jwt_required()
def send_message():
    data = request.get_json(silent=True) or {}
    user_text = data.get('message', '').strip()
    with_audio = data.get('with_audio', False)  # true = с голосом, false = только текст
    session_id = data.get('session_id')

    if not user_text:
        return jsonify({"success": False, "error": "Сообщение пустое"}), 400

    user_id = get_jwt_identity()  # теперь всегда авторизованный пользователь

    # Если session_id не передан, создаём новый
    if not session_id:
        session_id = str(uuid.uuid4())


    # Загружаем историю сообщений для данной сессии (последние 20)
    # Сортируем по возрастанию, чтобы получить хронологический порядок
    previous_messages = Message.query.filter_by(
        user_id=user_id, session_id=session_id
    ).order_by(Message.created_at.asc()).limit(20).all()

    # Формируем список сообщений для GigaChat
    messages_for_giga = []

    # Добавляем системный промпт
    messages_for_giga.append({"role": "system", "content": SYSTEM_PROMPT})

    # Добавляем предыдущие сообщения из БД
    for msg in previous_messages:
        messages_for_giga.append({"role": msg.role, "content": msg.content})

    # Добавляем текущее сообщение пользователя
    messages_for_giga.append({"role": "user", "content": user_text})

    # print(f"{'='*50}\nОтладочный вывод истории запросов:\n")
    # for el in messages_for_giga:
    #     print(el)

    print(f"[SEND] ← {user_text[:100]}{'...' if len(user_text) > 100 else ''}")

    try:
        # 1. Получаем ответ от GigaChat
        reply = response_gigachat(messages=messages_for_giga)

        # 2. Если нужен голос — синтезируем
        audio_base64 = None
        audio_url = None
        audio_size = 0

        if with_audio:
            audio_result = speech_syntesis(reply)
            if not audio_result or 'audio_bytes' not in audio_result:
                raise ValueError("Синтез речи не удался")

            audio_bytes = audio_result['audio_bytes']
            audio_format = audio_result.get('format', 'mp3')

            audio_id = uuid.uuid4().hex[:10]
            filename = f"audio_{audio_id}.{audio_format}"
            audio_path = Path(current_app.config['AUDIO_CACHE_DIR']) / filename
            audio_path.parent.mkdir(parents=True, exist_ok=True)
            audio_path.write_bytes(audio_bytes)

            audio_base64 = base64.b64encode(audio_bytes).decode('utf-8')
            audio_url = f"/api/v1/chat/audio/{filename}"
            audio_size = len(audio_bytes)

            print(f"[AUDIO] Сохранён: {filename} ({audio_size:,} байт)")

        # 3. Сохраняем сообщения в БД
        session_id = data.get('session_id') or str(uuid.uuid4())

        user_msg = Message(
            user_id=user_id,
            session_id=session_id,
            role="user",
            content=user_text
        )
        assistant_msg = Message(
            user_id=user_id,
            session_id=session_id,
            role="assistant",
            content=reply
        )

        db.session.add_all([user_msg, assistant_msg])
        db.session.commit()

        # 4. Формируем ответ для фронта
        return jsonify({
            "success": True,
            "reply": reply,
            "audio_base64": audio_base64,
            "audio_url": audio_url,
            "audio_size": audio_size,
            "session_id": session_id,
            "timestamp": datetime.utcnow().isoformat()
        })

    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"[CHAT/SEND ERROR] {type(e).__name__}: {str(e)}")
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


# ────────────────────────────────────────────────
# Отдача аудиофайлов
# ────────────────────────────────────────────────
@chat_v1.route('/audio/<filename>')
def serve_audio(filename):
    try:
        audio_dir = current_app.config['AUDIO_CACHE_DIR']
        file_path = audio_dir / filename

        if not file_path.exists():
            return jsonify({"success": False, "error": "Файл не найден"}), 404

        return send_file(file_path, mimetype='audio/mpeg' if filename.endswith('.mp3') else 'audio/wav')

    except Exception as e:
        current_app.logger.error(f"[AUDIO SERVE ERROR] {e}")
        return jsonify({"success": False, "error": str(e)}), 500


# ────────────────────────────────────────────────
# История сообщений (только для авторизованных)
# ────────────────────────────────────────────────
@chat_v1.get('/history')
@jwt_required()
def get_history():
    user_id = get_jwt_identity()
    session_id = request.args.get('session_id')  # может быть None

    query = Message.query.filter_by(user_id=user_id)
    if session_id:
        query = query.filter_by(session_id=session_id)

    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 20, type=int)

    pagination = query.order_by(Message.created_at.asc()).paginate(
        page=page, per_page=per_page, error_out=False
    )

    messages = [msg.to_dict() for msg in pagination.items]

    return jsonify({
        "success": True,
        "messages": messages,
        "pagination": {
            "total": pagination.total,
            "pages": pagination.pages,
            "current_page": pagination.page,
            "per_page": pagination.per_page,
            "has_next": pagination.has_next,
            "has_prev": pagination.has_prev
        }
    })


# ────────────────────────────────────────────────
# Список сессий пользователя
# ────────────────────────────────────────────────
@chat_v1.get('/sessions')
@jwt_required()
def get_sessions():
    user_id = get_jwt_identity()

    sessions = (
        db.session.query(
            Message.session_id,
            func.max(Message.created_at).label("last_message_at"),
            func.count(Message.id).label("message_count")
        )
        .filter_by(user_id=user_id)
        .group_by(Message.session_id)
        .order_by(desc("last_message_at"))
        .all()
    )

    result = []
    for s in sessions:
        last_msg = (
            Message.query.filter_by(user_id=user_id, session_id=s.session_id)
            .order_by(desc(Message.created_at))
            .first()
        )

        preview = last_msg.content[:120] + "..." if last_msg else None

        result.append({
            "session_id": s.session_id,
            "last_message_at": s.last_message_at.isoformat() if s.last_message_at else None,
            "preview": preview,
            "message_count": s.message_count
        })

    return jsonify({
        "success": True,
        "sessions": result
    })


# ────────────────────────────────────────────────
# Простой health-check
# ────────────────────────────────────────────────
@chat_v1.get('/health')
def health_check():
    return jsonify({"success": True, "status": "ok"})