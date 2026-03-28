# app/services/yookassa_service.py
"""
Сервис для работы с ЮKassa API.
Использует библиотеку yookassa.
"""
import os
import uuid
from yookassa import Configuration, Payment as YooPayment


def _configure():
    """Настраивает SDK ЮKassa из переменных окружения."""
    shop_id = os.environ.get('YOOKASSA_SHOP_ID')
    secret_key = os.environ.get('YOOKASSA_SECRET_KEY')
    if not shop_id or not secret_key:
        raise RuntimeError(
            'YOOKASSA_SHOP_ID и YOOKASSA_SECRET_KEY должны быть заданы в переменных окружения'
        )
    Configuration.account_id = shop_id
    Configuration.secret_key = secret_key


def create_payment(amount_rub: float, description: str, return_url: str,
                   save_payment_method: bool = False, metadata: dict = None):
    """
    Создаёт платёж в ЮKassa.

    Args:
        amount_rub: сумма в рублях (напр. 299.00)
        description: описание платежа
        return_url: URL для возврата после оплаты
        save_payment_method: сохранить метод оплаты для рекуррентов
        metadata: дополнительные данные (user_id, plan_id и т.д.)

    Returns:
        объект Payment от ЮKassa
    """
    _configure()

    idempotence_key = str(uuid.uuid4())

    # Формируем данные чека
    receipt_data = {
        "customer": {
            "email": metadata.get('email') if metadata else None
        },
        "items": [
            {
                "description": description[:128],  # ограничение длины
                "quantity": "1.00",
                "amount": {
                    "value": f"{amount_rub:.2f}",
                    "currency": "RUB"
                },
                "vat_code": "1",  # 1 = НДС не облагается
                "payment_mode": "full_payment",
                "payment_subject": "service"
            }
        ]
    }

    # Если email не передан – используем заглушку для тестов (в продакшене обязательно передавать реальный email)
    if not receipt_data["customer"]["email"]:
        receipt_data["customer"]["email"] = "customer@example.com"

    payment_data = {
        'amount': {
            'value': f'{amount_rub:.2f}',
            'currency': 'RUB',
        },
        'confirmation': {
            'type': 'redirect',
            'return_url': return_url,
        },
        'capture': True,
        'description': description,
        'save_payment_method': save_payment_method,
        'receipt': receipt_data,
    }

    if metadata:
        payment_data['metadata'] = metadata

    payment = YooPayment.create(payment_data, idempotence_key)
    return payment


def create_recurring_payment(amount_rub: float, payment_method_id: str,
                             description: str, metadata: dict = None):
    """
    Создаёт рекуррентный платёж (автосписание) по сохранённому методу оплаты.

    Args:
        amount_rub: сумма в рублях
        payment_method_id: ID сохранённого метода оплаты
        description: описание
        metadata: дополнительные данные

    Returns:
        объект Payment от ЮKassa
    """
    _configure()

    idempotence_key = str(uuid.uuid4())

    payment_data = {
        'amount': {
            'value': f'{amount_rub:.2f}',
            'currency': 'RUB',
        },
        'capture': True,
        'payment_method_id': payment_method_id,
        'description': description,
    }

    if metadata:
        payment_data['metadata'] = metadata

    payment = YooPayment.create(payment_data, idempotence_key)
    return payment


def get_payment_info(payment_id: str):
    """Получает информацию о платеже по ID."""
    _configure()
    return YooPayment.find_one(payment_id)
