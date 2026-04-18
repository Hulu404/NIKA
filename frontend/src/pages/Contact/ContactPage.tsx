import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useNavigate, NavLink } from 'react-router-dom';
import { fetchWithAuth } from '../../JWT_token_refresh';
import svgPathsBack from './imports/svg-n101rx8ak0';
import svgPaths from './imports/svg-nfsr0erm4u';

export default function ContactPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    message: ''
  });
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors = { fullName: '', email: '', message: '' };
    if (!formData.fullName.trim()) newErrors.fullName = 'Полное имя обязательно для заполнения';
    if (!formData.email.trim()) newErrors.email = 'Email адрес обязателен для заполнения';
    else if (!validateEmail(formData.email)) newErrors.email = 'Пожалуйста, введите корректный email адрес';
    if (!formData.message.trim()) newErrors.message = 'Сообщение обязательно для заполнения';
    setErrors(newErrors);
    return !newErrors.fullName && !newErrors.email && !newErrors.message;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmissionStatus('idle');

    try {
      const response = await fetchWithAuth('/api/v1/feedback/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `${formData.subject ? `Тема: ${formData.subject}\n` : ''}Имя: ${formData.fullName}\nEmail: ${formData.email}\n\n${formData.message}`,
          feedback_type: 'question'
        })
      });

      if (response.ok) {
        setSubmissionStatus('success');
        setFormData({ fullName: '', email: '', subject: '', message: '' });
        setErrors({ fullName: '', email: '', message: '' });
      } else {
        throw new Error('Ошибка отправки');
      }
    } catch {
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) setErrors(prev => ({ ...prev, [field]: '' }));
    if (submissionStatus !== 'idle') setSubmissionStatus('idle');
  };

  return (
    <div className="flex min-h-screen w-full bg-[#fffee7]">
      {/* Mobile Hamburger */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2.5 bg-[#faf8f0] rounded-xl border border-[#e8dcc8] shadow-sm"
      >
        <Menu size={20} className="text-[#83451e]" />
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onPointerDown={(e) => { e.preventDefault(); e.stopPropagation(); setIsMobileMenuOpen(false); }}
            onTouchEnd={(e) => { e.preventDefault(); e.stopPropagation(); setIsMobileMenuOpen(false); }}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsMobileMenuOpen(false); }}
            className="md:hidden fixed inset-0 bg-black/50 z-[45] cursor-pointer" style={{ touchAction: 'none' }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        onTouchStart={(e) => {
          e.currentTarget.dataset.touchStartX = String(e.touches[0].clientX);
        }}
        onTouchEnd={(e) => {
          const startX = Number(e.currentTarget.dataset.touchStartX || '0');
          const endX = e.changedTouches[0].clientX;
          if (startX - endX > 50) {
            setIsMobileMenuOpen(false);
          }
        }}
        className={`
          fixed md:static inset-y-0 left-0 z-50
          w-[264px] bg-[#faf8f0] flex flex-col p-6 shrink-0 border-r border-[#e8dcc8]
          transition-transform duration-300 shadow-2xl md:shadow-none
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between gap-3 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#f5a623] flex items-center justify-center shadow-md">
              <span className="text-white text-[18px] font-bold">N</span>
            </div>
            <span className="text-[#3d1f00] text-[18px] font-bold">NIKA</span>
          </div>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            onTouchEnd={(e) => { e.stopPropagation(); setIsMobileMenuOpen(false); }}
            className="md:hidden p-3 -mr-2 text-[#83451e] hover:bg-[#f0e8d8] rounded-lg cursor-pointer relative z-[60] active:scale-95"
          >
            <X size={24} />
          </button>
        </div>

        {/* Back to Dialog Button */}
        <NavLink to='/chat'>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full flex items-center gap-3 px-4 py-3 mb-6 text-white bg-[#f5a623] hover:bg-[#e59615] rounded-[10px] transition-colors shadow-md">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d={svgPathsBack.p11678e00} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[14px]">Назад к диалогу</span>
          </motion.button>
        </NavLink>

        {/* Menu Section */}
        <div className="flex-1">
          <div className="mb-6">
            <h3 className="text-[#83451e] text-[12px] uppercase tracking-[0.6px] mb-4 px-3 leading-[18px]">МЕНЮ</h3>
            <nav className="flex flex-col gap-1">
              {/* Личный кабинет */}
              <NavLink to='/profile'>
                <motion.span whileHover={{ x: 4 }} whileTap={{ scale: 0.97 }} className="flex items-center gap-3 px-3 py-2 text-[#83451e] hover:bg-[#f0e8d8] rounded-[10px] transition-colors h-[37px]">
                  <div className="h-[20px] w-[20px] overflow-clip relative shrink-0">
                    <div className="absolute contents inset-[12.5%_20.83%]">
                      <div className="absolute inset-[62.5%_20.83%_12.5%_20.83%]">
                        <div className="absolute inset-[-16.67%_-7.14%]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 6.66667">
                            <path d={svgPaths.p18dfb480} stroke="#83451E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                          </svg>
                        </div>
                      </div>
                      <div className="absolute inset-[12.5%_33.33%_54.17%_33.33%]">
                        <div className="absolute inset-[-12.5%]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.3333 8.33334">
                            <path d={svgPaths.p9a07d80} stroke="#83451E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="text-[14px] leading-[21px]">Личный кабинет</span>
                </motion.span>
              </NavLink>

              {/* Трекер питания */}
              <NavLink to='/food-tracker'>
                <motion.span whileHover={{ x: 4 }} whileTap={{ scale: 0.97 }} className="flex items-center gap-3 px-3 py-2 text-[#83451e] hover:bg-[#f0e8d8] rounded-[10px] transition-colors h-[37px]">
                  <div className="h-[20px] w-[20px] overflow-clip relative shrink-0">
                    <div className="absolute contents inset-[10%]">
                      <div className="absolute inset-[10%]">
                        <div className="absolute inset-[-4.69%]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.5 17.5">
                            <path d={svgPaths.p1b2ea00} stroke="#83451E" strokeWidth="1.5" />
                          </svg>
                        </div>
                      </div>
                      <div className="absolute bottom-[42.5%] left-1/2 right-[35%] top-[30%]">
                        <div className="absolute inset-[-13.64%_-25.01%_-13.64%_-25%]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.50016 7.00016">
                            <path d="M0.75 0.75V4.75L3.75 6.25" stroke="#83451E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="text-[14px] leading-[21px]">Трекер питания</span>
                </motion.span>
              </NavLink>

              {/* Дневник эмоций */}
              <NavLink to="/emotion-tracker">
                <motion.span whileHover={{ x: 4 }} whileTap={{ scale: 0.97 }} className="flex items-center gap-3 px-3 py-2 text-[#83451e] hover:bg-[#f0e8d8] rounded-[10px] transition-colors h-[37px]">
                  <div className="h-[20px] w-[20px] overflow-clip relative shrink-0">
                    <div className="absolute contents inset-[10%]">
                      <div className="absolute inset-[10%]">
                        <div className="absolute inset-[-5.21%]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.6667 17.6667">
                            <path d={svgPaths.p8bb5780} stroke="#83451E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                          </svg>
                        </div>
                      </div>
                      <div className="absolute inset-[55%_30%_35%_30%]">
                        <div className="absolute inset-[-41.67%_-10.42%]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.66677 3.66672">
                            <path d={svgPaths.p1f71cf00} stroke="#83451E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                          </svg>
                        </div>
                      </div>
                      <div className="absolute inset-[37.5%_62.46%_62.5%_37.5%]">
                        <div className="absolute inset-[-0.83px]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.675 1.66667">
                            <path d="M0.833335 0.833335H0.841665" stroke="#83451E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                          </svg>
                        </div>
                      </div>
                      <div className="absolute inset-[37.5%_37.46%_62.5%_62.5%]">
                        <div className="absolute inset-[-0.83px]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.67497 1.66667">
                            <path d="M0.833335 0.833335H0.841635" stroke="#83451E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="text-[14px] leading-[21px]">Дневник эмоций</span>
                </motion.span>
              </NavLink>

              {/* Обратная связь - ACTIVE */}
              <NavLink to="/contact">
                <motion.span whileHover={{ x: 4 }} whileTap={{ scale: 0.97 }} className="flex items-center gap-3 px-3 py-2 text-[#83451e] bg-[#f0e8d8] rounded-[10px] h-[37px]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#83451E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-[14px] leading-[21px]">Обратная связь</span>
                </motion.span>
              </NavLink>
            </nav>
          </div>
        </div>

        {/* Exit Button */}
        <motion.button
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            navigate('/');
          }}
          className="flex items-center gap-3 px-3 py-2 text-[#83451e] hover:bg-[#f0e8d8] rounded-[10px] transition-colors">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d={svgPathsBack.p14ca9100} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d="M17.5 10H7.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d={svgPathsBack.p38966ca0} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
          <span className="text-[14px]">Выйти</span>
        </motion.button>
      </motion.aside>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
        className={`flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto pt-16 md:pt-8 ${isMobileMenuOpen ? 'max-md:pointer-events-none max-md:overflow-hidden max-md:touch-none max-md:opacity-50' : ''}`}>
        <div className="max-w-[800px] mx-auto">
          {/* Page Header */}
          <div className="mb-8 md:mb-12">
            <h1 className="font-bold text-[28px] sm:text-[36px] leading-tight sm:leading-[54px] text-[#3d1f00] mb-2">
              Свяжитесь с нами
            </h1>
            <p className="text-[14px] leading-[21px] text-[#83451e]">
              Мы будем рады услышать вас. Отправьте сообщение и мы ответим как можно скорее.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-[20px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-[14px] leading-[21px] text-[#83451e] mb-2 ml-5">
                  Полное имя *
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className={`w-full h-[56px] px-6 bg-[#faf8f0] rounded-[25px] text-[16px] leading-[24px] text-[#3d1f00] outline-none transition-all ${
                    errors.fullName ? 'ring-2 ring-[#d4183d]' : 'focus:ring-2 focus:ring-[#83451e]'
                  }`}
                  placeholder="Введите ваше полное имя"
                />
                {errors.fullName && (
                  <p className="mt-2 ml-5 text-[14px] text-[#d4183d]">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-[14px] leading-[21px] text-[#83451e] mb-2 ml-5">
                  Email адрес *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full h-[56px] px-6 bg-[#faf8f0] rounded-[25px] text-[16px] leading-[24px] text-[#3d1f00] outline-none transition-all ${
                    errors.email ? 'ring-2 ring-[#d4183d]' : 'focus:ring-2 focus:ring-[#83451e]'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-2 ml-5 text-[14px] text-[#d4183d]">{errors.email}</p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-[14px] leading-[21px] text-[#83451e] mb-2 ml-5">
                  Тема
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  className="w-full h-[56px] px-6 bg-[#faf8f0] rounded-[25px] text-[16px] leading-[24px] text-[#3d1f00] outline-none focus:ring-2 focus:ring-[#83451e] transition-all"
                  placeholder="О чем ваш запрос?"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-[14px] leading-[21px] text-[#83451e] mb-2 ml-5">
                  Сообщение *
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={6}
                  className={`w-full px-6 py-4 bg-[#faf8f0] rounded-[25px] text-[16px] leading-[24px] text-[#3d1f00] outline-none resize-none transition-all ${
                    errors.message ? 'ring-2 ring-[#d4183d]' : 'focus:ring-2 focus:ring-[#83451e]'
                  }`}
                  placeholder="Расскажите подробнее о вашем запросе..."
                />
                {errors.message && (
                  <p className="mt-2 ml-5 text-[14px] text-[#d4183d]">{errors.message}</p>
                )}
              </div>

              {/* Success Message */}
              {submissionStatus === 'success' && (
                <div className="bg-[#f0e8d8] rounded-[20px] p-4 flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <svg className="w-5 h-5 text-[#83451e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[16px] font-bold text-[#3d1f00]">Сообщение успешно отправлено!</p>
                    <p className="text-[14px] text-[#83451e] mt-1">
                      Спасибо за обращение.
                    </p>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {submissionStatus === 'error' && (
                <div className="bg-[#fef2f2] rounded-[20px] p-4 flex items-start gap-3 border border-[#d4183d]">
                  <div className="flex-shrink-0 mt-0.5">
                    <svg className="w-5 h-5 text-[#d4183d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[16px] font-bold text-[#d4183d]">Не удалось отправить сообщение</p>
                    <p className="text-[14px] text-[#83451e] mt-1">
                      Произошла ошибка при отправке вашего сообщения. Пожалуйста, попробуйте позже.
                    </p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-[56px] bg-[#83451e] text-[#fffee7] text-[16px] leading-[24px] font-normal rounded-[25px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] hover:bg-[#6b3718] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
              </button>
            </form>
          </div>
        </div>
      </motion.main>
    </div>
  );
}
