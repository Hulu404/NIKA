from flask import Flask, render_template, request


app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def index():
    message = None
    if request.method == 'POST':
        message = request.form.get('message')
    return render_template('index.html', message=message)


if __name__ == '__main__':
    app.run(debug=True)