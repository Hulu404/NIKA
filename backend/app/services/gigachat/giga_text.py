import os
import requests
# import uuid
# import logging
# import ssl
# import aiohttp
from app.services.gigachat.giga_credentials import GIGA_KEY
from app.services.gigachat.giga_token import get_giga_token

SYSTEM_PROMPT = os.environ.get(
    "SYSTEM_PROMPT",
    "Ты — Ника, ИИ-помощник и цифровой наставник для спортсменов-любителей."
)

def response_gigachat(messages):
    """Функция получения ответа от ГЧ"""
    url = "https://gigachat.devices.sberbank.ru/api/v1/chat/completions"
    token = get_giga_token(GIGA_KEY)
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {token}'
    }

    payload = {
        "model": "GigaChat",
        "messages": messages,
        "temperature": 0.7
    }
    response = requests.post(url, headers=headers, json=payload, verify=False)
    answer = response.json()
    return answer['choices'][0]['message']['content']


### СТАРАЯ ВЕРСИЯ
# # Пайплайн запроса в Гигачат
# def get_gigachat_token(giga_key, scope='GIGACHAT_API_PERS'):
#     """Функция получения токена GigaChat"""
#     url = "https://ngw.devices.sberbank.ru:9443/api/v2/oauth"
#     headers = {
#         'Content-Type': 'application/x-www-form-urlencoded',
#         'Accept': 'application/json',
#         'RqUID': str(uuid.uuid4()),
#         'Authorization': f'Basic {giga_key}'
#     }
#     payload = {'scope': scope}
#     logging.captureWarnings(True)
#     response = requests.post(url, headers=headers, data=payload, verify=False)
#     response.raise_for_status()
#     return response.json()['access_token']


### СТАРАЯ ВЕРСИЯ
# # Пайплайн запроса в Салют
# def get_salute_token(salute_key, scope='SALUTE_SPEECH_PERS'):
#     """Функция для получения токена Salute"""
#     url = "https://ngw.devices.sberbank.ru:9443/api/v2/oauth"
#     payload = {
#         'scope': scope
#     }
#     headers = {
#         'Content-Type': 'application/x-www-form-urlencoded',
#         'Accept': 'application/json',
#         'RqUID': '3a6aa937-de2f-4913-87b5-83461799ce67',
#         'Authorization': f'Basic {salute_key}'
#     }
#     logging.captureWarnings(True)
#     response = requests.post(url, headers=headers, data=payload, verify=False)
#     response.raise_for_status()
#     return response.json()['access_token']
#
#
# async def recognize_speech(audio_file_path: str, token=get_salute_token(salute_key)) -> str:
#     """Функция для распознавания речи"""
#     url = "https://smartspeech.sber.ru/rest/v1/speech:recognize"
#     # Создаем SSL-контекст без проверки сертификатов
#     ssl_context = ssl.SSLContext()
#     ssl_context.check_hostname = False
#     ssl_context.verify_mode = ssl.CERT_NONE
#     async with aiohttp.ClientSession(connector=aiohttp.TCPConnector(ssl=ssl_context)) as session:
#         with open(audio_file_path, 'rb') as audio_file:
#             headers = {
#                 'Authorization': f'Bearer {token}',
#                 'Content-Type': 'audio/ogg;codecs=opus'  # Устанавливаем правильный тип контента
#             }
#             async with session.post(url, data=audio_file, headers=headers) as resp:
#                 json_resp = await resp.json()
#                 return json_resp['result'][0]