"""
CLI-команды управления базой данных.
Вынесены из create_app() чтобы flask --help не зависал.

Использование:
    FLASK_APP=run:create_app flask --help
    FLASK_APP=run:create_app flask db-info
    FLASK_APP=run:create_app flask init-db
    FLASK_APP=run:create_app flask create-admin --name Admin --email a@b.com --password 123
"""
import click
from flask import Blueprint

cli_bp = Blueprint('cli_commands', __name__)


def _get_app_and_db():
    """Ленивый импорт, чтобы не загружать app при импорте этого модуля."""
    from flask import current_app
    from app.extensions import db
    return current_app, db


# ────────────────────────────────────────────────
# Инициализация и миграции
# ────────────────────────────────────────────────

@cli_bp.cli.command("init-db")
def init_db():
    """Создаёт ВСЕ таблицы по текущим моделям (первый запуск)"""
    app, db = _get_app_and_db()
    with app.app_context():
        db.create_all()
        print("✅ База данных инициализирована")


@cli_bp.cli.command("drop-db")
def drop_db():
    """УДАЛЯЕТ все таблицы (опасно!)"""
    app, db = _get_app_and_db()
    with app.app_context():
        db.drop_all()
        print("⚠️  Все таблицы удалены")


@cli_bp.cli.command("update-db")
def update_db():
    """Создаёт отсутствующие таблицы (без потери данных)"""
    app, db = _get_app_and_db()
    with app.app_context():
        db.create_all()
        print("✅ Таблицы обновлены")


# ────────────────────────────────────────────────
# Просмотр
# ────────────────────────────────────────────────

@cli_bp.cli.command("db-tables")
def db_tables():
    """Показать все таблицы в БД"""
    app, db = _get_app_and_db()
    with app.app_context():
        from sqlalchemy import inspect as sa_inspect
        tables = sa_inspect(db.engine).get_table_names()
        print(f"\n📋 Таблицы в базе данных ({len(tables)}):")
        print("-" * 40)
        for t in sorted(tables):
            print(f"  • {t}")
        print()


@cli_bp.cli.command("db-info")
def db_info():
    """Показать информацию о базе данных и таблицах"""
    app, db = _get_app_and_db()
    with app.app_context():
        from sqlalchemy import inspect as sa_inspect
        insp = sa_inspect(db.engine)
        tables = insp.get_table_names()
        uri = app.config.get('SQLALCHEMY_DATABASE_URI', 'unknown')
        print(f"\n🗄️  База данных: {uri}")
        print(f"📋 Таблиц ({len(tables)}):")
        print("-" * 50)
        for t in sorted(tables):
            count = db.session.execute(db.text(f"SELECT COUNT(*) FROM {t}")).scalar()
            cols = insp.get_columns(t)
            print(f"  {t:30s} {count:6d} строк  {len(cols)} колонок")
        print()


@cli_bp.cli.command("db-schema")
@click.argument("table_name")
def db_schema(table_name):
    """Показать структуру таблицы (колонки, типы)

    Пример: flask db-schema users
    """
    app, db = _get_app_and_db()
    with app.app_context():
        from sqlalchemy import inspect as sa_inspect
        insp = sa_inspect(db.engine)
        if table_name not in insp.get_table_names():
            print(f"❌ Таблица '{table_name}' не найдена")
            return
        columns = insp.get_columns(table_name)
        print(f"\n📋 Структура таблицы '{table_name}':")
        print("-" * 60)
        for col in columns:
            nullable = "NULL" if col['nullable'] else "NOT NULL"
            default = f" DEFAULT {col['default']}" if col.get('default') else ""
            print(f"  {col['name']:25s} {str(col['type']):30s} {nullable}{default}")
        print()


@cli_bp.cli.command("db-count")
@click.argument("table_name")
def db_count(table_name):
    """Показать количество строк в таблице"""
    app, db = _get_app_and_db()
    with app.app_context():
        result = db.session.execute(db.text(f"SELECT COUNT(*) FROM {table_name}"))
        count = result.scalar()
        print(f"📊 {table_name}: {count} строк")


# ────────────────────────────────────────────────
# Извлечение данных
# ────────────────────────────────────────────────

@cli_bp.cli.command("db-query")
@click.argument("sql")
def db_query(sql):
    """Выполнить произвольный SELECT-запрос

    Пример: flask db-query "SELECT id, email FROM users LIMIT 5"
    """
    app, db = _get_app_and_db()
    with app.app_context():
        try:
            result = db.session.execute(db.text(sql))
            rows = result.fetchall()
            cols = result.keys()
            if not rows:
                print("📭 Нет результатов")
                return
            col_widths = [len(c) for c in cols]
            for row in rows:
                for i, val in enumerate(row):
                    col_widths[i] = max(col_widths[i], len(str(val)) if val is not None else 4)
            header = " | ".join(str(c).ljust(col_widths[i]) for i, c in enumerate(cols))
            print(f"\n{header}")
            print("-" * len(header))
            for row in rows:
                line = " | ".join(
                    (str(v) if v is not None else "NULL").ljust(col_widths[i])
                    for i, v in enumerate(row)
                )
                print(line)
            print(f"\n📊 {len(rows)} строк\n")
        except Exception as e:
            print(f"❌ Ошибка: {e}")


def _format_table_output(cols, rows):
    """Утилита для форматирования табличного вывода."""
    col_widths = [len(c) for c in cols]
    for row in rows:
        for i, val in enumerate(row):
            col_widths[i] = max(col_widths[i], len(str(val)) if val is not None else 4)
    header = " | ".join(str(c).ljust(col_widths[i]) for i, c in enumerate(cols))
    print(f"\n{header}")
    print("-" * len(header))
    for row in rows:
        line = " | ".join(
            (str(v) if v is not None else "NULL").ljust(col_widths[i])
            for i, v in enumerate(row)
        )
        print(line)


@cli_bp.cli.command("db-get")
@click.option("-t", "--table", required=True, help="Имя таблицы")
@click.option("-w", "--where", default="", help="Условие WHERE")
@click.option("-l", "--limit", default=20, type=int, help="Лимит строк")
@click.option("-o", "--order", default="", help="ORDER BY")
def db_get(table, where, limit, order):
    """Извлечь строки из таблицы с фильтрацией

    Примеры:
        flask db-get -t users -l 10
        flask db-get -t users -w "email LIKE '%@example.com'"
        flask db-get -t messages -w "role='assistant'" -l 5 -o "created_at DESC"
    """
    app, db = _get_app_and_db()
    with app.app_context():
        parts = [f"SELECT * FROM {table}"]
        if where:
            parts.append(f"WHERE {where}")
        if order:
            parts.append(f"ORDER BY {order}")
        parts.append(f"LIMIT {limit}")
        query = " ".join(parts)
        try:
            result = db.session.execute(db.text(query))
            rows = result.fetchall()
            cols = result.keys()
            if not rows:
                print(f"📭 Таблица '{table}' пуста (или нет совпадений)")
                return
            _format_table_output(cols, rows)
            print(f"\n📊 {len(rows)} строк из '{table}'\n")
        except Exception as e:
            print(f"❌ Ошибка: {e}")


# ────────────────────────────────────────────────
# Изменение данных
# ────────────────────────────────────────────────

@cli_bp.cli.command("db-update")
@click.option("-t", "--table", required=True, help="Имя таблицы")
@click.option("-s", "--set", required=True, help="SET: column='value'")
@click.option("-w", "--where", default="", help="Условие WHERE")
def db_update(table, set_clause, where):
    """Обновить строки в таблице

    Примеры:
        flask db-update -t users -s "is_admin=1" -w "email='admin@example.com'"
        flask db-update -t users -s "daily_requests_limit=10"
    """
    app, db = _get_app_and_db()
    with app.app_context():
        parts = [f"UPDATE {table} SET {set_clause}"]
        if where:
            parts.append(f"WHERE {where}")
        query = " ".join(parts)
        try:
            result = db.session.execute(db.text(query))
            db.session.commit()
            print(f"✅ Обновлено {result.rowcount} строк в '{table}'")
        except Exception as e:
            db.session.rollback()
            print(f"❌ Ошибка: {e}")


@cli_bp.cli.command("db-delete")
@click.option("-t", "--table", required=True, help="Имя таблицы")
@click.option("-w", "--where", required=True, help="Условие WHERE")
def db_delete(table, where):
    """Удалить строки из таблицы

    Примеры:
        flask db-delete -t users -w "email='test@test.com'"
    """
    app, db = _get_app_and_db()
    with app.app_context():
        query = f"DELETE FROM {table} WHERE {where}"
        try:
            result = db.session.execute(db.text(query))
            db.session.commit()
            print(f"✅ Удалено {result.rowcount} строк из '{table}'")
        except Exception as e:
            db.session.rollback()
            print(f"❌ Ошибка: {e}")


@cli_bp.cli.command("db-insert")
@click.option("-t", "--table", required=True, help="Имя таблицы")
@click.option("-c", "--columns", required=True, help="Колонки через запятую")
@click.option("-v", "--values", required=True, help="Значения через запятую")
def db_insert(table, columns, values):
    """Вставить строку в таблицу

    Пример: flask db-insert -t users -c "name,email,gender" -v "'Test','test@test.com','male'"
    """
    app, db = _get_app_and_db()
    with app.app_context():
        query = f"INSERT INTO {table} ({columns}) VALUES ({values})"
        try:
            db.session.execute(db.text(query))
            db.session.commit()
            print(f"✅ Вставлена строка в '{table}'")
        except Exception as e:
            db.session.rollback()
            print(f"❌ Ошибка: {e}")


# ────────────────────────────────────────────────
# Alembic миграции
# ────────────────────────────────────────────────

@cli_bp.cli.command("db-upgrade")
def db_upgrade():
    """Применить все ожидающие миграции"""
    from flask_migrate import upgrade as fm_upgrade
    print("⬆️  Применяю миграции...")
    fm_upgrade(directory="migrations")
    print("✅ Миграции применены")


@cli_bp.cli.command("db-downgrade")
@click.option("-r", "--revision", default="-1", help="Ревизия для отката")
def db_downgrade(revision):
    """Откатить миграцию

    Примеры:
        flask db-downgrade          # откат на 1 шаг
        flask db-downgrade -r base  # откатить всё
    """
    from flask_migrate import downgrade as fm_downgrade
    print(f"⬇️  Откатываю к ревизии: {revision}")
    fm_downgrade(directory="migrations", revision=revision)
    print("✅ Миграция откаатена")


@cli_bp.cli.command("db-current")
def db_current():
    """Показать теку ревизию Alembic"""
    from flask_migrate import current as fm_current
    fm_current(directory="migrations")


@cli_bp.cli.command("db-migrate")
@click.option("-m", "--message", default="auto migration", help="Описание миграки")
def db_migrate(message):
    """Создать миграцию из текущих моделей"""
    from flask_migrate import migrate as fm
    print(f"📝 Создаю миграку: {message}")
    fm(directory="migrations", message=message)


# ────────────────────────────────────────────────
# Пользователи
# ────────────────────────────────────────────────

@cli_bp.cli.command("create-test-user")
def create_test_user():
    """Создать тестового пользователя (если нет пользователей)"""
    app, db = _get_app_and_db()
    with app.app_context():
        from app.models.user import User
        if User.query.count() == 0:
            print("👤 Создаю тестового пользователя...")
            admin = User(
                name="Admin",
                last_name="User",
                email="admin@example.com",
                gender="male",
                sport_type="testing",
            )
            admin.set_password("admin123")
            db.session.add(admin)
            db.session.commit()
            print("✅ Тестовый пользователь создан (email: admin@example.com, пароль: admin123)")
        else:
            print(f"👤 В базе уже есть {User.query.count()} пользователей")


@cli_bp.cli.command("create-admin")
@click.option("--name", required=True, help="Имя")
@click.option("--email", required=True, help="Email")
@click.option("--password", required=True, help="Пароль")
def create_admin(name, email, password):
    """Создать пользователя-администратора

    Пример: flask create-admin --name Admin --email a@b.com --password 123
    """
    app, db = _get_app_and_db()
    with app.app_context():
        from app.models.user import User
        if User.query.filter_by(email=email).first():
            print(f"❌ Пользователь с email {email} уже существует")
            return
        user = User(
            name=name,
            last_name="Admin",
            email=email,
            gender="male",
            is_admin=True,
        )
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        print(f"✅ Администратор создан: {email}")


# ────────────────────────────────────────────────
# Утилиты
# ────────────────────────────────────────────────

@cli_bp.cli.command("clean-sessions")
def clean_sessions():
    """Очищает старые файлы сессий (старше 32 дней)"""
    import time
    from pathlib import Path
    from flask import current_app

    session_dir = Path(current_app.config['SESSION_FILE_DIR'])
    if not session_dir.exists():
        print("📁 Директория сессий не найдена")
        return
    now = time.time()
    max_age = 32 * 24 * 60 * 60
    deleted = 0
    for session_file in session_dir.glob('*'):
        if session_file.is_file():
            file_age = now - session_file.stat().st_mtime
            if file_age > max_age:
                session_file.unlink()
                deleted += 1
    print(f"🧹 Удалено старых сессий: {deleted}")
