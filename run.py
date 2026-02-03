# run.py
from app import create_app
import os

# По умолчанию development, но можно переопределить переменной окружения
config_name = os.environ.get("FLASK_CONFIG", "development")

app = create_app(config_name)

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