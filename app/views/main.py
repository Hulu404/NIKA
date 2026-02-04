from flask import Blueprint, render_template

main_bp = Blueprint('main', __name__)


@main_bp.route('/')
def home():
    return render_template('home.html')


@main_bp.route('/chat')
def chat():
    return render_template('chat/index.html')

@main_bp.route('/login')
def login():
    return render_template('login.html')

@main_bp.route('/registration')
def registration():
    return render_template('registration.html')