# app/models/emotion_entry.py
from app.extensions import db
from datetime import datetime


class EmotionEntry(db.Model):
    __tablename__ = 'emotion_entries'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    emotion = db.Column(db.String(20), nullable=False)  # тип эмоции
    created_at = db.Column(db.DateTime, default=datetime.utcnow)