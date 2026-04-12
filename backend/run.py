# run.py
"""
Точка входа для запуска сервера.

Запуск:
    python run.py
"""
import os


if __name__ == "__main__":
    from flask import send_from_directory
    from app import create_app

    # Только при старте сервера запускается планировщик и db.create_all()
    os.environ['RUN_SCHEDULER'] = '1'

    config_name = os.environ.get("FLASK_CONFIG", "development")
    app = create_app(config_name)

    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve_react_app(path):
        if path and os.path.exists(os.path.join(app.static_folder, path)):
            return send_from_directory(app.static_folder, path)
        return send_from_directory(app.static_folder, 'index.html')

    debug = app.config.get("DEBUG", False)
    port = int(os.environ.get("PORT", 5001))

    print(f"Запуск приложения в режиме: {config_name.upper()}")
    print(f"DEBUG = {debug} | PORT = {port}")

    app.run(
        host=os.environ.get("HOST", "0.0.0.0"),
        port=port,
        debug=debug,
        use_reloader=debug,
    )
