#!/bin/bash
#
# restore_nika_db.sh — Восстановление данных из старой/резервной копии БД
#
# Использование:
#   ./restore_nika_db.sh /путь/к/бэкапу.db              # показать данные из бэкапа
#   ./restore_nika_db.sh /путь/к/бэкапу.db --restore     # вставить в текущую БД
#

set -euo pipefail

OLD_DB="${1:-}"
DO_RESTORE="${2:-}"
NEW_DB="/root/NIKA/backend/instance/app.db"

if [[ -z "$OLD_DB" || ! -f "$OLD_DB" ]]; then
    echo "❌ Файл не найден: ${OLD_DB:-<не указан>}"
    echo "Использование: $0 /путь/к/бэкапу.db [--restore]"
    exit 1
fi

echo "╔══════════════════════════════════════════════╗"
echo "║  NIKA — Восстановление данных из бэкапа      ║"
echo "╚══════════════════════════════════════════════╝"
echo ""
echo "Источник: $OLD_DB"
echo ""

# ── Показать что есть ──────────────────────────────────
echo "📋 Таблицы в бэкапе:"
sqlite3 "$OLD_DB" ".tables"
echo ""

echo "👤 Пользователи ($(sqlite3 "$OLD_DB" "SELECT COUNT(*) FROM users;" 2>/dev/null || echo 0)):"
sqlite3 -header -column "$OLD_DB" \
    "SELECT id, name, last_name, email, gender, sport_type, is_admin, daily_requests_limit, created_at FROM users;" \
    2>/dev/null || echo "  (ошибка чтения)"
echo ""

echo "📊 Подписки:"
sqlite3 -header -column "$OLD_DB" \
    "SELECT id, user_id, plan_id, status, started_at, expires_at FROM subscriptions;" \
    2>/dev/null || echo "  (таблицы нет или пустая)"
echo ""

echo "💳 Тарифные планы:"
sqlite3 -header -column "$OLD_DB" \
    "SELECT id, name, price, duration_days, daily_requests_limit, is_active FROM subscription_plans;" \
    2>/dev/null || echo "  (таблицы нет или пустая)"
echo ""

echo "💰 Платежи:"
sqlite3 -header -column "$OLD_DB" \
    "SELECT id, user_id, subscription_id, yookassa_payment_id, amount, status FROM payments;" \
    2>/dev/null || echo "  (таблицы нет или пустая)"
echo ""

echo "🔄 Refresh токены:"
sqlite3 -header -column "$OLD_DB" \
    "SELECT id, jti, user_id, revoked, expires_at FROM refresh_tokens;" \
    2>/dev/null || echo "  (таблицы нет или пустая)"
echo ""

# ── Восстановление ─────────────────────────────────────
if [[ "$DO_RESTORE" == "--restore" ]]; then
    if [[ ! -f "$NEW_DB" ]]; then
        echo "❌ Текущая БД не найдена: $NEW_DB"
        echo "   Сначала инициализируйте: python manage.py init-db"
        exit 1
    fi

    echo "⚠️  Восстановлю данные из бэкапа в текущую БД..."
    echo "    Бэкап:  $OLD_DB"
    echo "    Текущая: $NEW_DB"
    echo ""
    read -p "Продолжить? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Отменено."
        exit 0
    fi

    # Бэкап текущей перед вставкой
    BACKUP_DIR="/root/NIKA/backups/nika_db"
    mkdir -p "$BACKUP_DIR"
    DATE=$(date +%Y%m%d_%H%M%S)
    cp "$NEW_DB" "${BACKUP_DIR}/current_before_restore_${DATE}.db"
    echo "📦 Текущая БД сохранена: ${BACKUP_DIR}/current_before_restore_${DATE}.db"
    echo ""

    # Используем ATTACH для копирования данных между базами
    sqlite3 "$NEW_DB" <<SQL
ATTACH DATABASE '$OLD_DB' AS old_db;

-- 1. Пользователи (пропускаем дубликаты по email)
INSERT OR IGNORE INTO users (id, name, last_name, email, gender, sport_type, is_admin, password_hash, daily_requests_limit, requests_today, last_request_date, created_at, updated_on)
SELECT id,
       COALESCE(name, ''),
       COALESCE(last_name, ''),
       email,
       COALESCE(gender, 'male'),
       COALESCE(sport_type, ''),
       COALESCE(is_admin, 0),
       COALESCE(password_hash, ''),
       COALESCE(daily_requests_limit, 3),
       COALESCE(requests_today, 0),
       COALESCE(last_request_date, date('now')),
       COALESCE(created_at, datetime('now')),
       COALESCE(updated_on, datetime('now'))
FROM old_db.users
WHERE email NOT IN (SELECT email FROM main.users);

-- 2. Refresh токены (пропускаем дубликаты по jti)
INSERT OR IGNORE INTO refresh_tokens (id, jti, user_id, token, expires_at, revoked, created_at)
SELECT id, jti, user_id, token, expires_at, COALESCE(revoked, 0), COALESCE(created_at, datetime('now'))
FROM old_db.refresh_tokens
WHERE jti NOT IN (SELECT jti FROM main.refresh_tokens);

-- 3. Тарифные планы (пропускаем дубликаты по id)
INSERT OR IGNORE INTO subscription_plans (id, name, description, price, duration_days, daily_requests_limit, is_active)
SELECT id, name, COALESCE(description, ''), price, duration_days,
       COALESCE(daily_requests_limit, 10), COALESCE(is_active, 1)
FROM old_db.subscription_plans
WHERE id NOT IN (SELECT id FROM main.subscription_plans);

-- 4. Подписки (пропускаем дубликаты по id)
INSERT OR IGNORE INTO subscriptions (id, user_id, plan_id, status, yookassa_payment_method_id, started_at, expires_at, cancelled_at, created_at)
SELECT id, user_id, plan_id, status,
       COALESCE(yookassa_payment_method_id, ''),
       started_at, expires_at, cancelled_at,
       COALESCE(created_at, datetime('now'))
FROM old_db.subscriptions
WHERE id NOT IN (SELECT id FROM main.subscriptions);

-- 5. Платежи (пропускаем дубликаты по id)
INSERT OR IGNORE INTO payments (id, user_id, subscription_id, yookassa_payment_id, amount, currency, status, payment_method_id, is_recurring, description)
SELECT id, user_id, COALESCE(subscription_id, 0),
       COALESCE(yookassa_payment_id, ''), amount,
       COALESCE(currency, 'RUB'), status,
       COALESCE(payment_method_id, ''), COALESCE(is_recurring, 0),
       COALESCE(description, '')
FROM old_db.payments
WHERE id NOT IN (SELECT id FROM main.payments);

-- 6. Обновляем лимиты пользователей по активной подписке
UPDATE main.users SET daily_requests_limit = (
    SELECT sp.daily_requests_limit
    FROM main.subscriptions s
    JOIN main.subscription_plans sp ON s.plan_id = sp.id
    WHERE s.user_id = main.users.id AND s.status = 'active'
    ORDER BY s.expires_at DESC
    LIMIT 1
) WHERE id IN (SELECT user_id FROM main.subscriptions WHERE status = 'active');

DETACH DATABASE old_db;
SQL

    echo ""
    echo "✅ Данные восстановлены!"
    echo ""
    echo "📊 Итог в текущей БД:"
    sqlite3 "$NEW_DB" "SELECT '  Пользователей: ' || COUNT(*) FROM users;"
    sqlite3 "$NEW_DB" "SELECT '  Подписок активных: ' || COUNT(*) FROM subscriptions WHERE status='active';"
    sqlite3 "$NEW_DB" "SELECT '  Тарифных планов: ' || COUNT(*) FROM subscription_plans;"
fi
