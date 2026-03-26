# app/api/v1/subscription.py
"""
Пользовательские эндпоинты подписки и оплаты через ЮKassa.
"""
import json
import os
from datetime import datetime, timedelta

from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from ...extensions import db
from ...models.subscription_plan import SubscriptionPlan
from ...models.subscription import Subscription
from ...models.payment import Payment
from ...models.user import User
from ...services.yookassa_service import create_payment, get_payment_info
from ...utils.responses import success_response, error_response

subscription_bp = Blueprint('subscription', __name__, url_prefix='/api/v1/subscription')


@subscription_bp.route('/plans', methods=['GET'])
def get_plans():
    """
    Получить список активных тарифов (доступно без авторизации).
    ---
    tags:
      - Subscription
    responses:
      200:
        description: Список активных тарифов
    """
    plans = SubscriptionPlan.query.filter_by(is_active=True).order_by(
        SubscriptionPlan.price.asc()
    ).all()
    return success_response([p.to_dict() for p in plans])


@subscription_bp.route('/my', methods=['GET'])
@jwt_required()
def my_subscription():
    """
    Получить текущую подписку пользователя.
    ---
    tags:
      - Subscription
    security:
      - Bearer: []
    responses:
      200:
        description: Информация о подписке
    """
    user_id = get_jwt_identity()

    sub = Subscription.query.filter_by(
        user_id=user_id, status='active'
    ).first()

    if sub and sub.expires_at <= datetime.utcnow():
        sub.status = 'expired'
        db.session.commit()
        sub = None

    if not sub:
        return success_response({
            'has_subscription': False,
            'subscription': None,
        })

    return success_response({
        'has_subscription': True,
        'subscription': sub.to_dict(),
    })


@subscription_bp.route('/create-payment', methods=['POST'])
@jwt_required()
def create_subscription_payment():
    """
    Создать платёж для оформления подписки.
    ---
    tags:
      - Subscription
    security:
      - Bearer: []
    parameters:
      - in: body
        name: body
        schema:
          type: object
          required:
            - plan_id
          properties:
            plan_id:
              type: integer
            return_url:
              type: string
    responses:
      200:
        description: URL для оплаты
    """
    user_id = get_jwt_identity()
    data = request.get_json() or {}

    plan_id = data.get('plan_id')
    if not plan_id:
        return error_response('plan_id обязателен', 400)

    plan = db.session.get(SubscriptionPlan, plan_id)
    if not plan or not plan.is_active:
        return error_response('Тариф не найден или неактивен', 404)

    # Проверяем, нет ли уже активной подписки
    existing = Subscription.query.filter_by(user_id=user_id, status='active').first()
    if existing and existing.expires_at > datetime.utcnow():
        return error_response('У вас уже есть активная подписка', 409)

    return_url = data.get('return_url', os.environ.get('FRONTEND_URL', 'http://localhost') + '/profile')

    try:
        yoo_payment = create_payment(
            amount_rub=plan.price_rub(),
            description=f'Подписка NIKA — {plan.name}',
            return_url=return_url,
            save_payment_method=True,
            metadata={
                'user_id': str(user_id),
                'plan_id': str(plan.id),
            },
        )
    except RuntimeError as e:
        return error_response(str(e), 500)

    # Сохраняем платёж в БД
    payment = Payment(
        user_id=user_id,
        yookassa_payment_id=yoo_payment.id,
        amount=plan.price,
        status=yoo_payment.status,
        description=f'Подписка NIKA — {plan.name}',
    )
    db.session.add(payment)
    db.session.commit()

    confirmation_url = yoo_payment.confirmation.confirmation_url

    return success_response({
        'payment_id': payment.id,
        'confirmation_url': confirmation_url,
    })


@subscription_bp.route('/webhook', methods=['POST'])
def yookassa_webhook():
    """
    Webhook от ЮKassa для обработки уведомлений об оплате.
    ---
    tags:
      - Subscription
    responses:
      200:
        description: OK
    """
    body = request.get_json(force=True)

    event_type = body.get('event')
    payment_obj = body.get('object', {})
    yookassa_payment_id = payment_obj.get('id')

    if not yookassa_payment_id:
        return success_response(message='ignored')

    payment = Payment.query.filter_by(yookassa_payment_id=yookassa_payment_id).first()
    if not payment:
        return success_response(message='payment not found, ignored')

    if event_type == 'payment.succeeded':
        payment.status = 'succeeded'

        # Сохраняем payment_method_id для рекуррентных платежей
        pm = payment_obj.get('payment_method', {})
        if pm.get('saved'):
            payment.payment_method_id = pm.get('id')
            payment.is_recurring = True

        # Получаем plan_id из metadata
        metadata = payment_obj.get('metadata', {})
        plan_id = metadata.get('plan_id')
        user_id = payment.user_id
        is_renewal = metadata.get('renewal') == 'true'

        if plan_id:
            plan = db.session.get(SubscriptionPlan, int(plan_id))
            if plan:
                if is_renewal and payment.subscription_id:
                    # Рекуррентное продление — продлеваем существующую подписку
                    sub = db.session.get(Subscription, payment.subscription_id)
                    if sub:
                        sub.status = 'active'
                        sub.expires_at = sub.expires_at + timedelta(days=plan.duration_days)
                        sub.yookassa_payment_method_id = payment.payment_method_id or sub.yookassa_payment_method_id
                else:
                    # Первая оплата — деактивируем старые, создаём новую
                    old_subs = Subscription.query.filter_by(
                        user_id=user_id, status='active'
                    ).all()
                    for s in old_subs:
                        s.status = 'expired'

                    sub = Subscription(
                        user_id=user_id,
                        plan_id=plan.id,
                        status='active',
                        expires_at=datetime.utcnow() + timedelta(days=plan.duration_days),
                        yookassa_payment_method_id=payment.payment_method_id,
                    )
                    db.session.add(sub)
                    payment.subscription_id = sub.id

                # Обновляем лимит запросов пользователя
                user = db.session.get(User, user_id)
                if user:
                    user.daily_requests_limit = plan.daily_requests_limit

        db.session.commit()

    elif event_type == 'payment.canceled':
        payment.status = 'canceled'
        db.session.commit()

    elif event_type == 'payment.waiting_for_capture':
        payment.status = 'waiting_for_capture'
        db.session.commit()

    return success_response(message='ok')


@subscription_bp.route('/cancel', methods=['POST'])
@jwt_required()
def cancel_subscription():
    """
    Отменить подписку (не продлевается, но действует до expires_at).
    ---
    tags:
      - Subscription
    security:
      - Bearer: []
    responses:
      200:
        description: Подписка отменена
    """
    user_id = get_jwt_identity()

    sub = Subscription.query.filter_by(user_id=user_id, status='active').first()
    if not sub:
        return error_response('Активная подписка не найдена', 404)

    sub.status = 'cancelled'
    sub.cancelled_at = datetime.utcnow()
    db.session.commit()

    # Возвращаем лимит к бесплатному
    user = db.session.get(User, user_id)
    if user:
        user.daily_requests_limit = 10
        db.session.commit()

    return success_response(sub.to_dict(), 'Подписка отменена. Доступ сохраняется до окончания оплаченного периода.')


@subscription_bp.route('/check-payment/<int:payment_id>', methods=['GET'])
@jwt_required()
def check_payment_status(payment_id):
    """
    Проверить статус платежа (poll после возврата с формы оплаты).
    ---
    tags:
      - Subscription
    security:
      - Bearer: []
    responses:
      200:
        description: Статус платежа
    """
    user_id = get_jwt_identity()

    payment = db.session.get(Payment, payment_id)
    if not payment or payment.user_id != user_id:
        return error_response('Платёж не найден', 404)

    # Подтягиваем актуальный статус из ЮKassa
    try:
        yoo = get_payment_info(payment.yookassa_payment_id)
        if yoo.status != payment.status:
            payment.status = yoo.status
            db.session.commit()
    except Exception:
        pass  # если не удалось — отдаём то, что есть в БД

    return success_response(payment.to_dict())
