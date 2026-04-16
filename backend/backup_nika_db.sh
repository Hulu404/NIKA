#!/bin/bash
#
# backup_nika_db.sh — резервное копирование БД NIKA (.db + CSV-выгрузка таблиц)
#
# Использование:
#   ./backup_nika_db.sh              # одноразовый бэкап
#   ./backup_nika_db.sh --cron       # из cron (удаляет старше RETENTION_DAYS)
#
# Автоматический бэкап (добавить в crontab):
#   0 3 * * * /root/NIKA/backend/backup_nika_db.sh --cron
#

set -euo pipefail

DB_PATH="/root/NIKA/backend/instance/app.db"
BACKUP_DIR="/root/NIKA/backups/nika_db"
CSV_DIR="${BACKUP_DIR}/csv"
RETENTION_DAYS=30
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="${BACKUP_DIR}/nika_db_${DATE}.db"
CSV_DUMP_DIR="${CSV_DIR}/nika_db_${DATE}"
LOG_FILE="${BACKUP_DIR}/backup.log"
RCLONE_REMOTE="yandex:nika_db_backup"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

CRON_MODE=false
if [[ "${1:-}" == "--cron" ]]; then
    CRON_MODE=true
fi

mkdir -p "$BACKUP_DIR" "$CSV_DIR"

if [[ ! -f "$DB_PATH" ]]; then
    log "Файл БД не найден: $DB_PATH"
    exit 1
fi

# .db бэкап
log "Бэкап .db: $DB_PATH -> $BACKUP_FILE"

sqlite3 "$DB_PATH" ".backup '$BACKUP_FILE'" 2>/dev/null || {
    log "sqlite3 backup API не сработал, fallback на cp"
    cp "$DB_PATH" "$BACKUP_FILE"
}

if [[ ! -f "$BACKUP_FILE" ]]; then
    log "Не удалось создать .db бэкап"
    exit 1
fi

SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
TABLES=$(sqlite3 "$BACKUP_FILE" ".tables" 2>/dev/null | wc -w)
if [[ "$TABLES" -eq 0 ]]; then
    log ".db бэкап повреждён, нет таблиц"
    rm -f "$BACKUP_FILE"
    exit 1
fi
log ".db создан: $BACKUP_FILE ($SIZE, $TABLES таблиц)"

# CSV-выгрузка всех таблиц
mkdir -p "$CSV_DUMP_DIR"
log "CSV-выгрузка: $CSV_DUMP_DIR"
CSV_COUNT=0
for TABLE in $(sqlite3 "$BACKUP_FILE" ".tables"); do
    CSV_FILE="${CSV_DUMP_DIR}/${TABLE}.csv"
    HEADER=$(sqlite3 "$BACKUP_FILE" "PRAGMA table_info(${TABLE});" | awk -F'|' '{print $2}' | paste -sd,)
    echo "$HEADER" > "$CSV_FILE"
    sqlite3 -csv "$BACKUP_FILE" "SELECT * FROM ${TABLE};" >> "$CSV_FILE"
    ROWS=$(($(wc -l < "$CSV_FILE") - 1))
    log "  ${TABLE}.csv: ${ROWS} строк"
    CSV_COUNT=$((CSV_COUNT + 1))
done
log "CSV готов: ${CSV_COUNT} таблиц в ${CSV_DUMP_DIR}"

# Ротация в --cron режиме
if [[ "$CRON_MODE" == true ]]; then
    DELETED_DB=$(find "$BACKUP_DIR" -maxdepth 1 -name "nika_db_*.db" -mtime +${RETENTION_DAYS} -delete -print 2>/dev/null | wc -l)
    DELETED_CSV=$(find "$CSV_DIR" -maxdepth 1 -type d -name "nika_db_*" -mtime +${RETENTION_DAYS} -exec rm -rf {} + -print 2>/dev/null | wc -l)
    [[ "$DELETED_DB" -gt 0 ]] && log "Удалено старых .db: $DELETED_DB"
    [[ "$DELETED_CSV" -gt 0 ]] && log "Удалено старых CSV-папок: $DELETED_CSV"
fi

# Синхронизация на Яндекс.Диск
if command -v rclone >/dev/null 2>&1 && rclone listremotes 2>/dev/null | grep -q '^yandex:'; then
    log "Синхронизация с ${RCLONE_REMOTE}"
    if rclone sync "$BACKUP_DIR" "$RCLONE_REMOTE" \
        --exclude "backup.log" \
        --transfers 4 \
        --retries 2 \
        --log-file "$LOG_FILE" \
        --log-level INFO 2>&1; then
        REMOTE_DB=$(rclone lsf "$RCLONE_REMOTE" --include "nika_db_*.db" 2>/dev/null | wc -l)
        REMOTE_CSV=$(rclone lsf "$RCLONE_REMOTE/csv/" --dirs-only 2>/dev/null | wc -l)
        log "На Яндекс.Диске: .db=$REMOTE_DB, CSV-папок=$REMOTE_CSV"
    else
        log "ВНИМАНИЕ: rclone sync завершился с ошибкой"
    fi
else
    log "rclone или remote yandex: не настроен, Яндекс.Диск пропущен"
fi

TOTAL_DB=$(ls -1 "$BACKUP_DIR"/nika_db_*.db 2>/dev/null | wc -l)
TOTAL_CSV=$(ls -1d "$CSV_DIR"/nika_db_*/ 2>/dev/null | wc -l)
log "Итого локально: .db=$TOTAL_DB, CSV-папок=$TOTAL_CSV (хранение $RETENTION_DAYS дн.)"
