import { useState } from 'react';
import { NavLink } from 'react-router';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login submitted:', formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="relative min-h-screen w-full bg-[#fffee7] flex items-center justify-center px-6 py-12">
      {/* Main Container */}
      <div className="w-full max-w-[480px]">
        {/* Header */}
        <div className="flex flex-col gap-3 mb-14">
          <div className="h-[50px] flex items-center justify-center">
            <h1 className="text-[#3d1f00] text-[40px] leading-[50px] text-center">Вход</h1>
          </div>
          <div className="h-[24px] flex items-center justify-center">
            <p className="text-[#83451e] text-[16px] leading-[24px] text-center">Войдите в свой аккаунт</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Email Field */}
          <div className="flex flex-col gap-2.5">
            <label htmlFor="email" className="text-[#83451e] text-[14px] leading-[20px] pl-5">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full bg-[rgba(189,145,97,0.15)] border-none rounded-[25px] px-6 py-[18px] text-[#3d1f00] text-[16px] leading-normal placeholder:text-[rgba(131,69,30,0.5)] focus:outline-none focus:ring-2 focus:ring-[#83451e]/30 transition-all"
              placeholder="example@email.com"
              required
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2.5">
            <label htmlFor="password" className="text-[#83451e] text-[14px] leading-[20px] pl-5">
              Пароль
            </label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              className="w-full bg-[rgba(189,145,97,0.15)] border-none rounded-[25px] px-6 py-[18px] text-[#3d1f00] text-[16px] leading-normal placeholder:text-[rgba(131,69,30,0.5)] focus:outline-none focus:ring-2 focus:ring-[#83451e]/30 transition-all"
              placeholder="Введите ваш пароль"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#83451e] text-[#fffee7] text-[16px] leading-[24px] h-[60px] rounded-[25px] hover:bg-[#6b3818] transition-all shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] hover:shadow-lg flex items-center justify-center"
          >
            Войти
          </button>
        </form>

{/* Footer Links - Исправленная версия */}
        <div className="flex flex-col gap-4 mt-14 text-center">
          
          {/* Блок регистрации */}
          <p className="text-[#83451e] text-[16px] leading-[24px]">
            Нет аккаунта?{' '}
            <NavLink to='/registration'>
            <a 
              href="#" 
              className="text-[#3d1f00] underline decoration-1 underline-offset-2 hover:text-[#83451e] transition-colors inline-block"
            >
              Зарегистрироваться
            </a>
            </NavLink>
          </p>

          {/* Блок FAQs */}
          <NavLink to='/FAQ'>
          <a 
            href="#" 
            className="text-[#83451e] text-[14px] leading-[20px] underline decoration-1 underline-offset-2 hover:text-[#3d1f00] transition-colors"
          >
            FAQs
          </a>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
