"""
Salute Speech credentials loaded from environment variables.
No hardcoded secrets here.
"""
import os

# Salute Speech auth key (Base64-encoded)
SALUTE_KEY = os.environ.get("SALUTE_KEY", "")
