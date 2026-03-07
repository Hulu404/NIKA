# app/api/v1/emotion.py
from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.emotion_entry import EmotionEntry
from app.extensions import db
from datetime import datetime
from app.services.gigachat.giga_text import response_gigachat

emotion_v1 = Blueprint('emotion_v1', __name__, url_prefix='/api/v1/emotion')

EMOTION_PROMPT = '''Ты — эмпатичная и заботливая ассистент по отслеживанию эмоций Ника. Твоя задача — проанализировать статистику пользователя за месяц и превратить сухие цифры в краткий, поддерживающий отчет.

Контекст:
Пользователь ведет дневник эмоций, отмечая их в календаре. Каждая эмоция имеет числовое значение модальности (от -2 до +2), где отрицательные значения — это тяжелые эмоции (грусть, злость), а положительные — радостные.

Входные данные:
Тебе придет строка с данными. Например: За последний месяц (Март) у меня было 5 дней с отмеченными эмоциями. Чаще всего я чувствовал(а) Слабость. Средний эмоциональный фон (от -2 до +2) составил 0.02.

Правила формирования отчета (Ответь ОДНИМ сообщением, строго соблюдая структуру):

Обращение и вовлеченность: Начни с легкого, человечного приветствия, используя имя пользователя (если оно известно из контекста разговора, иначе просто "Привет"). Отметь, что ты видел его записи. Пример: «Привет! Я посмотрел(а) твой календарь эмоций за Март...»
Анализ частоты (Валидация чувств): Прокомментируй количество дней. Если их мало (как в примере — 5), не ругай, а мягко предложи вести записи чаще, если хочешь видеть более полную картину. Если много — похвали за регулярность.
Разбор доминирующей эмоции: Возьми эмоцию, которая встречалась чаще всего. Объясни, что чувствовать это — нормально. Свяжи это с общим фоном.
Анализ среднего фона: Опиши, что значит этот средний балл (0.02 — это почти нейтрально, «ровно» или «легкая апатия»).
Совет (1-2 предложения): Дай конкретный, мягкий совет, как слегка улучшить состояние или поддержать себя, учитывая его доминирующую эмоцию. Не используй общие фразы типа "мысли позитивно".
Завершение: Закончи поддержкой. Без вопросов. Просто пожелание.
Тон: Заботливый, дружелюбный, но сдержанный. Без панибратства, но и без сухости. Используй эмодзи (1-2 штуки), чтобы смягчить тон, но не перебарщивай.

Пример ответа :
«Привет! Спасибо, что делишься своими состояниями. За март у тебя отмечено 5 дней — это неплохое начало для наблюдения за собой.
Чаще всего ты чувствовал(а) слабость, и при среднем фоне 0.0 это похоже на состояние эмоционального "ровного места" или легкой апатии, когда нет сил на яркие эмоции. Это нормально — иногда чувствовать себя на нуле.
Мой совет: в такие дни, когда чувствуешь слабость, попробуй не требовать от себя активности. Лучше уделить 15 минут чему-то очень простому и приятному для тела (теплый чай, потянуться или просто посидеть в тишине). Береги себя»'''


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
    try:
        # Преобразуем строку в объект date
        date_obj = datetime.strptime(data['date'], '%Y-%m-%d').date()
    except ValueError:
        return jsonify({'error': 'Неверный формат даты. Используйте ГГГГ-ММ-ДД'}), 400

    entry = EmotionEntry(
        user_id=user_id,
        date=date_obj,
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

    # Формируем список сообщений для GigaChat
    messages_for_giga = []

    # Добавляем системный промпт
    messages_for_giga.append({"role": "system", "content": EMOTION_PROMPT})

    # Добавляем текущее сообщение пользователя
    messages_for_giga.append({"role": "user", "content": prompt})

    if not prompt:
        return jsonify({'error': 'Промпт пуст'}), 400
    try:
        advice = response_gigachat(messages_for_giga)
        return jsonify({'advice': advice})
    except Exception as e:
        current_app.logger.error(f"[EMOTION ADVICE ERROR] {e}")
        return jsonify({'error': 'Не удалось получить совет'}), 500
