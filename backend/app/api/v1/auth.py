# app/api/v1/auth.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt_identity,
    get_jwt, decode_token,
)
from datetime import datetime, timedelta
from ...extensions import db
from ...models.user import User
from ...models.refresh_token import RefreshToken
from flask import current_app  # для логирования

auth_bp = Blueprint("auth", __name__, url_prefix="/api/v1/auth")

@jwt_required()
@auth_bp.post("/register")
def register():
    """Регистрация нового пользователя + сразу выдача токенов"""
    data = request.get_json() or {}

    name = data.get("name", "").strip()
    last_name = data.get("last_name", "").strip()
    email = data.get("email", "").strip()
    password = data.get("password", "")

    # Только email и password обязательны
    if not all([email, password]):
        return jsonify({"success": False, "error": "Обязательны: email, password"}), 400

    # name и last_name — необязательные
    if name and len(name) < 1:
        return jsonify({"success": False, "error": "Имя слишком короткое"}), 400

    if last_name and len(last_name) < 2:
        return jsonify({"success": False, "error": "Фамилия слишком короткая"}), 400

    # gender и sport — необязательные
    gender = data.get("gender", None)
    sport = data.get("sport_type", None)



    # Проверка длины
    if len(name) < 2:
        return jsonify({"success": False, "error": "Имя слишком короткое (минимум 2 символа)"}), 400
    if len(last_name) < 2:
        return jsonify({"success": False, "error": "Фамилия слишком короткая (минимум 2 символа)"}), 400
    if "@" not in email:
        return jsonify({"success": False, "error": "Некорректный email"}), 400
    if len(password) < 6:
        return jsonify({"success": False, "error": "Пароль должен быть минимум 6 символов"}), 400

    # Проверка уникальности email
    if User.query.filter_by(email=email).first():
        return jsonify({"success": False, "error": "Email уже зарегистрирован"}), 409

    # Создаём пользователя
    user = User(
        name=name,
        last_name=last_name,
        email=email,
        gender=gender,
        sport_type=sport
    )
    user.set_password(password)

    try:
        db.session.add(user)
        db.session.commit()

        # Генерируем токены сразу после регистрации
        access_token = create_access_token(identity=str(user.id), fresh=True)
        refresh_token = create_refresh_token(identity=str(user.id))

        decoded = decode_token(refresh_token)
        jti = decoded['jti']

        token = RefreshToken(
            jti=jti,
            user_id=user.id,
            token=refresh_token,
            expires_at=datetime.utcnow() + timedelta(days=30)
        )
        db.session.add(token)
        db.session.commit()

        return jsonify({
            "success": True,
            "message": "Регистрация успешна",
            "access_token": access_token,
            "refresh_token": refresh_token,
            "user": {
                "id": user.id,
                "name": user.name,
                "last_name": user.last_name,
                "email": user.email
            }
        }), 201

    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Ошибка регистрации: {str(e)}")
        return jsonify({"success": False, "error": "Ошибка сервера при регистрации"}), 500


@auth_bp.post("/login")
def login():
    """Вход пользователя — получение access и refresh токенов"""
    print("📥 Тело запроса (сырое):", request.get_data(as_text=True))

    data = request.get_json() or {}
    email = data.get("email")
    password = data.get("password")

    if not all([email, password]):
        return jsonify({"success": False, "error": "Email и пароль обязательны"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"success": False, "error": "Неверный email или пароль"}), 401

    # Преобразуем user.id в строку
    access_token = create_access_token(identity=str(user.id), fresh=True)
    refresh_token = create_refresh_token(identity=str(user.id))

    decoded = decode_token(refresh_token)
    jti = decoded['jti']

    token = RefreshToken(
        jti=jti,
        user_id=user.id,
        token=refresh_token,
        expires_at=datetime.utcnow() + timedelta(days=30)
    )
    db.session.add(token)
    db.session.commit()

    return jsonify({
        "success": True,
        "access_token": access_token,
        "refresh_token": refresh_token,
        "user": {
            "id": user.id,
            "name": user.name,
            "last_name": user.last_name,
            "email": user.email
        }
    })


@auth_bp.post("/refresh")
@jwt_required(refresh=True)
def refresh():
    """Обновление access-токена по refresh-токену"""
    user_id = get_jwt_identity()

    jti = get_jwt()["jti"]
    token = RefreshToken.query.filter_by(jti=jti).first()

    if not token or token.revoked or token.expires_at < datetime.utcnow():
        return jsonify({"success": False, "error": "Refresh-токен недействителен или истёк"}), 401

    new_access = create_access_token(identity=user_id)
    return jsonify({"success": True, "access_token": new_access})


@auth_bp.post("/logout")
@jwt_required(refresh=True)
def logout():
    """Выход — отзыв refresh-токена"""
    jti = get_jwt()["jti"]
    token = RefreshToken.query.filter_by(jti=jti).first()

    if token:
        token.revoked = True
        db.session.commit()

    return jsonify({"success": True, "message": "Выход выполнен"})


@auth_bp.get("/profile")
@jwt_required()
def profile():
    """Профиль пользователя (защищённый маршрут)"""
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"success": False, "error": "Пользователь не найден"}), 404

    return jsonify({
        "success": True,
        "user": {
            "id": user.id,
            "name": user.name,
            "last_name": user.last_name,
            "email": user.email,
            "created_at": user.created_at.isoformat() if hasattr(user, 'created_at') else None
        }
    })