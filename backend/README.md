# Flask Chat App с GigaChat


flask_chat_app/

├── ⚙️ .env (локальные переменные — не коммитить!)

├── 📄 .env.example

├── 🚫 .gitignore

├── 📖 README.md

├── 📦 requirements.txt

├── 🛠️ requirements-dev.txt

├── 📁 config/

│   ├── init.py

│   ├── base.py

│   ├── development.py

│   ├── production.py

│   └── testing.py

├── 📁 app/

│   ├── init.py             ← create_app()

│   ├── extensions.py

│   ├── 📁 models/

│   ├── 📁 services/

│   │   ├── 📁 gigachat/        ← text.py, speech.py

│   │   └── 📁 audio/

│   ├── 📁 api/

│   │   ├── v1/chat.py

│   │   └── audio.py

│   ├── 📁 views/

│   │   └── main.py

│   ├── 📁 static/

│   │   └── audio_cache/        (в .gitignore)

│   └── 📁 templates/

│       └── chat/index.html

├── 📁 migrations/              (если будет БД)

├── 📁 tests/

└── 🚀 run.py                   ← запуск приложения



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