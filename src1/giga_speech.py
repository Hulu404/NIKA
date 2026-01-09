import requests
import uuid
import logging
import ssl
import aiohttp
import json
import asyncio
from src1.config import *
from src1.giga_start import get_salute_token


# ключ авторизации из личного кабинета
giga_key = GIGA_KEY
salute_key = SALUTE_KEY


def speech_syntesis(giga_text_answer: str, token=get_salute_token(salute_key)) -> dict:

    url = "https://smartspeech.sber.ru/rest/v1/text:synthesize"

    headers = {
    'Content-Type': 'application/text',
    'Accept': 'audio/x-wav',
    'Authorization': f'Bearer {token}'
    }
    payload = {
        'text': giga_text_answer,
        'format': 'mp3',
        'voice': "Nec_24000", 
        'speed': 1.0,
        'emotion': 'neutral'
    }

    response = requests.post(
        url,
        headers=headers,
        data=giga_text_answer.encode('utf-8'),  # текст как байты
        verify=False,
        timeout=10
    )

    if response.status_code != 200:
        print(f"[TTS ERROR] Status: {response.status_code}, Response: {response.text[:200]}")
        return None
    
    audio_bytes = response.content
    
    return {
        'audio_bytes': audio_bytes,
        'format': 'mp3',
        'size_bytes': len(audio_bytes)
    }
