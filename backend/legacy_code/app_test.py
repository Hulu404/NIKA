from flask import Flask, request, jsonify, render_template
from legacy_code.src1.giga_start import response_gigachat
from legacy_code.src1.giga_speech import speech_syntesis  # <-- используем твой файл
from pathlib import Path
import uuid

app = Flask(__name__)

AUDIO_CACHE_DIR = Path("../static/audio_cache")  # сохраним аудио чтобы чекнуть
AUDIO_CACHE_DIR.mkdir(parents=True, exist_ok=True)


@app.route("/")
def home():  # Отрисовка главной страницы
    return render_template("home.html")


@app.route("/chat")
def chat():  # Переход на наш чат
    return render_template("index.html")


@app.post("/api/message")
def receive_message():
    data = request.get_json()
    user_text = data.get("message", "")

    # Печатаем сообщение в консоль
    print(f"[USER MESSAGE] {user_text}")

    try:
        # Получаем ответ от GigaChat
        reply = response_gigachat(user_text)

        # Печатаем ответ бота в консоль (для отладки)
        print(f"[GIGACHAT REPLY] {reply}")

    except Exception as e:
        print(f"[ERROR] {e}")
        reply = "Произошла ошибка при обращении к ИИ. Попробуй ещё раз 🙏"

    return jsonify({"reply": reply})


@app.post("/api/message-with-audio")
def message_with_audio():
    user_text = request.json.get("message")

    reply = response_gigachat(user_text)

    audio_bytes = speech_syntesis(reply)

    filename = f"{uuid.uuid4()}.mp3"
    AUDIO_CACHE_DIR = Path("../static/audio_cache")


    with open(path, "wb") as f:
        f.write(audio_bytes)

    return jsonify({
        "reply": reply,
        "audio_url": f"/static/audio/{filename}"
    })



if __name__ == "__main__":
    app.run(debug=True)