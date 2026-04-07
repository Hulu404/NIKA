from flask import current_app
from flask_mail import Message
from app.extensions import mail

def send_feedback_email(user_name, user_email, feedback_type, message):
    with current_app.app_context():
        msg = Message(
            subject=f'Обратная связь NIKA: {feedback_type}',
            recipients=['ceo@mynika.ru'],  # целевой email
            body=f'''
            От: {user_name} ({user_email})
            Тип обращения: {feedback_type}
            Сообщение:
            {message}
            '''
        )
        mail.send(msg)