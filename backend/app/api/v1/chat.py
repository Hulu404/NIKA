# app/api/v1/chat.py
from datetime import datetime
import uuid
import base64
from pathlib import Path
from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_login import current_user
from app.models.guest_manager import GuestManager
from app.models.message import Message
from app.extensions import db
from sqlalchemy import desc, func

# Импорты из services
from app.services.gigachat.giga_text import response_gigachat
from app.services.salute.salute_speech import speech_syntesis

chat_v1 = Blueprint('chat_v1', __name__, url_prefix='/api/v1/chat')


@chat_v1.route('/limits', methods=['GET'])
def get_limits():
    """Получить текущие лимиты пользователя"""
    is_guest = not current_user.is_authenticated
    remaining_requests = 0
    reset_info = None

    if not is_guest:
        # Для зарегистрированного пользователя
        remaining_requests = current_user.get_remaining_requests()
        reset_info = current_user.get_reset_info()
        limit = current_user.daily_requests_limit
    else:
        # Для гостя
        remaining_requests = GuestManager.get_remaining_requests()
        reset_info = GuestManager.get_reset_info()
        limit = GuestManager.GUEST_LIMIT

    return jsonify({
        "success": True,
        "is_guest": is_guest,
        "remaining": remaining_requests,
        "limit": limit,
        "reset_info": reset_info
    })


@chat_v1.route('/send', methods=['POST'])
@jwt_required(optional=True)  # Опциональная авторизация для гостей
def send_message():
    """Общий эндпоинт отправки сообщения (текст или голос) с проверкой лимитов"""
    data = request.get_json(silent=True) or {}
    user_text = data.get('message', '').strip()
    with_audio = data.get('with_audio', False)  # Опция: текст или голос

    if not user_text:
        return jsonify({
            "success": False,
            "error": "Сообщение пустое"
        }), 400

    print(f"[SEND] ← {user_text[:100]}{'...' if len(user_text) > 100 else ''}")

    # 1. ПРОВЕРКА АВТОРИЗАЦИИ И ЛИМИТОВ
    is_guest = not current_user.is_authenticated
    remaining_requests = 0
    reset_info = None

    if not is_guest:
        # Для зарегистрированного пользователя
        if not current_user.can_make_request():
            reset_info = current_user.get_reset_info()
            return jsonify({
                "success": False,
                "error": f"Достигнут дневной лимит запросов ({current_user.daily_requests_limit})",
                "limit_info": {
                    "limit": current_user.daily_requests_limit,
                    "used": current_user.requests_today,
                    "remaining": 0,
                    "reset_info": reset_info
                },
                "is_guest": False
            }), 429

        # Получаем user_id из JWT
        user_id = get_jwt_identity()
    else:
        # Для гостя
        if not GuestManager.can_make_request():
            reset_info = GuestManager.get_reset_info()
            return jsonify({
                "success": False,
                "error": "Использованы все бесплатные запросы. Зарегистрируйтесь для большего количества запросов.",
                "limit_info": {
                    "limit": GuestManager.GUEST_LIMIT,
                    "used": session.get('guest_requests', 0),
                    "remaining": 0,
                    "reset_info": reset_info
                },
                "is_guest": True,
                "upgrade_url": "/registration"
            }), 429

        # Для гостя используем guest_user_id или 0
        user_id = 0  # Или создайте гостевого пользователя в БД

    try:
        # 2. ОБРАБОТКА ЗАПРОСА К ИИ
        reply = response_gigachat(user_text)
        print(f"[SEND] → {reply[:100]}{'...' if len(reply) > 100 else ''}")

        audio_base64 = None
        audio_url = None
        audio_size = 0

        if with_audio:
            audio_result = speech_syntesis(reply)
            if not audio_result or 'audio_bytes' not in audio_result:
                raise ValueError("Синтез речи не вернул аудио")

            audio_bytes = audio_result['audio_bytes']
            audio_format = audio_result.get('format', 'mp3')

            # Сохранение файла
            audio_id = uuid.uuid4().hex[:10]
            filename = f"audio_{audio_id}.{audio_format}"
            audio_path = current_app.config['AUDIO_CACHE_DIR'] / filename
            audio_path.parent.mkdir(parents=True, exist_ok=True)
            audio_path.write_bytes(audio_bytes)

            audio_base64 = base64.b64encode(audio_bytes).decode('utf-8')
            audio_url = f"/api/v1/audio/{filename}"
            audio_size = len(audio_bytes)
            print(f"[AUDIO SAVED] {filename} ({audio_size:,} байт)")

        # 3. СОХРАНЕНИЕ СООБЩЕНИЙ В БД
        user_msg = Message(
            user_id=user_id,
            role="user",
            content=user_text
        )
        assistant_msg = Message(
            user_id=user_id,
            role="assistant",
            content=reply
        )
        db.session.add(user_msg)
        db.session.add(assistant_msg)
        db.session.commit()

        # 4. УВЕЛИЧЕНИЕ СЧЕТЧИКА ЗАПРОСОВ
        if not is_guest:
            current_user.increment_requests()
            remaining_requests = current_user.get_remaining_requests()
            reset_info = current_user.get_reset_info()
        else:
            GuestManager.increment_requests()
            remaining_requests = GuestManager.get_remaining_requests()
            reset_info = GuestManager.get_reset_info()

        # 5. ВОЗВРАТ ОТВЕТА НА ФРОНТ
        response_data = {
            "success": True,
            "reply": reply,
            "audio_base64": audio_base64,
            "audio_url": audio_url,
            "audio_size": audio_size,
            "timestamp": datetime.utcnow().isoformat(),
            "limit_info": {
                "remaining": remaining_requests,
                "is_guest": is_guest,
                "reset_info": reset_info
            }
        }

        return jsonify(response_data)

    except Exception as e:
        db.session.rollback()
        print(f"[SEND ERROR] {type(e).__name__}: {str(e)}")
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


# Остальные эндпоинты (health, audio, history, sessions) остаются как были, но с исправлениями опечаток

@chat_v1.route('/health', methods=['GET'])
def health_check():
    """Простой эндпоинт для проверки живости API"""
    return jsonify({"success": True, "status": "ok"})

@chat_v1.get("/history")
@jwt_required()
def get_chat_history():
    user_id = get_jwt_identity()

    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 20, type=int)

    pagination = Message.query.filter_by(user_id=user_id) \
        .order_by(desc(Message.created_at)) \
        .paginate(page=page, per_page=per_page, error_out=False)

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

@chat_v1.get("/sessions")
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