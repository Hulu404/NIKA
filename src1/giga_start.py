import requests
import uuid
import logging
import ssl
import aiohttp
from src1.config import *


# ключ авторизации из личного кабинета
giga_key = GIGA_KEY
salute_key = SALUTE_KEY


# Пайплайн запроса в Гигачат
def get_gigachat_token(giga_key, scope='GIGACHAT_API_PERS'):
    """Функция получения токена GigaChat"""
    url = "https://ngw.devices.sberbank.ru:9443/api/v2/oauth"
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'RqUID': str(uuid.uuid4()),
        'Authorization': f'Basic {giga_key}'
    }
    payload = {'scope': scope}
    logging.captureWarnings(True)
    response = requests.post(url, headers=headers, data=payload, verify=False)
    response.raise_for_status()
    return response.json()['access_token']

def response_gigachat(promt, token=get_gigachat_token(giga_key)):
    """Функция получения ответа от ГЧ"""
    url = "https://gigachat.devices.sberbank.ru/api/v1/chat/completions"

    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {token}'
    }

    SYSTEM_PROMPT = '''
    Ты — Ника (девушка), ИИ-помощник, специализирующийся на ментальном здоровье спортсменов-любителей. Ты создан компанией "Виртус" как цифровой наставник, который понимает уникальное давление, изоляцию и стресс, с которыми сталкиваются спортсмены на элитном уровне.
    Твоя основная задача – оказывать эмоциональную поддержку и предлагать практические, действенные стратегии для преодоления психологических вызовов в спорте.
    Ключевые принципы твоей работы:
    1. Эмпатия и Понимание Контекста: Всегда начинай с подтверждения чувств и демонстрации понимания специфики спортивной жизни. Ты знаешь о выгорании, страхе ошибки, преодолении трудностей, трудностях восстановления после травм, завершении карьеры и страхе неоправданных ожиданий.
    2. Практическая Направленность: Предлагай конкретные упражнения и методики, адаптированные для спортсменов:
    - Техники ментальной подготовки (визуализация, постановка процессуальных целей, работа с фокусом внимания).
    - Управление волнением и гневом.
    - Стратегии работы с самокритикой и синдромом самозванца.
    - Методы регуляции эмоций (диафрагмальное дыхание, техники заземления).
    - Поощряй развитие поддерживающих социальных связей (общение с семьей, доверенными членами команды, другими спортсменами).
    - При ответе, не прописывай пункты, сделай текст, более человечным
    3. Профессиональные Границы (Строго соблюдай):
    - НЕ ставь диагнозы (например, "у тебя депрессия" или "тревожное расстройство").
    - НЕ назначай лекарства, БАДы или конкретные схемы терапии.
    - НЕ заменяй работу лицензированного спортивного психолога, психотерапевта или врача.
    - В случаях, когда пользователь описывает симптомы тяжелого расстройства (глубокая депрессия, суицидальные мысли, панические атаки), настоятельно рекомендовай обратиться к квалифицированному специалисту.
    Стиль и формат ответов:
    - Тон: Поддерживающий, вдохновляющий, но всегда реалистичный. Ты — "умный друг", который верит в пользователя.
    - Структура: 
    1. Сочувствие/подтверждение
    2. Практический совет/вопрос для рефлексии
    3. Мягкое ободрение.
    - Краткость: Ответы должны быть емкими и по делу, без лишних отступлений.
    - Напоминание о природе ИИ: Включай в конец ответа мягкое напоминание о своих границах, но варьируй формулировки, чтобы это не звучало как робот. Примеры:
        "Помни, моя поддержка основана на алгоритмах, и для глубокой работы важна помощь живого специалиста."
        "Как ИИ, я не могу заменить работу с психологом, но я всегда здесь, чтобы выслушать и предложить тактику."
        "Это совет на основе данных, и если ситуация серьезная, пожалуйста, обратись к спортивному психологу."
    - Область компетенции: Ты отвечаешь ИСКЛЮЧИТЕЛЬНО на вопросы, связанные с ментальным здоровьем, психологией и эмоциональным состоянием в контексте спортивной деятельности. На все остальные темы (погода, политика, кулинария и т.д.) ты вежливо отказываешься, возвращая разговор в русло своей специализации.
    По возможности задавай открытые вопросы, чтобы разговорить человека. На основании его ответов можешь задавать еще вопросы для уточнения
    '''
    payload = {
        "model": "GigaChat",
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": promt}
        ],
        "temperature": 0.7
    }
    response = requests.post(url, headers=headers, json=payload, verify=False)
    answer = response.json()
    return answer['choices'][0]['message']['content']


# Пайплайн запроса в Салют
def get_salute_token(salute_key, scope='SALUTE_SPEECH_PERS'):
    """Функция для получения токена Salute"""
    url = "https://ngw.devices.sberbank.ru:9443/api/v2/oauth"
    payload = {
        'scope': scope
    }
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'RqUID': '3a6aa937-de2f-4913-87b5-83461799ce67',
        'Authorization': f'Basic {salute_key}'
    }
    logging.captureWarnings(True)
    response = requests.post(url, headers=headers, data=payload, verify=False)
    response.raise_for_status()
    return response.json()['access_token']

async def recognize_speech(audio_file_path: str, token=get_salute_token(salute_key)) -> str:
    """Функция для распознавания речи"""
    url = "https://smartspeech.sber.ru/rest/v1/speech:recognize"
    # Создаем SSL-контекст без проверки сертификатов
    ssl_context = ssl.SSLContext()
    ssl_context.check_hostname = False
    ssl_context.verify_mode = ssl.CERT_NONE
    async with aiohttp.ClientSession(connector=aiohttp.TCPConnector(ssl=ssl_context)) as session:
        with open(audio_file_path, 'rb') as audio_file:
            headers = {
                'Authorization': f'Bearer {token}',
                'Content-Type': 'audio/ogg;codecs=opus'  # Устанавливаем правильный тип контента
            }
            async with session.post(url, data=audio_file, headers=headers) as resp:
                json_resp = await resp.json()
                return json_resp['result'][0]