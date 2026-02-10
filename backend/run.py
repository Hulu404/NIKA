# run.py
from app import create_app
import os
from flask import send_from_directory

# По умолчанию development, но можно переопределить переменной окружения
config_name = os.environ.get("FLASK_CONFIG", "development")


app = create_app(config_name)
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react_app(path):
    # Если файл существует в static - отдаем его
    if path and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    # Иначе отдаем index.html (React SPA)
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == "__main__":
    # Для локальной разработки удобно видеть, на каком порту и в каком режиме
    debug = app.config.get("DEBUG", False)
    port = int(os.environ.get("PORT", 5001))

    print(f"Запуск приложения в режиме: {config_name.upper()}")
    print(f"DEBUG = {debug} | PORT = {port}")

    app.run(
        host=os.environ.get("HOST", "0.0.0.0"),
        port=port,
        debug=debug,
        use_reloader=debug
    )