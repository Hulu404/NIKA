from pathlib import Path
import os

basedir = Path(__file__).resolve().parent.parent.parent

class DevelopmentConfig:
    DEBUG = True
    ENV = "development"

    AUDIO_CACHE_DIR = basedir / "app" / "static" / "audio_cache"

    # SQLite — файл будет в instance/app.db
    SQLALCHEMY_DATABASE_URI = f"sqlite:///{basedir / 'instance' / 'app.db'}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True           # True для отладки SQL-запросов
