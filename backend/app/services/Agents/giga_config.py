"""
GigaChat configuration for the multi-agent system.
Loaded from environment variables.
"""
import os

CREDENTIALS = os.environ.get("GIGACHAT_CREDENTIALS", "")
GIGACHAT_SCOPE = os.environ.get("GIGACHAT_SCOPE", "GIGACHAT_API_PERS")
GIGACHAT_VERIFY_SSL_CERTS = os.environ.get("GIGACHAT_VERIFY_SSL_CERTS", "False").lower() == "true"
