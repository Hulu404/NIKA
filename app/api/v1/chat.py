from flask import Blueprint, request, jsonify, current_app
import base64
import uuid
from datetime import datetime
from app.services.gigachat.giga_start import response_gigachat     # ← позже переместим
from app.services.gigachat.speech import speech_syntesis     # ← позже переместим

chat_bp = Blueprint('chat_v1', __name__)


@chat_bp.post('/message')
def receive_text_only():
    data = request.get_json(silent=True) or {}
    user_text = data.get('message', '').strip()

    if not user_text:
        return jsonify({'error': 'Сообщение пустое'}), 400

    print(f"[TEXT] User: {user_text[:80]}...")

    try:
        reply = response_gigachat(user_text)
        print(f"[TEXT] Bot : {reply[:80]}...")
        return jsonify({'reply': reply})
    except Exception as e:
        print(f"[ERROR text] {e}")
        return jsonify({'reply': 'Ошибка при обращении к GigaChat 🙏'}), 500


@chat_bp.post('/message-with-audio')
def receive_with_audio():
    data = request.get_json(silent=True) or {}
    user_text = data.get('message', '').strip()

    if not user_text:
        return jsonify({'error': 'Сообщение пустое'}), 400

    print(f"[AUDIO REQ] User: {user_text[:80]}...")

    try:
        text_reply = response_gigachat(user_text)

        audio_resp = speech_syntesis(text_reply)
        if not audio_resp or 'audio_bytes' not in audio_resp:
            raise ValueError("Не удалось синтезировать речь")

        audio_bytes = audio_resp['audio_bytes']
        fmt = audio_resp.get('format', 'mp3')

        audio_id = uuid.uuid4().hex[:10]
        filename = f"audio_{audio_id}.{fmt}"
        full_path = current_app.config['AUDIO_CACHE_DIR'] / filename

        full_path.write_bytes(audio_bytes)
        print(f"[AUDIO SAVED] {filename}  ({len(audio_bytes):,} байт)")

        audio_b64 = base64.b64encode(audio_bytes).decode('utf-8')

        return jsonify({
            'success': True,
            'text': text_reply,
            'audio': {
                'base64': audio_b64,
                'format': fmt,
                'url': f'/api/audio/{filename}',
                'size_bytes': len(audio_bytes)
            },
            'meta': {
                'timestamp': datetime.utcnow().isoformat(),
                'msg_id': audio_id
            }
        })

    except Exception as e:
        print(f"[AUDIO ERROR] {type(e).__name__}: {e}")
        return jsonify({
            'success': False,
            'error': str(e)[:120],
            'text_fallback': text_reply if 'text_reply' in locals() else None
        }), 500