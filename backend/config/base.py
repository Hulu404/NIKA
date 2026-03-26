from pathlib import Path
import os

basedir = Path(__file__).resolve().parent.parent


class BaseConfig:
    # Базовые настройки, общие для всех окружений
    SECRET_KEY = os.environ.get("SECRET_KEY") or "dev-secret-key-very-insecure"

    # Директория для кэша аудио
    AUDIO_CACHE_DIR = basedir / "app" / "static" / "audio_cache"
    AUDIO_MAX_AGE_SECONDS = 24 * 3600  # 1 день

    # Другие общие
    JSON_AS_ASCII = False

    SQLALCHEMY_DATABASE_URI = (
            os.environ.get("DATABASE_URL")
            or "postgresql+psycopg2://postgres:postgres@localhost:5432/chat_app"
        # или для SQLite: "sqlite:///" + str(basedir / "instance" / "app.db")
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True  # True в dev для отладки