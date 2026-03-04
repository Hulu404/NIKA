# app/__init__.py
import os
from datetime import timedelta
from pathlib import Path
from flask import Flask, jsonify
from flask_login import LoginManager
from flask_jwt_extended import JWTManager
from flask_session import Session
from .config import get_config

# Импортируем расширения и модели (только расширения на уровне модуля)
from .extensions import db

# Создаём экземпляры расширений на уровне модуля
login_manager = LoginManager()
jwt = JWTManager()
session = Session()


def create_app(config_name=None):
    app = Flask(__name__,
                instance_relative_config=False,
                static_folder="../static",
                template_folder="templates")

    # 1. Загружаем конфигурацию (самое первое!)
    config_name = config_name or os.environ.get("FLASK_CONFIG", "development")
    app.config.from_object(get_config(config_name))

    # Обязательные настройки (можно переопределить в .env)
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY') or 'your-secret-key-change-me'
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('SQLALCHEMY_DATABASE_URI') or 'sqlite:///' + str(Path(app.instance_path) / 'app.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY') or 'your-jwt-secret-key-change-me'
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
    from .views.main import main_bp
    from .api.v1.chat import chat_v1
    from .api.v1.auth import auth_bp
    from .api.v1.food import food_v1

    app.register_blueprint(food_v1)
    app.register_blueprint(main_bp)
    app.register_blueprint(chat_v1)
    app.register_blueprint(auth_bp)

    # 6. Импортируем модель FoodEntry перед созданием таблиц
    from .models.food_entry import FoodEntry

    # Создание таблиц базы данных (только для development)
    if app.config.get('ENV') == 'development' or app.debug:
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

        return {
            'db': db,
            'User': User,
            'Message': Message,
            'RefreshToken': RefreshToken,
            'FoodEntry': FoodEntry,
            'app': app
        }

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
