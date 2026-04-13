#!/bin/bash
#
# nika-down.sh — Безопасная остановка NIKA с бэкапом БД
#
# Использование вместо docker compose down:
#   ./nika-down.sh            # бэкап + down
#   ./nika-down.sh -v         # бэкап + down -v (удалит volume)
#   ./nika-down.sh --help     # справка
#

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
BACKUP_SCRIPT="${SCRIPT_DIR}/backup_nika_db.sh"
DB_PATH="/root/NIKA/backend/instance/app.db"
COMPOSE_FILE="${SCRIPT_DIR}/docker-compose.yml"
BACKUP_DIR="/root/NIKA/backups/nika_db"

# ── Помощь ─────────────────────────────────────────────
show_help() {
    echo "Использование: $(basename "$0") [ОПЦИИ]"
    echo ""
    echo "Безопасная остановка NIKA с автоматическим бэкапом БД"
    echo ""
    echo "Опции:"
    echo "  -v         Удалить volumes (аналог docker compose down -v)"
    echo "  -f, --file Файл docker-compose (по умолчанию docker-compose.yml)"
    echo "  --help     Показать эту справку"
    echo ""
    echo "Примеры:"
    echo "  $(basename "$0")           # Остановить + бэкап"
    echo "  $(basename "$0") -v        # Остановить + бэкап + удалить volumes"
    echo "  $(basename "$0") -f docker-compose.local.yml"
    echo ""
    echo "Бэкапы сохраняются в: $BACKUP_DIR"
    exit 0
}

# ── Парсинг ────────────────────────────────────────────
REMOVE_VOLUMES=false

while [[ $# -gt 0 ]]; do
    case "$1" in
        -v)
            REMOVE_VOLUMES=true
            shift
            ;;
        -f|--file)
            COMPOSE_FILE="$2"
            shift 2
            ;;
        --help|-h)
            show_help
            ;;
        *)
            echo "❌ Неизвестная опция: $1"
            show_help
            ;;
    esac
done

# ── Бэкап перед остановкой ─────────────────────────────
echo "╔══════════════════════════════════════════════╗"
echo "║  NIKA — Бэкап БД перед остановкой            ║"
echo "╚══════════════════════════════════════════════╝"
echo ""

if [[ -f "$DB_PATH" ]]; then
    mkdir -p "$BACKUP_DIR"
    DATE=$(date +%Y%m%d_%H%M%S)
    BACKUP_FILE="${BACKUP_DIR}/nika_db_pre_down_${DATE}.db"

    # Копируем через sqlite3 backup API
    if sqlite3 "$DB_PATH" ".backup '$BACKUP_FILE'" 2>/dev/null; then
        SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
        TABLES=$(sqlite3 "$BACKUP_FILE" ".tables" 2>/dev/null | wc -w)
        USERS=$(sqlite3 "$BACKUP_FILE" "SELECT COUNT(*) FROM users;" 2>/dev/null || echo "?")
        echo "✅ Бэкап: $BACKUP_FILE ($SIZE)"
        echo "   Таблиц: $TABLES | Пользователей: $USERS"
    else
        echo "⚠️ sqlite3 backup не сработал, пробую cp"
        cp "$DB_PATH" "$BACKUP_FILE" && echo "✅ Бэкап через cp: $BACKUP_FILE"
    fi
else
    echo "⚠️  Файл БД не найден: $DB_PATH"
    echo "   (возможно, БД внутри контейнера — бэкап невозможен)"
fi

echo ""

# ── Остановка ──────────────────────────────────────────
if [[ "$REMOVE_VOLUMES" == true ]]; then
    echo "⚠️  Останавливаю с удалением volumes..."
    echo "    (бэкап уже сохранён в $BACKUP_DIR)"
    echo ""
    docker compose -f "$COMPOSE_FILE" down -v
else
    echo "🛑 Останавливаю контейнеры..."
    docker compose -f "$COMPOSE_FILE" down
fi

echo ""
echo "══════════════════════════════════════════════"
echo "✅ Готово. Бэкапы: $BACKUP_DIR"
echo "   Список бэкапов:"
ls -lh "$BACKUP_DIR"/*.db 2>/dev/null || echo "   (нет)"
echo "══════════════════════════════════════════════"
