// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import MainPage from './MainPage'
import FAQPage from './pages/FAQPage/FAQPage';
import Policy from './pages/Policy/Policy';
import ConnectionError from './pages/ConnectionError/ConnectionError';
import './index.css'; // или './global.css'
import { BrowserRouter, Routes, Route } from 'react-router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/chat' element={<App/>} />
        <Route path='/policy' element={<Policy/>} />
        <Route path='/FAQ' element={<FAQPage/>} />
        <Route path='/connection-error' element={<ConnectionError/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);