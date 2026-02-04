from datetime import datetime, timedelta
from flask import request, session
import hashlib


class GuestManager:
    """Управление гостевой сессией"""

    # Константы для конфигурации
    GUEST_LIMIT = 5  # Лимит запросов для гостя
    RESET_HOURS = 24  # Через сколько часов сбрасывается лимит

    @staticmethod
    def get_guest_id():
        """Генерирует уникальный ID для гостя"""
        if 'guest_id' in session:
            return session['guest_id']

        # Создаем ID на основе IP + время + случайность
        guest_id = hashlib.md5(
            f"{request.remote_addr}{datetime.now().timestamp()}{hashlib.md5(str(datetime.now()).encode()).hexdigest()}".encode()
        ).hexdigest()[:16]

        # Инициализируем сессию гостя
        session['guest_id'] = guest_id
        session['guest_requests'] = 0
        session['guest_created'] = datetime.now().isoformat()
        session['guest_last_reset'] = datetime.now().isoformat()
        session['guest_next_reset'] = (datetime.now() + timedelta(hours=GuestManager.RESET_HOURS)).isoformat()
        session['guest_limit'] = GuestManager.GUEST_LIMIT

        print(f"🎫 Создан новый гость: {guest_id}")
        return guest_id

    @staticmethod
    def _check_and_reset():
        """Проверяет, не прошло ли 24 часа, и сбрасывает счетчик если нужно"""
        if 'guest_next_reset' not in session:
            return False

        try:
            reset_time = datetime.fromisoformat(session['guest_next_reset'])
            now = datetime.now()

            if now >= reset_time:
                print(f"🔄 Сброс лимита для гостя {session.get('guest_id', 'unknown')}")
                session['guest_requests'] = 0
                session['guest_last_reset'] = now.isoformat()
                session['guest_next_reset'] = (now + timedelta(hours=GuestManager.RESET_HOURS)).isoformat()
                session.modified = True
                return True
        except Exception as e:
            print(f"❌ Ошибка при проверке сброса: {e}")

        return False

    @staticmethod
    def can_make_request():
        """Проверяет, может ли гость сделать запрос"""
        # Проверяем и сбрасываем лимит если нужно
        GuestManager._check_and_reset()

        # Инициализируем если нет
        if 'guest_requests' not in session:
            session['guest_requests'] = 0
            session['guest_limit'] = GuestManager.GUEST_LIMIT
            session['guest_next_reset'] = (datetime.now() + timedelta(hours=GuestManager.RESET_HOURS)).isoformat()

        # Проверяем лимит
        current_requests = session.get('guest_requests', 0)
        limit = session.get('guest_limit', GuestManager.GUEST_LIMIT)

        return current_requests < limit

    @staticmethod
    def increment_requests():
        """Увеличивает счетчик запросов гостя"""
        # Проверяем сброс перед увеличением
        GuestManager._check_and_reset()

        # Инициализируем если нет
        if 'guest_requests' not in session:
            session['guest_requests'] = 0
            session['guest_limit'] = GuestManager.GUEST_LIMIT

        # Увеличиваем счетчик
        session['guest_requests'] = session.get('guest_requests', 0) + 1
        session.modified = True

        print(f"📊 Гость {session.get('guest_id', 'unknown')}: запросов = {session['guest_requests']}")

    @staticmethod
    def get_remaining_requests():
        """Возвращает оставшееся количество запросов"""
        # Проверяем сброс
        GuestManager._check_and_reset()

        if 'guest_requests' not in session:
            return GuestManager.GUEST_LIMIT

        current_requests = session.get('guest_requests', 0)
        limit = session.get('guest_limit', GuestManager.GUEST_LIMIT)

        return max(0, limit - current_requests)

    @staticmethod
    def get_reset_info():
        """Возвращает информацию о сбросе"""
        if 'guest_next_reset' not in session:
            return None

        try:
            reset_time = datetime.fromisoformat(session['guest_next_reset'])
            now = datetime.now()
            remaining = reset_time - now

            return {
                'reset_time': reset_time,
                'remaining_seconds': max(0, int(remaining.total_seconds())),
                'remaining_hours': max(0, int(remaining.total_seconds() / 3600)),
                'formatted': f"{int(remaining.total_seconds() / 3600)}ч {int((remaining.total_seconds() % 3600) / 60)}м"
            }
        except:
            return None

    @staticmethod
    def get_guest_info():
        """Возвращает полную информацию о госте"""
        return {
            'id': session.get('guest_id'),
            'requests_used': session.get('guest_requests', 0),
            'requests_remaining': GuestManager.get_remaining_requests(),
            'limit': session.get('guest_limit', GuestManager.GUEST_LIMIT),
            'created': session.get('guest_created'),
            'last_reset': session.get('guest_last_reset'),
            'next_reset': session.get('guest_next_reset'),
            'ip': request.remote_addr,
            'user_agent': request.user_agent.string if request.user_agent else None
        }