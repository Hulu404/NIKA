from flask import Flask, request, render_template, url_for, redirect, flash

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')

@app.route("/")
def index():
    return render_template('chat.html')

@app.route("/api/chat", methods=['POST'])
def chat():
    data = request.get_json()
    user_text = data.get("message", "")




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

        with open(r"../json_files/test_user.json", "w", encoding="utf-8") as file:
            json.dump(data, file, ensure_ascii=False, indent=4)
            
            flash("Регистрация прошла успешно!")

            return redirect(url_for("index"))

    return render_template("registration.html", message="Вы зарегистрированы!")


if __name__ == '__main__':
    app.run(debug=True)