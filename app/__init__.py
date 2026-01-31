# app/__init__.py

from flask import Flask
from config import get_config
from pathlib import Path
from dotenv import load_dotenv
import os


def create_app(config_name=None):
    load_dotenv()

    app = Flask(__name__,
                instance_relative_config=False,
                static_folder="static",
                template_folder="templates")

    if config_name is None:
        config_name = os.environ.get("FLASK_ENV", "development")
    app.config.from_object(get_config(config_name))

    Path(app.config["AUDIO_CACHE_DIR"]).mkdir(parents=True, exist_ok=True)

    # Импортируем и регистрируем здесь — после создания app
    from .views.main import main_bp
    from .api.v1.chat import chat_bp
    from .api.audio import audio_bp          # ← здесь безопасно

    app.register_blueprint(main_bp)
    app.register_blueprint(chat_bp, url_prefix="/api/v1")
    app.register_blueprint(audio_bp, url_prefix="/api")

    @app.errorhandler(404)
    def not_found(e):
        return {"error": "Not found"}, 404

    print(f"App created in {config_name} mode")
    return app