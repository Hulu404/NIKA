# Платежная система NIKA — ЮKassa

## Что реализовано

### Backend
- **Модели**: `SubscriptionPlan`, `Subscription`, `Payment` + поле `is_admin` в `User`
- **Сервис ЮKassa** (`app/services/yookassa_service.py`) — создание платежей, рекуррентные списания, проверка статуса
- **API подписок** (`/api/v1/subscription/`):
  - `GET /plans` — список тарифов (без авторизации)
  - `GET /my` — текущая подписка пользователя
  - `POST /create-payment` — создать платёж → redirect на ЮKassa
  - `POST /webhook` — вебхук от ЮKassa (succeeded/canceled)
  - `POST /cancel` — отмена подписки
  - `GET /check-payment/<id>` — проверка статуса платежа
- **Admin API** (`/api/v1/admin/plans/`) — CRUD тарифов
- **Автопродление** (`app/services/billing_scheduler.py`) — APScheduler, каждый час проверяет и продлевает подписки с сохранённым методом оплаты

### Frontend
- `/subscription` — страница выбора тарифа, кнопка оплаты → redirect на ЮKassa
- `/profile` — блок активной подписки (зелёный) с кнопкой отмены, или "Бесплатный план"
- `/admin/plans` — управление тарифами (видно только админам)

---

## Как запустить для клиента

### 1. Получить ключи ЮKassa

Зарегистрироваться в [ЮKassa](https://yookassa.ru/), создать магазин, получить:
- `shop_id` (идентификатор магазина)
- `secret_key` (секретный ключ API)

Для тестирования сначала использовать **тестовый магазин** в ЛК ЮKassa.

### 2. Задать переменные окружения

Создать файл `.env` в корне проекта:

```env
YOOKASSA_SHOP_ID=123456
YOOKASSA_SECRET_KEY=test_AbCdEfGhIjKlMnOpQrStUvWxYz
```

Переменные прокидываются в контейнер через `docker-compose.local.yml`.

### 3. Настроить вебхук в ЛК ЮKassa

В личном кабинете ЮKassa → Настройки → HTTP-уведомления:

```
URL: https://ваш-домен/api/v1/subscription/webhook
События: payment.succeeded, payment.canceled, payment.waiting_for_capture
```

**Важно**: вебхук должен быть доступен из интернета (не localhost).

### 4. Запустить приложение

```bash
docker compose -f docker-compose.local.yml up -d --build
```

### 5. Сделать пользователя админом

```bash
docker compose -f docker-compose.local.yml exec backend python -c "
from app import create_app
from app.extensions import db
from app.models.user import User
app = create_app()
with app.app_context():
    user = User.query.filter_by(email='EMAIL_АДМИНА').first()
    user.is_admin = True
    db.session.commit()
"
```

### 6. Создать тариф

Войти в профиль → Админ-панель → Управление тарифами → Новый тариф.

### 7. Подать заявку на рекуррентные платежи

В ЛК ЮKassa подать заявку на подключение рекуррентных платежей (автосписание). Без этого `save_payment_method` не будет работать и автопродление невозможно.

---

## Как тестировать без ЮKassa (через Postman)

### Имитация оплаты

**Шаг 1** — создать платёж в БД:

```bash
docker compose -f docker-compose.local.yml exec backend python -c "
from app import create_app
from app.extensions import db
from app.models.payment import Payment
app = create_app()
with app.app_context():
    p = Payment(user_id=ID_ПОЛЬЗОВАТЕЛЯ, yookassa_payment_id='test-pay-001', amount=70000, status='pending', description='Подписка NIKA — Premium')
    db.session.add(p)
    db.session.commit()
    print(f'Payment id={p.id}')
"
```

**Шаг 2** — отправить вебхук (Postman):

```
POST http://localhost/api/v1/subscription/webhook
Content-Type: application/json

{
  "event": "payment.succeeded",
  "object": {
    "id": "test-pay-001",
    "status": "succeeded",
    "payment_method": {
      "id": "pm-test-001",
      "saved": true
    },
    "metadata": {
      "user_id": "ID_ПОЛЬЗОВАТЕЛЯ",
      "plan_id": "1"
    }
  }
}
```

После этого у пользователя появится активная подписка.

---

## Как работает автопродление

1. Фоновый планировщик (APScheduler) запускается вместе с бэкендом
2. Каждый час проверяет подписки, истекающие в ближайшие 24 часа
3. Если у подписки есть сохранённый метод оплаты — создаёт рекуррентный платёж через ЮKassa
4. ЮKassa присылает вебхук `payment.succeeded` → подписка продлевается
5. Если метода оплаты нет — подписка становится `expired`, лимит запросов сбрасывается до 10

## Статусы подписки

| Статус | Значение |
|---|---|
| `active` | Действует, пользователь имеет расширенный лимит |
| `cancelled` | Отменена пользователем, не будет продлеваться |
| `expired` | Истекла, лимит сброшен до бесплатного |
| `pending` | Ожидает оплаты |

## Файлы

```
backend/
  app/
    models/
      subscription_plan.py   # Модель тарифа
      subscription.py         # Модель подписки
      payment.py              # Модель платежа
    api/v1/
      subscription.py         # API подписок + вебхук
      admin_plans.py          # Admin CRUD тарифов
    services/
      yookassa_service.py     # Интеграция с ЮKassa SDK
      billing_scheduler.py    # Автопродление (APScheduler)
frontend/
  src/pages/
    Subscription/             # Страница оформления подписки
    Admin/AdminPlans.tsx      # Админка тарифов
    Profile/Profile.tsx       # Профиль с блоком подписки
```
