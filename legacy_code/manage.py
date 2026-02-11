# manage.py   (в корне проекта)

import click
from flask.cli import FlaskGroup

from app import create_app
from app.extensions import db          # ← вот отсюда db


def create_my_app():
    """Фабрика для CLI-команд"""
    app = create_app()
    return app


cli = FlaskGroup(create_app=create_my_app)


@cli.command("init-db")
def init_db():
    """Создать все таблицы (удобно для быстрого старта без миграций)"""
    with create_my_app().app_context():
        db.create_all()
        click.echo("Таблицы созданы (или уже существуют).")


@cli.command("drop-db")
def drop_db():
    """Удалить все таблицы (осторожно — данные пропадут!)"""
    if click.confirm("Вы уверены? Это удалит все данные в базе"):
        with create_my_app().app_context():
            db.drop_all()
            click.echo("Все таблицы удалены.")


if __name__ == "__main__":
    cli()