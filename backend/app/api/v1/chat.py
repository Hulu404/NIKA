# app/api/v1/chat.py
from datetime import datetime, timezone
import uuid
import base64
from pathlib import Path

from flask import Blueprint, request, current_app, send_file
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import desc, func

from app.models.message import Message
from app.models.user import User
from app.extensions import db
from app.utils.responses import success_response, error_response

# Импорты из сервисов (GigaChat — не трогаем)
from app.services.gigachat.giga_text import response_gigachat, SYSTEM_PROMPT
from app.services.salute.salute_speech import speech_syntesis

chat_v1 = Blueprint('chat_v1', __name__, url_prefix='/api/v1/chat')


# ────────────────────────────────────────────────
# ЕДИНЫЙ ЭНДПОИНТ ОТПРАВКИ СООБЩЕНИЯ (только для авторизованных)
# ────────────────────────────────────────────────
@chat_v1.post('/send')
@jwt_required()
def send_message():
    """Отправка сообщения в чат
    ---
    tags:
      - Chat
    summary: Отправка сообщения AI-ассистенту
    description: "Rate limit: 10 запросов в день на пользователя"
    security:
      - Bearer: []
    parameters:
      - in: body
        name: body
        required: true
        schema:
          type: object
          required: [message]
          properties:
            message:
              type: string
              example: "Привет, как дела?"
            with_audio:
              type: boolean
              default: false
              example: false
            session_id:
              type: string
              example: "550e8400-e29b-41d4-a716-446655440000"
    responses:
      200:
        description: Ответ ассистента
      400:
        description: Сообщение пустое
      401:
        description: Требуется авторизация
      429:
        description: Лимит запросов исчерпан (10 в день)
    """
    data: dict = request.get_json(silent=True) or {}
    user_text: str = data.get('message', '').strip()
    with_audio: bool = data.get('with_audio', False)
    session_id: str | None = data.get('session_id')

    if not user_text:
        return error_response("Сообщение пустое", 400)

    user_id: str = get_jwt_identity()

    # Проверка дневного лимита запросов
    user: User | None = db.session.get(User, int(user_id))
    if not user:
        return error_response("Пользователь не найден", 404)

    if not user.can_make_request():
        reset_info: dict = user.get_reset_info()
        return error_response(
            "Лимит запросов исчерпан (10 в день)",
            429,
            errors={"reset_at": reset_info["reset_time"], "remaining_seconds": reset_info["remaining_seconds"]},
        )

    # Если session_id не передан, создаём новый
    if not session_id:
        session_id = str(uuid.uuid4())

    # Загружаем историю сообщений для данной сессии (последние 20)
    # Сортируем по возрастанию, чтобы получить хронологический порядок
    previous_messages = Message.query.filter_by(
        user_id=user_id, session_id=session_id
    ).order_by(Message.created_at.asc()).limit(20).all()

    # Формируем список сообщений для GigaChat
    messages_for_giga: list[dict] = []

    # Добавляем системный промпт
    messages_for_giga.append({"role": "system", "content": SYSTEM_PROMPT})

    # Добавляем предыдущие сообщения из БД
    for msg in previous_messages:
        messages_for_giga.append({"role": msg.role, "content": msg.content})

    # Добавляем текущее сообщение пользователя
    messages_for_giga.append({"role": "user", "content": user_text})

    try:
        # 1. Получаем ответ от GigaChat
        reply: str = response_gigachat(messages=messages_for_giga)

        # 2. Если нужен голос — синтезируем
        audio_base64: str | None = None
        audio_url: str | None = None
        audio_size: int = 0

        if with_audio:
            audio_result = speech_syntesis(reply)
            if not audio_result or 'audio_bytes' not in audio_result:
                raise ValueError("Синтез речи не удался")

            audio_bytes: bytes = audio_result['audio_bytes']
            audio_format: str = audio_result.get('format', 'mp3')

            audio_id: str = uuid.uuid4().hex[:10]
            filename: str = f"audio_{audio_id}.{audio_format}"
            audio_path: Path = Path(current_app.config['AUDIO_CACHE_DIR']) / filename
            audio_path.parent.mkdir(parents=True, exist_ok=True)
            audio_path.write_bytes(audio_bytes)

            audio_base64 = base64.b64encode(audio_bytes).decode('utf-8')
            audio_url = f"/api/v1/chat/audio/{filename}"
            audio_size = len(audio_bytes)

        # 3. Сохраняем сообщения в БД
        user_msg = Message(
            user_id=user_id,
            session_id=session_id,
            role="user",
            content=user_text,
        )
        assistant_msg = Message(
            user_id=user_id,
            session_id=session_id,
            role="assistant",
            content=reply,
        )

        db.session.add_all([user_msg, assistant_msg])

        # 4. Увеличиваем счётчик запросов
        user.increment_requests()

        db.session.commit()

        # 5. Формируем ответ
        return success_response(
            data={
                "assistant_response": reply,
                "session_id": session_id,
                "audio_url": audio_url if with_audio else None,
            }
        )

    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"[CHAT/SEND ERROR] {type(e).__name__}: {e}")
        return error_response("Ошибка при обработке сообщения", 500)


# ────────────────────────────────────────────────
# Отдача аудиофайлов
# ────────────────────────────────────────────────
@chat_v1.route('/audio/<filename>')
def serve_audio(filename: str):
    """Получение аудиофайла
    ---
    tags:
      - Chat
    summary: Получение аудиофайла по имени
    parameters:
      - in: path
        name: filename
        type: string
        required: true
    responses:
      200:
        description: Аудиофайл
      404:
        description: Файл не найден
    """
    try:
        audio_dir = current_app.config['AUDIO_CACHE_DIR']
        file_path = Path(audio_dir) / filename

        if not file_path.exists():
            return error_response("Файл не найден", 404)

        mimetype: str = 'audio/mpeg' if filename.endswith('.mp3') else 'audio/wav'
        return send_file(file_path, mimetype=mimetype)

    except Exception as e:
        current_app.logger.error(f"[AUDIO SERVE ERROR] {e}")
        return error_response("Ошибка при получении аудио", 500)


# ────────────────────────────────────────────────
# История сообщений (только для авторизованных)
# ────────────────────────────────────────────────
@chat_v1.get('/history')
@jwt_required()
def get_history():
    """История сообщений
    ---
    tags:
      - Chat
    summary: История сообщений пользователя
    security:
      - Bearer: []
    parameters:
      - in: query
        name: session_id
        type: string
        required: false
        description: UUID сессии (если не указан — все сессии)
      - in: query
        name: page
        type: integer
        default: 1
      - in: query
        name: per_page
        type: integer
        default: 20
    responses:
      200:
        description: Список сообщений с пагинацией
      401:
        description: Требуется авторизация
    """
    user_id: str = get_jwt_identity()
    session_id: str | None = request.args.get('session_id')

    query = Message.query.filter_by(user_id=user_id)
    if session_id:
        query = query.filter_by(session_id=session_id)

    page: int = request.args.get("page", 1, type=int)
    per_page: int = request.args.get("per_page", 20, type=int)

    pagination = query.order_by(Message.created_at.asc()).paginate(
        page=page, per_page=per_page, error_out=False
    )

    messages: list[dict] = [msg.to_dict() for msg in pagination.items]

    return success_response(
        data={
            "messages": messages,
            "total_count": pagination.total,
            "has_next": pagination.has_next,
            "has_prev": pagination.has_prev,
        }
    )


# ────────────────────────────────────────────────
# Список сессий пользователя
# ────────────────────────────────────────────────
@chat_v1.get('/sessions')
@jwt_required()
def get_sessions():
    """Список сессий чата
    ---
    tags:
      - Chat
    summary: Список сессий пользователя
    security:
      - Bearer: []
    responses:
      200:
        description: Список сессий с количеством сообщений
      401:
        description: Требуется авторизация
    """
    user_id: str = get_jwt_identity()

    sessions = (
        db.session.query(
            Message.session_id,
            func.min(Message.created_at).label("created_at"),
            func.count(Message.id).label("messages_count"),
        )
        .filter_by(user_id=user_id)
        .group_by(Message.session_id)
        .order_by(desc("created_at"))
        .all()
    )

    result: list[dict] = [
        {
            "session_id": s.session_id,
            "created_at": s.created_at.isoformat() if s.created_at else None,
            "messages_count": s.messages_count,
        }
        for s in sessions
    ]

    return success_response(
        data={
            "sessions": result,
            "total_count": len(result),
        }
    )


# ────────────────────────────────────────────────
# Простой health-check
# ────────────────────────────────────────────────
@chat_v1.get('/health')
def health_check():
    """Health check
    ---
    tags:
      - Chat
    summary: Проверка работоспособности
    responses:
      200:
        description: Сервис работает
    """
    return success_response(data={"status": "ok"})
