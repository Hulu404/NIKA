# app/api/v1/chat.py
from flask import Blueprint, request, jsonify, current_app
from datetime import datetime
import uuid
import base64
from pathlib import Path

# Импорты из services (после переноса логики)
from app.services.gigachat.giga_start import response_gigachat
from app.services.gigachat.speech import speech_syntesis

chat_v1 = Blueprint('chat_v1', __name__, url_prefix='/api/v1')

@chat_v1.route('/message', methods=['POST'])
def text_only_message():
    """Простой текстовый ответ без аудио"""
    data = request.get_json(silent=True) or {}
    user_text = data.get('message', '').strip()

    if not user_text:
        return jsonify({"error": "Сообщение пустое"}), 400

    print(f"[TEXT] ← {user_text[:100]}{'...' if len(user_text) > 100 else ''}")

    try:
        reply = response_gigachat(user_text)
        print(f"[TEXT] → {reply[:100]}{'...' if len(reply) > 100 else ''}")
        return jsonify({"reply": reply, "success": True})
    except Exception as e:
        print(f"[TEXT ERROR] {type(e).__name__}: {str(e)}")
        return jsonify({
            "success": False,
            "error": "Ошибка обработки запроса к ИИ"
        }), 503


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

        audio_path.write_bytes(audio_bytes)
        print(f"[AUDIO SAVED] {filename} ({len(audio_bytes):,} байт)")

        audio_base64 = base64.b64encode(audio_bytes).decode('utf-8')

        return jsonify({
            "success": True,
            "text": text_reply,
            "audio": {
                "base64": audio_base64,                     # для быстрого воспроизведения
                "url": f"/api/audio/{filename}",            # для <audio src>
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