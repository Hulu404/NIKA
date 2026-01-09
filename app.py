from flask import Flask, request, jsonify, render_template
from src1.giga_start import response_gigachat   # <-- используем твой файл

app = Flask(__name__)


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


if __name__ == "__main__":
    app.run(debug=True)
