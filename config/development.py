from .base import BaseConfig


class DevelopmentConfig(BaseConfig):
    DEBUG = True
    ENV = "development"

    # В dev можно включить подробные ошибки
    PROPAGATE_EXCEPTIONS = True