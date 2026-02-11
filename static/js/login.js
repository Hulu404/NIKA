const serializeForm = (formNode) => {
    return new FormData(formNode);
}

const handleFormSubmit = async (event) => {
    event.preventDefault();
    const data = serializeForm(event.target);

    // Показываем индикатор загрузки
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.textContent : 'Войти';
    if (submitBtn) {
        submitBtn.textContent = 'Вход...';
        submitBtn.disabled = true;
    }

    try {
        const response = await sendData(data);

        // Проверяем, является ли ответ JSON
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            const result = await response.json();

            if (result.success) {
                // Успешный вход, перенаправляем
                window.location.href = result.redirect || '/chat';
            } else {
                // Ошибка, показываем сообщение
                showError(result.error || 'Произошла ошибка при входе');
            }
        } else {
            // Если ответ не JSON, выводим ошибку
            showError('Неверный ответ от сервера');
        }
    } catch (error) {
        console.error('Ошибка при входе:', error);
        showError('Произошла ошибка при отправке формы');
    } finally {
        // Восстанавливаем кнопку
        if (submitBtn) {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }
}

const loginForm = document.getElementById('login_form');

if (loginForm) {
    loginForm.addEventListener('submit', handleFormSubmit);
}

const sendData = async (data) => {
    return await fetch('', {
        method: 'POST',
        body: data,
        headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }
    });
}

// Функция для отображения ошибок
function showError(message) {
    // Создаем контейнер для ошибки
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-message';
    errorContainer.style.cssText = `
        background: #ffebee;
        border: 1px solid #f44336;
        border-radius: 8px;
        padding: 12px 20px;
        margin: 15px 0;
        color: #c62828;
        font-family: 'Manrope', sans-serif;
        font-size: 14px;
        text-align: center;
        animation: fadeIn 0.3s ease;
    `;

    // Добавляем иконку и текст
    errorContainer.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
            <span style="font-size: 18px;">❌</span>
            <span>${message}</span>
        </div>
    `;

    // Удаляем старые ошибки
    const oldErrors = document.querySelectorAll('.error-message');
    oldErrors.forEach(error => error.remove());

    // Вставляем ошибку перед формой
    const form = document.getElementById('login_form');
    if (form) {
        form.parentNode.insertBefore(errorContainer, form);
    } else {
        // Если форму не нашли, вставляем в body
        document.body.insertBefore(errorContainer, document.body.firstChild);
    }

    // Автоматически скрываем через 5 секунд
    setTimeout(() => {
        if (errorContainer.parentNode) {
            errorContainer.style.opacity = '0';
            errorContainer.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                if (errorContainer.parentNode) {
                    errorContainer.parentNode.removeChild(errorContainer);
                }
            }, 300);
        }
    }, 5000);
}

// Добавляем CSS анимацию
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// Валидация в реальном времени
document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');

    // Удаляем предыдущие ошибки при вводе
    if (emailInput) {
        emailInput.addEventListener('input', () => {
            const errors = document.querySelectorAll('.error-message');
            errors.forEach(error => error.remove());
        });
    }

    if (passwordInput) {
        passwordInput.addEventListener('input', () => {
            const errors = document.querySelectorAll('.error-message');
            errors.forEach(error => error.remove());
        });
    }

    // Обработка Enter
    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && (emailInput === document.activeElement || passwordInput === document.activeElement)) {
            if (loginForm) {
                loginForm.dispatchEvent(new Event('submit'));
            }
        }
    });
});