# app/api/v1/emotion.py
from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.emotion_entry import EmotionEntry
from app.extensions import db
from app.services.gigachat.giga_text import response_gigachat

emotion_v1 = Blueprint('emotion_v1', __name__, url_prefix='/api/v1/emotion')


@emotion_v1.route('/entries', methods=['GET'])
@jwt_required()
def get_entries():
    user_id = get_jwt_identity()
    entries = EmotionEntry.query.filter_by(user_id=user_id).order_by(EmotionEntry.date.desc()).all()
    return jsonify([{
        'id': e.id,
        'date': e.date.isoformat(),
        'emotion': e.emotion
    } for e in entries])


@emotion_v1.route('/entries', methods=['POST'])
@jwt_required()
def add_entry():
    user_id = get_jwt_identity()
    data = request.get_json()
    entry = EmotionEntry(
        user_id=user_id,
        date=data['date'],
        emotion=data['emotion']
    )
    db.session.add(entry)
    db.session.commit()
    return jsonify({'success': True, 'id': entry.id})


@emotion_v1.route('/entries/<int:entry_id>', methods=['DELETE'])
@jwt_required()
def delete_entry(entry_id):
    user_id = get_jwt_identity()
    entry = EmotionEntry.query.filter_by(id=entry_id, user_id=user_id).first()
    if not entry:
        return jsonify({'error': 'Запись не найдена'}), 404
    db.session.delete(entry)
    db.session.commit()
    return jsonify({'success': True})


@emotion_v1.route('/advice', methods=['POST'])
@jwt_required()
def get_emotion_advice():
    data = request.get_json() or {}
    prompt = data.get('prompt', '').strip()
    if not prompt:
        return jsonify({'error': 'Промпт пуст'}), 400
    try:
        advice = response_gigachat(prompt)
        return jsonify({'advice': advice})
    except Exception as e:
        current_app.logger.error(f"[EMOTION ADVICE ERROR] {e}")
        return jsonify({'error': 'Не удалось получить совет'}), 500