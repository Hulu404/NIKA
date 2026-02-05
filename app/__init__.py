import os
from datetime import timedelta
from pathlib import Path
from flask import Flask
from flask_login import LoginManager
from flask_jwt_extended import JWTManager
from config import get_config
# Импортируем расширения
from .extensions import db


def create_app(config_name=None):


    app = Flask(__name__,
                instance_relative_config=False,
                static_folder="../static",
                template_folder="templates")

    # 1. Загружаем конфигурацию (это должно быть в самом начале)
    config_name = config_name or os.environ.get("FLASK_CONFIG", "development")
    app.config.from_object(get_config(config_name))

    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY') or 'your-secret-key-here'

    # Настройки сессий
    PERMANENT_SESSION_LIFETIME = timedelta(days=31)  # Время жизни сессия
    SESSION_PERMANENT = True  # Делаем все сессии постоянными по умолчанию
    SESSION_COOKIE_NAME = 'nika_session'
    SESSION_COOKIE_SECURE = False  # True для HTTPS в продакшене
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'Lax'

    # Проверяем, что URI загрузился
    if not app.config.get("SQLALCHEMY_DATABASE_URI"):
        raise RuntimeError("SQLALCHEMY_DATABASE_URI не задан в конфигурации!")

    # 2. Создаем папки для базы данных если используется SQLite
    db_uri = app.config['SQLALCHEMY_DATABASE_URI']

    if db_uri.startswith('sqlite:///'):
        # Извлекаем путь к файлу из URI
        db_path_str = db_uri.replace('sqlite:///', '')
        db_path = Path(db_path_str)
        print(db_path)

        # Создаем директорию если ее нет
        if db_path.parent:
            db_path.parent.mkdir(parents=True, exist_ok=True)
            print(f"📁 Создана/проверена директория для БД: {db_path.parent}")

        # Проверяем существование файла БД
        if db_path.exists():
            size = db_path.stat().st_size
            print(f"📄 Файл базы данных существует ({size} байт): {db_path}")
        else:
            print(f"📄 Файл базы данных будет создан: {db_path}")

    # Инициализация LoginManager ДО JWTManager
    login_manager = LoginManager()
    login_manager.init_app(app)
    login_manager.login_view = 'main.login'
    login_manager.login_message = 'Пожалуйста, войдите для доступа к этой странице'
    login_manager.login_message_category = 'info'

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

    # 3. Инициализируем расширения
    db.init_app(app)

    # 4. Функция загрузки пользователя для Flask-Login
    @login_manager.user_loader
    def load_user(user_id):
        '''
        Вызывается с каждым запросом к серверу, загружает пользователя из идентификатора пользователя в куки сессии.
        Flask-Login делает загруженного пользователя доступным с помощью прокси current_user.
        '''
        from app.models.user import User
        return db.session.get(User, int(user_id))

    # 5. Создаём необходимые директории при запуске приложения
    with app.app_context():
        # Создаем директорию instance, если нет
        Path(app.instance_path).mkdir(parents=True, exist_ok=True)
        print(f"📁 Папка instance: {app.instance_path}")

        # Создаем папку для аудио кэша
        audio_cache_dir = app.config.get("AUDIO_CACHE_DIR")
        if audio_cache_dir is None:
            # fallback-значение, если в конфиге забыли указать
            audio_cache_dir = Path("app/static/audio_cache")
            app.config["AUDIO_CACHE_DIR"] = str(audio_cache_dir)
            print("⚠️  ВНИМАНИЕ: AUDIO_CACHE_DIR не задан в конфиге → используется значение по умолчанию")

        # Создаём директорию для аудио кэша
        Path(audio_cache_dir).mkdir(parents=True, exist_ok=True)
        print(f"📁 Папка аудио-кэша: {audio_cache_dir}")

        # 6. ИМПОРТИРУЕМ МОДЕЛИ ДО СОЗДАНИЯ ТАБЛИЦ
        # Это важно! Модели должны быть импортированы, чтобы SQLAlchemy знал о них
        try:
            print("🔍 Импортирую модели для создания таблиц...")

            # Импортируем все модели, которые должны быть в базе данных
            from app.models.user import User
            print(f"   ✅ Импортирована модель: User (таблица: {User.__tablename__})")

            from app.models.chat import Message
            print(f"   ✅ Импортирована модель: Message (таблица: {Message.__tablename__})")

            from app.models.refresh_token import RefreshToken
            print(f"   ✅ Импортирована модель: RefreshToken (таблица: {RefreshToken.__tablename__})")

        except ImportError as e:
            print(f"❌ Ошибка импорта модели: {e}")
            print("💡 Убедитесь, что файлы моделей существуют в app/models/")
            # Продолжаем работу, возможно, таблицы уже созданы

        # 7. ГАРАНТИРОВАННОЕ создание таблиц при запуске
        print("🔄 Создание таблиц в базе данных...")

        try:
            # Создаем все таблицы
            db.create_all()
            print("✅ Команда db.create_all() выполнена")

        except Exception as e:
            print(f"❌ Ошибка при создании таблиц: {e}")
            # Не прекращаем работу приложения - возможно, таблицы уже существуют

    # 8. Регистрация blueprint'ов
    from .views.main import main_bp
    from .api.v1.chat import chat_v1
    from .api.audio import audio_bp

    app.register_blueprint(main_bp)
    app.register_blueprint(chat_v1, url_prefix="/api/v1")
    app.register_blueprint(audio_bp, url_prefix="/api")

    # 9. CLI команды для управления БД
    @app.cli.command("init-db")
    def init_db_command():
        """Очистить существующие данные и создать новые таблицы."""
        print("🗑️  Очищаю базу данных...")

        # Импортируем модели для гарантии
        from app.models.user import User

        with app.app_context():
            db.drop_all()
            print("🔄 Создаю таблицы...")
            db.create_all()
            print("✅ База данных пересоздана!")

            # Создаем тестового пользователя
            if User.query.count() == 0:
                print("👤 Создаю тестового пользователя...")
                admin = User(
                    name="Admin",
                    surname="User",
                    email="admin@example.com",
                    sex="male",
                    sport_type="testing"
                )
                admin.set_password("1234")
                db.session.add(admin)
                db.session.commit()
                print("✅ Тестовый пользователь создан (email: admin@example.com, пароль: 1234)")
            else:
                print(f"👤 В базе уже есть {User.query.count()} пользователь(ей)")

    @app.cli.command("check-db")
    def check_db_command():
        """Проверить состояние базы данных."""
        with app.app_context():
            from sqlalchemy import inspect

            try:
                # Прямой запрос к SQLite для проверки таблиц
                connection = db.engine.connect()
                result = connection.execute("SELECT name FROM sqlite_master WHERE type='table';")
                tables = [row[0] for row in result]
                connection.close()

                print("=" * 50)
                print("Проверка состояния базы данных")
                print("=" * 50)

                if tables:
                    print(f"✅ Найдено таблиц: {len(tables)}")
                    for table in tables:
                        print(f"  - {table}")
                else:
                    print("❌ Таблицы не найдены!")

                # Показываем путь к файлу БД
                db_uri = app.config['SQLALCHEMY_DATABASE_URI']
                if db_uri.startswith('sqlite:///'):
                    db_path = db_uri.replace('sqlite:///', '')
                    print(f"📁 Путь к файлу БД: {db_path}")

                    if os.path.exists(db_path):
                        size = os.path.getsize(db_path)
                        print(f"📊 Размер файла: {size} байт")
                    else:
                        print("❌ Файл БД не существует!")

            except Exception as e:
                print(f"❌ Ошибка при проверке БД: {e}")

    # 10. Для удобства в shell
    @app.shell_context_processor
    def make_shell_context():
        from app.models.user import User

        context = {
            'db': db,
            'User': User,
            'app': app,
        }

        # Пробуем добавить другие модели если есть
        try:
            from app.models import Message
            context['Message'] = Message
        except ImportError:
            pass

        return context

    print("=" * 50)
    print(f"🚀 Приложение запущено в режиме {config_name.upper()}")
    print(f"🗄️  База данных: {app.config['SQLALCHEMY_DATABASE_URI']}")
    print(f"🎵 Папка аудио: {app.config['AUDIO_CACHE_DIR']}")
    print("=" * 50)

    return app

# Опциональная функция для создания начальных данных
# def create_initial_data():
#     """
#     Функция для создания начальных данных в базе.
#     Вызывается при инициализации БД или по команде.
#     """
#     from app.models.users import User
#     from app.extensions import db
#
#     # Проверяем, есть ли уже пользователи
#     if User.query.count() == 0:
#         print("👤 Создаю тестового пользователя...")
#
#         # Создаем тестового пользователя (измените данные по необходимости)
#         admin = User(
#             name="Admin",
#             surname="User",
#             email="admin@example.com",
#             sex="male",
#             sport_type="testing"
#         )
#         admin.set_password("admin123")  # Обязательно измените в продакшене!
#
#         db.session.add(admin)
#         db.session.commit()
#         print("✅ Тестовый пользователь создан!")
#     else:
#         print(f"👤 В базе уже есть {User.query.count()} пользователь(ей)")