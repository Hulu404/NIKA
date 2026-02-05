from pathlib import Path
import os
from datetime import timedelta

basedir = Path(__file__).resolve().parent.parent

class DevelopmentConfig:
    DEBUG = True
    ENV = "development"

    AUDIO_CACHE_DIR = basedir / "app" / "static" / "audio_cache"

    # SQLite — файл будет в instance/app.db
    SQLALCHEMY_DATABASE_URI = f"sqlite:///{basedir / 'instance' / 'app.db'}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True           # True для отладки SQL-запросов




# JWT настройки
JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY") or "super-secret-change-me-2026"
JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=15)  # короткий access
JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)    # длинный refresh
JWT_TOKEN_LOCATION = ["headers"]  # или ["cookies"] для httpOnly (рекомендую в проде)
JWT_COOKIE_SECURE = False  # True в проде (только HTTPS)
JWT_COOKIE_CSRF_PROTECT = True