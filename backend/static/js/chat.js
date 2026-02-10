document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const messagesList = document.getElementById('messagesList');
    const typingIndicator = document.getElementById('typingIndicator');
    const menuToggle = document.querySelector('.menu-toggle');
    const closeSidebar = document.querySelector('.close-sidebar');
    const sidebar = document.querySelector('.sidebar');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const newChatBtn = document.querySelector('.new-chat-btn');
    const promptCards = document.querySelectorAll('.prompt-card');
    const emptyState = document.getElementById('emptyState');
    
    // Состояние чата
    let messages = Array.from(messagesList.querySelectorAll('.message')).map(msg => ({
        content: msg.querySelector('.message-bubble p').textContent,
        role: msg.classList.contains('bot-message') ? 'assistant' : 'user',
        time: msg.querySelector('.message-time').textContent
    }));
    
    // Обработчики событий
    
    // Открытие/закрытие боковой панели
    menuToggle.addEventListener('click', () => {
        sidebar.classList.add('active');
        mobileOverlay.classList.add('active');
    });
    
    closeSidebar.addEventListener('click', () => {
        sidebar.classList.remove('active');
        mobileOverlay.classList.remove('active');
    });
    
    mobileOverlay.addEventListener('click', () => {
        sidebar.classList.remove('active');
        mobileOverlay.classList.remove('active');
    });
    
    // Новый чат
    newChatBtn.addEventListener('click', () => {
        messagesList.innerHTML = '';
        messages = [];
        emptyState.style.display = 'flex';
    });
    
    // Выбор подсказки
    promptCards.forEach(card => {
        card.addEventListener('click', () => {
            const prompt = card.getAttribute('data-prompt');
            messageInput.value = prompt;
            messageInput.focus();
            emptyState.style.display = 'none';
        });
    });
    
    // Отправка сообщения
    function sendMessage() {
        const content = messageInput.value.trim();
        if (!content) return;
        
        // Добавление сообщения пользователя
        const userMessage = createMessage(content, 'user');
        messagesList.appendChild(userMessage);
        messages.push({ content, role: 'user', time: getCurrentTime() });
        
        // Прокрутка вниз
        scrollToBottom();
        
        // Очистка поля ввода
        messageInput.value = '';
        adjustTextareaHeight();
        
        // Имитация ответа бота
        typingIndicator.style.display = 'flex';
        scrollToBottom();
        
        setTimeout(() => {
            typingIndicator.style.display = 'none';
            const botResponse = createMessage(
                'Отличный прогресс! Продолжайте в том же духе. Хотите я составлю для вас персональный план тренировок?',
                'bot'
            );
            messagesList.appendChild(botResponse);
            messages.push({
                content: 'Отличный прогресс! Продолжайте в том же духе. Хотите я составлю для вас персональный план тренировок?',
                role: 'assistant',
                time: getCurrentTime()
            });
            scrollToBottom();
        }, 1500);
        
        // Скрыть пустое состояние
        if (emptyState.style.display !== 'none') {
            emptyState.style.display = 'none';
        }
    }
    
    // Создание элемента сообщения
    function createMessage(content, role) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}-message`;
        
        const time = getCurrentTime();
        
        if (role === 'bot') {
            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <div class="avatar-img"></div>
                </div>
                <div class="message-content">
                    <div class="message-bubble">
                        <p>${content}</p>
                    </div>
                    <div class="message-time">${time}</div>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-content">
                    <div class="message-bubble">
                        <p>${content}</p>
                    </div>
                    <div class="message-time">${time}</div>
                </div>
                <div class="message-avatar">
                    <div class="avatar-img user-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                </div>
            `;
        }
        
        // Анимация появления
        messageDiv.style.animation = 'messageAppear 0.3s ease';
        
        return messageDiv;
    }
    
    // Получение текущего времени
    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('ru-RU', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }
    
    // Прокрутка вниз
    function scrollToBottom() {
        messagesList.scrollTop = messagesList.scrollHeight;
    }
    
    // Автоматическая высота textarea
    function adjustTextareaHeight() {
        messageInput.style.height = 'auto';
        messageInput.style.height = (messageInput.scrollHeight) + 'px';
        messageInput.style.height = Math.min(messageInput.scrollHeight, 128) + 'px';
    }
    
    // Обработчики событий
    messageInput.addEventListener('input', adjustTextareaHeight);
    messageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    sendButton.addEventListener('click', sendMessage);
    
    // Инициализация
    adjustTextareaHeight();
    scrollToBottom();
    
    // Скрыть пустое состояние если есть сообщения
    if (messages.length > 0) {
        emptyState.style.display = 'none';
    }
});