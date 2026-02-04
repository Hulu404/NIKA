from app.extensions import db
from datetime import datetime
from werkzeug.security import generate_password_hash,  check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(100))
    surname = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    sex = db.Column(db.String(10), nullable=False)
    sport_type = db.Column(db.String(100), nullable=True)
    password_hash = db.Column(db.String(256), nullable=False)
    created_on = db.Column(db.DateTime(), default=datetime.utcnow)
    updated_on = db.Column(db.DateTime(), default=datetime.utcnow,  onupdate=datetime.utcnow)

    def __repr__(self):
        return "<{}:{}>".format(self.id, self.email)

    def set_password(self, password):
        '''Односторонняя генерация Хэшированного пароля'''
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        '''Проверка хэшированного пароля'''
        return check_password_hash(self.password_hash, password)