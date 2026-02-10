import requests
import urllib.parse
from app.services.gigachat.salute_token import get_salute_token
from app.services.gigachat.giga_credentials import SALUTE_KEY


def speech_syntesis(giga_text_answer: str) -> dict:
    '''
    Токен салют теперь запрашивается через API раз в 30 мин (срок его жизни). Пока он жив, он хранится в кэше.
    Если нужно вручную обновить ключ: refresh_salute_token(SALUTE_KEY)
    Если нужно посмотреть статус ключа: get_token_status()
    '''

    token = get_salute_token(SALUTE_KEY)
    base_url = "https://smartspeech.sber.ru/rest/v1/text:synthesize"

    headers = {
        'Content-Type': 'application/text',
        'Accept': 'audio/x-wav', # Работает только формат wav
        'Authorization': f'Bearer {token}'
    }
    params = {
        'format': 'wav16', # Только wav
        'voice': "Nec_24000", # Ставим женский голос
        'speed': 1.0,
        'emotion': 'neutral',
        'sample_rate': 24000
    }
    # Кодируем параметры в URL
    query_string = urllib.parse.urlencode(params)
    url = f"{base_url}?{query_string}"
    print(f"[TTS DEBUG] URL с параметрами: {url}")

    response = requests.post(
        url,
        headers=headers,
        data=giga_text_answer.encode('utf-8'),
        verify=False,
        timeout=10
    )

    if response.status_code != 200:
        print(f"[TTS ERROR] Status: {response.status_code}, Response: {response.text[:200]}")
        return None

    audio_bytes = response.content

    return {
        'audio_bytes': audio_bytes,
        'format': 'wav',
        'size_bytes': len(audio_bytes)
    }
