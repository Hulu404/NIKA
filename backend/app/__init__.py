# app/__init__.py
import os
from datetime import timedelta
from pathlib import Path
from flask import Flask
from flask_login import LoginManager
from flask_jwt_extended import JWTManager
from app.config import get_config

# Импортируем расширения и модели (только расширения на уровне модуля)
from app.extensions import db


# Создаём экземпляры расширений на уровне модуля (не глобальные переменные)
login_manager = LoginManager()
jwt = JWTManager()


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

    # Настройки сессий (если используете flask-session или flask-login)
    app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=31)
    app.config['SESSION_PERMANENT'] = True
    app.config['SESSION_COOKIE_NAME'] = 'nika_session'
    app.config['SESSION_COOKIE_SECURE'] = False          # True в продакшене (HTTPS)
    app.config['SESSION_COOKIE_HTTPONLY'] = True
    app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'

    # Проверяем наличие URI для БД
    if not app.config.get("SQLALCHEMY_DATABASE_URI"):
        raise RuntimeError("SQLALCHEMY_DATABASE_URI не задан в конфигурации!")

    # 2. Создаём необходимые директории
    Path(app.instance_path).mkdir(parents=True, exist_ok=True)
    print(f"📁 Папка instance: {app.instance_path}")

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

    
    # 4. Настройка flask-login
    login_manager.login_view = 'auth.login'               # ← исправлено: blueprint.auth + endpoint login
    login_manager.login_message = 'Пожалуйста, войдите для доступа к этой странице'
    login_manager.login_message_category = 'info'
    login_manager.init_app(app)

    # User loader для flask-login
    @login_manager.user_loader
    def load_user(user_id):
        from app.models.user import User  # импорт внутри функции — безопасно
        return db.session.get(User, int(user_id))

    # Защита отозванных JWT (если используете refresh-токены в БД)
    @jwt.token_in_blocklist_loader
    def check_if_token_revoked(jwt_header, jwt_payload):
        from app.models.refresh_token import RefreshToken
        jti = jwt_payload["jti"]
        token_type = jwt_payload["type"]
        if token_type == "refresh":
            token = RefreshToken.query.filter_by(jti=jti).first()
            return token is None or token.revoked
        return False

    # 5. Регистрация blueprint'ов (добавляйте свои)
    from .views.main import main_bp
    from .api.v1.chat import chat_v1
    from .api.v1.auth import auth_bp  # предполагаем, что у вас есть auth blueprint

    app.register_blueprint(main_bp)
    app.register_blueprint(chat_v1, url_prefix="/api/v1")
    app.register_blueprint(auth_bp, url_prefix="/api/v1")

    # 6. CLI-команда для создания тестового пользователя (лучше, чем глобальный код)
    @app.cli.command("create-test-user")
    def create_test_user():
        from app.models.user import User
        from app.extensions import db

        if User.query.count() == 0:
            print("👤 Создаю тестового пользователя...")
            admin = User(
                name="Admin",
                surname="User",
                email="admin@example.com",
                sex="male",
                sport_type="testing"
            )
            admin.set_password("admin123")  # ← меняйте в продакшене!
            db.session.add(admin)
            db.session.commit()
            print("✅ Тестовый пользователь создан (email: admin@example.com, пароль: admin123)")
        else:
            print(f"👤 В базе уже есть {User.query.count()} пользователей")

    # 7. Shell context (для flask shell)
    @app.shell_context_processor
    def make_shell_context():
        from app.models.user import User
        from app.models.chat import Message  # если есть
        from app.models.refresh_token import RefreshToken  # если есть

        return {
            'db': db,
            'User': User,
            'Message': Message if 'Message' in globals() else None,
            'RefreshToken': RefreshToken if 'RefreshToken' in globals() else None,
            'app': app
        }

    print("=" * 60)
    print(f"🚀 Приложение запущено в режиме: {config_name.upper()}")
    print(f"🗄️  База данных: {app.config['SQLALCHEMY_DATABASE_URI']}")
    print(f"🎵 Аудио-кэш: {app.config.get('AUDIO_CACHE_DIR')}")
    print("CLI команды: flask create-test-user, flask shell")
    print("=" * 60)

    return app