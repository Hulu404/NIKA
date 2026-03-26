# app/services/billing_scheduler.py
"""
Фоновый планировщик для автопродления подписок.

- Каждый час проверяет подписки, истекающие в ближайшие 24 часа
- Пытается списать оплату через сохранённый метод в ЮKassa
- Если нет payment_method — просто помечает подписку как expired
- Также помечает просроченные подписки без рекуррентов
"""
import logging
from datetime import datetime, timedelta

from apscheduler.schedulers.background import BackgroundScheduler

logger = logging.getLogger(__name__)

_scheduler = None


def _process_renewals(app):
    """Основная задача: продление подписок и истечение просроченных."""
    with app.app_context():
        from ..extensions import db
        from ..models.subscription import Subscription
        from ..models.subscription_plan import SubscriptionPlan
        from ..models.payment import Payment
        from ..models.user import User
        from ..services.yookassa_service import create_recurring_payment

        now = datetime.utcnow()
        window = now + timedelta(hours=24)

        # 1. Истекшие подписки без рекуррентного метода → expired
        expired_subs = Subscription.query.filter(
            Subscription.status == 'active',
            Subscription.expires_at <= now,
            (Subscription.yookassa_payment_method_id == None)  # noqa: E711
            | (Subscription.yookassa_payment_method_id == ''),
        ).all()

        for sub in expired_subs:
            sub.status = 'expired'
            user = db.session.get(User, sub.user_id)
            if user:
                user.daily_requests_limit = 10
            logger.info(f'Subscription {sub.id} expired (no payment method)')

        if expired_subs:
            db.session.commit()

        # 2. Подписки, истекающие в ближайшие 24ч, с сохранённым методом → рекуррентное списание
        renewable_subs = Subscription.query.filter(
            Subscription.status == 'active',
            Subscription.expires_at <= window,
            Subscription.expires_at > now,
            Subscription.yookassa_payment_method_id != None,  # noqa: E711
            Subscription.yookassa_payment_method_id != '',
        ).all()

        for sub in renewable_subs:
            plan = db.session.get(SubscriptionPlan, sub.plan_id)
            if not plan:
                logger.warning(f'Subscription {sub.id}: plan {sub.plan_id} not found, skipping')
                continue

            try:
                yoo_payment = create_recurring_payment(
                    amount_rub=plan.price_rub(),
                    payment_method_id=sub.yookassa_payment_method_id,
                    description=f'Автопродление NIKA — {plan.name}',
                    metadata={
                        'user_id': str(sub.user_id),
                        'plan_id': str(plan.id),
                        'renewal': 'true',
                    },
                )

                payment = Payment(
                    user_id=sub.user_id,
                    subscription_id=sub.id,
                    yookassa_payment_id=yoo_payment.id,
                    amount=plan.price,
                    status=yoo_payment.status,
                    payment_method_id=sub.yookassa_payment_method_id,
                    is_recurring=True,
                    description=f'Автопродление NIKA — {plan.name}',
                )
                db.session.add(payment)
                db.session.commit()

                logger.info(
                    f'Renewal payment created for sub {sub.id}, '
                    f'yookassa_id={yoo_payment.id}, status={yoo_payment.status}'
                )

                # Если платёж сразу succeeded — продлеваем
                if yoo_payment.status == 'succeeded':
                    sub.expires_at = sub.expires_at + timedelta(days=plan.duration_days)
                    db.session.commit()
                    logger.info(f'Subscription {sub.id} renewed until {sub.expires_at}')
                # Иначе — ждём webhook от ЮKassa (payment.succeeded)

            except Exception as e:
                logger.error(f'Failed to renew subscription {sub.id}: {e}')
                db.session.rollback()

        # 3. Давно просроченные (>2 дня) без обновления → expired
        stale_cutoff = now - timedelta(days=2)
        stale_subs = Subscription.query.filter(
            Subscription.status == 'active',
            Subscription.expires_at <= stale_cutoff,
        ).all()

        for sub in stale_subs:
            sub.status = 'expired'
            user = db.session.get(User, sub.user_id)
            if user:
                user.daily_requests_limit = 10
            logger.info(f'Subscription {sub.id} force-expired (stale)')

        if stale_subs:
            db.session.commit()

        total = len(expired_subs) + len(renewable_subs) + len(stale_subs)
        if total:
            logger.info(
                f'Billing run: {len(expired_subs)} expired, '
                f'{len(renewable_subs)} renewals attempted, '
                f'{len(stale_subs)} stale-expired'
            )


def init_scheduler(app):
    """Запускает фоновый планировщик. Вызывать один раз при старте приложения."""
    global _scheduler

    if _scheduler is not None:
        return

    _scheduler = BackgroundScheduler(daemon=True)
    _scheduler.add_job(
        func=_process_renewals,
        trigger='interval',
        hours=1,
        args=[app],
        id='billing_renewals',
        name='Process subscription renewals',
        replace_existing=True,
        next_run_time=datetime.utcnow() + timedelta(minutes=1),  # первый запуск через 1 мин
    )
    _scheduler.start()
    logger.info('Billing scheduler started (runs every 1 hour)')
