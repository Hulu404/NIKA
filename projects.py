import os
from flask import Flask, request, render_template, jsonify
from flask_socketio import SocketIO, emit
from flask_sqlalchemy import SQLAlchemy
import json
import random

from giga_start import response_gigachat

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:/test.db'
db = SQLAlchemy(app)
socketio = SocketIO(app, cors_allowed_origin="*")



@socketio.on('connect')
def connect():
    print('Client connected', request.sid)

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    text = db.Column(db.Text, nullable=False)




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

        # if os.listdir(r"d:\projects_X\NIKA\json_files"):
        #     with open("test_user.json", 'w', encoding="utf-8") as file:
        #         json.dump(data, file, ensure_ascii=False, indent=4)
        # else:
        #     with open("test_user.json", 'w', encoding="utf-8") as file:
        #         json.dump(data, file, ensure_ascii=False, indent=4)

        return "Регистрация прошла успешно!"

    return render_template("registration.html", message="Вы зарегистрированы!")


if __name__ == '__main__':
    app.run(debug=True)