// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // ← правильно react-router-dom
import { ToastContainer } from 'react-toastify'; // ← импортируем ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // стили для тостов

// Страницы
import MainPage from './pages/MainPage/MainPage';
import ChatPage from './pages/ChatPage/ChatPage';
import FAQPage from './pages/FAQPage/FAQPage';
import Policy from './pages/Policy/Policy';
import ConnectionError from './pages/ConnectionError/ConnectionError';
import RegistrationPage from './pages/Registration/Registration';
import LoginPage from './pages/Login/LoginPage';

// Стили
import './index.css'; // или './global.css'
import Profile from './pages/Profile/Profile';
import EmotionTracker from './pages/EmotionTracker/emotion-tracker';
import FoodTracker from './pages/Diet/food-tracker';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/FAQ" element={<FAQPage />} />
        <Route path="/connection-error" element={<ConnectionError />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/emotion-tracker' element={<EmotionTracker />} />
        <Route path='/food-tracker' element={<FoodTracker />} />
      </Routes>
    </BrowserRouter>

    {/* Контейнер для уведомлений (toast) */}
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </React.StrictMode>
);