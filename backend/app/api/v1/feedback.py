from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.extensions import db
from app.models.user import User
from app.services.email_service import send_feedback_email

feedback_bp = Blueprint('feedback', __name__, url_prefix='/api/v1/feedback')

@feedback_bp.route('/send', methods=['POST'])
@jwt_required()
def send_feedback():
    """
    Отправить обратную связь.
    ---
    tags:
      - Feedback
    security:
      - Bearer: []
    parameters:
      - in: body
        name: body
        schema:
          type: object
          required:
            - message
          properties:
            message:
              type: string
            feedback_type:
              type: string
              enum: [general, bug, feature, question]
    responses:
      200:
        description: Сообщение отправлено
    """
    user_id = get_jwt_identity()
    user = db.session.get(User, user_id)

    if not user:
        return jsonify({'error': 'Пользователь не найден'}), 404

    data = request.get_json()
    message = data.get('message')
    feedback_type = data.get('feedback_type', 'general')

    if not message:
        return jsonify({'error': 'Сообщение не может быть пустым'}), 400

    # Отправляем email
    try:
        send_feedback_email(
            user_name=user.name,
            user_email=user.email,
            feedback_type=feedback_type,
            message=message
        )
        return jsonify({'success': True, 'message': 'Спасибо за ваш отзыв!'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500