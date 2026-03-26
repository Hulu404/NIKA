# app/models/subscription.py
from datetime import datetime
from ..extensions import db


class Subscription(db.Model):
    __tablename__ = 'subscriptions'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, index=True)
    plan_id = db.Column(db.Integer, db.ForeignKey('subscription_plans.id'), nullable=False)
    status = db.Column(db.String(20), nullable=False, default='active')
    # active, cancelled, expired, pending

    yookassa_payment_method_id = db.Column(db.String(255), nullable=True)
    # ID сохранённого метода оплаты для рекуррентных платежей

    started_at = db.Column(db.DateTime, default=datetime.utcnow)
    expires_at = db.Column(db.DateTime, nullable=False)
    cancelled_at = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', backref=db.backref('subscriptions', lazy='dynamic'))
    payments = db.relationship('Payment', backref='subscription', lazy='dynamic')

    def is_active(self):
        return (
            self.status == 'active'
            and self.expires_at > datetime.utcnow()
        )

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'plan_id': self.plan_id,
            'plan': self.plan.to_dict() if self.plan else None,
            'status': self.status,
            'started_at': self.started_at.isoformat() if self.started_at else None,
            'expires_at': self.expires_at.isoformat() if self.expires_at else None,
            'cancelled_at': self.cancelled_at.isoformat() if self.cancelled_at else None,
            'is_active': self.is_active(),
        }
