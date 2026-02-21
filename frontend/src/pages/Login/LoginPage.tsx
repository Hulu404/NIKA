import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
    sport: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');

  // Проверка на фронте (чтобы пользователь сразу увидел ошибку)
  if (formData.firstName.trim().length < 3) {
    setError('Имя должно быть минимум 3 символа');
    return;
  }
  if (formData.lastName.trim().length < 3) {
    setError('Фамилия должна быть минимум 3 символа');
    return;
  }
  if (!formData.email.trim()) {
    setError('Email обязателен');
    return;
  }
  if (formData.password.length < 6) {
    setError('Пароль должен быть минимум 6 символов');
    return;
  }

  setLoading(true);

  try {
    const payload = {
      name: formData.firstName.trim(),
      last_name: formData.lastName.trim(),
      email: formData.email.trim(),
      password: formData.password,
      gender: formData.gender || null,
      sport: formData.sport || null
    };

    const res = await fetch('/api/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Ошибка регистрации');
    }

    // Сохраняем токены (если бэкенд их вернул)
    if (data.access_token && data.refresh_token) {
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
    }

    // Переход в чат
    navigate('/chat');

  } catch (err: any) {
    setError(err.message || 'Не удалось зарегистрироваться');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="relative min-h-screen w-full bg-[#fffee7] overflow-hidden">
      {/* Основной контент */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Контейнер формы */}
        <div className="w-full max-w-md">
          {/* Заголовок */}
          <div className="text-center mb-12">
            <h1 className="text-[#3d1f00] mb-2 text-4xl font-['Manrope']">Регистрация</h1>
            <p className="text-[#83451e] text-sm font-['Manrope']">Создайте аккаунт для продолжения</p>
          </div>

          {error && (
            <p className="text-red-600 text-center mb-6 font-['Manrope']">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Имя */}
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-[#83451e] text-sm pl-5 font-['Manrope']">
                Имя
              </label>
              <input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                className="w-full bg-[rgba(189,145,97,0.15)] border-none rounded-[25px] px-6 py-4 text-[#3d1f00] placeholder:text-[#83451e]/50 focus:outline-none focus:ring-2 focus:ring-[#83451e]/30 transition-all font-['Manrope']"
                placeholder="Введите ваше имя"
                required
              />
            </div>

            {/* Фамилия */}
            <div className="space-y-2">
              <label htmlFor="lastName" className="block text-[#83451e] text-sm pl-5 font-['Manrope']">
                Фамилия
              </label>
              <input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                className="w-full bg-[rgba(189,145,97,0.15)] border-none rounded-[25px] px-6 py-4 text-[#3d1f00] placeholder:text-[#83451e]/50 focus:outline-none focus:ring-2 focus:ring-[#83451e]/30 transition-all font-['Manrope']"
                placeholder="Введите вашу фамилию"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-[#83451e] text-sm pl-5 font-['Manrope']">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full bg-[rgba(189,145,97,0.15)] border-none rounded-[25px] px-6 py-4 text-[#3d1f00] placeholder:text-[#83451e]/50 focus:outline-none focus:ring-2 focus:ring-[#83451e]/30 transition-all font-['Manrope']"
                placeholder="example@email.com"
                required
              />
            </div>

            {/* Пароль */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-[#83451e] text-sm pl-5 font-['Manrope']">
                Пароль
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                className="w-full bg-[rgba(189,145,97,0.15)] border-none rounded-[25px] px-6 py-4 text-[#3d1f00] placeholder:text-[#83451e]/50 focus:outline-none focus:ring-2 focus:ring-[#83451e]/30 transition-all font-['Manrope']"
                placeholder="Минимум 8 символов"
                required
                minLength={8}
              />
            </div>

            {/* Пол */}
            <div className="space-y-3">
              <label className="block text-[#83451e] text-sm pl-5 font-['Manrope']">
                Пол
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => handleChange('gender', 'female')}
                  className={`flex-1 py-4 rounded-[25px] font-['Manrope'] transition-all ${
                    formData.gender === 'female'
                      ? 'bg-[#83451e] text-[#fffee7] shadow-lg'
                      : 'bg-[rgba(189,145,97,0.15)] text-[#83451e] hover:bg-[rgba(189,145,97,0.25)]'
                  }`}
                >
                  Женский
                </button>
                <button
                  type="button"
                  onClick={() => handleChange('gender', 'male')}
                  className={`flex-1 py-4 rounded-[25px] font-['Manrope'] transition-all ${
                    formData.gender === 'male'
                      ? 'bg-[#83451e] text-[#fffee7] shadow-lg'
                      : 'bg-[rgba(189,145,97,0.15)] text-[#83451e] hover:bg-[rgba(189,145,97,0.25)]'
                  }`}
                >
                  Мужской
                </button>
              </div>
            </div>

            {/* Вид спорта */}
            <div className="space-y-2">
              <label htmlFor="sport" className="block text-[#83451e] text-sm pl-5 font-['Manrope']">
                Вид спорта
              </label>
              <select
                id="sport"
                value={formData.sport}
                onChange={(e) => handleChange('sport', e.target.value)}
                className="w-full bg-[rgba(189,145,97,0.15)] border-none rounded-[25px] px-6 py-4 text-[#3d1f00] focus:outline-none focus:ring-2 focus:ring-[#83451e]/30 transition-all font-['Manrope'] appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2383451e' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1.5rem center',
                  backgroundSize: '1.25rem'
                }}
                required
              >
                <option value="">Выберите вид спорта</option>
                <option value="football">Футбол</option>
                <option value="basketball">Баскетбол</option>
                <option value="volleyball">Волейбол</option>
                <option value="tennis">Теннис</option>
                <option value="swimming">Плавание</option>
                <option value="running">Бег</option>
                <option value="cycling">Велоспорт</option>
                <option value="fitness">Фитнес</option>
                <option value="yoga">Йога</option>
                <option value="other">Другое</option>
              </select>
            </div>

            {/* Кнопка */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#83451e] text-[#fffee7] py-4 rounded-[25px] font-['Manrope'] hover:bg-[#6b3818] transition-all shadow-md hover:shadow-lg mt-8 disabled:opacity-50"
            >
              {loading ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>
          </form>

          {/* Ссылки */}
          <div className="mt-8 text-center space-y-3">
            <p className="text-[#83451e] font-['Manrope']">
              Уже есть аккаунт?{' '}
              <NavLink
                to="/login"
                className="text-[#3d1f00] underline decoration-1 underline-offset-2 hover:text-[#83451e] transition-colors"
              >
                Войти
              </NavLink>
            </p>
            <NavLink
              to="/FAQ"
              className="text-[#83451e] text-sm underline decoration-1 underline-offset-2 hover:text-[#3d1f00] transition-colors font-['Manrope']"
            >
              FAQs
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}