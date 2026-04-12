# app/__init__.py
import os
from datetime import timedelta
from pathlib import Path
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
    # (пропускаем при миграциях — переменная SKIP_SCHEDULER ставится в migrations/env.py)
    if not os.environ.get('SKIP_SCHEDULER'):
        from .services.billing_scheduler import init_scheduler
        init_scheduler(app)

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

        return {
            'db': db,
            'User': User,
            'Message': Message,
            'RefreshToken': RefreshToken,
            'FoodEntry': FoodEntry,
            'app': app
        }

    @app.cli.command("update-db")
    def update_db():
        """Создаёт отсутствующие таблицы (без потери данных)"""
        with app.app_context():
            db.create_all()
            print("✅ Таблицы обновлены")

    @app.post("/test-post")
    def test_post():
        return jsonify({"success": True, "message": "POST работает"})

    print("=" * 60)
    print(f"🚀 Приложение запущено в режиме: {config_name.upper()}")
    print(f"🗄️  База данных: {app.config['SQLALCHEMY_DATABASE_URI']}")
    print(f"📁 Сессии: {app.config.get('SESSION_FILE_DIR')}")
    print(f"🎵 Аудио-кэш: {app.config.get('AUDIO_CACHE_DIR')}")
    print("CLI команды: flask create-test-user, flask clean-sessions, flask shell")
    print("=" * 60)

    return app
