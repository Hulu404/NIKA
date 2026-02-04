from flask import Blueprint, render_template, redirect, url_for, request, flash, jsonify
from flask_login import current_user, login_required, login_user
from app.extensions import db
from app.models.user import User


main_bp = Blueprint('main', __name__)


@main_bp.route('/')
def index():
    """
    Главная страница
    Отображает home.html если пользователь не авторизован
    или перенаправляет в чат если авторизован
    """
    if current_user.is_authenticated:
        # Если пользователь уже авторизован, перенаправляем в чат
        return redirect(url_for('main.chat'))
    return render_template('home.html', is_authenticated=current_user.is_authenticated)


@main_bp.route('/chat')
@login_required
def chat():
    """
    Страница чата
    Доступна только авторизованным пользователям
    """
    return render_template('chat/index.html')


@main_bp.route('/login')
def login():
    """
    Страница входа
    Если пользователь уже авторизован, перенаправляем в чат
    """
    if current_user.is_authenticated:
        return redirect(url_for('main.chat'))
    return render_template('login.html')


@main_bp.route('/registration', methods=['GET', 'POST'])
def registration():
    if current_user.is_authenticated:
        return redirect(url_for('main.chat'))

    if request.method == 'POST':
        # Получаем данные из формы
        name = request.form.get('name')
        surname = request.form.get('surname')
        email = request.form.get('email')
        password = request.form.get('password')
        confirm_password = request.form.get('confirm_password')
        sex = request.form.get('sex')
        sport_type = request.form.get('sport_type')

        # Валидация
        errors = []

        if not all([name, surname, email, password, sex]):
            errors.append('Все обязательные поля должны быть заполнены')

        if password != confirm_password:
            errors.append('Пароли не совпадают')

        # if len(password) < 6:
        #     errors.append('Пароль должен быть не менее 6 символов')

        # Проверяем, существует ли пользователь с таким email
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            errors.append('Пользователь с таким email уже существует')

        if errors:
            if request.is_json or request.headers.get('Content-Type') == 'application/json':
                return jsonify({'success': False, 'errors': errors}), 400
            for error in errors:
                flash(error, 'error')
            return render_template('registration.html')

        try:
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
            login_user(user)

            if request.is_json or request.headers.get('Content-Type') == 'application/json':
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
            if request.is_json or request.headers.get('Content-Type') == 'application/json':
                return jsonify({'success': False, 'errors': [error_msg]}), 500
            flash(error_msg, 'error')

    return render_template('registration.html')