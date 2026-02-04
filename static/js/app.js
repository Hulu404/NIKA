/**
 * NIKA - Основной JavaScript файл
 * Содержит функциональность для главной страницы и чата
 */

// Конфигурация приложения
const AppConfig = {
    apiUrl: '/api',
    chatEndpoint: '/chat/api/message',
    transitionSpeed: 300,
    debugMode: true
};

// Утилиты
const AppUtils = {
    // Логирование в консоль (только в debug режиме)
    log: function(message, data = null) {
        if (AppConfig.debugMode) {
            console.log(`[NIKA] ${message}`, data || '');
        }
    },

    // Проверка поддержки localStorage
    supportsLocalStorage: function() {
        try {
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            return true;
        } catch (e) {
            return false;
        }
    },

    // Форматирование даты и времени
    formatDateTime: function(date = new Date()) {
        return date.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    },

    // Анимация появления элемента
    fadeIn: function(element, duration = 500) {
        element.style.opacity = '0';
        element.style.display = 'block';
        
        let start = null;
        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const opacity = Math.min(progress / duration, 1);
            element.style.opacity = opacity.toString();
            
            if (progress < duration) {
                window.requestAnimationFrame(step);
            }
        }
        window.requestAnimationFrame(step);
    },

    // Создание элемента с атрибутами
    createElement: function(tag, attributes = {}, text = '') {
        const element = document.createElement(tag);
        Object.keys(attributes).forEach(key => {
            element.setAttribute(key, attributes[key]);
        });
        if (text) element.textContent = text;
        return element;
    }
};

// Модуль для работы с кнопкой "Начать"
const StartButtonModule = {
    initialized: false,

    // Инициализация кнопки "Начать"
    init: function() {
        const startButton = document.querySelector('.v372_118');
        const buttonContainer = document.querySelector('.v372_117');
        
        if (!startButton || !buttonContainer) {
            AppUtils.log('Элементы кнопки "Начать" не найдены');
            return false;
        }

        // Добавляем обработчики событий
        startButton.addEventListener('click', this.handleStartClick);
        buttonContainer.addEventListener('click', this.handleStartClick);
        
        // Делаем кнопку доступной с клавиатуры
        startButton.setAttribute('tabindex', '0');
        startButton.setAttribute('role', 'button');
        startButton.setAttribute('aria-label', 'Начать чат с NIKA');
        
        // Добавляем стили при наведении
        this.addHoverEffects(startButton, buttonContainer);
        
        this.initialized = true;
        AppUtils.log('Кнопка "Начать" инициализирована');
        return true;
    },

    handleStartClick: function(event) {
    event.preventDefault();
    event.stopPropagation();

    AppUtils.log('Кнопка "Начать" нажата');
    StartButtonModule.showLoadingIndicator();

    // Получаем URL из data-атрибута
    const startButton = document.querySelector('.v372_118');
    const redirectUrl = startButton.getAttribute('data-redirect-url');

    setTimeout(() => {
        window.location.href = redirectUrl;
    }, AppConfig.transitionSpeed);
},

    // Показ индикатора загрузки
    showLoadingIndicator: function() {
        // Создаем индикатор загрузки
        const loader = AppUtils.createElement('div', {
            id: 'nika-loader',
            class: 'nika-loader'
        }, 'Переход в чат...');
        
        // Стили для индикатора
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-family: 'Manrope', sans-serif;
            font-size: 24px;
            z-index: 10000;
            backdrop-filter: blur(5px);
        `;
        
        // Анимация точек
        let dots = '';
        const dotAnimation = setInterval(() => {
            dots = dots.length >= 3 ? '' : dots + '.';
            loader.textContent = `Переход в чат${dots}`;
        }, 500);
        
        // Удаляем анимацию через 5 секунд на всякий случай
        setTimeout(() => clearInterval(dotAnimation), 5000);
        
        document.body.appendChild(loader);
        AppUtils.fadeIn(loader, 300);
    },

    // Добавление эффектов при наведении
    addHoverEffects: function(button, container) {
        button.addEventListener('mouseenter', () => {
            container.style.transform = 'scale(1.05)';
            container.style.transition = 'transform 0.2s ease';
        });
        
        button.addEventListener('mouseleave', () => {
            container.style.transform = 'scale(1)';
        });
        
        button.addEventListener('mousedown', () => {
            container.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', () => {
            container.style.transform = 'scale(1.05)';
        });
    }
};

// Модуль для FAQ
const FAQModule = {
    init: function() {
        const faqLink = document.querySelector('.v372_114');
        if (!faqLink) return;
        
        faqLink.addEventListener('click', this.showFAQ);
        faqLink.style.cursor = 'pointer';
        faqLink.setAttribute('title', 'Часто задаваемые вопросы');
    },

    showFAQ: function(event) {
        event.preventDefault();
        
        const faqModal = AppUtils.createElement('div', {
            id: 'nika-faq-modal',
            class: 'nika-modal'
        });
        
        faqModal.innerHTML = `
            <div class="modal-content" style="
                background: white;
                padding: 30px;
                border-radius: 15px;
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                position: relative;
            ">
                <button class="close-btn" style="
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #666;
                ">×</button>
                
                <h2 style="color: #333; margin-bottom: 20px;">Часто задаваемые вопросы</h2>
                
                <div class="faq-item" style="margin-bottom: 15px;">
                    <h3 style="color: #555; margin-bottom: 5px;">Что такое NIKA?</h3>
                    <p style="color: #666;">NIKA - это AI-ассистент для помощи в различных задачах.</p>
                </div>
                
                <div class="faq-item" style="margin-bottom: 15px;">
                    <h3 style="color: #555; margin-bottom: 5px;">Как начать использовать?</h3>
                    <p style="color: #666;">Нажмите кнопку "Начать" на главной странице.</p>
                </div>
                
                <div class="faq-item" style="margin-bottom: 15px;">
                    <h3 style="color: #555; margin-bottom: 5px;">Это бесплатно?</h3>
                    <p style="color: #666;">Да, в настоящее время сервис полностью бесплатный.</p>
                </div>
                
                <div class="faq-item" style="margin-bottom: 15px;">
                    <h3 style="color: #555; margin-bottom: 5px;">Какие функции доступны?</h3>
                    <p style="color: #666;">Чат с AI, обработка текста, ответы на вопросы и многое другое.</p>
                </div>
            </div>
        `;
        
        // Стили для модального окна
        faqModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            animation: fadeIn 0.3s ease;
        `;
        
        // Анимация появления
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        // Закрытие модального окна
        const closeBtn = faqModal.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(faqModal);
        });
        
        // Закрытие по клику на фон
        faqModal.addEventListener('click', (e) => {
            if (e.target === faqModal) {
                document.body.removeChild(faqModal);
            }
        });
        
        document.body.appendChild(faqModal);
    }
};

// Модуль для анимаций и эффектов
const AnimationModule = {
    init: function() {
        this.animateLogo();
        this.addScrollEffects();
        this.addBackgroundEffects();
    },

    // Анимация логотипа NIKA
    animateLogo: function() {
        const logo = document.querySelector('.v372_116');
        if (!logo) return;
        
        // Плавное появление
        logo.style.opacity = '0';
        logo.style.animation = 'fadeInUp 1s ease forwards';
        
        // Добавляем CSS анимацию
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
        
        // Периодическое мерцание
        setInterval(() => {
            logo.style.textShadow = '0 0 20px rgba(255, 255, 255, 0.7)';
            setTimeout(() => {
                logo.style.textShadow = 'none';
            }, 500);
        }, 5000);
    },

    // Эффекты при скролле
    addScrollEffects: function() {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const background = document.querySelector('.v372_113');
            
            if (background) {
                // Параллакс эффект для фона
                background.style.transform = `translateY(${scrollY * 0.5}px)`;
            }
        });
    },

    // Эффекты для фоновых элементов
    addBackgroundEffects: function() {
        const elements = ['.v372_115', '.v372_119'];
        
        elements.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                // Медленное плавное движение
                let position = 0;
                let direction = 1;
                
                setInterval(() => {
                    position += 0.1 * direction;
                    if (position > 5 || position < -5) {
                        direction *= -1;
                    }
                    element.style.transform = `translateY(${position}px)`;
                }, 50);
            }
        });
    }
};

// Модуль для работы с клавиатурой
const KeyboardModule = {
    init: function() {
        document.addEventListener('keydown', this.handleKeyPress);
    },

    handleKeyPress: function(event) {
        // Enter для кнопки "Начать"
        if (event.key === 'Enter' && !event.target.matches('input, textarea')) {
            const startButton = document.querySelector('.v372_118');
            if (startButton) {
                startButton.click();
            }
        }
        
        // Escape для закрытия модальных окон
        if (event.key === 'Escape') {
            const modal = document.getElementById('nika-faq-modal');
            if (modal) {
                modal.remove();
            }
        }
        
        // Ctrl + / для фокуса на FAQ
        if (event.ctrlKey && event.key === '/') {
            event.preventDefault();
            const faqLink = document.querySelector('.v372_114');
            if (faqLink) {
                faqLink.focus();
                faqLink.click();
            }
        }
    }
};

// Модуль для аналитики и отслеживания
const AnalyticsModule = {
    init: function() {
        this.trackPageView();
        this.setupEventListeners();
    },

    trackPageView: function() {
        if (AppUtils.supportsLocalStorage()) {
            const pageViews = parseInt(localStorage.getItem('nika_page_views') || '0');
            localStorage.setItem('nika_page_views', (pageViews + 1).toString());
            
            const firstVisit = localStorage.getItem('nika_first_visit');
            if (!firstVisit) {
                localStorage.setItem('nika_first_visit', new Date().toISOString());
            }
        }
    },

    setupEventListeners: function() {
        // Отслеживание клика по кнопке "Начать"
        document.addEventListener('click', (e) => {
            if (e.target.closest('.v372_118') || e.target.closest('.v372_117')) {
                this.trackEvent('start_button_click');
            }
            
            if (e.target.closest('.v372_114')) {
                this.trackEvent('faq_click');
            }
        });
    },

    trackEvent: function(eventName) {
        AppUtils.log(`Событие: ${eventName}`);
        
        // Здесь можно добавить отправку в Google Analytics или другую аналитику
        // Например:
        // if (typeof gtag !== 'undefined') {
        //     gtag('event', eventName, {
        //         'event_category': 'engagement'
        //     });
        // }
    }
};

// Модуль для адаптивности
const ResponsiveModule = {
    init: function() {
        this.setupViewport();
        this.addResizeListener();
        this.checkMobile();
    },

    setupViewport: function() {
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        if (!viewportMeta) {
            const meta = document.createElement('meta');
            meta.name = 'viewport';
            meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
            document.head.appendChild(meta);
        }
    },

    addResizeListener: function() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize(); // Вызываем сразу
    },

    handleResize: function() {
        const width = window.innerWidth;
        const logo = document.querySelector('.v372_116');
        
        if (logo) {
            // Адаптивный размер шрифта для логотипа
            if (width < 768) {
                logo.style.fontSize = '100px';
            } else if (width < 1024) {
                logo.style.fontSize = '150px';
            } else {
                logo.style.fontSize = '200px';
            }
        }
        
        // Логируем изменение размера
        AppUtils.log(`Размер окна изменен: ${width}px`);
    },

    checkMobile: function() {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
            document.body.classList.add('mobile-device');
            AppUtils.log('Обнаружено мобильное устройство');
        }
    }
};

// Главная функция инициализации
function initApp() {
    AppUtils.log('Инициализация NIKA приложения...');
    AppUtils.log(`Время запуска: ${AppUtils.formatDateTime()}`);
    
    // Инициализация всех модулей
    const modules = [
        StartButtonModule,
        FAQModule,
        AnimationModule,
        KeyboardModule,
        AnalyticsModule,
        ResponsiveModule
    ];
    
    modules.forEach(module => {
        try {
            if (module.init && typeof module.init === 'function') {
                module.init();
                AppUtils.log(`${module.constructor.name} инициализирован`);
            }
        } catch (error) {
            console.error(`Ошибка при инициализации модуля:`, error);
        }
    });
    
    // Добавляем CSS стили
    addGlobalStyles();
    
    // Проверяем загрузку всех ресурсов
    window.addEventListener('load', () => {
        AppUtils.log('Все ресурсы загружены');
        
        // Скрываем индикатор загрузки, если есть
        const loader = document.getElementById('nika-loader');
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    if (loader.parentNode) {
                        loader.parentNode.removeChild(loader);
                    }
                }, 300);
            }, 1000);
        }
    });
    
    // Обработка ошибок
    window.addEventListener('error', (event) => {
        AppUtils.log(`Ошибка JavaScript: ${event.message}`, {
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno
        });
    });
}

// Добавление глобальных стилей
function addGlobalStyles() {
    const styles = `
        /* Глобальные стили для анимаций */
        .v372_117 {
            transition: all 0.3s ease !important;
        }
        
        .v372_118 {
            cursor: pointer !important;
            transition: color 0.3s ease !important;
        }
        
        .v372_118:hover {
            color: rgba(255, 255, 255, 0.9) !important;
        }
        
        /* Анимация пульсации для кнопки */
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .v372_117 {
            animation: pulse 2s infinite;
        }
        
        /* Плавные переходы */
        * {
            transition: background-color 0.3s ease,
                        transform 0.3s ease,
                        opacity 0.3s ease;
        }
        
        /* Стили для мобильных устройств */
        @media (max-width: 768px) {
            .v372_116 {
                font-size: 100px !important;
            }
            
            .v372_117, .v372_118 {
                transform: scale(0.8);
            }
        }
    `;
    
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
}

// Инициализация при загрузке DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AppConfig,
        AppUtils,
        StartButtonModule,
        FAQModule,
        initApp
    };
}