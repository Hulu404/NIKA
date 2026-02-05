# app/api/v1/chat.py
from datetime import datetime
import uuid
import base64
from pathlib import Path
from flask import Blueprint, request, jsonify, current_app, send_file, session
from flask_login import current_user
from app.models.guest_manager import GuestManager


# Импорты из services (после переноса логики)
from app.services.gigachat.giga_text import response_gigachat
from app.services.salute.salute_speech import speech_syntesis

chat_v1 = Blueprint('chat_v1', __name__, url_prefix='/api/v1')


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


@chat_v1.route('/message-text-only', methods=['POST'])
def text_only_message():
    """Простой текстовый ответ без аудио с проверкой лимитов"""
    data = request.get_json(silent=True) or {}
    user_text = data.get('message', '').strip()

    if not user_text:
        return jsonify({
            "success": False,
            "error": "Сообщение пустое"
        }), 400

    print(f"[TEXT] ← {user_text[:100]}{'...' if len(user_text) > 100 else ''}")

    # 1. ПРОВЕРКА ЛИМИТОВ
    is_guest = not current_user.is_authenticated
    remaining_requests = 0
    reset_info = None

    if not is_guest:
        # Проверка для зарегистрированного пользователя
        if not current_user.can_make_request():
            reset_info = current_user.get_reset_info()
            return jsonify({
                "success": False,
                "message": f"Достигнут дневной лимит запросов ({current_user.daily_requests_limit})",
                "limit": current_user.daily_requests_limit,
                "used": current_user.requests_today,
                "remaining": 0,
                "reset_info": reset_info,
                "is_guest": False,
                "error_type": "limit_exceeded"
            }), 429
    else:
        # Проверка для гостя
        if not GuestManager.can_make_request():
            reset_info = GuestManager.get_reset_info()
            return jsonify({
                "success": False,
                "message": "Использованы все бесплатные запросы. Зарегистрируйтесь для большего количества запросов.",
                "limit": GuestManager.GUEST_LIMIT,
                "used": session.get('guest_requests', 0),
                "remaining": 0,
                "reset_info": reset_info,
                "is_guest": True,
                "upgrade_url": "/registration",
                "error_type": "guest_limit_exceeded"
            }), 429

    try:
        # 2. ОБРАБОТКА ЗАПРОСА К ИИ
        reply = response_gigachat(user_text)
        print(f"[TEXT] → {reply[:100]}{'...' if len(reply) > 100 else ''}")

        # 3. УВЕЛИЧЕНИЕ СЧЕТЧИКА ЗАПРОСОВ
        if not is_guest:
            # Для зарегистрированного пользователя
            current_user.increment_requests()
            remaining_requests = current_user.get_remaining_requests()
        else:
            # Для гостя
            GuestManager.increment_requests()
            remaining_requests = GuestManager.get_remaining_requests()
            # Получаем информацию о сбросе для гостя
            reset_info = GuestManager.get_reset_info()

        return jsonify({
            "success": True,
            "text": reply,
            "limits": {
                "remaining": remaining_requests,
                "is_guest": is_guest,
                "reset_info": reset_info
            }
        })

    except Exception as e:
        print(f"[TEXT ERROR] {type(e).__name__}: {str(e)}")

        # НЕ увеличиваем счетчик при ошибке ИИ
        return jsonify({
            "success": False,
            "message": "Ошибка обработки запроса к ИИ"
        }), 503

# Маршрут для отдачи аудиофайлов
@chat_v1.route('/audio/<filename>')
def serve_audio(filename):
    """Отдача аудиофайлов из кэш-директории"""
    try:
        audio_dir = current_app.config['AUDIO_CACHE_DIR']

        # Проверяем существование файла
        file_path = audio_dir / filename
        if not file_path.exists():
            print(f"[AUDIO NOT FOUND] {file_path}")
            return jsonify({"error": "Audio file not found"}), 404

        # Определяем MIME-тип по расширению
        if filename.endswith('.mp3'):
            mimetype = 'audio/mpeg'
        elif filename.endswith('.wav'):
            mimetype = 'audio/wav'
        else:
            mimetype = 'application/octet-stream'

        print(f"[AUDIO SERVED] {filename}")
        return send_file(file_path, mimetype=mimetype)

    except Exception as e:
        print(f"[AUDIO SERVE ERROR] {e}")
        return jsonify({"error": str(e)}), 500


@chat_v1.route('/message-with-audio', methods=['POST'])
def message_with_voice():
    """Текст + синтез речи (основной эндпоинт для голосового чата)"""
    data = request.get_json(silent=True) or {}
    user_text = data.get('message', '').strip()

    if not user_text:
        return jsonify({"error": "Сообщение пустое"}), 400

    print(f"[AUDIO] ← {user_text[:100]}{'...' if len(user_text) > 100 else ''}")

    try:
        text_reply = response_gigachat(user_text)

        audio_result = speech_syntesis(text_reply)
        if not audio_result or 'audio_bytes' not in audio_result:
            raise ValueError("Синтез речи не вернул аудио")

        audio_bytes = audio_result['audio_bytes']
        audio_format = audio_result.get('format', 'mp3')

        # Сохранение файла
        audio_id = uuid.uuid4().hex[:10]
        filename = f"audio_{audio_id}.{audio_format}"
        audio_path: Path = current_app.config['AUDIO_CACHE_DIR'] / filename

        # Создаем директорию, если её нет
        audio_path.parent.mkdir(parents=True, exist_ok=True)

        audio_path.write_bytes(audio_bytes)
        print(f"[AUDIO SAVED] {filename} ({len(audio_bytes):,} байт)")

        audio_base64 = base64.b64encode(audio_bytes).decode('utf-8')

        return jsonify({
            "success": True,
            "text": text_reply,
            "audio": {
                "base64": audio_base64,  # для быстрого воспроизведения
                "url": f"/api/v1/audio/{filename}",  # Изменено на /api/v1/audio/
                "format": audio_format,
                "size_bytes": len(audio_bytes)
            },
            "meta": {
                "message_id": audio_id,
                "timestamp": datetime.utcnow().isoformat(),
                "text_length": len(text_reply)
            }
        })

    except Exception as e:
        print(f"[AUDIO ERROR] {type(e).__name__}: {str(e)}")
        fallback_text = text_reply if 'text_reply' in locals() else "Ошибка"
        return jsonify({
            "success": False,
            "error": str(e)[:120],
            "fallback_text": fallback_text
        }), 500

@chat_v1.route('/health', methods=['GET'])
def health_check():
    """Простой эндпоинт для проверки живости API"""
    return jsonify({"status": "ok", "mode": current_app.config.get('ENV', 'unknown')})