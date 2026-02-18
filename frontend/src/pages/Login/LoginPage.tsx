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
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка входа');
      }

      // Сохраняем токены в localStorage
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);

      // Переходим в чат
      navigate('/chat');
    } catch (err: any) {
      setError(err.message || 'Произошла ошибка. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#fffee7] flex items-center justify-center px-6 py-12">
      {/* Основной контейнер */}
      <div className="w-full max-w-[480px]">
        {/* Заголовок */}
        <div className="flex flex-col gap-3 mb-14">
          <div className="h-[50px] flex items-center justify-center">
            <h1 className="text-[#3d1f00] text-[40px] leading-[50px] text-center">Вход</h1>
          </div>
          <div className="h-[24px] flex items-center justify-center">
            <p className="text-[#83451e] text-[16px] leading-[24px] text-center">
              Войдите в свой аккаунт
            </p>
          </div>
        </div>

        {/* Форма */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Поле Email */}
          <div className="flex flex-col gap-2.5">
            <label htmlFor="email" className="text-[#83451e] text-[14px] leading-[20px] pl-5">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[rgba(189,145,97,0.15)] border-none rounded-[25px] px-6 py-[18px] text-[#3d1f00] text-[16px] leading-normal placeholder:text-[rgba(131,69,30,0.5)] focus:outline-none focus:ring-2 focus:ring-[#83451e]/30 transition-all"
              placeholder="example@email.com"
              required
              autoComplete="email"
            />
          </div>

          {/* Поле Пароль */}
          <div className="flex flex-col gap-2.5">
            <label htmlFor="password" className="text-[#83451e] text-[14px] leading-[20px] pl-5">
              Пароль
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[rgba(189,145,97,0.15)] border-none rounded-[25px] px-6 py-[18px] text-[#3d1f00] text-[16px] leading-normal placeholder:text-[rgba(131,69,30,0.5)] focus:outline-none focus:ring-2 focus:ring-[#83451e]/30 transition-all"
              placeholder="Введите ваш пароль"
              required
              autoComplete="current-password"
            />
          </div>

          {/* Кнопка Войти */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#83451e] text-[#fffee7] text-[16px] leading-[24px] h-[60px] rounded-[25px] hover:bg-[#6b3818] transition-all shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] hover:shadow-lg flex items-center justify-center disabled:opacity-50"
          >
            {loading ? 'Загрузка...' : 'Войти'}
          </button>
        </form>

        {/* Ссылки внизу */}
        <div className="flex flex-col gap-4 mt-14 text-center">
          {/* Регистрация */}
          <p className="text-[#83451e] text-[16px] leading-[24px]">
            Нет аккаунта?{' '}
            <NavLink
              to="/registration"
              className="text-[#3d1f00] underline decoration-1 underline-offset-2 hover:text-[#83451e] transition-colors"
            >
              Зарегистрироваться
            </NavLink>
          </p>

          {/* FAQ */}
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