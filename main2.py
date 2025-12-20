import os
from flask import Flask, request, render_template, jsonify
import json


app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/send", methods=['POST'])
def send():
    data = request.get_json()
    message = data.get('message')

    if os.listdir("json_files"):
        with open(r"json_files\test_user.json", "w", encoding="utf-8") as file:
            json.dump(message, file, ensure_ascii=False, indent=4)
    else:
        with open(r"json_files\test_user.json", "w", encoding="utf-8") as file:
            json.dump(message, file, ensure_ascii=False, indent=4)

    print(f"Пришло сообщение: {message}")

    return jsonify({"message": message})


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

if __name__ == '__main__':
    app.run(debug=True)