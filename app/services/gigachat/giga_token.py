import time
import uuid

import requests
import logging

# Глобальные переменные для хранения токена и времени его получения
_GIGA_TOKEN_CACHE = None
_GIGA_TOKEN_EXPIRY_TIME = 0
_GIGA_TOKEN_LIFETIME = 1800  # 30 минут в секундах


def get_giga_token(giga_key, scope='GIGACHAT_API_PERS'):
    """Функция для получения токена GigaChat с кэшированием на 30 минут"""
    global _GIGA_TOKEN_CACHE, _GIGA_TOKEN_EXPIRY_TIME

    current_time = time.time()

    # Если токен есть в кэше и еще не истек, возвращаем его
    if _GIGA_TOKEN_CACHE and current_time < _GIGA_TOKEN_EXPIRY_TIME:
        logging.debug(f"Возвращаем кэшированный токен. Осталось времени: {int(_GIGA_TOKEN_EXPIRY_TIME - current_time)} сек")
        return _GIGA_TOKEN_CACHE

    # Иначе запрашиваем новый токен
    logging.debug("Токен отсутствует или истек. Запрашиваем новый...")

    url = "https://ngw.devices.sberbank.ru:9443/api/v2/oauth"
    payload = {
        'scope': scope
    }
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'RqUID': str(uuid.uuid4()),
        'Authorization': f'Basic {giga_key}'
    }

    # # Включаем логирование предупреждений SSL (при необходимости)
    # logging.captureWarnings(True)

    try:
        # Добавляем таймауты для безопасности
        response = requests.post(
            url,
            headers=headers,
            data=payload,
            verify=False,
            timeout=10
        )
        response.raise_for_status()

        # Получаем токен
        new_token = response.json()['access_token']

        # Сохраняем токен и время истечения
        _GIGA_TOKEN_CACHE = new_token
        _GIGA_TOKEN_EXPIRY_TIME = current_time + _GIGA_TOKEN_LIFETIME

        logging.debug(f"Новый токен получен. Истекает через {_GIGA_TOKEN_LIFETIME} сек")
        return new_token

    except requests.exceptions.RequestException as e:
        logging.error(f"Ошибка при получении токена: {e}")
        # При ошибке можно вернуть старый токен, если он есть (даже если просрочен)
        if _GIGA_TOKEN_CACHE:
            logging.warning("Возвращаем просроченный токен из-за ошибки запроса")
            return _GIGA_TOKEN_CACHE
        raise


# Дополнительная функция для принудительного обновления токена
def refresh_giga_token(giga_key, scope='GIGACHAT_API_PERS'):
    """Принудительное обновление токена, игнорируя кэш"""
    global _GIGA_TOKEN_CACHE, _GIGA_TOKEN_EXPIRY_TIME

    # Сбрасываем кэш
    _GIGA_TOKEN_CACHE = None
    _GIGA_TOKEN_EXPIRY_TIME = 0

    # Получаем новый токен
    return get_giga_token(giga_key, scope)


# Функция для проверки состояния токена
def get_giga_token_status():
    """Возвращает информацию о текущем состоянии токена"""
    global _GIGA_TOKEN_CACHE, _GIGA_TOKEN_EXPIRY_TIME

    current_time = time.time()

    if not _GIGA_TOKEN_CACHE:
        return {
            'status': 'Нет токена в кэше',
            'has_token': False
        }

    time_left = _GIGA_TOKEN_EXPIRY_TIME - current_time

    return {
        'status': 'Токен активен' if time_left > 0 else 'Токен истек',
        'has_token': True,
        'time_left_seconds': max(0, int(time_left)),
        'token_preview': f"{_GIGA_TOKEN_CACHE[:20]}..." if _GIGA_TOKEN_CACHE else None
    }