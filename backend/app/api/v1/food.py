# app/api/v1/food.py
from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.services.gigachat.giga_text import response_gigachat
from app.models.food_entry import FoodEntry
from app.extensions import db

food_v1 = Blueprint('food_v1', __name__, url_prefix='/api/v1/food')

@food_v1.route('/entries', methods=['GET'])
@jwt_required()
def get_entries():
    user_id = get_jwt_identity()
    entries = FoodEntry.query.filter_by(user_id=user_id).order_by(FoodEntry.created_at.desc()).all()
    return jsonify([{
        'id': e.id,
        'name': e.name,
        'calories': e.calories,
        'mealType': e.meal_type,
        'timestamp': e.created_at.isoformat()
    } for e in entries])

@food_v1.route('/entries', methods=['POST'])
@jwt_required()
def add_entry():
    user_id = get_jwt_identity()
    data = request.get_json()
    entry = FoodEntry(
        user_id=user_id,
        name=data['name'],
        calories=data['calories'],
        meal_type=data['mealType']
    )
    db.session.add(entry)
    db.session.commit()
    return jsonify({'success': True, 'id': entry.id})


@food_v1.route('/entries/<int:entry_id>', methods=['DELETE'])
@jwt_required()
def delete_entry(entry_id):
    user_id = get_jwt_identity()
    entry = FoodEntry.query.filter_by(id=entry_id, user_id=user_id).first()
    if not entry:
        return jsonify({'error': 'Запись не найдена'}), 404
    db.session.delete(entry)
    db.session.commit()
    return jsonify({'success': True})


@food_v1.route('/advice', methods=['POST'])
@jwt_required()  
def get_food_advice():
    """
    Получить совет по питанию от AI на основе переданного промпта.
    Ожидает JSON: { "prompt": "строка с описанием ситуации" }
    Возвращает: { "advice": "текст совета" }
    """
    data = request.get_json() or {}
    prompt = data.get('prompt', '').strip()
    if not prompt:
        return jsonify({'error': 'Промпт не может быть пустым'}), 400

    try:
        # Пока что берем ту же функцию, что и в чате
        advice = response_gigachat(prompt)
        return jsonify({'advice': advice})
    except Exception as e:
        current_app.logger.error(f"[FOOD ADVICE ERROR] {e}")
        return jsonify({'error': 'Не удалось получить совет'}), 500