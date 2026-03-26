# app/api/v1/food.py
from flask import Blueprint, request, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.services.gigachat.giga_text import response_gigachat
from app.models.food_entry import FoodEntry
from app.extensions import db
from app.utils.responses import success_response, error_response

food_v1 = Blueprint('food_v1', __name__, url_prefix='/api/v1/food')

FOOD_PROMPT = '''Ты — эмпатичная и заботливая ассистент по отслеживанию питания Ника. Твоя задача — проанализировать статистику пользователя за неделю и превратить сухие цифры в краткий, поддерживающий отчет.

Контекст:
Пользователь ведет дневник питания, ежедневно отмечая калорийность каждого приёма пищи.

Входные данные:
Тебе придет строка с данными. Например: "Сегодня я съел(а) 3100 ккал. Распределение: Завтрак: 1000 ккал, Обед: 1000 ккал, Ужин: 900 ккал, Перекус: 200 ккал. Средняя калорийность за последние 7 дней: 3000 ккал. Дай краткий совет по улучшению питания (1-2 предложения)."

Правила формирования отчета (Ответь ОДНИМ сообщением, строго соблюдая структуру):

Обращение и вовлеченность: Начни с легкого, человечного приветствия, используя имя пользователя (если оно известно из контекста разговора, иначе просто "Привет"). Отметь, что ты видел его записи. Пример: «Привет! Я посмотрел(а) твой дневник питания за последнюю неделю...»
Анализ сегодняшнего приёма пищи: Прокомментируй количество записей приёмов пищи. Если их мало, не ругай, а мягко предложи вести записи чаще, если хочешь видеть более полную картину. Если много — похвали за регулярность.
Разбор распределения калорийности по приёмам пищи: Проанализируй правильность расспределения калорий. Если расспределение неправильное, мягко предложи его изменить.
Анализ средней каллорийности за неделю: прокоментируй среднюю каллорийность, насколько она соответствует последнему приёму пищи, но без строгой критики.
Совет (1-2 предложения): Дай конкретный, мягкий совет, как слегка улучшить своё питание. Не используй общие фразы типа "питайся правильно".
Завершение: Закончи поддержкой. Без вопросов. Просто пожелание.
Тон: Заботливый, дружелюбный, но сдержанный. Без панибратства, но и без сухости. Используй эмодзи (1-2 штуки), чтобы смягчить тон, но не перебарщивай.

Пример ответа :
«Привет! Заглянула в твой дневник питания, спасибо, что продолжаешь записывать

Вижу, что сегодня у тебя получилось целых четыре приема пищи — это отличная регулярность, молодец!

По калориям сегодняшний день выдался довольно насыщенным: завтрак и обед очень плотные, почти по 1000 ккал, и завершается день сытным ужином в 900 ккал. Возможно, если хочется чувствовать легкость перед сном, можно попробовать сделать ужин чуть более легким, перераспределив часть калорий на обед или второй завтрак.

Средняя калорийность за неделю (3000 ккал) близка к сегодняшнему дню — это говорит о стабильности твоего рациона.

Совет: попробуй добавить в обед или ужин порцию ярких овощей (клетчатку) — это добавит объема блюду и поможет сохранить сытость.»'''


@food_v1.route('/entries', methods=['GET'])
@jwt_required()
def get_entries():
    """Список записей питания
    ---
    tags:
      - Food
    summary: Получить записи питания пользователя
    security:
      - Bearer: []
    responses:
      200:
        description: Список записей
      401:
        description: Требуется авторизация
    """
    user_id: str = get_jwt_identity()
    entries = FoodEntry.query.filter_by(user_id=user_id).order_by(FoodEntry.created_at.desc()).all()

    return success_response(
        data=[
            {
                "id": e.id,
                "name": e.name,
                "calories": e.calories,
                "mealType": e.meal_type,
                "timestamp": e.created_at.isoformat(),
            }
            for e in entries
        ]
    )


@food_v1.route('/entries', methods=['POST'])
@jwt_required()
def add_entry():
    """Добавить запись питания
    ---
    tags:
      - Food
    summary: Добавить запись в дневник питания
    security:
      - Bearer: []
    parameters:
      - in: body
        name: body
        required: true
        schema:
          type: object
          required: [name, calories, mealType]
          properties:
            name:
              type: string
              example: "Овсянка с бананом"
            calories:
              type: integer
              example: 350
            mealType:
              type: string
              example: "breakfast"
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

    name: str | None = data.get('name')
    calories = data.get('calories')
    meal_type: str | None = data.get('mealType')

    if not all([name, calories is not None, meal_type]):
        return error_response("Обязательные поля: name, calories, mealType", 400)

    entry = FoodEntry(
        user_id=user_id,
        name=name,
        calories=calories,
        meal_type=meal_type,
    )
    db.session.add(entry)
    db.session.commit()

    return success_response(data={"id": entry.id}, message="Запись добавлена")


@food_v1.route('/entries/<int:entry_id>', methods=['DELETE'])
@jwt_required()
def delete_entry(entry_id: int):
    """Удалить запись питания
    ---
    tags:
      - Food
    summary: Удалить запись из дневника питания
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
    entry = FoodEntry.query.filter_by(id=entry_id, user_id=user_id).first()

    if not entry:
        return error_response("Запись не найдена", 404)

    db.session.delete(entry)
    db.session.commit()

    return success_response(message="Запись удалена")


@food_v1.route('/advice', methods=['POST'])
@jwt_required()
def get_food_advice():
    """AI-анализ питания
    ---
    tags:
      - Food
    summary: Получить AI-совет по питанию
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
              example: "Сегодня я съел 3100 ккал. Распределение: Завтрак 1000, Обед 1000, Ужин 900, Перекус 200."
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
        {"role": "system", "content": FOOD_PROMPT},
        {"role": "user", "content": prompt},
    ]

    try:
        advice: str = response_gigachat(messages_for_giga)
        return success_response(data={"advice": advice})
    except Exception as e:
        current_app.logger.error(f"[FOOD ADVICE ERROR] {e}")
        return error_response("Не удалось получить совет", 500)
