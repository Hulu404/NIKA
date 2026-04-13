# Резервное копирование и восстановление БД NIKA

## 📁 Файлы

| Файл | Назначение |
|------|-----------|
| `backup_nika_db.sh` | Одноразовый или cron-бэкап |
| `nika-down.sh` | Безопасная остановка с авто-бэкапом (замена `docker compose down`) |
| `restore_nika_db.sh` | Просмотр и восстановление данных из бэкапа |

## 📂 Куда сохраняются бэкапы

Все бэкапы хранятся в: `/root/NIKA/backups/nika_db/`

```
/root/NIKA/backups/nika_db/
├── nika_db_20260413_030000.db          # cron-бэкап (ежедневный)
├── nika_db_20260413_150000.db          # ручной бэкап
├── nika_db_pre_down_20260413_160000.db # авто-бэкап перед down
├── current_before_restore_...db        # бэкап перед восстановлением
└── backup.log                           # лог всех операций
```

---

## 1. backup_nika_db.sh — Резервное копирование

### Одноразовый бэкап

```bash
cd /root/NIKA/backend
./backup_nika_db.sh
```

**Вывод:**
```
[2026-04-13 15:00:00] 📦 Начало бэкапа: /root/NIKA/backend/instance/app.db -> /root/NIKA/backups/nika_db/nika_db_20260413_150000.db
[2026-04-13 15:00:01] ✅ Бэкап создан: /root/NIKA/backups/nika_db/nika_db_20260413_150000.db (128K)
[2026-04-13 15:00:01] ✅ Проверка: 8 таблиц в бэкапе
[2026-04-13 15:00:01] 📊 Всего бэкапов: 5 (храним 30 дней)
```

### Автоматический ежедневный бэкап (cron)

```bash
# 1. Открой crontab
crontab -e

# 2. Добавь строку (бэкап каждый день в 3:00)
0 3 * * * /root/NIKA/backend/backup_nika_db.sh --cron

# 3. Сохрани и выйди
```

**Расписание — примеры:**
```
# Каждый день в 3:00
0 3 * * * /root/NIKA/backend/backup_nika_db.sh --cron

# Каждые 6 часов
0 */6 * * * /root/NIKA/backend/backup_nika_db.sh --cron

# Каждый день в 3:00 и 15:00
0 3,15 * * * /root/NIKA/backend/backup_nika_db.sh --cron

# Каждое воскресенье в 2:00
0 2 * * 0 /root/NIKA/backend/backup_nika_db.sh --cron
```

Режим `--cron`:
- Тихий вывод (логи только в файл)
- Автоматически удаляет бэкапы старше 30 дней
- Не прерывает работу при ошибках

### Проверка cron

```bash
# Проверить текущие задачи
crontab -l

# Проверить лог cron
grep backup_nika /var/log/syslog | tail -20

# Или посмотреть лог бэкапов
cat /root/NIKA/backups/nika_db/backup.log
```

---

## 2. nika-down.sh — Безопасная остановка

**Вместо `docker compose down`** всегда используй этот скрипт. Он автоматически делает бэкап перед остановкой.

### Остановить (сохраняя данные)

```bash
cd /root/NIKA/backend
./nika-down.sh
```

Эквивалент: `docker compose down` + авто-бэкап

### Остановить и удалить volumes

```bash
./nika-down.sh -v
```

Эквивалент: `docker compose down -v` + авто-бэкап **перед удалением**

### С другим compose-файлом

```bash
./nika-down.sh -f docker-compose.local.yml
```

### Что происходит

```
╔══════════════════════════════════════════════╗
║  NIKA — Бэкап БД перед остановкой            ║
╚══════════════════════════════════════════════╝

✅ Бэкап: /root/NIKA/backups/nika_db/nika_db_pre_down_20260413_160000.db (128K)
   Таблиц: 8 | Пользователей: 42

🛑 Останавливаю контейнеры...
[+] down 3/3

══════════════════════════════════════════════
✅ Готово. Бэкапы: /root/NIKA/backups/nika_db
   Список бэкапов:
   -rw-r--r-- 1 root root 128K Apr 13 16:00 nika_db_20260413_030000.db
   -rw-r--r-- 1 root root 128K Apr 13 15:00 nika_db_20260413_150000.db
   -rw-r--r-- 1 root root 128K Apr 13 16:00 nika_db_pre_down_20260413_160000.db
══════════════════════════════════════════════
```

---

## 3. restore_nika_db.sh — Восстановление данных

### Просмотр данных из бэкапа

```bash
./restore_nika_db.sh /root/NIKA/backups/nika_db/nika_db_20260413_030000.db
```

Покажет:
- Список таблиц
- Всех пользователей
- Подписки
- Тарифные планы
- Платежи
- Refresh-токены

### Восстановление данных в текущую БД

```bash
./restore_nika_db.sh /root/NIKA/backups/nika_db/nika_db_20260413_030000.db --restore
```

Что делает:
1. Создаёт бэкап текущей БД (на случай отката)
2. Вставляет пользователей из бэкапа (пропуская дубли по email)
3. Вставляет refresh-токены (пропуская дубли по jti)
4. Вставляет тарифные планы (пропуская дубли по id)
5. Вставляет подписки (пропуская дубли по id)
6. Вставляет платежи (пропуская дубли по id)
7. Обновляет лимиты запросов у пользователей с активной подпиской

**Безопасность:**
- Никогда не перезаписывает существующие данные
- Автоматически бэкапит текущую БД перед вставкой
- Использует `INSERT OR IGNORE` — дубликаты игнорируются

---

## 🚀 Быстрый старт

### 1. Настрой ежедневный бэкап

```bash
# Подключись к серверу
ssh root@178.72.164.141

# Сделай бэкап прямо сейчас
cd /root/NIKA/backend
chmod +x backup_nika_db.sh nika-down.sh restore_nika_db.sh
./backup_nika_db.sh

# Настрой cron
crontab -e
# Добавь:
0 3 * * * /root/NIKA/backend/backup_nika_db.sh --cron
```

### 2. Всегда используй nika-down.sh

```bash
# Вместо: docker compose down
# Используй:
./nika-down.sh

# Вместо: docker compose down -v
# Используй:
./nika-down.sh -v
```

### 3. Если данные потеряны

```bash
# 1. Найди последний бэкап
ls -lht /root/NIKA/backups/nika_db/

# 2. Посмотри что в нём
./restore_nika_db.sh /root/NIKA/backups/nika_db/nika_db_20260413_030000.db

# 3. Восстанови
./restore_nika_db.sh /root/NIKA/backups/nika_db/nika_db_20260413_030000.db --restore

# 4. Перезапусти
docker compose up -d
```

---

## ⚠️ Важные правила

1. **НИКОГДА** не используй `docker compose down -v` без `nika-down.sh`
2. **ВСЕГДА** делай бэкап перед обновлением схемы БД
3. **ПРОВЕРЯЙ** что cron работает: `crontab -l`
4. **МОНИТОРЬ** место на диске: `du -sh /root/NIKA/backups/`
5. **ТЕСТИРУЙ** восстановление хотя бы раз в месяц

---

## 🔧 Ручное копирование БД

Если нужно быстро скопировать БД:

```bash
# Бэкап
cp /root/NIKA/backend/instance/app.db /root/NIKA/backups/nika_db/manual_$(date +%Y%m%d_%H%M%S).db

# Восстановить из файла
cp /root/NIKA/backups/nika_db/nika_db_20260413_030000.db /root/NIKA/backend/instance/app.db

# После копирования — перезапусти контейнеры
docker compose restart backend
```

Для SQLite-файла это безопасно, если контейнеры остановлены.
