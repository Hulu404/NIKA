# CLI-команды управления базой данных NIKA

Все команды запускаются через `docker compose exec backend flask <команда>`.

```bash
# Просмотреть полный список команд
docker compose exec backend flask --help
```

---

## 📋 Содержание

1. [Инициализация БД](#инициализация-бд)
2. [Просмотр таблиц](#просмотр-таблиц)
3. [Извлечение данных](#извлечение-данных)
4. [Изменение данных](#изменение-данных)
5. [Alembic миграции](#alembic-миграции)
6. [Управление пользователями](#управление-пользователями)
7. [Утилиты](#утилиты)
8. [Production Checklist](#production-checklist)

---

## Инициализация БД

### `flask init-db`

Создаёт все таблицы по текущим моделям. Безопасна — не удаляет существующие данные.

```bash
docker compose exec backend flask init-db
```

### `flask update-db`

Создаёт только отсутствующие таблицы (alias `init-db`).

```bash
docker compose exec backend flask update-db
```

### `flask drop-db`

⚠️ **УДАЛЯЕТ все таблицы безвозвратно!**

```bash
docker compose exec backend flask drop-db
```

---

## Просмотр таблиц

### `flask db-tables`

Показать все таблицы в базе данных.

```bash
docker compose exec backend flask db-tables
```

**Вывод:**
```
📋 Таблицы в базе данных (8):
----------------------------------------
  • alembic_version
  • emotion_entries
  • food_entries
  • messages
  • payments
  • refresh_tokens
  • subscription_plans
  • subscriptions
  • users
```

### `flask db-info`

Показать таблицы с количеством строк и числом колонок.

```bash
docker compose exec backend flask db-info
```

**Вывод:**
```
🗄️  База данных: sqlite:////instance/app.db
📋 Таблиц (8):
--------------------------------------------------
  users                              5 строк  16 колонок
  messages                          42 строк   6 колонок
  ...
```

### `flask db-schema <table>`

Показать структуру таблицы: колонки, типы, ограничения.

```bash
# Посмотреть структуру таблицы users
docker compose exec backend flask db-schema users

# Посмотреть структуру таблицы messages
docker compose exec backend flask db-schema messages
```

**Вывод:**
```
📋 Структура таблицы 'users':
------------------------------------------------------------
  id                        INTEGER                        NOT NULL
  name                      VARCHAR(100)                   NULL
  last_name                 VARCHAR(100)                   NOT NULL
  email                     VARCHAR(120)                   NOT NULL
  gender                    VARCHAR(10)                    NOT NULL
  is_admin                  BOOLEAN                        NULL    DEFAULT 0
  daily_requests_limit      INTEGER                        NULL    DEFAULT 3
  ...
```

### `flask db-count <table>`

Количество строк в таблице.

```bash
docker compose exec backend flask db-count users
docker compose exec backend flask db-count messages
```

---

## Извлечение данных

### `flask db-query "<SQL>"`

Выполнить произвольный SELECT-запрос.

```bash
# Первые 5 пользователей
docker compose exec backend flask db-query "SELECT id, name, email FROM users LIMIT 5"

# Сколько сообщений каждого типа
docker compose exec backend flask db-query "SELECT role, COUNT(*) as cnt FROM messages GROUP BY role"

# Все активные подписки
docker compose exec backend flask db-query "SELECT * FROM subscriptions WHERE status='active'"
```

### `flask db-get`

Извлечь строки из таблицы с фильтрацией, сортировкой и лимитом.

```bash
# Все пользователи (первые 20)
docker compose exec backend flask db-get -t users

# Пользователи с конкретным email
docker compose exec backend flask db-get -t users -w "email='admin@example.com'"

# Пользователи по шаблону email
docker compose exec backend flask db-get -t users -w "email LIKE '%@gmail.com'" -l 50

# Администраторы
docker compose exec backend flask db-get -t users -w "is_admin=1"

# Сообщения из конкретной сессии, по дате
docker compose exec backend flask db-get -t messages -w "session_id='abc-123'" -l 100 -o "created_at DESC"

# Подписки, истекающие через 24 часа
docker compose exec backend flask db-get -t subscriptions -w "expires_at < datetime('now', '+1 day')"
```

**Параметры:**
| Флаг | Описание | По умолчанию |
|------|----------|-------------|
| `-t, --table` | Имя таблицы (обязательно) | — |
| `-w, --where` | Условие WHERE (без слова WHERE) | — |
| `-l, --limit` | Лимит строк | 20 |
| `-o, --order` | ORDER BY (без слова ORDER BY) | — |

---

## Изменение данных

### `flask db-update`

Обновить строки в таблице.

```bash
# Сделать пользователя администратором
docker compose exec backend flask db-update -t users -s "is_admin=1" -w "email='admin@example.com'"

# Увеличить лимит запросов для пользователя
docker compose exec backend flask db-update -t users -s "daily_requests_limit=100" -w "id=1"

# Обновить статус подписки
docker compose exec backend flask db-update -t subscriptions -s "status='active'" -w "user_id=1"

# Обновить ВСЕ строки (без -w)
docker compose exec backend flask db-update -t users -s "daily_requests_limit=10"
```

**Параметры:**
| Флаг | Описание |
|------|----------|
| `-t, --table` | Имя таблицы |
| `-s, --set` | Выражение SET: `column='value'` |
| `-w, --where` | Условие WHERE (без — обновит ВСЕ строки) |

### `flask db-insert`

Вставить строку в таблицу.

```bash
# Вставить пользователя
docker compose exec backend flask db-insert \
  -t users \
  -c "name,last_name,email,gender,password_hash,daily_requests_limit" \
  -v "'Test','User','test@test.com','male','hash123',10"

# Вставить тарифный план
docker compose exec backend flask db-insert \
  -t subscription_plans \
  -c "name,description,price,duration_days,daily_requests_limit,is_active" \
  -v "'Premium','Полный доступ',99000,30,100,1"
```

**Параметры:**
| Флаг | Описание |
|------|----------|
| `-t, --table` | Имя таблицы |
| `-c, --columns` | Колонки через запятую |
| `-v, --values` | Значения через запятую (строки в кавычках) |

### `flask db-delete`

Удалить строки из таблицы.

```bash
# Удалить конкретного пользователя
docker compose exec backend flask db-delete -t users -w "email='test@test.com'"

# Удалить сообщения сессии
docker compose exec backend flask db-delete -t messages -w "session_id='abc-123'"

# Удалить все просроченные подписки
docker compose exec backend flask db-delete -t subscriptions -w "status='expired'"
```

**Параметры:**
| Флаг | Описание |
|------|----------|
| `-t, --table` | Имя таблицы |
| `-w, --where` | Условие WHERE (обязательно!) |

---

## Alembic миграции

### `flask db-current`

Показать текущую ревизию Alembic.

```bash
docker compose exec backend flask db-current
```

### `flask db-upgrade`

Применить все ожидающие миграции.

```bash
docker compose exec backend flask db-upgrade
```

### `flask db-downgrade`

Откатить миграцию.

```bash
# Откатить на 1 шаг
docker compose exec backend flask db-downgrade

# Откатить всё (удалить все таблицы миграций)
docker compose exec backend flask db-downgrade -r base
```

### `flask db-migrate -m "описание"`

Создать новую миграцию из изменений в моделях.

```bash
docker compose exec backend flask db-migrate -m "add phone field to users"
```

После создания — применить:

```bash
docker compose exec backend flask db-upgrade
```

---

## Управление пользователями

### `flask create-test-user`

Создать тестового пользователя (если база пуста).

```bash
docker compose exec backend flask create-test-user
# Email: admin@example.com, Пароль: admin123
```

### `flask create-admin`

Создать пользователя-администратора.

```bash
docker compose exec backend flask create-admin \
  --name "Ivan" \
  --email "admin@example.com" \
  --password "secure_pass_123"
```

---

## Утилиты

### `flask clean-sessions`

Очистить старые файлы сессий Flask (старше 32 дней).

```bash
docker compose exec backend flask clean-sessions
```

### `flask shell`

Запустить интерактивную Python-консоль с предзагруженными моделями.

```bash
docker compose exec backend flask shell
```

Доступны: `db`, `User`, `Message`, `Subscription`, `SubscriptionPlan`, `Payment`, `FoodEntry`, `EmotionEntry`, `app`, `inspect`.

```python
# Пример использования:
from app.extensions import db
from app.models.user import User

# Найти пользователя
user = User.query.filter_by(email='admin@example.com').first()
print(user.name, user.email)

# Изменить лимит
user.daily_requests_limit = 50
db.session.commit()
```

---

## Production Checklist

### Первый запуск:

```bash
# 1. В .env: FLASK_CONFIG=production
# 2. Пересобрать и запустить
docker compose down -v
docker compose build --no-cache
docker compose up -d

# 3. Инициализировать БД
docker compose exec backend flask init-db

# 4. Создать админа
docker compose exec backend flask create-admin --name "Admin" --email "admin@nikamentalhelth.ru" --password "СЕКРЕТ"

# 5. Проверить
docker compose exec backend flask db-info
```

### Обновление схемы (после изменения моделей):

```bash
# Создать миграцию
docker compose exec backend flask db-migrate -m "описание изменений"

# Применить
docker compose exec backend flask db-upgrade

# Проверить
docker compose exec backend flask db-current
```

### Экстренный сброс БД:

```bash
# Удалить все данные
docker compose exec backend flask drop-db

# Пересоздать
docker compose exec backend flask init-db

# Пересоздать админа
docker compose exec backend flask create-admin --name "Admin" --email "admin@example.com" --password "СЕКРЕТ"
```
