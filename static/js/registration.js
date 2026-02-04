const serializeForm = (formNode) => {
    return new FormData(formNode)
}

const handleFormSubmit = async (event) => {
    event.preventDefault()

    // Проверка пароля (опционально, можно добавить подтверждение)
    const password = document.querySelector('input[name="password"]').value;
//    if (password.length < 6) {
//        alert('Пароль должен быть не менее 6 символов');
//        return;
//    }

    const data = serializeForm(event.target)
    console.log('Отправляемые данные:', Array.from(data.entries()))

    try {
        const response = await sendData(data)

        if (response.ok) {
            // Успешная регистрация, перенаправляем
            window.location.href = '/login'; // или /chat если сразу логиним
        } else {
            // Ошибка сервера
            const result = await response.json();
            alert(result.message || 'Ошибка при регистрации');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при отправке формы');
    }
}

const registrationForm = document.getElementById('registration_form')
if (registrationForm) {
    registrationForm.addEventListener('submit', handleFormSubmit)
}

const sendData = async (data) => {
    return await fetch('', {
        method: 'POST',
        body: data,
    })
}

// Исправляем логику для radio-кнопок (лучше переделать на radio в HTML)
const maleCheckbox = document.getElementById("male-checkbox")
const femaleCheckbox = document.getElementById("female-checkbox")
const maleLabel = document.getElementById("male-label")
const femaleLabel = document.getElementById("female-label")

const handleCheckboxClick = (event) => {
    if (event.target.id === 'male-checkbox') {
        femaleCheckbox.checked = false;
        maleCheckbox.checked = true;
        femaleLabel.classList.remove('sex_check-checked');
        femaleLabel.classList.add('sex_check');
        maleLabel.classList.remove('sex_check');
        maleLabel.classList.add('sex_check-checked');
    } else if (event.target.id === 'female-checkbox') {
        maleCheckbox.checked = false;
        femaleCheckbox.checked = true;
        maleLabel.classList.remove('sex_check-checked');
        maleLabel.classList.add('sex_check');
        femaleLabel.classList.remove('sex_check');
        femaleLabel.classList.add('sex_check-checked');
    }
}

if (maleCheckbox && femaleCheckbox) {
    maleCheckbox.addEventListener('change', handleCheckboxClick)
    femaleCheckbox.addEventListener('change', handleCheckboxClick)
}

// Добавьте эту функцию для отображения ошибок
function showErrors(errors) {
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-messages';
    errorContainer.style.cssText = `
        background: #ffebee;
        border: 1px solid #f44336;
        border-radius: 4px;
        padding: 10px;
        margin: 10px 0;
        color: #c62828;
    `;

    errors.forEach(error => {
        const errorItem = document.createElement('p');
        errorItem.textContent = `• ${error}`;
        errorItem.style.margin = '5px 0';
        errorContainer.appendChild(errorItem);
    });

    // Вставляем перед формой
    const form = document.getElementById('registration_form');
    form.parentNode.insertBefore(errorContainer, form);

    // Автоматически удаляем через 5 секунд
    setTimeout(() => {
        if (errorContainer.parentNode) {
            errorContainer.parentNode.removeChild(errorContainer);
        }
    }, 5000);
}