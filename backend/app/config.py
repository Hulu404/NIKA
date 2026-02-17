# app/config.py
import os
from pathlib import Path

basedir = os.path.abspath(os.path.dirname(__file__))

class BaseConfig:
    """Базовая конфигурация"""
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'default_secret_key'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = False  # Логирование SQL-запросов (для debug)
    
    # JWT настройки
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')
    JWT_ACCESS_TOKEN_EXPIRES = 15 * 60  # 15 минут в секундах
    JWT_REFRESH_TOKEN_EXPIRES = 30 * 24 * 60 * 60  # 30 дней в секундах
    JWT_COOKIE_SECURE = False  # В prod установить True (HTTPS)
    JWT_COOKIE_CSRF_PROTECT = True
    JWT_TOKEN_LOCATION = ['cookies', 'headers']
    
    # Папка для кэша аудио (будет переопределена в __init__.py)
    AUDIO_CACHE_DIR = 'audio_cache'
    
    # Другие общие настройки
    ENV = 'base'
    DEBUG = False

class DevelopmentConfig(BaseConfig):
    """Конфигурация для разработки"""
    ENV = 'development'
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('DEV_DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, '..', 'instance', 'dev.db')
    SQLALCHEMY_ECHO = True  # Включаем логи SQL для dev

class ProductionConfig(BaseConfig):
    """Конфигурация для продакшена"""
    ENV = 'production'
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = os.environ.get('PROD_DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, '..', 'instance', 'prod.db')
    JWT_COOKIE_SECURE = True  # HTTPS required

class TestingConfig(BaseConfig):
    """Конфигурация для тестов"""
    ENV = 'testing'
    TESTING = True
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('TEST_DATABASE_URL') or 'sqlite:///:memory:'
    SQLALCHEMY_ECHO = False

def get_config(name):
    """Функция для получения конфигурации по имени"""
    config_map = {
        'development': DevelopmentConfig,
        'production': ProductionConfig,
        'testing': TestingConfig,
    }
    return config_map.get(name, DevelopmentConfig)