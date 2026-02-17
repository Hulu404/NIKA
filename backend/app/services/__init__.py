# app/services/__init__.py
from app.services.gigachat.giga_text import response_gigachat
from app.services.salute.salute_speech import speech_syntesis

__all__ = ["response_gigachat", "speech_syntesis"]