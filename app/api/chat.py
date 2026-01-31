from flask import Blueprint, send_from_directory, current_app
import os
from pathlib import Path

audio_bp = Blueprint('audio', __name__)


@audio_bp.route('/audio/<filename>')
def serve_audio(filename):
    cache_dir = current_app.config['AUDIO_CACHE_DIR']
    file_path = Path(cache_dir) / filename

    if not file_path.is_file():
        return {"error": "Файл не найден"}, 404

    return send_from_directory(cache_dir, filename, mimetype='audio/mpeg')