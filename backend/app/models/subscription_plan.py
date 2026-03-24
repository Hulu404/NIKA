# app/models/subscription_plan.py
from datetime import datetime
from ..extensions import db


class SubscriptionPlan(db.Model):
    __tablename__ = 'subscription_plans'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    price = db.Column(db.Integer, nullable=False)  # цена в копейках (29900 = 299 руб)
    duration_days = db.Column(db.Integer, nullable=False, default=30)
    daily_requests_limit = db.Column(db.Integer, nullable=False, default=100)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    subscriptions = db.relationship('Subscription', backref='plan', lazy='dynamic')

    def price_rub(self):
        return self.price / 100

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'price_rub': self.price_rub(),
            'duration_days': self.duration_days,
            'daily_requests_limit': self.daily_requests_limit,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }
