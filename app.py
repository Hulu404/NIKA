from flask import Flask, request, jsonify, render_template, send_from_directory
from src1.giga_start import response_gigachat
from src1.giga_speech import speech_syntesis   # <-- используем твой файл
from pathlib import Path
import base64
import uuid


app = Flask(__name__)

AUDIO_CACHE_DIR = Path("static/audio_cache") # сохраним аудио чтобы чекнуть 
AUDIO_CACHE_DIR.mkdir(parents=True, exist_ok=True)

@app.route("/")
def home(): # Отрисовка главной страницы
    return render_template("home.html")

@app.route("/chat")
def chat(): # Переход на наш чат
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
def receive_message_with_audio():
    data = request.get_json()
    user_text = data.get("message", "")

    # Печатаем сообщение в консоль
    print(f"[USER MESSAGE] {user_text}")

    try:
        # Получаем ответ от GigaChat
        reply = response_gigachat(user_text)
        print(f"[GIGACHAT REPLY] {reply}")

        # GC озвучивает ответ
        audio_answer = speech_syntesis(reply)

        if not audio_answer or 'audio_bytes' not in audio_answer:
            raise Exception("Не удалось синтезировать аудио")
        
        audio_filename = f"audio_{uuid.uuid4().hex[:8]}.mp3"
        audio_path = f"static/audio_cache/{audio_filename}"
        
        with open(audio_path, 'wb') as f:
            f.write(audio_answer['audio_bytes'])
        
        print(f"[AUDIO SAVED] {audio_path}")
        
        # Конвертируем аудио в base64 для отправки в JSON
        audio_base64 = base64.b64encode(audio_answer['audio_bytes']).decode('utf-8')
        # Печатаем ответ бота в консоль (для отладки)
        
        response_data = {
            "success": True,
            "text": reply,
            "audio": {
                "base64": audio_base64,
                "format": audio_answer.get('format', 'mp3'),
                "file_url": f"/api/audio/{audio_filename}",  # ссылка для прямого скачивания
                "size_bytes": len(audio_answer['audio_bytes'])
            },
            "metadata": {
                "chars": len(reply),
                "audio_id": audio_filename
            }
        }
        return jsonify(response_data)
    
    except Exception as e:
        print(f"[ERROR WITH AUDIO] {e}")
        reply = "Произошла ошибка при обращении к ИИ. Попробуй ещё раз 🙏"
    return jsonify({"reply": reply})


if __name__ == "__main__":
    app.run(debug=True)
