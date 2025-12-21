import os
from flask import Flask, request, render_template, jsonify
from flask_socketio import SocketIO, emit
import json

from giga_start import response_gigachat

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origin="*")

users = {} # Сохранение пользователей

@socketio.on('connect')
def connect():
    print('Client connected', request.sid)



@socketio.on("disconnect")
def disconnect():
    for user_id, sid in list(users.items()):
        if sid == request.sid:
            del users[user_id]
            break


@app.route('/')
def index():
    return render_template('index.html')

@app.route("/chat")
def chat():
    return render_template('chat.html')

@app.route("/send_message", methods=['POST'])
def send_message():
    data = request.json
    user_text = data["message"]

    # Ответ сайта (заглушка)
    return jsonify({
        "reply": f"Вы написали: {user_text}"
    })


@app.route("/about")
def about():
    return render_template('index.html')

@app.route('/user/<int:user_id>/')
def user_profile(user_id):
    return "Profile page of user #{}".format(user_id)


@app.route('/books/<genre>/')
def books(genre):
    return "All Books in {} category".format(genre)

@app.route('/login/', methods=['post', 'get'])
def login():
    message = ''
    if request.method == 'POST':
        username = request.form.get('username')  # запрос к данным формы
        password = request.form.get('password')

        if username == 'root' and password == 'pass':
            message = "Correct username and password"
    else:
        message = "Wrong username or password"

    return render_template('login.html', message=message)

@app.route("/register", methods=['post', 'get'])
def register():
    if request.method == "POST":
        data = {
            "last_name": request.form.get("last_name"),
            "first_name": request.form.get("first_name"),
            "middle_name": request.form.get("middle_name"),  # может быть None
            "phone": request.form.get("phone"),
            "gender": request.form.get("gender"),
            "telegram": request.form.get("telegram"),
        }
        # Тут можно сохранить данные в БД или обработать
        print("Данные регистрации:", data)
        return "Регистрация прошла успешно!"

    return render_template("registration.html", message="Вы зарегистрированы!")


if __name__ == '__main__':
    app.run(debug=True)