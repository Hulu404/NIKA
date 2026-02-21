# app/models/user.py
from datetime import datetime, timedelta
from app.extensions import db
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash


class User(db.Model, UserMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    last_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)
    sex = db.Column(db.String(10), nullable=False)
    sport_type = db.Column(db.String(100), nullable=True)
    password_hash = db.Column(db.String(256), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_on = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Лимиты запросов для зарегистрированных пользователей
    daily_requests_limit = db.Column(db.Integer, default=10)  # 10 запросов в день для зарегистрированных
    requests_today = db.Column(db.Integer, default=0)
    last_request_date = db.Column(db.Date, default=datetime.utcnow().date)

    def __repr__(self):
        return f"<User {self.id}: {self.email}>"

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def can_make_request(self):
        """Проверяет, может ли пользователь сделать запрос"""
        # Сбрасываем счетчик если день сменился
        today = datetime.utcnow().date()
        if self.last_request_date != today:
            self.requests_today = 0
            self.last_request_date = today
            db.session.commit()
            return True

        return self.requests_today < self.daily_requests_limit

    def increment_requests(self):
        """Увеличивает счетчик запросов"""
        today = datetime.utcnow().date()

        # Если день сменился, сбрасываем счетчик
        if self.last_request_date != today:
            self.requests_today = 0
            self.last_request_date = today

        self.requests_today += 1
        db.session.commit()

    def get_remaining_requests(self):
        """Возвращает оставшееся количество запросов"""
        today = datetime.utcnow().date()

        if self.last_request_date != today:
            return self.daily_requests_limit

        return max(0, self.daily_requests_limit - self.requests_today)

    def get_reset_info(self):
        """Возвращает информацию о сбросе лимита"""
        tomorrow = datetime.utcnow() + timedelta(days=1)
        reset_time = tomorrow.replace(hour=0, minute=0, second=0, microsecond=0)
        now = datetime.utcnow()
        remaining = reset_time - now

        return {
            'reset_time': reset_time.isoformat(),
            'remaining_seconds': max(0, int(remaining.total_seconds())),
            'formatted': f"{int(remaining.total_seconds() / 3600)}ч {int((remaining.total_seconds() % 3600) / 60)}м"
        }

    def to_dict(self):
        ''' Поддержка JSON '''
        return {
            'id': self.id,
            'name': self.name,
            'surname': self.surname,
            'email': self.email,
            'sex': self.sex,
            'sport_type': self.sport_type,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }