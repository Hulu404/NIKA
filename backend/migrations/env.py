import os
import sys
from logging.config import fileConfig

from sqlalchemy import engine_from_config
from sqlalchemy import pool

from alembic import context

# Добавляем корень проекта в sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import create_app
from app.extensions import db

config = context.config

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Создаём Flask-приложение для получения URL базы данных и метаданных
flask_app = create_app()
target_metadata = db.metadata


def get_url():
    """Получаем SQLAlchemy URL из Flask-конфига или переменной окружения DATABASE_URL."""
    url = flask_app.config.get("SQLALCHEMY_DATABASE_URI")
    if url:
        return url
    return os.environ.get("DATABASE_URL", "sqlite:///instance/app.db")


def run_migrations_offline():
    url = get_url()
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )
    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    # Переопределяем URL в конфиге Alembic
    config.set_main_option("sqlalchemy.url", get_url())

    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
        )
        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    with flask_app.app_context():
        run_migrations_online()
