# CLI-команды управления NIKA

Все команды запускаются через `manage.py` внутри контейнера backend.

```bash
# Удобный alias — найди ID контейнера backend
BACKEND=$(docker ps -qf "name=backend")

# Проверь что работает
docker exec -it $BACKEND python manage.py --help
```

---

## 📋 Содержание

1. [Инициализация БД](#инициализация-бд)
2. [Просмотр таблиц](#просмотр-таблиц)
3. [Извлечение данных](#извлечение-данных)
4. [Изменение данных](#изменение-данных)
5. [Управление пользователями](#управление-пользователями)
6. [Утилиты](#утилиты)
7. [Production Checklist](#production-checklist)
8. [Шпаргалка](#шпаргалка)

---

## Инициализация БД

### `init-db`

Создаёт все таблицы по текущим моделям. Безопасна — не удаляет существующие данные.

```bash
docker exec -it $BACKEND python manage.py init-db
```

### `update-db`

Создаёт только отсутствующие таблицы (alias `init-db`).

```bash
docker exec -it $BACKEND python manage.py update-db
```

### `drop-db`

⚠️ **УДАЛЯЕТ все таблицы безвозвратно!**

```bash
docker exec -it $BACKEND python manage.py drop-db
```

---

## Просмотр таблиц

### `db-tables`

Показать все таблицы в базе данных.

```bash
docker exec -it $BACKEND python manage.py db-tables
```

**Вывод:**
```
📋 Таблицы (8):
----------------------------------------
  • emotion_entries
  • food_entries
  • messages
  • payments
  • refresh_tokens
  • subscription_plans
  • subscriptions
  • users
```

### `db-info`

Показать таблицы с количеством строк и числом колонок.

```bash
docker exec -it $BACKEND python manage.py db-info
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

### `db-schema <table>`

Показать структуру таблицы: колонки, типы, ограничения.

```bash
docker exec -it $BACKEND python manage.py db-schema users
docker exec -it $BACKEND python manage.py db-schema messages
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

### `db-count <table>`

Количество строк в таблице.

```bash
docker exec -it $BACKEND python manage.py db-count users
docker exec -it $BACKEND python manage.py db-count messages
```

---

## Извлечение данных

### `db-query "<SQL>"`

Выполнить произвольный SELECT-запрос.

```bash
# Первые 5 пользователей
docker exec -it $BACKEND python manage.py db-query "SELECT id, name, email FROM users LIMIT 5"

# Сколько сообщений каждого типа
docker exec -it $BACKEND python manage.py db-query "SELECT role, COUNT(*) as cnt FROM messages GROUP BY role"

# Все активные подписки
docker exec -it $BACKEND python manage.py db-query "SELECT * FROM subscriptions WHERE status='active'"
```

### `db-get`

Извлечь строки из таблицы с фильтрацией, сортировкой и лимитом.

```bash
# Все пользователи (первые 20)
docker exec -it $BACKEND python manage.py db-get -t users

# Пользователи с конкретным email
docker exec -it $BACKEND python manage.py db-get -t users -w "email='admin@example.com'"

# Пользователи по шаблону email
docker exec -it $BACKEND python manage.py db-get -t users -w "email LIKE '%@gmail.com'" -l 50

# Администраторы
docker exec -it $BACKEND python manage.py db-get -t users -w "is_admin=1"

# Сообщения из конкретной сессии, по дате
docker exec -it $BACKEND python manage.py db-get -t messages -w "session_id='abc-123'" -l 100 -o "created_at DESC"

# Подписки, истекающие через 24 часа
docker exec -it $BACKEND python manage.py db-get -t subscriptions -w "expires_at < datetime('now', '+1 day')"
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

### `db-update`

Обновить строки в таблице.

```bash
# Сделать пользователя администратором
docker exec -it $BACKEND python manage.py db-update -t users -s "is_admin=1" -w "email='admin@example.com'"

# Увеличить лимит запросов для пользователя
docker exec -it $BACKEND python manage.py db-update -t users -s "daily_requests_limit=100" -w "id=1"

# Обновить статус подписки
docker exec -it $BACKEND python manage.py db-update -t subscriptions -s "status='cancelled'" -w "user_id=1"

# Обновить ВСЕ строки (без -w)
docker exec -it $BACKEND python manage.py db-update -t users -s "daily_requests_limit=10"
```

**Параметры:**
| Флаг | Описание |
|------|----------|
| `-t, --table` | Имя таблицы |
| `-s, --set` | Выражение SET: `column='value'` |
| `-w, --where` | Условие WHERE (без — обновит ВСЕ строки) |

### `db-insert`

Вставить строку в таблицу.

```bash
# Вставить тарифный план
docker exec -it $BACKEND python manage.py db-insert \
  -t subscription_plans \
  -c "name,description,price,duration_days,daily_requests_limit,is_active" \
  -v "'Premium','Полный доступ',99000,30,100,1"
```

**Параметры:**
| Флаг | Описание |
|------|----------|
| `-t, --table` | Имя таблицы |
| `-c, --columns` | Колонки через запятую |
| `-v, --values` | Значения через запятую (строки в одинарных кавычках) |

### `db-delete`

Удалить строки из таблицы.

```bash
# Удалить конкретного пользователя
docker exec -it $BACKEND python manage.py db-delete -t users -w "email='test@test.com'"

# Удалить сообщения сессии
docker exec -it $BACKEND python manage.py db-delete -t messages -w "session_id='abc-123'"
```

**Параметры:**
| Флаг | Описание |
|------|----------|
| `-t, --table` | Имя таблицы |
| `-w, --where` | Условие WHERE (обязательно!) |

---

## Управление пользователями

### `create-test-user`

Создать тестового пользователя (если база пуста).

```bash
docker exec -it $BACKEND python manage.py create-test-user
# Email: admin@example.com, Пароль: admin123
```

### `create-admin`

Создать пользователя-администратора.

```bash
docker exec -it $BACKEND python manage.py create-admin \
  --name "Ivan" \
  --email "admin@example.com" \
  --password "secure_pass_123"
```

---

## Утилиты

### `clean-sessions`

Очистить старые файлы сессий Flask (старше 32 дней).

```bash
docker exec -it $BACKEND python manage.py clean-sessions
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
docker exec -it $(docker ps -qf "name=backend") python manage.py init-db

# 4. Создать админа
docker exec -it $(docker ps -qf "name=backend") python manage.py create-admin \
  --name "Admin" --email "admin@nikamentalhelth.ru" --password "СЕКРЕТ"

# 5. Проверить
docker exec -it $(docker ps -qf "name=backend") python manage.py db-info
```

### Обновление схемы (после изменения моделей):

```bash
# Пересобрать образ (новые модели попадут в образ)
docker compose build --no-cache
docker compose up -d

# Пересоздать таблицы по новым моделям
docker exec -it $(docker ps -qf "name=backend") python manage.py update-db
```

### Экстренный сброс БД:

```bash
# Удалить все данные
docker exec -it $(docker ps -qf "name=backend") python manage.py drop-db

# Пересоздать
docker exec -it $(docker ps -qf "name=backend") python manage.py init-db

# Пересоздать админа
docker exec -it $(docker ps -qf "name=backend") python manage.py create-admin \
  --name "Admin" --email "admin@example.com" --password "СЕКРЕТ"
```

---

## Шпаргалка

```bash
# ── Alias для удобства ──
BACKEND=$(docker ps -qf "name=backend")

# ── Быстрый старт ──
docker exec -it $BACKEND python manage.py --help      # все команды
docker exec -it $BACKEND python manage.py init-db      # создать таблицы
docker exec -it $BACKEND python manage.py db-info      # что в БД

# ── Просмотр ──
docker exec -it $BACKEND python manage.py db-tables                      # список таблиц
docker exec -it $BACKEND python manage.py db-schema users                # структура users
docker exec -it $BACKEND python manage.py db-count users                 # сколько строк
docker exec -it $BACKEND python manage.py db-get -t users -l 10          # первые 10
docker exec -it $BACKEND python manage.py db-get -t users -w "is_admin=1"  # админы
docker exec -it $BACKEND python manage.py db-query "SELECT email FROM users"

# ── Изменение ──
docker exec -it $BACKEND python manage.py db-update -t users -s "is_admin=1" -w "id=1"
docker exec -it $BACKEND python manage.py db-delete -t users -w "email='test@test.com'"

# ── Пользователи ──
docker exec -it $BACKEND python manage.py create-admin --name Admin --email a@b.com --password 123
```
