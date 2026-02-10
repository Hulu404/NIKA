from .base import BaseConfig


class ProductionConfig(BaseConfig):
    DEBUG = False
    ENV = "production"

    # В production рекомендуется
    # SESSION_COOKIE_SECURE = True
    # SESSION_COOKIE_HTTPONLY = True
    # SESSION_COOKIE_SAMESITE = "Lax"