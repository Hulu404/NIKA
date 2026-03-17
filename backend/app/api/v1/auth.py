# app/api/v1/auth.py
from datetime import datetime, timedelta, timezone

from flask import Blueprint, request, current_app
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt_identity,
    get_jwt,
    decode_token,
)

from ...extensions import db
from ...models.user import User
from ...models.refresh_token import RefreshToken
from ...utils.responses import success_response, error_response

auth_bp = Blueprint("auth", __name__, url_prefix="/api/v1/auth")


@auth_bp.post("/register")
def register():
    """Регистрация нового пользователя
    ---
    tags:
      - Auth
    summary: Регистрация нового пользователя
    parameters:
      - in: body
        name: body
        required: true
        schema:
          type: object
          required: [name, last_name, email, password, gender]
          properties:
            name:
              type: string
              example: "Иван"
            last_name:
              type: string
              example: "Иванов"
            email:
              type: string
              example: "ivan@example.com"
            password:
              type: string
              example: "securepassword123"
            gender:
              type: string
              enum: [male, female]
              example: "male"
    responses:
      201:
        description: Пользователь зарегистрирован
      400:
        description: Ошибка валидации
      409:
        description: Email уже занят
    """
    data: dict = request.get_json() or {}

    name: str = data.get("name", "").strip()
    last_name: str = data.get("last_name", "").strip()
    email: str = data.get("email", "").strip()
    password: str = data.get("password", "")
    gender: str = data.get("gender", "").strip().lower()

    # Валидация обязательных полей
    if not all([name, last_name, email, password, gender]):
        return error_response("Все поля обязательны: name, last_name, email, password, gender", 400)

    if len(name) < 2:
        return error_response("Имя слишком короткое (минимум 2 символа)", 400)

    if len(last_name) < 2:
        return error_response("Фамилия слишком короткая (минимум 2 символа)", 400)

    if "@" not in email:
        return error_response("Некорректный email", 400)

    if len(password) < 6:
        return error_response("Пароль должен быть минимум 6 символов", 400)

    if gender not in ("male", "female"):
        return error_response("Допустимые значения gender: male, female", 400)

    # Проверка уникальности email
    if User.query.filter_by(email=email).first():
        return error_response("Email уже зарегистрирован", 409)

    # Создаём пользователя
    user = User(
        name=name,
        last_name=last_name,
        email=email,
        gender=gender,
    )
    user.set_password(password)

    try:
        db.session.add(user)
        db.session.commit()

        # Генерируем токены сразу после регистрации
        access_token: str = create_access_token(identity=str(user.id), fresh=True)
        refresh_token: str = create_refresh_token(identity=str(user.id))

        decoded: dict = decode_token(refresh_token)
        jti: str = decoded["jti"]

        token = RefreshToken(
            jti=jti,
            user_id=user.id,
            token=refresh_token,
            expires_at=datetime.now(timezone.utc) + timedelta(days=30),
        )
        db.session.add(token)
        db.session.commit()

        return success_response(
            data={
                "user_id": user.id,
                "access_token": access_token,
                "refresh_token": refresh_token,
            },
            message="Регистрация успешна",
            status_code=201,
        )

    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Ошибка регистрации: {e}")
        return error_response("Ошибка сервера при регистрации", 500)


@auth_bp.post("/login")
def login():
    """Вход пользователя
    ---
    tags:
      - Auth
    summary: Вход пользователя — получение access и refresh токенов
    parameters:
      - in: body
        name: body
        required: true
        schema:
          type: object
          required: [email, password]
          properties:
            email:
              type: string
              example: "ivan@example.com"
            password:
              type: string
              example: "securepassword123"
    responses:
      200:
        description: Успешный вход
      401:
        description: Неверные данные
    """
    data: dict = request.get_json() or {}
    email: str | None = data.get("email")
    password: str | None = data.get("password")

    if not all([email, password]):
        return error_response("Email и пароль обязательны", 400)

    user: User | None = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return error_response("Неверный email или пароль", 401)

    access_token: str = create_access_token(identity=str(user.id), fresh=True)
    refresh_token: str = create_refresh_token(identity=str(user.id))

    decoded: dict = decode_token(refresh_token)
    jti: str = decoded["jti"]

    token = RefreshToken(
        jti=jti,
        user_id=user.id,
        token=refresh_token,
        expires_at=datetime.now(timezone.utc) + timedelta(days=30),
    )
    db.session.add(token)
    db.session.commit()

    return success_response(
        data={
            "access_token": access_token,
            "refresh_token": refresh_token,
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
            },
        }
    )


@auth_bp.post("/refresh")
@jwt_required(refresh=True)
def refresh():
    """Обновление access-токена
    ---
    tags:
      - Auth
    summary: Обновление access-токена по refresh-токену
    security:
      - Bearer: []
    responses:
      200:
        description: Новый access-токен
      401:
        description: Refresh-токен недействителен
    """
    user_id: str = get_jwt_identity()

    jti: str = get_jwt()["jti"]
    token: RefreshToken | None = RefreshToken.query.filter_by(jti=jti).first()

    if not token or token.revoked or token.expires_at < datetime.now(timezone.utc):
        return error_response("Refresh-токен недействителен или истёк", 401)

    new_access: str = create_access_token(identity=user_id)
    return success_response(data={"access_token": new_access})


@auth_bp.post("/logout")
@jwt_required(refresh=True)
def logout():
    """Выход пользователя
    ---
    tags:
      - Auth
    summary: Выход — отзыв refresh-токена
    security:
      - Bearer: []
    responses:
      200:
        description: Выход выполнен
      401:
        description: Требуется авторизация
    """
    jti: str = get_jwt()["jti"]
    token: RefreshToken | None = RefreshToken.query.filter_by(jti=jti).first()

    if token:
        token.revoked = True
        db.session.commit()

    return success_response(message="Выход выполнен")


@auth_bp.get("/profile")
@jwt_required()
def profile():
    """Профиль текущего пользователя
    ---
    tags:
      - Auth
    summary: Получение профиля текущего пользователя
    security:
      - Bearer: []
    responses:
      200:
        description: Данные профиля
      401:
        description: Требуется авторизация
    """
    user_id: str = get_jwt_identity()
    user: User | None = db.session.get(User, int(user_id))

    if not user:
        return error_response("Пользователь не найден", 404)

    # Время сброса лимита — следующая полночь UTC
    tomorrow = datetime.now(timezone.utc) + timedelta(days=1)
    requests_reset_at: str = tomorrow.replace(
        hour=0, minute=0, second=0, microsecond=0
    ).isoformat()

    return success_response(
        data={
            "id": user.id,
            "name": user.name,
            "last_name": user.last_name,
            "email": user.email,
            "gender": user.gender,
            "requests_left": user.get_remaining_requests(),
            "requests_reset_at": requests_reset_at,
        }
    )
