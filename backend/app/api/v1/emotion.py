# app/api/v1/emotion.py
from datetime import datetime

from flask import Blueprint, request, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.models.emotion_entry import EmotionEntry
from app.extensions import db
from app.utils.responses import success_response, error_response
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
    """Список записей эмоций
    ---
    tags:
      - Emotion
    summary: Получить записи эмоций пользователя
    security:
      - Bearer: []
    responses:
      200:
        description: Список записей
      401:
        description: Требуется авторизация
    """
    user_id: str = get_jwt_identity()
    entries = EmotionEntry.query.filter_by(user_id=user_id).order_by(EmotionEntry.date.desc()).all()

    return success_response(
        data=[
            {
                "id": e.id,
                "date": e.date.isoformat(),
                "emotion": e.emotion,
            }
            for e in entries
        ]
    )


@emotion_v1.route('/entries', methods=['POST'])
@jwt_required()
def add_entry():
    """Добавить запись эмоции
    ---
    tags:
      - Emotion
    summary: Добавить запись в дневник эмоций
    security:
      - Bearer: []
    parameters:
      - in: body
        name: body
        required: true
        schema:
          type: object
          required: [date, emotion]
          properties:
            date:
              type: string
              format: date
              example: "2026-03-17"
            emotion:
              type: string
              example: "Радость"
    responses:
      200:
        description: Запись добавлена
      400:
        description: Ошибка валидации
      401:
        description: Требуется авторизация
    """
    user_id: str = get_jwt_identity()
    data: dict = request.get_json() or {}

    try:
        # Преобразуем строку в объект date
        date_obj = datetime.strptime(data['date'], '%Y-%m-%d').date()
    except (ValueError, KeyError):
        return error_response("Неверный формат даты. Используйте ГГГГ-ММ-ДД", 400)

    emotion: str | None = data.get('emotion')
    if not emotion:
        return error_response("Поле emotion обязательно", 400)

    entry = EmotionEntry(
        user_id=user_id,
        date=date_obj,
        emotion=emotion,
    )
    db.session.add(entry)
    db.session.commit()

    return success_response(data={"id": entry.id}, message="Запись добавлена")


@emotion_v1.route('/entries/<int:entry_id>', methods=['DELETE'])
@jwt_required()
def delete_entry(entry_id: int):
    """Удалить запись эмоции
    ---
    tags:
      - Emotion
    summary: Удалить запись из дневника эмоций
    security:
      - Bearer: []
    parameters:
      - in: path
        name: entry_id
        type: integer
        required: true
    responses:
      200:
        description: Запись удалена
      404:
        description: Запись не найдена
      401:
        description: Требуется авторизация
    """
    user_id: str = get_jwt_identity()
    entry = EmotionEntry.query.filter_by(id=entry_id, user_id=user_id).first()

    if not entry:
        return error_response("Запись не найдена", 404)

    db.session.delete(entry)
    db.session.commit()

    return success_response(message="Запись удалена")


@emotion_v1.route('/advice', methods=['POST'])
@jwt_required()
def get_emotion_advice():
    """AI-анализ эмоций
    ---
    tags:
      - Emotion
    summary: Получить AI-совет по эмоциям
    security:
      - Bearer: []
    parameters:
      - in: body
        name: body
        required: true
        schema:
          type: object
          required: [prompt]
          properties:
            prompt:
              type: string
              example: "За последний месяц у меня было 5 дней с отмеченными эмоциями. Чаще всего я чувствовал Слабость."
    responses:
      200:
        description: AI-совет
      400:
        description: Промпт пуст
      401:
        description: Требуется авторизация
    """
    data: dict = request.get_json() or {}
    prompt: str = data.get('prompt', '').strip()

    if not prompt:
        return error_response("Промпт не может быть пустым", 400)

    # Формируем список сообщений для GigaChat
    messages_for_giga: list[dict] = [
        {"role": "system", "content": EMOTION_PROMPT},
        {"role": "user", "content": prompt},
    ]

    try:
        advice: str = response_gigachat(messages_for_giga)
        return success_response(data={"advice": advice})
    except Exception as e:
        current_app.logger.error(f"[EMOTION ADVICE ERROR] {e}")
        return error_response("Не удалось получить совет", 500)
