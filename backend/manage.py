#!/usr/bin/env python3
"""
Простой CLI для управления БД без Flask CLI.
Запуск: python manage.py <команда>

Примеры:
    python manage.py db-info
    python manage.py db-schema users
    python manage.py db-get -t users -l 5
    python manage.py db-query "SELECT * FROM users"
    python manage.py init-db
    python manage.py create-admin --name Admin --email a@b.com --password 123
"""
import sys
import os
import argparse

# Настройка конфигурации ДО импорта create_app
os.environ.setdefault("FLASK_CONFIG", "production")
os.environ.setdefault("SKIP_SCHEDULER", "1")

from app import create_app
from app.extensions import db
from sqlalchemy import inspect as sa_inspect


def get_app():
    """Создаёт приложение и возвращает app + db."""
    config = os.environ.get("FLASK_CONFIG", "production")
    app = create_app(config)
    return app


# ═══════════════════════════════════════════════════
# Команды
# ═══════════════════════════════════════════════════

def cmd_init_db(args):
    """Создать все таблицы"""
    app = get_app()
    with app.app_context():
        db.create_all()
        print("✅ База данных инициализирована")


def cmd_drop_db(args):
    """Удалить все таблицы"""
    app = get_app()
    with app.app_context():
        db.drop_all()
        print("⚠️  Все таблицы удалены")


def cmd_update_db(args):
    """Создать отсутствующие таблицы"""
    app = get_app()
    with app.app_context():
        db.create_all()
        print("✅ Таблицы обновлены")


def cmd_db_tables(args):
    """Показать все таблицы"""
    app = get_app()
    with app.app_context():
        tables = sa_inspect(db.engine).get_table_names()
        print(f"\n📋 Таблицы ({len(tables)}):")
        print("-" * 40)
        for t in sorted(tables):
            print(f"  • {t}")
        print()


def cmd_db_info(args):
    """Показать таблицы с количеством строк"""
    app = get_app()
    with app.app_context():
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


def cmd_db_schema(args):
    """Показать структуру таблицы"""
    app = get_app()
    with app.app_context():
        insp = sa_inspect(db.engine)
        if args.table not in insp.get_table_names():
            print(f"❌ Таблица '{args.table}' не найдена")
            return
        columns = insp.get_columns(args.table)
        print(f"\n📋 Структура таблицы '{args.table}':")
        print("-" * 60)
        for col in columns:
            nullable = "NULL" if col['nullable'] else "NOT NULL"
            default = f" DEFAULT {col['default']}" if col.get('default') else ""
            print(f"  {col['name']:25s} {str(col['type']):30s} {nullable}{default}")
        print()


def cmd_db_count(args):
    """Количество строк в таблице"""
    app = get_app()
    with app.app_context():
        result = db.session.execute(db.text(f"SELECT COUNT(*) FROM {args.table}"))
        count = result.scalar()
        print(f"📊 {args.table}: {count} строк")


def _format_table(cols, rows):
    """Утилита форматирования табличного вывода"""
    col_widths = [len(c) for c in cols]
    for row in rows:
        for i, val in enumerate(row):
            col_widths[i] = max(col_widths[i], len(str(val)) if val is not None else 4)
    header = " | ".join(str(c).ljust(col_widths[i]) for i, c in enumerate(cols))
    print(f"\n{header}")
    print("-" * len(header))
    for row in rows:
        print(" | ".join(
            (str(v) if v is not None else "NULL").ljust(col_widths[i])
            for i, v in enumerate(row)
        ))


def cmd_db_query(args):
    """Произвольный SELECT-запрос"""
    app = get_app()
    with app.app_context():
        try:
            result = db.session.execute(db.text(args.sql))
            rows = result.fetchall()
            cols = result.keys()
            if not rows:
                print("📭 Нет результатов")
                return
            _format_table(cols, rows)
            print(f"\n📊 {len(rows)} строк\n")
        except Exception as e:
            print(f"❌ Ошибка: {e}")


def cmd_db_get(args):
    """Извлечь строки из таблицы"""
    app = get_app()
    with app.app_context():
        parts = [f"SELECT * FROM {args.table}"]
        if args.where:
            parts.append(f"WHERE {args.where}")
        if args.order:
            parts.append(f"ORDER BY {args.order}")
        parts.append(f"LIMIT {args.limit}")
        query = " ".join(parts)
        try:
            result = db.session.execute(db.text(query))
            rows = result.fetchall()
            cols = result.keys()
            if not rows:
                print(f"📭 Нет совпадений в '{args.table}'")
                return
            _format_table(cols, rows)
            print(f"\n📊 {len(rows)} строк из '{args.table}'\n")
        except Exception as e:
            print(f"❌ Ошибка: {e}")


def cmd_db_update(args):
    """Обновить строки"""
    app = get_app()
    with app.app_context():
        parts = [f"UPDATE {args.table} SET {args.set}"]
        if args.where:
            parts.append(f"WHERE {args.where}")
        query = " ".join(parts)
        try:
            result = db.session.execute(db.text(query))
            db.session.commit()
            print(f"✅ Обновлено {result.rowcount} строк в '{args.table}'")
        except Exception as e:
            db.session.rollback()
            print(f"❌ Ошибка: {e}")


def cmd_db_delete(args):
    """Удалить строки"""
    app = get_app()
    with app.app_context():
        query = f"DELETE FROM {args.table} WHERE {args.where}"
        try:
            result = db.session.execute(db.text(query))
            db.session.commit()
            print(f"✅ Удалено {result.rowcount} строк из '{args.table}'")
        except Exception as e:
            db.session.rollback()
            print(f"❌ Ошибка: {e}")


def cmd_db_insert(args):
    """Вставить строку"""
    app = get_app()
    with app.app_context():
        query = f"INSERT INTO {args.table} ({args.columns}) VALUES ({args.values})"
        try:
            db.session.execute(db.text(query))
            db.session.commit()
            print(f"✅ Вставлена строка в '{args.table}'")
        except Exception as e:
            db.session.rollback()
            print(f"❌ Ошибка: {e}")


def cmd_create_test_user(args):
    """Создать тестового пользователя"""
    app = get_app()
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


def cmd_create_admin(args):
    """Создать администратора"""
    app = get_app()
    with app.app_context():
        from app.models.user import User
        if User.query.filter_by(email=args.email).first():
            print(f"❌ Пользователь с email {args.email} уже существует")
            return
        user = User(
            name=args.name,
            last_name="Admin",
            email=args.email,
            gender="male",
            is_admin=True,
        )
        user.set_password(args.password)
        db.session.add(user)
        db.session.commit()
        print(f"✅ Администратор создан: {args.email}")


def cmd_clean_sessions(args):
    """Очистить старые сессии"""
    import time
    from pathlib import Path
    app = get_app()
    with app.app_context():
        session_dir = Path(app.config['SESSION_FILE_DIR'])
        if not session_dir.exists():
            print("📁 Директория сессий не найдена")
            return
        now = time.time()
        max_age = 32 * 24 * 60 * 60
        deleted = 0
        for sf in session_dir.glob('*'):
            if sf.is_file():
                if now - sf.stat().st_mtime > max_age:
                    sf.unlink()
                    deleted += 1
        print(f"🧹 Удалено старых сессий: {deleted}")


# ═══════════════════════════════════════════════════
# Парсер команд
# ═══════════════════════════════════════════════════

def main():
    parser = argparse.ArgumentParser(
        description="CLI для управления БД NIKA",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Примеры:
  python manage.py db-info
  python manage.py db-schema users
  python manage.py db-get -t users -l 10
  python manage.py db-get -t users -w "email LIKE '%@example.com'"
  python manage.py db-query "SELECT id, email FROM users LIMIT 5"
  python manage.py db-update -t users -s "is_admin=1" -w "id=1"
  python manage.py db-delete -t users -w "email='test@test.com'"
  python manage.py db-insert -t users -c "name,email,gender" -v "'Test','test@test.com','male'"
  python manage.py create-admin --name Admin --email a@b.com --password 123
  python manage.py init-db
        """
    )
    subparsers = parser.add_subparsers(dest='command', help='Доступные команды')

    # init-db
    subparsers.add_parser('init-db', help='Создать все таблицы')
    subparsers.add_parser('drop-db', help='Удалить все таблицы')
    subparsers.add_parser('update-db', help='Создать отсутствующие таблицы')
    subparsers.add_parser('db-tables', help='Список таблиц')
    subparsers.add_parser('db-info', help='Таблицы + кол-во строк')
    subparsers.add_parser('clean-sessions', help='Очистить старые сессии')
    subparsers.add_parser('create-test-user', help='Создать тестового пользователя')

    # db-schema
    p = subparsers.add_parser('db-schema', help='Структура таблицы')
    p.add_argument('table', help='Имя таблицы')

    # db-count
    p = subparsers.add_parser('db-count', help='Кол-во строк')
    p.add_argument('table', help='Имя таблицы')

    # db-query
    p = subparsers.add_parser('db-query', help='Произвольный SELECT')
    p.add_argument('sql', help='SQL-запрос')

    # db-get
    p = subparsers.add_parser('db-get', help='Извлечь строки')
    p.add_argument('-t', '--table', required=True, help='Имя таблицы')
    p.add_argument('-w', '--where', default='', help='WHERE условие')
    p.add_argument('-l', '--limit', type=int, default=20, help='Лимит')
    p.add_argument('-o', '--order', default='', help='ORDER BY')

    # db-update
    p = subparsers.add_parser('db-update', help='Обновить строки')
    p.add_argument('-t', '--table', required=True, help='Имя таблицы')
    p.add_argument('-s', '--set', required=True, help='SET выра')
    p.add_argument('-w', '--where', default='', help='WHERE условие')

    # db-delete
    p = subparsers.add_parser('db-delete', help='Удалить строки')
    p.add_argument('-t', '--table', required=True, help='Имя таблицы')
    p.add_argument('-w', '--where', required=True, help='WHERE условие')

    # db-insert
    p = subparsers.add_parser('db-insert', help='Вставить строку')
    p.add_argument('-t', '--table', required=True, help='Имя таблицы')
    p.add_argument('-c', '--columns', required=True, help='Колонки')
    p.add_argument('-v', '--values', required=True, help='Значения')

    # create-admin
    p = subparsers.add_parser('create-admin', help='Создать администратора')
    p.add_argument('--name', required=True)
    p.add_argument('--email', required=True)
    p.add_argument('--password', required=True)

    args = parser.parse_args()

    if not args.command:
        parser.print_help()
        sys.exit(1)

    commands = {
        'init-db': cmd_init_db,
        'drop-db': cmd_drop_db,
        'update-db': cmd_update_db,
        'db-tables': cmd_db_tables,
        'db-info': cmd_db_info,
        'db-schema': cmd_db_schema,
        'db-count': cmd_db_count,
        'db-query': cmd_db_query,
        'db-get': cmd_db_get,
        'db-update': cmd_db_update,
        'db-delete': cmd_db_delete,
        'db-insert': cmd_db_insert,
        'create-test-user': cmd_create_test_user,
        'create-admin': cmd_create_admin,
        'clean-sessions': cmd_clean_sessions,
    }

    cmd_func = commands.get(args.command)
    if cmd_func:
        cmd_func(args)
    else:
        print(f"❌ Неизвестная команда: {args.command}")
        parser.print_help()
        sys.exit(1)


if __name__ == "__main__":
    main()
