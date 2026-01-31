# Flask Chat App с GigaChat

Простой чат с голосовым ответом на базе GigaChat (Sber).

## Структура

- `app/` — основное приложение
- `config/` — конфигурации (development/production)
- `run.py` — точка входа

## Запуск

```bash
# 1. Создай виртуальное окружение
python -m venv venv
source venv/bin/activate  # или venv\Scripts\activate на Windows

# 2. Установи зависимости
pip install -r requirements.txt

# 3. Скопируй .env.example → .env и заполни

# 4. Запуск
python run.py
# или
FLASK_ENV=development flask run --app run:app