from flask import Flask
from flask_login import LoginManager
from config import get_config
from pathlib import Path
import os
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager

# Импортируем расширения
from .extensions import db

def create_app(config_name=None):
    load_dotenv()  # если используешь .env

    app = Flask(__name__,
                instance_relative_config=False,
                static_folder="../static",
                template_folder="templates")

    # 1. Загружаем конфигурацию (это должно быть в самом начале)
    config_name = config_name or os.environ.get("FLASK_CONFIG", "development")
    app.config.from_object(get_config(config_name))

    # конфигурация
    if config_name is None:
        config_name = os.environ.get("FLASK_CONFIG", "development")
    config_obj = get_config(config_name)
    app.config.from_object(config_obj)

    # Проверяем, что URI загрузился
    if not app.config.get("SQLALCHEMY_DATABASE_URI"):
        raise RuntimeError("SQLALCHEMY_DATABASE_URI не задан в конфигурации!")

    app.config.from_object(get_config(config_name))

    # Инициализация LoginManager ДО JWTManager
    login_manager = LoginManager()
    login_manager.init_app(app)

    # Инициализация JWT после загрузки конфига
    jwt = JWTManager(app)

    # Защита от отозванных токенов (опционально, но рекомендуется)
    @jwt.token_in_blocklist_loader
    def check_if_token_revoked(jwt_header, jwt_payload):
        jti = jwt_payload["jti"]
        token_type = jwt_payload["type"]
        if token_type == "refresh":
            from app.models.refresh_token import RefreshToken
            token = RefreshToken.query.filter_by(jti=jti).first()
            return token is None or token.revoked
        return False

    # инициализируем расширения
    db.init_app(app)

    # Функция загрузки пользователя для Flask-Login
    @login_manager.user_loader
    def load_user(user_id):
        '''
        Вызываетсия с каждым запросом к серверу, загружает пользователя из идентификатора пользователя в куки сессии.
        Flask-Login делает загруженного пользователя доступным с помощью прокси current_user. Для использования current_user его нужно импортировать из пакета flask_login. Он ведет себя как глобальная переменная и доступен как в функциях представления, так и в шаблонах. В любой момент времени current_user ссылается либо на вошедшего в систему, либо на анонимного пользователя. Различать их можно с помощью атрибута is_authenticated прокси current_user. Для анонимных пользователей is_authenticated вернет False. В противном случае — True
        '''
        from app.models.users import User  # Импортируем здесь, чтобы избежать циклических импортов
        return db.session.get(User, int(user_id))

    # 2. Теперь конфиг доступен → можно безопасно обращаться
    audio_cache_dir = app.config.get("AUDIO_CACHE_DIR")


    if audio_cache_dir is None:
        # fallback-значение, если в конфиге забыли указать
        audio_cache_dir = Path("app/static/audio_cache")
        print("ВНИМАНИЕ: AUDIO_CACHE_DIR не задан в конфиге → используется значение по умолчанию")



    # 3. Создаём директорию (Path умеет работать и со строкой, и с Path)
    Path(audio_cache_dir).mkdir(parents=True, exist_ok=True)

    # Создаём директорию instance, если нет
    Path(app.instance_path).mkdir(parents=True, exist_ok=True)
    Path(app.config["AUDIO_CACHE_DIR"]).mkdir(parents=True, exist_ok=True)

    # Регистрация blueprint'ов (твои существующие)
    from .views.main import main_bp
    from .api.v1.chat import chat_v1
    from .api.audio import audio_bp

    app.register_blueprint(main_bp)
    app.register_blueprint(chat_v1, url_prefix="/api/v1")
    app.register_blueprint(audio_bp, url_prefix="/api")

    # Для удобства в shell
    @app.shell_context_processor
    def make_shell_context():
        from app.models import Message, __all__
        return {
            'db': db,
            **{name: globals()[name] for name in __all__},
            'Message': Message,
        }

    print(f"Приложение запущено в режиме {config_name.upper()}")
    print(f"База данных: {app.config['SQLALCHEMY_DATABASE_URI']}")
    print(f"Папка аудио: {app.config["AUDIO_CACHE_DIR"]}")

    return app