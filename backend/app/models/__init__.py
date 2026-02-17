# app/models/__init__.py
from .chat import Message
from .refresh_token import RefreshToken
from .user import User  # Добавлено

__all__ = [
    'Message',
    'RefreshToken',
    'User',
]