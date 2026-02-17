# app/models/__init__.py
<<<<<<< HEAD
from .chat import Message
=======

from app.models.chat import Message
from .user import User
from .message import Message
# from .session import Session
>>>>>>> 39b1e42fb839e4b32707850ff0028d6226bb4f5b
from .refresh_token import RefreshToken
from .user import User  # Добавлено

__all__ = [
    'Message',
<<<<<<< HEAD
=======
    'User',
    # 'Session',
>>>>>>> 39b1e42fb839e4b32707850ff0028d6226bb4f5b
    'RefreshToken',
    'User',
]