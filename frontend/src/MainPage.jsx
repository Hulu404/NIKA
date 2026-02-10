import React, { useState, useEffect, useRef } from 'react';
import './styles/MainPage.css';

const MainPage = () => {
  const [showFAQ, setShowFAQ] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const logoRef = useRef(null);
  const containerRef = useRef(null);
  const buttonRef = useRef(null);

  // Анимация при загрузке
  useEffect(() => {
    document.body.classList.add('loaded');
    
    // Инициализация анимаций
    animateLogo();
    addBackgroundEffects();
    trackPageView();
    
    // Очистка при размонтировании
    return () => {
      document.body.classList.remove('loaded');
    };
  }, []);

  // Анимация логотипа
  const animateLogo = () => {
    if (logoRef.current) {
      logoRef.current.style.opacity = '0';
      logoRef.current.style.animation = 'nikaFadeInUp 1s ease forwards';
    }
  };

  // Эффекты плавающих элементов
  const addBackgroundEffects = () => {
    const elements = ['.v321_111', '.v321_115', '.v321_116'];
    
    elements.forEach(selector => {
      const element = document.querySelector(selector);
      if (element) {
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
  };

  // Отслеживание просмотра страницы
  const trackPageView = () => {
    try {
      const pageViews = parseInt(localStorage.getItem('nika_page_views') || '0');
      localStorage.setItem('nika_page_views', (pageViews + 1).toString());
      
      const firstVisit = localStorage.getItem('nika_first_visit');
      if (!firstVisit) {
        localStorage.setItem('nika_first_visit', new Date().toISOString());
      }
      
      localStorage.setItem('nika_last_visit', new Date().toISOString());
    } catch (e) {
      // Игнорируем ошибки localStorage
    }
  };

  // Обработка клика по кнопке "Начать"
  const handleStartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsLoading(true);
    trackEvent('start_button_click');
    
    // Создаем индикатор загрузки
    const loader = document.createElement('div');
    loader.id = 'nika-loader';
    loader.className = 'nika-loader';
    loader.textContent = 'Переход в чат';
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
    
    document.body.appendChild(loader);
    
    // Переход с задержкой для анимации
    setTimeout(() => {
      clearInterval(dotAnimation);
      window.location.href = '/chat';
    }, 800);
  };

  // Отслеживание событий
  const trackEvent = (eventName) => {
    try {
      const events = JSON.parse(localStorage.getItem('nika_events') || '[]');
      events.push({
        event: eventName,
        timestamp: new Date().toISOString(),
        url: window.location.href
      });
      if (events.length > 100) events.shift();
      localStorage.setItem('nika_events', JSON.stringify(events));
    } catch (e) {
      // Игнорируем ошибки
    }
  };

  // Обработка клика по FAQ
  const handleFAQClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowFAQ(true);
    trackEvent('faq_click');
  };

  // Закрытие FAQ
  const handleCloseFAQ = () => {
    setShowFAQ(false);
  };

  // Обработка клавиатуры
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Enter для кнопки "Начать"
      if (event.key === 'Enter' && !event.target.matches('input, textarea, [contenteditable]')) {
        if (buttonRef.current && document.activeElement !== buttonRef.current) {
          event.preventDefault();
          buttonRef.current.click();
        }
      }
      
      // Escape для закрытия FAQ
      if (event.key === 'Escape' && showFAQ) {
        setShowFAQ(false);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [showFAQ]);

  // Эффекты для адаптивности
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      // Адаптация размера логотипа
      if (logoRef.current) {
        if (width < 768) {
          logoRef.current.style.fontSize = '100px';
        } else if (width < 1024) {
          logoRef.current.style.fontSize = '140px';
        } else {
          logoRef.current.style.fontSize = '160px';
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
    };

    // Проверка на touch устройство
    const isTouchDevice = 'ontouchstart' in window || 
                         navigator.maxTouchPoints > 0 || 
                         navigator.msMaxTouchPoints > 0;
    
    if (isTouchDevice) {
      document.body.classList.add('touch-device');
      const clickableElements = document.querySelectorAll('.v321_114, .v321_121');
      clickableElements.forEach(el => {
        el.style.minHeight = '44px';
        el.style.minWidth = '44px';
        el.style.display = 'flex';
        el.style.alignItems = 'center';
        el.style.justifyContent = 'center';
      });
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className="v321_109" ref={containerRef}>
        <div className="v321_110"></div>
        <div className="v321_111"></div>
        <span className="v321_112" ref={logoRef}>
          NIKA
        </span>
        <div className="v321_113"></div>
        <span 
          className="v321_114" 
          onClick={handleStartClick}
          ref={buttonRef}
          role="button"
          tabIndex="0"
          aria-label="Начать чат с NIKA"
        >
          Начать
        </span>
        <div className="v321_115"></div>
        <div className="v321_116"></div>
        <span 
          className="v321_121" 
          onClick={handleFAQClick}
          role="button"
          tabIndex="0"
          aria-label="Часто задаваемые вопросы"
        >
          FAQs
        </span>
      </div>

      {/* Модальное окно FAQ */}
      {showFAQ && (
        <div 
          className="nika-modal"
          onClick={handleCloseFAQ}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            animation: 'nikaFadeIn 0.3s ease'
          }}
        >
          <div 
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'white',
              padding: '30px',
              borderRadius: '15px',
              maxWidth: '600px',
              width: '90%',
              maxHeight: '80vh',
              overflowY: 'auto',
              position: 'relative',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
            }}
          >
            <button 
              className="close-btn"
              onClick={handleCloseFAQ}
              aria-label="Закрыть"
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#666',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ×
            </button>
            
            <h2 
              id="faq-title"
              style={{
                color: '#333',
                marginBottom: '20px',
                fontFamily: "'Manrope', sans-serif"
              }}
            >
              Часто задаваемые вопросы
            </h2>
            
            <div className="faq-item" style={{marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid #eee'}}>
              <h3 style={{color: '#555', marginBottom: '8px', fontSize: '18px'}}>Что такое NIKA?</h3>
              <p style={{color: '#666', lineHeight: '1.6'}}>NIKA - это AI-ассистент для помощи в различных задачах, разработанный с использованием современных технологий искусственного интеллекта.</p>
            </div>
            
            <div className="faq-item" style={{marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid #eee'}}>
              <h3 style={{color: '#555', marginBottom: '8px', fontSize: '18px'}}>Как начать использовать?</h3>
              <p style={{color: '#666', lineHeight: '1.6'}}>Просто нажмите кнопку "Начать" на главной странице, и вы попадете в интерактивный чат с NIKA.</p>
            </div>
            
            <div className="faq-item" style={{marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid #eee'}}>
              <h3 style={{color: '#555', marginBottom: '8px', fontSize: '18px'}}>Это бесплатно?</h3>
              <p style={{color: '#666', lineHeight: '1.6'}}>Да, в настоящее время сервис полностью бесплатный. Мы стремимся сделать AI доступным для всех.</p>
            </div>
            
            <div className="faq-item" style={{marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid #eee'}}>
              <h3 style={{color: '#555', marginBottom: '8px', fontSize: '18px'}}>Какие функции доступны?</h3>
              <p style={{color: '#666', lineHeight: '1.6'}}>Чат с AI, обработка текста, ответы на вопросы, генерация контента и многое другое. Функционал постоянно расширяется.</p>
            </div>
            
            <div className="faq-item" style={{marginBottom: '10px'}}>
              <h3 style={{color: '#555', marginBottom: '8px', fontSize: '18px'}}>Можно ли использовать NIKA на мобильных устройствах?</h3>
              <p style={{color: '#666', lineHeight: '1.6'}}>Да, наш интерфейс полностью адаптирован для работы на смартфонах и планшетах.</p>
            </div>
          </div>
        </div>
      )}

      {/* Индикатор загрузки (рендерится через JS) */}
      {isLoading && (
        <div id="nika-loader" style={{display: 'none'}}></div>
      )}
    </>
  );
};

export default MainPage;