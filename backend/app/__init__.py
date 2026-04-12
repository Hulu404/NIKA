# app/__init__.py
import os
from datetime import timedelta
from pathlib import Path
import click
from flask import Flask, jsonify, request
from flask_login import LoginManager
from flask_jwt_extended import JWTManager
from flask_session import Session
from flask_migrate import Migrate
from flasgger import Swagger
from .config import get_config
from dotenv import load_dotenv
from werkzeug.middleware.proxy_fix import ProxyFix

# Load .env from project root (parent of backend/)
_backend_dir = Path(__file__).resolve().parent.parent
_project_root = _backend_dir.parent
load_dotenv(_project_root / ".env")  # loads /Users/ila/Python/NIKA/.env
load_dotenv()  # also loads .env from current directory as fallback

# Импортируем расширения и модели (только расширения на уровне модуля)
from .extensions import db, mail

# Создаём экземпляры расширений на уровне модуля
login_manager = LoginManager()
jwt = JWTManager()
session = Session()
migrate = Migrate()


def create_app(config_name=None):
    app = Flask(__name__,
                instance_relative_config=False,
                static_folder="../static",
                template_folder="templates")

    # Временная отладка
    import logging
    logging.basicConfig(level=logging.DEBUG)

    @app.before_request
    def log_request():
        app.logger.debug(f"Request: {request.method} {request.path}")
        app.logger.debug(f"Headers: {dict(request.headers)}")
        app.logger.debug(f"Cookies: {request.cookies}")
        app.logger.debug(f"Data: {request.get_data(as_text=True)}")

    # 1. Загружаем конфигурацию (самое первое!)
    config_name = config_name or os.environ.get("FLASK_CONFIG", "development")
    app.config.from_object(get_config(config_name))

    app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1)

    # Обязательные настройки (можно переопределить в .env)
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY') or 'your-secret-key-change-me'
    # DATABASE_URI берётся из config.py (DevelopmentConfig/ProductionConfig),
    # но можно переопределить через DATABASE_URL в .env
    if os.environ.get('DATABASE_URL'):
        app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=15)
    app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)

    # Настройки сессий
    app.config['SESSION_TYPE'] = 'filesystem'
    app.config['SESSION_PERMANENT'] = True
    app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=31)
    app.config['SESSION_USE_SIGNER'] = True
    app.config['SESSION_KEY_PREFIX'] = 'nika:'
    app.config['SESSION_COOKIE_NAME'] = 'nika_session'
    app.config['SESSION_COOKIE_SECURE'] = False
    app.config['SESSION_COOKIE_HTTPONLY'] = True
    app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'

    # Директория для хранения файлов сессий
    session_dir = Path(app.instance_path) / 'flask_session'
    app.config['SESSION_FILE_DIR'] = str(session_dir)
    app.config['SESSION_FILE_THRESHOLD'] = 100
    app.config['SESSION_FILE_MODE'] = 0o600

    # Конфигурация email
    app.config['MAIL_SERVER'] = 'smtp.yandex.ru'  # или ваш SMTP-сервер
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USE_SSL'] = False
    app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME')
    app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD')
    app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('MAIL_DEFAULT_SENDER')
    app.config['MAIL_MAX_EMAILS'] = None
    app.config['MAIL_ASCII_ATTACHMENTS'] = False

    # Проверяем наличие URI для БД
    if not app.config.get("SQLALCHEMY_DATABASE_URI"):
        raise RuntimeError("SQLALCHEMY_DATABASE_URI не задан в конфигурации!")

    # 2. Создаём необходимые директории
    Path(app.instance_path).mkdir(parents=True, exist_ok=True)
    print(f"📁 Папка instance: {app.instance_path}")

    session_dir.mkdir(parents=True, exist_ok=True)
    print(f"📁 Папка сессий: {session_dir}")

    audio_cache_dir = app.config.get("AUDIO_CACHE_DIR")
    if audio_cache_dir is None:
        audio_cache_dir = Path("static/audio_cache")
        app.config["AUDIO_CACHE_DIR"] = str(audio_cache_dir)
        print("⚠️ AUDIO_CACHE_DIR не задан → используется default: static/audio_cache")

    Path(audio_cache_dir).mkdir(parents=True, exist_ok=True)
    print(f"📁 Папка аудио-кэша: {audio_cache_dir}")

    # 3. Инициализация расширений (ПОСЛЕ конфига!)
    db.init_app(app)
    mail.init_app(app)
    migrate.init_app(app, db)
    login_manager.init_app(app)
    jwt.init_app(app)
    session.init_app(app)

    # 4. Настройка flask-login
    login_manager.login_view = 'auth.login'
    login_manager.login_message = 'Пожалуйста, войдите для доступа к этой странице'
    login_manager.login_message_category = 'info'
    login_manager.init_app(app)

    # User loader для flask-login
    @login_manager.user_loader
    def load_user(user_id):
        from .models.user import User
        return db.session.get(User, int(user_id))

    # Защита отозванных JWT
    @jwt.token_in_blocklist_loader
    def check_if_token_revoked(jwt_header, jwt_payload):
        from .models.refresh_token import RefreshToken
        jti = jwt_payload["jti"]
        token_type = jwt_payload["type"]
        if token_type == "refresh":
            token = RefreshToken.query.filter_by(jti=jti).first()
            return token is None or token.revoked
        return False

    # 5. Регистрация blueprint'ов
    # from .views.main import main_bp
    from .api.v1.chat import chat_v1
    from .api.v1.auth import auth_bp
    from .api.v1.food import food_v1
    from .api.v1.emotion import emotion_v1
    from .api.v1.subscription import subscription_bp
    from .api.v1.admin_plans import admin_plans_bp
    from app.api.v1.feedback import feedback_bp

    app.register_blueprint(emotion_v1)
    app.register_blueprint(food_v1)
    # app.register_blueprint(main_bp)
    app.register_blueprint(chat_v1)
    app.register_blueprint(auth_bp, url_prefix='/api/v1/auth')
    app.register_blueprint(subscription_bp)
    app.register_blueprint(admin_plans_bp)
    app.register_blueprint(feedback_bp)

    # 5.1 Инициализация Swagger (после регистрации blueprints)
    swagger_config: dict = {
        "headers": [],
        "specs": [
            {
                "endpoint": "apispec",
                "route": "/api/apispec.json",
                "rule_filter": lambda rule: True,
                "model_filter": lambda tag: True,
            }
        ],
        "static_url_path": "/flasgger_static",
        "swagger_ui": True,
        "specs_route": "/api/docs",
    }

    swagger_template: dict = {
        "swagger": "2.0",
        "info": {
            "title": "NIKA API",
            "description": "REST API для проекта NIKA — AI-ассистент с чатом, трекером эмоций и питания",
            "version": "1.0.0",
        },
        "securityDefinitions": {
            "Bearer": {
                "type": "apiKey",
                "name": "Authorization",
                "in": "header",
                "description": "JWT токен. Формат: Bearer <token>",
            }
        },
        "basePath": "/",
        "schemes": ["http", "https"],
    }

    Swagger(app, config=swagger_config, template=swagger_template)

    # 5.2 Глобальные обработчики ошибок (единый JSON-формат)
    from .utils.responses import error_response

    @app.errorhandler(400)
    def bad_request(e):
        return error_response("Неверный запрос", 400)

    @app.errorhandler(401)
    def unauthorized(e):
        return error_response("Требуется авторизация", 401)

    @app.errorhandler(404)
    def not_found(e):
        return error_response("Ресурс не найден", 404)

    @app.errorhandler(422)
    def unprocessable(e):
        return error_response("Ошибка валидации данных", 422)

    @app.errorhandler(429)
    def rate_limited(e):
        return error_response("Превышен лимит запросов", 429)

    @app.errorhandler(500)
    def server_error(e):
        return error_response("Внутренняя ошибка сервера", 500)

    # 6. Импортируем модель FoodEntry перед созданием таблиц
    from .models.food_entry import FoodEntry
    from .models.emotion_entry import EmotionEntry
    from .models.subscription_plan import SubscriptionPlan
    from .models.subscription import Subscription
    from .models.payment import Payment
    from .models.user import User

    # 6.1 Запуск фонового планировщика списаний
    # Планировщик запускается ТОЛЬКО если таблицы БД уже существуют.
    # Это предотвращает ошибки при первом запуске и при CLI-командах (init-db, db migrate и т.д.)
    if not os.environ.get('SKIP_SCHEDULER'):
        _tables_exist = False
        try:
            with app.app_context():
                db.session.execute(db.text("SELECT 1 FROM users LIMIT 1"))
                _tables_exist = True
        except Exception:
            pass

        if _tables_exist:
            from .services.billing_scheduler import init_scheduler
            init_scheduler(app)
        else:
            print("⚠️ Таблицы БД ещё не созданы — планировщик отключен (запустите `flask init-db` или `flask db upgrade`)")

    # Создание таблиц базы данных (только для development, не при миграциях)
    if not os.environ.get('SKIP_SCHEDULER') and (app.config.get('ENV') == 'development' or app.debug):
        with app.app_context():
            db.create_all()
            print("✅ Таблицы созданы (режим разработки)")

    # 7. CLI-команды
    @app.cli.command("create-test-user")
    def create_test_user():
        from .models.user import User
        from .extensions import db

        if User.query.count() == 0:
            print("👤 Создаю тестового пользователя...")
            admin = User(
                name="Admin",
                surname="User",
                email="admin@example.com",
                sex="male",
                sport_type="testing"
            )
            admin.set_password("admin123")
            db.session.add(admin)
            db.session.commit()
            print("✅ Тестовый пользователь создан (email: admin@example.com, пароль: admin123)")
        else:
            print(f"👤 В базе уже есть {User.query.count()} пользователей")

    @app.cli.command("clean-sessions")
    def clean_sessions():
        """Очищает старые файлы сессий (старше 32 дней)"""
        import time
        from pathlib import Path

        session_dir = Path(app.config['SESSION_FILE_DIR'])
        if not session_dir.exists():
            print("📁 Директория сессий не найдена")
            return

        now = time.time()
        max_age = 32 * 24 * 60 * 60  # 32 дня в секундах

        deleted = 0
        for session_file in session_dir.glob('*'):
            if session_file.is_file():
                file_age = now - session_file.stat().st_mtime
                if file_age > max_age:
                    session_file.unlink()
                    deleted += 1

        print(f"🧹 Удалено старых сессий: {deleted}")

    # 8. Shell context
    @app.shell_context_processor
    def make_shell_context():
        from .models.user import User
        from .models.message import Message
        from .models.refresh_token import RefreshToken
        from .models.food_entry import FoodEntry
        from .models.emotion_entry import EmotionEntry
        from .models.subscription import Subscription
        from .models.subscription_plan import SubscriptionPlan
        from .models.payment import Payment
        from sqlalchemy import inspect

        return {
            'db': db,
            'User': User,
            'Message': Message,
            'RefreshToken': RefreshToken,
            'FoodEntry': FoodEntry,
            'EmotionEntry': EmotionEntry,
            'Subscription': Subscription,
            'SubscriptionPlan': SubscriptionPlan,
            'Payment': Payment,
            'inspect': inspect,
            'app': app,
        }

    # ═══════════════════════════════════════════════════
    # CLI КОМАНДЫ УПРАВЛЕНИЯ БАЗОЙ ДАННЫХ
    # ═══════════════════════════════════════════════════

    # --- Инициализация и миграции ---

    @app.cli.command("init-db")
    def init_db():
        """Создаёт ВСЕ таблицы по текущим моделям (первый запуск)

        Пример:
            flask init-db
        """
        with app.app_context():
            db.create_all()
            print("✅ База данных инициализирована")

    @app.cli.command("drop-db")
    def drop_db():
        """УДАЛЯЕТ все таблицы (опасно!)

        Пример:
            flask drop-db
        """
        with app.app_context():
            db.drop_all()
            print("⚠️  Все таблицы удалены")

    @app.cli.command("update-db")
    def update_db():
        """Создаёт отсутствующие таблицы (без потери данных)

        Пример:
            flask update-db
        """
        with app.app_context():
            db.create_all()
            print("✅ Таблицы обновлены")

    # --- Просмотр ---

    @app.cli.command("db-tables")
    def db_tables():
        """Показать все таблицы в БД

        Пример:
            flask db-tables
        """
        with app.app_context():
            from sqlalchemy import inspect as sa_inspect
            tables = sa_inspect(db.engine).get_table_names()
            print(f"\n📋 Таблицы в базе данных ({len(tables)}):")
            print("-" * 40)
            for t in sorted(tables):
                print(f"  • {t}")
            print()

    @app.cli.command("db-schema")
    @click.argument("table_name")
    def db_schema(table_name):
        """Показать структуру таблицы (колонки, типы)

        Пример:
            flask db-schema users
            flask db-schema messages
        """
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

    @app.cli.command("db-count")
    @click.argument("table_name")
    def db_count(table_name):
        """Показать количество строк в таблице

        Пример:
            flask db-count users
        """
        with app.app_context():
            result = db.session.execute(db.text(f"SELECT COUNT(*) FROM {table_name}"))
            count = result.scalar()
            print(f"📊 {table_name}: {count} строк")

    # --- Извлечение данных ---

    @app.cli.command("db-query")
    @click.argument("sql")
    def db_query(sql):
        """Выполнить произвольный SELECT-запрос

        Пример:
            flask db-query "SELECT id, email FROM users LIMIT 5"
            flask db-query "SELECT role, COUNT(*) FROM messages GROUP BY role"
        """
        with app.app_context():
            try:
                result = db.session.execute(db.text(sql))
                rows = result.fetchall()
                cols = result.keys()
                if not rows:
                    print("📭 Нет результатов")
                    return
                # Форматируем вывод
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

    @app.cli.command("db-get")
    @click.option("-t", "--table", required=True, help="Имя таблицы")
    @click.option("-w", "--where", default="", help="Условие WHERE (без слова WHERE)")
    @click.option("-l", "--limit", default=20, type=int, help="Лимит строк")
    @click.option("-o", "--order", default="", help="ORDER BY (без слова ORDER BY)")
    def db_get(table, where, limit, order):
        """Извлечь строки из таблицы с фильтрацией

        Примеры:
            flask db-get -t users -l 10
            flask db-get -t users -w "email LIKE '%@example.com'"
            flask db-get -t messages -w "role='assistant'" -l 5 -o "created_at DESC"
            flask db-get -t users -w "is_admin=1"
        """
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
                print(f"\n📊 {len(rows)} строк из '{table}'\n")
            except Exception as e:
                print(f"❌ Ошибка: {e}")

    # --- Изменение данных ---

    @app.cli.command("db-update")
    @click.option("-t", "--table", required=True, help="Имя таблицы")
    @click.option("-s", "--set", required=True, help="SET выра: column='value'")
    @click.option("-w", "--where", default="", help="Условие WHERE (без слова WHERE)")
    def db_update(table, set_clause, where):
        """Обновить строки в таблице

        Примеры:
            flask db-update -t users -s "is_admin=1" -w "email='admin@example.com'"
            flask db-update -t users -s "daily_requests_limit=10"
            flask db-update -t subscriptions -s "status='cancelled'" -w "user_id=1"
        """
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

    @app.cli.command("db-delete")
    @click.option("-t", "--table", required=True, help="Имя таблицы")
    @click.option("-w", "--where", required=True, help="Условие WHERE (без слова WHERE)")
    def db_delete(table, where):
        """Удалить строки из таблицы

        Примеры:
            flask db-delete -t users -w "email='test@test.com'"
            flask db-delete -t messages -w "session_id='abc-123'"
        """
        with app.app_context():
            query = f"DELETE FROM {table} WHERE {where}"
            try:
                result = db.session.execute(db.text(query))
                db.session.commit()
                print(f"✅ Удалено {result.rowcount} строк из '{table}'")
            except Exception as e:
                db.session.rollback()
                print(f"❌ Ошибка: {e}")

    @app.cli.command("db-insert")
    @click.option("-t", "--table", required=True, help="Имя таблицы")
    @click.option("-c", "--columns", required=True, help="Колонки через запятую")
    @click.option("-v", "--values", required=True, help="Значения через запятую")
    def db_insert(table, columns, values):
        """Вставить строку в таблицу

        Пример:
            flask db-insert -t users -c "name,email,gender" -v "'Test','test@test.com','male'"
        """
        with app.app_context():
            query = f"INSERT INTO {table} ({columns}) VALUES ({values})"
            try:
                db.session.execute(db.text(query))
                db.session.commit()
                print(f"✅ Вставлена строка в '{table}'")
            except Exception as e:
                db.session.rollback()
                print(f"❌ Ошибка: {e}")

    # --- Alembic миграции (обёртки) ---

    @app.cli.command("db-migrate")
    @click.option("-m", "--message", default="auto migration", help="Описание миграки")
    def db_migrate(message):
        """Создать миграцию из текущих моделей

        Пример:
            flask db-migrate -m "add new field to users"
        """
        from flask_migrate import migrate as fm
        print(f"📝 Создаю миграку: {message}")
        fm(directory="migrations", message=message)

    @app.cli.command("db-upgrade")
    def db_upgrade():
        """Применить все ожидающие миграции

        Пример:
            flask db-upgrade
        """
        from flask_migrate import upgrade as fm_upgrade
        print("⬆️  Применяю миграции...")
        fm_upgrade(directory="migrations")
        print("✅ Миграции применены")

    @app.cli.command("db-downgrade")
    @click.option("-r", "--revision", default="-1", help="Ревизия для отката (по умолч. -1)")
    def db_downgrade(revision):
        """Откатить миграцию

        Пример:
            flask db-downgrade           # откат на 1 шаг
            flask db-downgrade -r base   # откатить всё
        """
        from flask_migrate import downgrade as fm_downgrade
        print(f"⬇️  Откатываю к ревизии: {revision}")
        fm_downgrade(directory="migrations", revision=revision)
        print("✅ Миграция откаатена")

    @app.cli.command("db-current")
    def db_current():
        """Показать теку ревизию Alembic

        Пример:
            flask db-current
        """
        from flask_migrate import current as fm_current
        fm_current(directory="migrations")

    # --- Пользователи ---

    @app.cli.command("create-test-user")
    def create_test_user():
        """Создать тестового пользователя (если нет пользователей)"""
        from .models.user import User
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

    @app.cli.command("create-admin")
    @click.option("--name", required=True, help="Имя")
    @click.option("--email", required=True, help="Email")
    @click.option("--password", required=True, help="Пароль")
    def create_admin(name, email, password):
        """Создать пользователя-администратора

        Пример:
            flask create-admin --name "Ivan" --email "admin@example.com" --password "secret123"
        """
        from .models.user import User
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

    # --- Утилиты ---

    @app.cli.command("clean-sessions")
    def clean_sessions():
        """Очищает старые файлы сессий (старше 32 дней)"""
        import time
        from pathlib import Path
        session_dir = Path(app.config['SESSION_FILE_DIR'])
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

    @app.cli.command("db-info")
    def db_info():
        """Показать информацию о базе данных и таблицах

        Пример:
            flask db-info
        """
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

    @app.post("/test-post")
    def test_post():
        return jsonify({"success": True, "message": "POST работает"})

    print("=" * 60)
    print(f"🚀 Приложение запущено в режиме: {config_name.upper()}")
    print(f"🗄️  База данных: {app.config['SQLALCHEMY_DATABASE_URI']}")
    print(f"📁 Сессии: {app.config.get('SESSION_FILE_DIR')}")
    print(f"🎵 Аудио-кэш: {app.config.get('AUDIO_CACHE_DIR')}")
    print("📖 CLI: flask --help")
    print("=" * 60)

    return app
