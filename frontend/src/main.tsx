// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import ChatPage from './pages/ChatPage/ChatPage';
import FAQPage from './pages/FAQPage/FAQPage';
import Policy from './pages/Policy/Policy';
import ConnectionError from './pages/ConnectionError/ConnectionError';
import RegistrationPage from './pages/Registration/Registration';
import LoginPage from './pages/Login/LoginPage';
import './index.css'; // или './global.css'
import { BrowserRouter, Routes, Route } from 'react-router';
import MainPage from './pages/MainPage/MainPage';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/chat' element={<ChatPage/>} />
        <Route path='/policy' element={<Policy/>} />
        <Route path='/FAQ' element={<FAQPage/>} />
        <Route path='/connection-error' element={<ConnectionError/>} />
        <Route path='/registration' element={<RegistrationPage/>} />
        <Route path='/login' element={<LoginPage/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);