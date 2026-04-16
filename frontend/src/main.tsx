// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // ← правильно react-router-dom
import { ToastContainer } from 'react-toastify'; // ← импортируем ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // стили для тостов

// Страницы
import MainPage from './pages/MainPage/MainPage';
import FAQPage from './pages/FAQPage/FAQPage';
import Policy from './pages/Policy/Policy';
import RegistrationPage from './pages/Registration/Registration';
import LoginPage from './pages/Login/LoginPage';

// Стили
import './index.css'; // или './global.css'
import Profile from './pages/Profile/Profile';
import EmotionTracker from './pages/EmotionTracker/emotion-tracker';
import FoodTracker from './pages/Diet/food-tracker';
import ProtectedRoute from './components/ProtectedRoute';
import MetrikaTracker from "./components/MetrikaTracker";
import OldChatPage from './pages/ChatPage/OldchatPage';
import Subscription from './pages/Subscription/Subscription';
import AdminPlans from './pages/Admin/AdminPlans';
import ContactPage from './pages/Contact/ContactPage';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MetrikaTracker />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/chat" element={<ProtectedRoute> <OldChatPage /> </ProtectedRoute>} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/FAQ" element={<FAQPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/emotion-tracker' element={<EmotionTracker />} />
        <Route path='/food-tracker' element={<FoodTracker />} />
        <Route path='/subscription' element={<Subscription/>} />
        <Route path='/admin/plans' element={<ProtectedRoute><AdminPlans /></ProtectedRoute>} />
        <Route path='/contact' element={<ProtectedRoute><ContactPage /></ProtectedRoute>} />
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