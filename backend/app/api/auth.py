# app/api/auth.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity, get_jwt, set_access_cookies, set_refresh_cookies, unset_jwt_cookies
from app.extensions import db
from app.models.user import User
from app.models.refresh_token import RefreshToken
from datetime import timedelta, datetime
import uuid

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or not all(k in data for k in ('last_name', 'first_name', 'phone', 'password')):
        return jsonify({"error": "Недостаточно данных"}), 400

    if User.query.filter_by(phone=data['phone']).first():
        return jsonify({"error": "Пользователь с таким номером уже существует"}), 400

    user = User(
        last_name=data['last_name'],
        first_name=data['first_name'],
        middle_name=data.get('middle_name'),
        phone=data['phone'],
        gender=data.get('gender'),
        telegram=data.get('telegram')
    )
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "Пользователь зарегистрирован", "user_id": user.id}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not 'phone' in data or not 'password' in data:
        return jsonify({"error": "Недостаточно данных"}), 400

    user = User.query.filter_by(phone=data['phone']).first()
    if not user or not user.check_password(data['password']):
        return jsonify({"error": "Неверный номер или пароль"}), 401

    access_token = create_access_token(identity=user.id, expires_delta=timedelta(minutes=15))
    refresh_token = create_refresh_token(identity=user.id, expires_delta=timedelta(days=30))

    # Сохраняем refresh token в БД
    rt = RefreshToken(
        jti=uuid.uuid4().hex,
        user_id=user.id,
        token=refresh_token,
        expires_at=datetime.utcnow() + timedelta(days=30)
    )
    db.session.add(rt)
    db.session.commit()

    response = jsonify({"message": "Успешный вход", "user_id": user.id})
    set_access_cookies(response, access_token)
    set_refresh_cookies(response, refresh_token)
    return response, 200

@auth_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    current_user = get_jwt_identity()
    access_token = create_access_token(identity=current_user, expires_delta=timedelta(minutes=15))
    return jsonify({"access_token": access_token}), 200

@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    jti = get_jwt()['jti']
    rt = RefreshToken.query.filter_by(jti=jti).first()
    if rt:
        rt.revoked = True
        db.session.commit()

    response = jsonify({"message": "Успешный выход"})
    unset_jwt_cookies(response)
    return response, 200