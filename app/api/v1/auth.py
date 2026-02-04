# app/api/v1/auth.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt_identity,
    get_jwt,
    jwt_refresh_token_required
)
from datetime import datetime, timedelta
from app.extensions import db
from app.models.user import User
from app.models.refresh_token import RefreshToken

auth_bp = Blueprint("auth", __name__, url_prefix="/api/v1/auth")


@auth_bp.post("/register")
def register():
    """Регистрация нового пользователя"""
    data = request.get_json() or {}

    username = data.get("username", "").strip()
    email = data.get("email", "").strip()
    password = data.get("password", "")

    if not all([username, email, password]):
        return jsonify({"success": False, "error": "Все поля обязательны"}), 400

    if len(username) < 3:
        return jsonify({"success": False, "error": "Имя пользователя слишком короткое (минимум 3 символа)"}), 400
    if "@" not in email:
        return jsonify({"success": False, "error": "Некорректный email"}), 400
    if len(password) < 6:
        return jsonify({"success": False, "error": "Пароль должен быть минимум 6 символов"}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({"success": False, "error": "Имя пользователя уже занято"}), 409

    if User.query.filter_by(email=email).first():
        return jsonify({"success": False, "error": "Email уже зарегистрирован"}), 409

    user = User(username=username, email=email)
    user.set_password(password)

    try:
        db.session.add(user)
        db.session.commit()
        return jsonify({
            "success": True,
            "message": "Регистрация успешна",
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email
            }
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "error": "Ошибка при сохранении пользователя"}), 500


@auth_bp.post("/login")
def login():
    """Вход пользователя — получение access и refresh токенов"""
    data = request.get_json() or {}
    email = data.get("email")
    password = data.get("password")

    if not all([email, password]):
        return jsonify({"success": False, "error": "Email и пароль обязательны"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"success": False, "error": "Неверный email или пароль"}), 401

    # Access token — короткий
    access_token = create_access_token(
        identity=user.id,
        fresh=True
    )

    # Refresh token — длинный
    refresh_token = create_refresh_token(identity=user.id)

    # Сохраняем refresh в БД
    jti = get_jwt()["jti"] if get_jwt() else refresh_token.split(".")[-1]  # fallback
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
            "username": user.username,
            "email": user.email
        }
    })


@auth_bp.post("/refresh")
@jwt_refresh_token_required
def refresh():
    """Обновление access-токена по refresh-токену"""
    user_id = get_jwt_identity()

    # Проверяем, что refresh не отозван
    jti = get_jwt()["jti"]
    token = RefreshToken.query.filter_by(jti=jti).first()

    if not token or token.revoked or token.expires_at < datetime.utcnow():
        return jsonify({"success": False, "error": "Refresh-токен недействителен или истёк"}), 401

    new_access = create_access_token(identity=user_id)
    return jsonify({"success": True, "access_token": new_access})


@auth_bp.post("/logout")
@jwt_refresh_token_required
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
    """Пример защищённого маршрута — профиль текущего пользователя"""
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"success": False, "error": "Пользователь не найден"}), 404

    return jsonify({
        "success": True,
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "created_at": user.created_at.isoformat()
        }
    })