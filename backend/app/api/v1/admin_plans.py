# app/api/v1/admin_plans.py
"""
Админские CRUD-эндпоинты для управления тарифами подписки.
"""
from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from ...extensions import db
from ...models.subscription_plan import SubscriptionPlan
from ...utils.responses import success_response, error_response

admin_plans_bp = Blueprint('admin_plans', __name__, url_prefix='/api/v1/admin/plans')


def _is_admin(user_id: int) -> bool:
    """Проверяет, является ли пользователь администратором."""
    from ...models.user import User
    user = db.session.get(User, user_id)
    if not user:
        return False
    return getattr(user, 'is_admin', False)


@admin_plans_bp.route('', methods=['GET'])
@jwt_required()
def list_plans():
    """
    Получить все тарифы (включая неактивные).
    ---
    tags:
      - Admin Plans
    security:
      - Bearer: []
    responses:
      200:
        description: Список тарифов
    """
    user_id = get_jwt_identity()
    if not _is_admin(user_id):
        return error_response('Доступ запрещён', 403)

    plans = SubscriptionPlan.query.order_by(SubscriptionPlan.created_at.desc()).all()
    return success_response([p.to_dict() for p in plans])


@admin_plans_bp.route('', methods=['POST'])
@jwt_required()
def create_plan():
    """
    Создать новый тариф.
    ---
    tags:
      - Admin Plans
    security:
      - Bearer: []
    parameters:
      - in: body
        name: body
        schema:
          type: object
          required:
            - name
            - price
          properties:
            name:
              type: string
            description:
              type: string
            price:
              type: integer
              description: Цена в копейках (29900 = 299 руб)
            duration_days:
              type: integer
            daily_requests_limit:
              type: integer
    responses:
      201:
        description: Тариф создан
    """
    user_id = get_jwt_identity()
    if not _is_admin(user_id):
        return error_response('Доступ запрещён', 403)

    data = request.get_json() or {}

    name = data.get('name')
    price = data.get('price')

    if not name or price is None:
        return error_response('Поля name и price обязательны', 400)

    plan = SubscriptionPlan(
        name=name,
        description=data.get('description', ''),
        price=int(price),
        duration_days=int(data.get('duration_days', 30)),
        daily_requests_limit=int(data.get('daily_requests_limit', 100)),
        is_active=data.get('is_active', True),
    )
    db.session.add(plan)
    db.session.commit()

    return success_response(plan.to_dict(), 'Тариф создан', 201)


@admin_plans_bp.route('/<int:plan_id>', methods=['PUT'])
@jwt_required()
def update_plan(plan_id):
    """
    Обновить тариф.
    ---
    tags:
      - Admin Plans
    security:
      - Bearer: []
    responses:
      200:
        description: Тариф обновлён
    """
    user_id = get_jwt_identity()
    if not _is_admin(user_id):
        return error_response('Доступ запрещён', 403)

    plan = db.session.get(SubscriptionPlan, plan_id)
    if not plan:
        return error_response('Тариф не найден', 404)

    data = request.get_json() or {}

    if 'name' in data:
        plan.name = data['name']
    if 'description' in data:
        plan.description = data['description']
    if 'price' in data:
        plan.price = int(data['price'])
    if 'duration_days' in data:
        plan.duration_days = int(data['duration_days'])
    if 'daily_requests_limit' in data:
        plan.daily_requests_limit = int(data['daily_requests_limit'])
    if 'is_active' in data:
        plan.is_active = bool(data['is_active'])

    db.session.commit()
    return success_response(plan.to_dict(), 'Тариф обновлён')


@admin_plans_bp.route('/<int:plan_id>', methods=['DELETE'])
@jwt_required()
def delete_plan(plan_id):
    """
    Удалить тариф (мягкое удаление — деактивация).
    ---
    tags:
      - Admin Plans
    security:
      - Bearer: []
    responses:
      200:
        description: Тариф деактивирован
    """
    user_id = get_jwt_identity()
    if not _is_admin(user_id):
        return error_response('Доступ запрещён', 403)

    plan = db.session.get(SubscriptionPlan, plan_id)
    if not plan:
        return error_response('Тариф не найден', 404)

    plan.is_active = False
    db.session.commit()

    return success_response(plan.to_dict(), 'Тариф деактивирован')
