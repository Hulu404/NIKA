from flask import Flask, request, jsonify, render_template, send_from_directory
from legacy_code.src1.giga_start import response_gigachat
from legacy_code.src1.giga_speech import speech_syntesis
from pathlib import Path
import base64
import uuid
import os
from datetime import datetime

app = Flask(__name__)

# Конфигурация
AUDIO_CACHE_DIR = Path("../static/audio_cache")
AUDIO_CACHE_DIR.mkdir(parents=True, exist_ok=True)

# Максимальный возраст кэша аудио (например, 24 часа) — потом можно чистить
AUDIO_MAX_AGE_SECONDS = 24 * 3600


@app.route("/")
def home():
    return render_template("home.html")


@app.route("/chat")
def chat():
    return render_template("index.html")


# Отдача сохранённых аудиофайлов
@app.route("/api/audio/<filename>")
def serve_audio(filename):
    return send_from_directory(AUDIO_CACHE_DIR, filename, mimetype="audio/mpeg")


@app.post("/api/message")
def receive_message():
    data = request.get_json(silent=True) or {}
    user_text = data.get("message", "").strip()

    if not user_text:
        return jsonify({"error": "Сообщение пустое"}), 400

    print(f"[USER → TEXT] {user_text}")

    try:
        reply = response_gigachat(user_text)
        print(f"[GIGACHAT → TEXT] {reply[:120]}{'...' if len(reply) > 120 else ''}")
    except Exception as e:
        print(f"[GIGACHAT ERROR] {type(e).__name__}: {e}")
        reply = "Извини, что-то пошло не так с ИИ… Попробуй ещё разок 🙏"

    return jsonify({"reply": reply})


@app.post("/api/message-with-audio")
def receive_message_with_audio():
    data = request.get_json(silent=True) or {}
    user_text = data.get("message", "").strip()

    if not user_text:
        return jsonify({"error": "Сообщение пустое"}), 400

    print(f"[USER → AUDIO] {user_text}")

    try:
        reply_text = response_gigachat(user_text)
        print(f"[GIGACHAT → AUDIO] {reply_text[:120]}{'...' if len(reply_text) > 120 else ''}")

        audio_response = speech_syntesis(reply_text)
        if not audio_response or 'audio_bytes' not in audio_response:
            raise ValueError("Синтез речи вернул пустой результат")

        audio_bytes = audio_response['audio_bytes']
        audio_format = audio_response.get('format', 'mp3')
        if audio_format not in ('mp3', 'wav', 'ogg'):
            audio_format = 'mp3'  # fallback

        # Генерируем уникальное имя
        audio_id = uuid.uuid4().hex[:12]
        filename = f"audio_{audio_id}.{audio_format}"
        audio_path = AUDIO_CACHE_DIR / filename

        audio_path.write_bytes(audio_bytes)
        print(f"[AUDIO SAVED] {audio_path} ({len(audio_bytes):,} байт)")

        audio_base64 = base64.b64encode(audio_bytes).decode('utf-8')

        return jsonify({
            "success": True,
            "text": reply_text,
            "audio": {
                "base64": audio_base64,               # для быстрого воспроизведения без доп. запроса
                "format": audio_format,
                "url": f"/api/audio/{filename}",      # для <audio src=""> или скачивания
                "size_bytes": len(audio_bytes),
            },
            "metadata": {
                "message_id": audio_id,
                "timestamp": datetime.utcnow().isoformat(),
                "text_length": len(reply_text),
            }
        })

    except Exception as e:
        print(f"[AUDIO ERROR] {type(e).__name__}: {e}")
        return jsonify({
            "success": False,
            "error": "Не удалось сгенерировать аудио",
            "fallback_text": reply_text if 'reply_text' in locals() else "Ошибка"
        }), 500


if __name__ == "__main__":
    # Можно добавить host/port через переменные окружения позже
    app.run(debug=True, port=int(os.environ.get("PORT", 5000)))