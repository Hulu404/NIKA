"""
GigaChat credentials loaded from environment variables.
No hardcoded secrets here.
"""
import os

# GigaChat auth key (Base64-encoded)
GIGA_KEY = os.environ.get("GIGA_KEY", "")

# Salute Speech auth key (Base64-encoded)
SALUTE_KEY = os.environ.get("SALUTE_KEY", "")

# Telegram bot token
TELEGRAM_BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "")
