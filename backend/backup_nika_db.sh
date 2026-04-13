#!/bin/bash
#
# backup_nika_db.sh — Резервное копирование БД NIKA
#
# Использование:
#   ./backup_nika_db.sh              # одноразовый бэкап
#   ./backup_nika_db.sh --cron       # из cron (тихий режим, удаляет старше 30 дней)
#
# Автоматический бэкап (добавить в crontab):
#   0 3 * * * /root/NIKA/backend/backup_nika_db.sh --cron
#

set -euo pipefail

# ── Настройки ──────────────────────────────────────────
DB_PATH="/root/NIKA/backend/instance/app.db"
BACKUP_DIR="/root/NIKA/backups/nika_db"
RETENTION_DAYS=30
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="${BACKUP_DIR}/nika_db_${DATE}.db"
LOG_FILE="${BACKUP_DIR}/backup.log"

# ── Функции ────────────────────────────────────────────
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# ── Парсинг аргументов ─────────────────────────────────
CRON_MODE=false
if [[ "${1:-}" == "--cron" ]]; then
    CRON_MODE=true
fi

# ── Создание директории ────────────────────────────────
mkdir -p "$BACKUP_DIR"

# ── Проверка наличия БД ────────────────────────────────
if [[ ! -f "$DB_PATH" ]]; then
    log "❌ Файл БД не найден: $DB_PATH"
    exit 1
fi

# ── Бэкап (копируем с sync для целостности) ────────────
log "📦 Начало бэкапа: $DB_PATH -> $BACKUP_FILE"

# Используем sqlite3 backup API для консистентной копии
sqlite3 "$DB_PATH" ".backup '$BACKUP_FILE'" 2>/dev/null || {
    log "⚠️ sqlite3 backup API не сработал, используем cp"
    cp "$DB_PATH" "$BACKUP_FILE"
}

if [[ -f "$BACKUP_FILE" ]]; then
    SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
    log "✅ Бэкап создан: $BACKUP_FILE ($SIZE)"

    # Проверка целостности
    TABLES=$(sqlite3 "$BACKUP_FILE" ".tables" 2>/dev/null | wc -w)
    if [[ "$TABLES" -gt 0 ]]; then
        log "✅ Проверка: $TABLES таблиц в бэкапе"
    else
        log "❌ Бэкап повреждён — нет таблиц!"
        rm -f "$BACKUP_FILE"
        exit 1
    fi
else
    log "❌ Не удалось создать бэкап"
    exit 1
fi

# ── Очистка старых бэкапов ─────────────────────────────
if [[ "$CRON_MODE" == true ]]; then
    DELETED=$(find "$BACKUP_DIR" -name "nika_db_*.db" -mtime +${RETENTION_DAYS} -delete -print 2>/dev/null | wc -l)
    [[ "$DELETED" -gt 0 ]] && log "🧹 Удалено старых бэкапов: $DELETED"
fi

# ── Итог ───────────────────────────────────────────────
TOTAL=$(ls -1 "$BACKUP_DIR"/nika_db_*.db 2>/dev/null | wc -l)
log "📊 Всего бэкапов: $TOTAL (храним $RETENTION_DAYS дней)"
