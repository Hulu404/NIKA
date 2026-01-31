# app/services/__init__.py
from app.services.gigachat.giga_start import response_gigachat
from app.services.gigachat.speech import speech_syntesis

__all__ = ["response_gigachat", "speech_syntesis"]