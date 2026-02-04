/**
 * NIKA - Основной JavaScript файл
 * Содержит функциональность для главной страницы и чата
 * Версия для нового дизайна (классы v321_*)
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
        const startButton = document.querySelector('.v321_114'); // Текст "Начать"
        const buttonContainer = document.querySelector('.v321_113'); // Контейнер кнопки
        
        if (!startButton) {
            AppUtils.log('Кнопка "Начать" не найдена');
            return false;
        }

        // Добавляем обработчики событий
        startButton.addEventListener('click', this.handleStartClick);
        
        // Если есть контейнер, делаем его тоже кликабельным
        if (buttonContainer) {
            buttonContainer.addEventListener('click', this.handleStartClick);
        }
        
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

    // Обработчик клика по кнопке "Начать"
    handleStartClick: function(event) {
        event.preventDefault();
        event.stopPropagation();
        
        AppUtils.log('Кнопка "Начать" нажата');
        StartButtonModule.showLoadingIndicator();
        
        // Переход в чат с небольшой задержкой для анимации
        setTimeout(() => {
            window.location.href = '/chat';
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
            if (container) {
                container.style.transform = 'scale(1.05)';
                container.style.transition = 'transform 0.2s ease';
            }
            button.style.color = 'rgba(255, 255, 255, 0.9)';
        });
        
        button.addEventListener('mouseleave', () => {
            if (container) {
                container.style.transform = 'scale(1)';
            }
            button.style.color = 'rgba(255, 255, 255, 1)';
        });
        
        button.addEventListener('mousedown', () => {
            if (container) {
                container.style.transform = 'scale(0.95)';
            }
        });
        
        button.addEventListener('mouseup', () => {
            if (container) {
                container.style.transform = 'scale(1.05)';
            }
        });
        
        // Эффекты для клавиатурной навигации
        button.addEventListener('focus', () => {
            if (container) {
                container.style.outline = '2px solid rgba(255, 255, 255, 0.5)';
                container.style.outlineOffset = '2px';
            }
        });
        
        button.addEventListener('blur', () => {
            if (container) {
                container.style.outline = 'none';
            }
        });
    }
};

// Модуль для FAQ
const FAQModule = {
    init: function() {
        const faqLink = document.querySelector('.v321_121'); // FAQ ссылка
        if (!faqLink) {
            AppUtils.log('Ссылка FAQ не найдена');
            return;
        }
        
        faqLink.addEventListener('click', this.showFAQ);
        faqLink.style.cursor = 'pointer';
        faqLink.setAttribute('title', 'Часто задаваемые вопросы');
        faqLink.setAttribute('tabindex', '0');
        faqLink.setAttribute('role', 'button');
        
        AppUtils.log('Модуль FAQ инициализирован');
    },

    showFAQ: function(event) {
        event.preventDefault();
        event.stopPropagation();
        
        AppUtils.log('Открытие FAQ');
        
        const faqModal = AppUtils.createElement('div', {
            id: 'nika-faq-modal',
            class: 'nika-modal',
            'aria-modal': 'true',
            'aria-labelledby': 'faq-title'
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
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
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
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                " aria-label="Закрыть">×</button>
                
                <h2 id="faq-title" style="
                    color: #333; 
                    margin-bottom: 20px;
                    font-family: 'Manrope', sans-serif;
                ">Часто задаваемые вопросы</h2>
                
                <div class="faq-item" style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #eee;">
                    <h3 style="color: #555; margin-bottom: 8px; font-size: 18px;">Что такое NIKA?</h3>
                    <p style="color: #666; line-height: 1.6;">NIKA - это AI-ассистент для помощи в различных задачах, разработанный с использованием современных технологий искусственного интеллекта.</p>
                </div>
                
                <div class="faq-item" style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #eee;">
                    <h3 style="color: #555; margin-bottom: 8px; font-size: 18px;">Как начать использовать?</h3>
                    <p style="color: #666; line-height: 1.6;">Просто нажмите кнопку "Начать" на главной странице, и вы попадете в интерактивный чат с NIKA.</p>
                </div>
                
                <div class="faq-item" style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #eee;">
                    <h3 style="color: #555; margin-bottom: 8px; font-size: 18px;">Это бесплатно?</h3>
                    <p style="color: #666; line-height: 1.6;">Да, в настоящее время сервис полностью бесплатный. Мы стремимся сделать AI доступным для всех.</p>
                </div>
                
                <div class="faq-item" style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #eee;">
                    <h3 style="color: #555; margin-bottom: 8px; font-size: 18px;">Какие функции доступны?</h3>
                    <p style="color: #666; line-height: 1.6;">Чат с AI, обработка текста, ответы на вопросы, генерация контента и многое другое. Функционал постоянно расширяется.</p>
                </div>
                
                <div class="faq-item" style="margin-bottom: 10px;">
                    <h3 style="color: #555; margin-bottom: 8px; font-size: 18px;">Можно ли использовать NIKA на мобильных устройствах?</h3>
                    <p style="color: #666; line-height: 1.6;">Да, наш интерфейс полностью адаптирован для работы на смартфонах и планшетах.</p>
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
            animation: nikaFadeIn 0.3s ease;
        `;
        
        // Добавляем анимацию появления
        const style = document.createElement('style');
        style.textContent = `
            @keyframes nikaFadeIn {
                from { 
                    opacity: 0; 
                    transform: translateY(-20px);
                }
                to { 
                    opacity: 1; 
                    transform: translateY(0);
                }
            }
            
            .close-btn:hover {
                background-color: #f5f5f5;
            }
            
            .close-btn:active {
                background-color: #e0e0e0;
            }
        `;
        document.head.appendChild(style);
        
        // Закрытие модального окна
        const closeBtn = faqModal.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(faqModal);
            closeBtn.focus();
        });
        
        // Закрытие по клику на фон
        faqModal.addEventListener('click', (e) => {
            if (e.target === faqModal) {
                document.body.removeChild(faqModal);
            }
        });
        
        // Закрытие по клавише Escape
        const closeOnEscape = (e) => {
            if (e.key === 'Escape') {
                document.body.removeChild(faqModal);
                document.removeEventListener('keydown', closeOnEscape);
            }
        };
        document.addEventListener('keydown', closeOnEscape);
        
        document.body.appendChild(faqModal);
        
        // Фокус на кнопке закрытия при открытии
        setTimeout(() => {
            closeBtn.focus();
        }, 100);
    }
};

// Модуль для анимаций и эффектов
const AnimationModule = {
    init: function() {
        this.animateLogo();
        this.addScrollEffects();
        this.addBackgroundEffects();
        this.addPageLoadAnimation();
    },

    // Анимация логотипа NIKA
    animateLogo: function() {
        const logo = document.querySelector('.v321_112'); // Логотип NIKA
        if (!logo) {
            AppUtils.log('Логотип не найден');
            return;
        }
        
        // Плавное появление
        logo.style.opacity = '0';
        logo.style.animation = 'nikaFadeInUp 1s ease forwards';
        
        // Добавляем CSS анимацию
        const style = document.createElement('style');
        style.textContent = `
            @keyframes nikaFadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px) scale(0.95);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
        `;
        document.head.appendChild(style);
        
        // Периодическое мерцание (если нужно)
        /*
        setInterval(() => {
            logo.style.textShadow = '0 0 30px rgba(255, 255, 255, 0.5)';
            setTimeout(() => {
                logo.style.textShadow = 'none';
            }, 800);
        }, 7000);
        */
        
        AppUtils.log('Анимация логотипа активирована');
    },

    // Эффекты при скролле
    addScrollEffects: function() {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const background = document.querySelector('.v321_110'); // Фоновый элемент
            
            if (background) {
                // Легкий параллакс эффект для фона
                background.style.transform = `translateY(${scrollY * 0.3}px)`;
            }
        });
    },

    // Эффекты для фоновых элементов
    addBackgroundEffects: function() {
        const elements = ['.v321_111', '.v321_115', '.v321_116']; // Декоративные элементы
        
        elements.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                // Медленное плавное движение (парящий эффект)
                let position = 0;
                let direction = 1;
                const speed = 0.05;
                const range = 3;
                
                const floatAnimation = () => {
                    position += speed * direction;
                    if (position > range || position < -range) {
                        direction *= -1;
                    }
                    element.style.transform = `translateY(${position}px)`;
                    requestAnimationFrame(floatAnimation);
                };
                
                requestAnimationFrame(floatAnimation);
            }
        });
    },

    // Анимация загрузки страницы
    addPageLoadAnimation: function() {
        const container = document.querySelector('.v321_109');
        if (container) {
            container.style.opacity = '0';
            container.style.transform = 'scale(0.98)';
            
            setTimeout(() => {
                container.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                container.style.opacity = '1';
                container.style.transform = 'scale(1)';
            }, 100);
        }
    }
};

// Модуль для работы с клавиатурой
const KeyboardModule = {
    init: function() {
        document.addEventListener('keydown', this.handleKeyPress);
        AppUtils.log('Модуль клавиатуры инициализирован');
    },

    handleKeyPress: function(event) {
        // Enter для кнопки "Начать" (если не в поле ввода)
        if (event.key === 'Enter' && !event.target.matches('input, textarea, [contenteditable]')) {
            const startButton = document.querySelector('.v321_114');
            if (startButton && document.activeElement !== startButton) {
                event.preventDefault();
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
        
        // Alt + F для фокуса на FAQ
        if (event.altKey && event.key.toLowerCase() === 'f') {
            event.preventDefault();
            const faqLink = document.querySelector('.v321_121');
            if (faqLink) {
                faqLink.focus();
            }
        }
        
        // Alt + S для фокуса на кнопку "Начать"
        if (event.altKey && event.key.toLowerCase() === 's') {
            event.preventDefault();
            const startButton = document.querySelector('.v321_114');
            if (startButton) {
                startButton.focus();
            }
        }
        
        // N для навигации (если нужно)
        if (event.key.toLowerCase() === 'n' && event.ctrlKey) {
            event.preventDefault();
            const startButton = document.querySelector('.v321_114');
            if (startButton) {
                startButton.click();
            }
        }
    }
};

// Модуль для аналитики и отслеживания
const AnalyticsModule = {
    init: function() {
        this.trackPageView();
        this.setupEventListeners();
        AppUtils.log('Модуль аналитики инициализирован');
    },

    trackPageView: function() {
        if (AppUtils.supportsLocalStorage()) {
            const pageViews = parseInt(localStorage.getItem('nika_page_views') || '0');
            localStorage.setItem('nika_page_views', (pageViews + 1).toString());
            
            const firstVisit = localStorage.getItem('nika_first_visit');
            if (!firstVisit) {
                localStorage.setItem('nika_first_visit', new Date().toISOString());
                AppUtils.log('Первый визит пользователя');
            }
            
            // Сохраняем время последнего визита
            localStorage.setItem('nika_last_visit', new Date().toISOString());
            
            AppUtils.log(`Просмотров страницы: ${pageViews + 1}`);
        }
    },

    setupEventListeners: function() {
        // Отслеживание клика по кнопке "Начать"
        document.addEventListener('click', (e) => {
            if (e.target.closest('.v321_114') || e.target.closest('.v321_113')) {
                this.trackEvent('start_button_click', {
                    timestamp: new Date().toISOString(),
                    element: e.target.className
                });
            }
            
            if (e.target.closest('.v321_121')) {
                this.trackEvent('faq_click', {
                    timestamp: new Date().toISOString()
                });
            }
        });
        
        // Отслеживание времени на странице
        let pageLoadTime = Date.now();
        window.addEventListener('beforeunload', () => {
            const timeSpent = Date.now() - pageLoadTime;
            this.trackEvent('page_unload', {
                time_spent_ms: timeSpent,
                time_spent_sec: Math.round(timeSpent / 1000)
            });
        });
    },

    trackEvent: function(eventName, data = {}) {
        const eventData = {
            event: eventName,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            ...data
        };
        
        AppUtils.log(`Событие: ${eventName}`, eventData);
        
        // Здесь можно добавить отправку в Google Analytics или другую аналитику
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                event_category: 'engagement',
                event_label: 'main_page'
            });
        }
        
        // Сохраняем в localStorage для истории
        if (AppUtils.supportsLocalStorage()) {
            try {
                const events = JSON.parse(localStorage.getItem('nika_events') || '[]');
                events.push(eventData);
                if (events.length > 100) events.shift(); // Ограничиваем историю
                localStorage.setItem('nika_events', JSON.stringify(events));
            } catch (e) {
                // Игнорируем ошибки парсинга
            }
        }
    }
};

// Модуль для адаптивности
const ResponsiveModule = {
    init: function() {
        this.setupViewport();
        this.addResizeListener();
        this.checkMobile();
        this.checkTouchDevice();
        AppUtils.log('Модуль адаптивности инициализирован');
    },

    setupViewport: function() {
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        if (!viewportMeta) {
            const meta = document.createElement('meta');
            meta.name = 'viewport';
            meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';
            document.head.appendChild(meta);
        }
    },

    addResizeListener: function() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize(); // Вызываем сразу для начальной настройки
    },

    handleResize: function() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        // Адаптация размера логотипа
        const logo = document.querySelector('.v321_112');
        if (logo) {
            if (width < 768) {
                logo.style.fontSize = '100px';
            } else if (width < 1024) {
                logo.style.fontSize = '140px';
            } else {
                logo.style.fontSize = '160px';
            }
        }
        
        // Адаптация размера кнопки
        const buttonContainer = document.querySelector('.v321_113');
        const buttonText = document.querySelector('.v321_114');
        if (buttonContainer && buttonText) {
            if (width < 480) {
                buttonContainer.style.transform = 'scale(0.8)';
                buttonText.style.fontSize = '18px';
            } else {
                buttonContainer.style.transform = 'scale(1)';
                buttonText.style.fontSize = '20px';
            }
        }
        
        AppUtils.log(`Размер окна: ${width}x${height}px`);
    },

    checkMobile: function() {
        const isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobile) {
            document.body.classList.add('mobile-device');
            AppUtils.log('Обнаружено мобильное устройство');
        } else {
            document.body.classList.add('desktop-device');
            AppUtils.log('Обнаружено десктопное устройство');
        }
    },

    checkTouchDevice: function() {
        const isTouchDevice = 'ontouchstart' in window || 
                             navigator.maxTouchPoints > 0 || 
                             navigator.msMaxTouchPoints > 0;
        
        if (isTouchDevice) {
            document.body.classList.add('touch-device');
            AppUtils.log('Обнаружено сенсорное устройство');
            
            // Увеличиваем размеры кликабельных элементов для touch
            const clickableElements = document.querySelectorAll('.v321_114, .v321_121');
            clickableElements.forEach(el => {
                el.style.minHeight = '44px';
                el.style.minWidth = '44px';
                el.style.display = 'flex';
                el.style.alignItems = 'center';
                el.style.justifyContent = 'center';
            });
        }
    }
};

// Модуль для улучшения доступности (accessibility)
const AccessibilityModule = {
    init: function() {
        this.enhanceAccessibility();
        this.setupFocusManagement();
        AppUtils.log('Модуль доступности инициализирован');
    },

    enhanceAccessibility: function() {
        // Добавляем aria-label для элементов без текста
        const decorativeDivs = document.querySelectorAll('.v321_110, .v321_111, .v321_115, .v321_116');
        decorativeDivs.forEach((div, index) => {
            if (!div.getAttribute('aria-label') && !div.textContent.trim()) {
                div.setAttribute('aria-hidden', 'true');
            }
        });
        
        // Улучшаем семантику контейнера
        const mainContainer = document.querySelector('.v321_109');
        if (mainContainer && !mainContainer.getAttribute('role')) {
            mainContainer.setAttribute('role', 'main');
        }
    },

    setupFocusManagement: function() {
        // Управление фокусом при переходе
        document.addEventListener('keydown', (e) => {
            // Tab/shift+tab навигация
            if (e.key === 'Tab') {
                // Можно добавить визуальные индикаторы для фокуса
            }
        });
        
        // Skip to content для скринридеров (опционально)
        const skipLink = AppUtils.createElement('a', {
            href: '#main-content',
            class: 'skip-to-content',
            style: 'position: absolute; top: -40px; left: 0; background: #000; color: #fff; padding: 8px; z-index: 10001;'
        }, 'Перейти к содержанию');
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '0';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
};

// Главная функция инициализации
function initApp() {
    AppUtils.log('Инициализация NIKA приложения...');
    AppUtils.log(`Время запуска: ${AppUtils.formatDateTime()}`);
    AppUtils.log(`Текущий URL: ${window.location.href}`);
    
    // Инициализация всех модулей
    const modules = [
        StartButtonModule,
        FAQModule,
        AnimationModule,
        KeyboardModule,
        AnalyticsModule,
        ResponsiveModule,
        AccessibilityModule
    ];
    
    let initializedCount = 0;
    modules.forEach(module => {
        try {
            if (module.init && typeof module.init === 'function') {
                module.init();
                initializedCount++;
                AppUtils.log(`${module.constructor.name} инициализирован`);
            }
        } catch (error) {
            console.error(`Ошибка при инициализации модуля ${module.constructor.name}:`, error);
            AppUtils.log(`Ошибка в модуле ${module.constructor.name}: ${error.message}`);
        }
    });
    
    AppUtils.log(`Успешно инициализировано модулей: ${initializedCount}/${modules.length}`);
    
    // Добавляем глобальные CSS стили
    addGlobalStyles();
    
    // Проверяем загрузку всех ресурсов
    window.addEventListener('load', () => {
        AppUtils.log('Все ресурсы загружены');
        document.body.classList.add('loaded');
        
        // Скрываем индикатор загрузки, если есть
        const loader = document.getElementById('nika-loader');
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    if (loader.parentNode) {
                        loader.parentNode.removeChild(loader);
                    }
                }, 500);
            }, 1000);
        }
    });
    
    // Обработка ошибок
    window.addEventListener('error', (event) => {
        AppUtils.log(`Ошибка JavaScript: ${event.message}`, {
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno,
            error: event.error
        });
    });
    
    // Обработка отклоненных промисов
    window.addEventListener('unhandledrejection', (event) => {
        AppUtils.log(`Необработанное отклонение промиса:`, event.reason);
    });
}

// Добавление глобальных стилей
function addGlobalStyles() {
    const styles = `
        /* Глобальные стили для анимаций */
        .v321_113 {
            transition: all 0.3s ease !important;
            cursor: pointer !important;
        }
        
        .v321_114 {
            cursor: pointer !important;
            transition: all 0.3s ease !important;
            user-select: none !important;
        }
        
        .v321_121 {
            cursor: pointer !important;
            transition: all 0.3s ease !important;
            user-select: none !important;
        }
        
        /* Анимация пульсации для кнопки */
        @keyframes nikaPulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.03); opacity: 0.9; }
            100% { transform: scale(1); opacity: 1; }
        }
        
        .v321_113 {
            animation: nikaPulse 3s infinite ease-in-out;
        }
        
        /* Улучшенные стили для фокуса */
        .v321_114:focus-visible,
        .v321_121:focus-visible {
            outline: 2px solid rgba(255, 255, 255, 0.7) !important;
            outline-offset: 4px !important;
            border-radius: 4px !important;
        }
        
        /* Плавные переходы для всех элементов */
        .v321_109 > * {
            transition: transform 0.4s ease, opacity 0.4s ease;
        }
        
        /* Стили для мобильных устройств */
        @media (max-width: 768px) {
            .v321_112 {
                font-size: 100px !important;
            }
            
            .v321_113, .v321_114 {
                transform: scale(0.85);
            }
            
            .v321_121 {
                font-size: 12px !important;
            }
        }
        
        @media (max-width: 480px) {
            .v321_112 {
                font-size: 80px !important;
            }
            
            .v321_113, .v321_114 {
                transform: scale(0.75);
            }
        }
        
        /* Стили для загрузки */
        body.loaded .v321_109 {
            opacity: 1 !important;
            transform: none !important;
        }
        
        /* Улучшение производительности анимаций */
        .v321_112, .v321_113, .v321_114, .v321_121 {
            will-change: transform, opacity;
        }
        
        /* Стили для инвалидов анимаций (prefers-reduced-motion) */
        @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
            
            .v321_113 {
                animation: none !important;
            }
        }
    `;
    
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
    
    AppUtils.log('Глобальные стили добавлены');
}

// Инициализация при загрузке DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
    AppUtils.log('Ожидание загрузки DOM...');
} else {
    // DOM уже загружен
    setTimeout(initApp, 0);
}

// Экспорт для использования в других модулях (если используется модульная система)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AppConfig,
        AppUtils,
        StartButtonModule,
        FAQModule,
        initApp
    };
}

// Глобальный объект NIKA для доступа из консоли (для отладки)
window.NIKA = {
    version: '1.0.0',
    utils: AppUtils,
    config: AppConfig,
    restart: function() {
        AppUtils.log('Перезапуск приложения...');
        initApp();
    },
    debug: function() {
        AppConfig.debugMode = !AppConfig.debugMode;
        AppUtils.log(`Режим отладки: ${AppConfig.debugMode ? 'ВКЛ' : 'ВЫКЛ'}`);
    }
};

AppUtils.log('NIKA app.js загружен и готов к инициализации');