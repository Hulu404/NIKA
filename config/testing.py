from .base import BaseConfig


class TestingConfig(BaseConfig):
    TESTING = True
    DEBUG = True
    # Можно использовать временную БД в памяти
    # SQLALCHEMY_DATABASE_URI = "sqlite:///:memory:"