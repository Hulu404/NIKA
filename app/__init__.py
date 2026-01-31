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


    # Регистрация blueprint'ов
    from .api.v1.chat import chat_v1
    from .api.audio import audio_bp

    app.register_blueprint(chat_v1)  # /api/v1/message, /api/v1/message-with-audio
    app.register_blueprint(audio_bp, url_prefix='/api')  # /api/audio/<filename>

    @app.errorhandler(404)
    def not_found(e):
        return {"error": "Not found"}, 404

    print(f"App created in {config_name} mode")
    return app