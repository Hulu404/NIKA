# app/models/payment.py
from datetime import datetime
from ..extensions import db


class Payment(db.Model):
    __tablename__ = 'payments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, index=True)
    subscription_id = db.Column(db.Integer, db.ForeignKey('subscriptions.id'), nullable=True)

    yookassa_payment_id = db.Column(db.String(255), unique=True, nullable=False)
    amount = db.Column(db.Integer, nullable=False)  # в копейках
    currency = db.Column(db.String(10), default='RUB')
    status = db.Column(db.String(30), nullable=False, default='pending')
    # pending, waiting_for_capture, succeeded, canceled

    payment_method_id = db.Column(db.String(255), nullable=True)
    # ID сохранённого метода оплаты (для рекуррентных)

    is_recurring = db.Column(db.Boolean, default=False)
    description = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship('User', backref=db.backref('payments', lazy='dynamic'))

    def amount_rub(self):
        return self.amount / 100

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'subscription_id': self.subscription_id,
            'yookassa_payment_id': self.yookassa_payment_id,
            'amount': self.amount,
            'amount_rub': self.amount_rub(),
            'currency': self.currency,
            'status': self.status,
            'is_recurring': self.is_recurring,
            'description': self.description,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }
