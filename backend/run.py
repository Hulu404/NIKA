# run.py
"""
Точка входа для запуска приложения.

Сервер (Docker CMD):
    python run.py

CLI-команды (через FLASK_APP=run:create_app):
    flask --help
    flask db-info
    flask init-db
    flask create-admin --name Admin --email admin@test.com --password 123
"""
import os


def create_app():
    """
    App factory — вызывается Flask CLI автоматически через FLASK_APP=run:create_app.
    Создаёт приложение БЕЗ запуска планировщика и db.create_all() (CLI-режим).
    """
    from app import create_app as _create_app
    from flask import send_from_directory

    # Явно помечаем CLI-режим — планировщик и db.create_all НЕ запускаются
    os.environ['SKIP_SCHEDULER'] = '1'

    config_name = os.environ.get("FLASK_CONFIG", "development")
    application = _create_app(config_name)

    @application.route('/', defaults={'path': ''})
    @application.route('/<path:path>')
    def serve_react_app(path):
        if path and os.path.exists(os.path.join(application.static_folder, path)):
            return send_from_directory(application.static_folder, path)
        return send_from_directory(application.static_folder, 'index.html')

    return application


# ────────────────────────────────────────────────
# Прямой запуск сервера: python run.py (Docker CMD)
# ────────────────────────────────────────────────

if __name__ == "__main__":
    from flask import send_from_directory
    from app import create_app as _create_app

    # Ставим флаг — только при старте сервера запускается планировщик
    os.environ['RUN_SCHEDULER'] = '1'

    config_name = os.environ.get("FLASK_CONFIG", "development")
    app = _create_app(config_name)

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
