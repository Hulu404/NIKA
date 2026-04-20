// src/pages/Login/LoginPage.tsx
import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  console.log('✅ handleSubmit вызван');
  console.log('📧 email:', email.trim());
  console.log('🔑 password:', password ? '****' : 'пусто');

  setError('');
  setLoading(true);

  try {
    // Используем обычный fetch, а не fetchWithAuth, чтобы исключить влияние логики обновления токенов
    console.log('📡 Отправка запроса на /api/v1/auth/login...');
    const response = await fetch('/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.trim(),
        password: password,
      }),
    });
    console.log('📨 Ответ получен. Статус:', response.status);

    const data = await response.json();
    console.log('📦 Данные ответа (data):', data);

    // Если статус не 2xx — обрабатываем ошибку
    if (!response.ok) {
      console.log('❌ Статус ошибки:', response.status);
      if (response.status === 404) {
        throw new Error('Пользователь с таким email не найден');
      } else if (response.status === 401) {
        throw new Error('Неверный пароль');
      } else {
        throw new Error(data.error || 'Ошибка входа');
      }
    }

    // Проверяем структуру ответа
    console.log('🔍 Проверка структуры: data.data?.access_token =', data.data?.access_token);
    if (!data.data?.access_token) {
      throw new Error('В ответе отсутствует access_token');
    }

    // Сохраняем токены
    localStorage.setItem('access_token', data.data.access_token);
    localStorage.setItem('refresh_token', data.data.refresh_token);
    console.log('💾 Токены сохранены в localStorage');

    // Проверяем, что они действительно записались
    console.log('🔍 access_token из localStorage:', localStorage.getItem('access_token'));
    console.log('🔍 refresh_token из localStorage:', localStorage.getItem('refresh_token'));

    // Если всё хорошо — переходим на /chat
    if (localStorage.getItem('access_token')) {
      console.log('✅ Токены есть, переходим на /chat');
      navigate('/chat');
    } else {
      console.error('❌ Токен не сохранился в localStorage!');
    }

  } catch (err: any) {
    console.error('🚨 Ошибка входа:', err.message);
    setError(err.message || 'Не удалось войти. Проверьте данные.');
  } finally {
    setLoading(false);
    console.log('🔄 loading = false');
  }
};

  return (
    <div className="relative min-h-screen w-full bg-[#fffee7] flex items-center justify-center px-6 py-12 font-['Manrope']">
      {/* Основной контейнер */}
      <div className="w-full max-w-[480px] relative z-10">
        {/* Заголовок */}
        <div className="flex flex-col gap-3 mb-14 text-center">
          <h1 className="text-[#3d1f00] text-[32px] sm:text-[40px] leading-tight sm:leading-[50px]">Вход</h1>
          <p className="text-[#83451e] text-[16px] leading-[24px]">
            Войдите в свой аккаунт
          </p>
        </div>

        {/* Сообщение об ошибке */}
        {error && (
          <p className="text-red-600 text-center mb-6 text-[14px] font-medium">
            {error}
          </p>
        )}

        {/* Форма */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Email */}
          <div className="flex flex-col gap-2.5">
            <label
              htmlFor="email"
              className="text-[#83451e] text-[14px] leading-[20px] pl-5"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="w-full bg-[rgba(189,145,97,0.15)] border-none rounded-[25px] px-6 py-[18px] text-[#3d1f00] text-[16px] placeholder:text-[rgba(131,69,30,0.5)] focus:outline-none focus:ring-2 focus:ring-[#83451e]/30 transition-all"
              required
              autoComplete="email"
              disabled={loading}
            />
          </div>

          {/* Пароль */}
          <div className="flex flex-col gap-2.5">
            <label
              htmlFor="password"
              className="text-[#83451e] text-[14px] leading-[20px] pl-5"
            >
              Пароль
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              className="w-full bg-[rgba(189,145,97,0.15)] border-none rounded-[25px] px-6 py-[18px] text-[#3d1f00] text-[16px] placeholder:text-[rgba(131,69,30,0.5)] focus:outline-none focus:ring-2 focus:ring-[#83451e]/30 transition-all"
              required
              autoComplete="current-password"
              disabled={loading}
            />
          </div>
                    {/* Кнопка "Войти" */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#83451e] text-[#fffee7] text-[16px] leading-[24px] h-[60px] rounded-[25px] hover:bg-[#6b3818] transition-all shadow-[0_4px_6px_rgba(0,0,0,0.1)] hover:shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>

        {/* Ссылки внизу */}
        <div className="flex flex-col gap-4 mt-14 text-center">
          <p className="text-[#83451e] text-[16px] leading-[24px]">
            Нет аккаунта?{' '}
            <NavLink
              to="/registration"
              className="text-[#3d1f00] underline decoration-1 underline-offset-2 hover:text-[#83451e] transition-colors"
            >
              Зарегистрироваться
            </NavLink>
          </p>

          <NavLink
            to="/FAQ"
            className="text-[#83451e] text-[14px] leading-[20px] underline decoration-1 underline-offset-2 hover:text-[#3d1f00] transition-colors"
          >
            FAQs
          </NavLink>
        </div>
      </div>
    </div>
  );
}