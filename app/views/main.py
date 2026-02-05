from flask import Blueprint, render_template, redirect, url_for, request, flash, jsonify
from flask_login import current_user, login_required, login_user
from app.extensions import db
from app.models.guest_manager import GuestManager
from app.models.user import User


main_bp = Blueprint('main', __name__)


@main_bp.route('/')
def index():
    """
    Главная страница
    """
    return render_template('home.html', is_authenticated=current_user.is_authenticated)

@main_bp.route('/start-guest')
def start_guest():
    """
    Начать как гость - создает гостевую сессию
    """
    if current_user.is_authenticated:
        # Если пользователь уже авторизован, перенаправляем в чат
        print('пользователь авторизован')
        return redirect(url_for('main.chat'))
    guest_id = GuestManager.get_guest_id()
    return redirect(url_for('main.chat', guest=True))


@main_bp.route('/chat')
def chat():
    """ Страница чата """
    return render_template('chat/index.html')


@main_bp.route('/login', methods=['GET', 'POST'])
def login():
    """
    Страница входа
    Если пользователь уже авторизован, перенаправляем в чат
    """
    if current_user.is_authenticated:
        return redirect(url_for('main.chat'))

    if request.method == 'POST':
        # Получаем данные из формы
        email = request.form.get('email')
        password = request.form.get('password')

        # Валидация
        if not email or not password:
            return jsonify({
                'success': False,
                'error': 'Пожалуйста, заполните все поля'
            }), 400

        # Ищем пользователя по email
        user = User.query.filter_by(email=email).first()

        if user is None or not user.check_password(password):
            return jsonify({
                'success': False,
                'error': 'Неверный email или пароль'
            }), 401

        # Авторизуем пользователя
        login_user(user, remember=True)

        # Успешный вход
        return jsonify({
            'success': True,
            'message': 'Вход выполнен успешно!',
            'redirect': url_for('main.chat')
        })

    # GET запрос - показываем форму
    return render_template('login.html')


@main_bp.route('/registration', methods=['GET', 'POST'])
def registration():
    if current_user.is_authenticated:
        return redirect(url_for('main.chat'))

    if request.method == 'POST':
        # Проверяем формат запроса (form или json)
        is_json = request.is_json or request.headers.get('Content-Type') == 'application/json'

        if is_json:
            # Данные приходят в JSON формате (от новой формы)
            data = request.get_json()
            name = data.get('name')
            surname = data.get('surname')
            email = data.get('email')
            password = data.get('password')
            gender = data.get('gender')
            sport_type = data.get('sport_type')
        else:
            # Данные приходят из формы (старый формат)
            name = request.form.get('name')
            surname = request.form.get('surname')
            email = request.form.get('email')
            password = request.form.get('password')
            confirm_password = request.form.get('confirm_password')
            gender = request.form.get('gender')
            sport_type = request.form.get('sport_type')

        # Валидация
        errors = []

        # Проверяем обязательные поля
        if not name:
            errors.append('Имя обязательно для заполнения')
        if not surname:
            errors.append('Фамилия обязательна для заполнения')
        if not email:
            errors.append('Email обязателен для заполнения')
        if not password:
            errors.append('Пароль обязателен для заполнения')
        if not gender:
            errors.append('Пол обязателен для выбора')

        # Проверяем email
        if email and not validate_email_format(email):
            errors.append('Некорректный формат email')

        # Проверяем пароль (только для формы, не для JSON)
        if not is_json and password and confirm_password:
            if password != confirm_password:
                errors.append('Пароли не совпадают')

        # Проверяем длину пароля
        if password and len(password) < 6:
            errors.append('Пароль должен быть не менее 6 символов')

        # Проверяем, существует ли пользователь с таким email
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            errors.append('Пользователь с таким email уже существует')

        if errors:
            if is_json:
                return jsonify({
                    'success': False,
                    'message': errors[0],
                    'errors': errors
                }), 400
            for error in errors:
                flash(error, 'error')
            return render_template('registration.html')

        try:
            # Преобразуем gender в sex для модели
            sex = 'female' if gender == 'female' else 'male'

            # Создаем нового пользователя
            user = User(
                name=name,
                surname=surname,
                email=email,
                sex=sex,
                sport_type=sport_type
            )
            user.set_password(password)

            db.session.add(user)
            db.session.commit()

            # Автоматически логиним пользователя после регистрации
            login_user(user, remember=True)

            if is_json:
                return jsonify({
                    'success': True,
                    'message': 'Регистрация успешна',
                    'redirect': url_for('main.chat')
                })

            flash('Регистрация успешна!', 'success')
            return redirect(url_for('main.chat'))

        except Exception as e:
            db.session.rollback()
            error_msg = f'Ошибка при регистрации: {str(e)}'

            if is_json:
                return jsonify({
                    'success': False,
                    'message': error_msg,
                    'errors': [error_msg]
                }), 500

            flash(error_msg, 'error')
            return render_template('registration.html')

    return render_template('registration.html')


def validate_email_format(email):
    """Проверка формата email"""
    import re
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None