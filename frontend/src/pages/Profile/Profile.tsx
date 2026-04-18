import { ChevronRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import svgPathsBack from './imports/svg-n101rx8ak0';
import svgPaths from './imports/svg-nfsr0erm4u';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchWithAuth } from '../../JWT_token_refresh';


const sportLabels: Record<string, string> = {
  football: 'Футбол',
  basketball: 'Баскетбол',
  volleyball: 'Волейбол',
  tennis: 'Теннис',
  swimming: 'Плавание',
  running: 'Бег',
  cycling: 'Велоспорт',
  fitness: 'Фитнес',
  yoga: 'Йога',
  other: 'Другое',
};

interface SubscriptionInfo {
  id: number;
  status: string;
  expires_at: string;
  is_active: boolean;
  plan: {
    name: string;
    price_rub: number;
    daily_requests_limit: number;
  } | null;
}

export default function Profile() {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [sportType, setSportType] = useState('')
  const [gender, setGender] = useState('')
  const [subscription, setSubscription] = useState<SubscriptionInfo | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [cancelling, setCancelling] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      const response = await fetchWithAuth('/api/v1/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
          throw new Error('Ошибка выхода');
        }
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        navigate('/login');
        return;
      }
      getUserData()
    }, [navigate]);

  const getUserData = async () => {
    try {
      const response = await fetchWithAuth('/api/v1/auth/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        console.error('Profile response not ok:', response.status)
        return
      }
      const data = await response.json()
      if (data?.data) {
        setName(data.data.name)
        setLastName(data.data.last_name)
        setEmail(data.data.email)
        setSportType(data.data.sport_type || '')
        setGender(data.data.gender || '')
        setIsAdmin(data.data.is_admin || false)
        setSubscription(data.data.subscription || null)
      }
    } catch (err) {
      console.error('getUserData error:', err);
    }
  }

  const handleCancelSubscription = async () => {
    if (!confirm('Вы уверены, что хотите отменить подписку?')) return;
    setCancelling(true);
    try {
      const res = await fetchWithAuth('/api/v1/subscription/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.success) {
        setSubscription(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCancelling(false);
    }
  }

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetchWithAuth('/api/v1/auth/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, last_name: lastName, gender, sport_type: sportType }),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.message);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
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
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/50 z-[45] cursor-pointer"
          style={{ touchAction: 'none' }}
        />
      )}

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
        `}>
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
            <h3 className="text-[#83451e] text-[12px] uppercase tracking-[0.6px] mb-4 px-3 leading-[18px]">
              МЕНЮ
            </h3>
            <nav className="flex flex-col gap-1">
              {/* Личный кабинет  - ACTIVE */}
              <NavLink to='/profile'>
              <motion.span whileHover={{ x: 4 }} whileTap={{ scale: 0.97 }} className="flex items-center gap-3 px-3 py-2 text-[#83451e] bg-[#f0e8d8] rounded-[10px] h-[37px]">
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

              {/* Обратная связь */}
              <NavLink to="/contact">
              <motion.span whileHover={{ x: 4 }} whileTap={{ scale: 0.97 }} className="flex items-center gap-3 px-3 py-2 text-[#83451e] hover:bg-[#f0e8d8] rounded-[10px] transition-colors h-[37px]">
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
        <motion.button whileHover={{ x: 4 }} whileTap={{ scale: 0.97 }} onClick={onLogout} className="flex items-center gap-3 px-3 py-2 text-[#83451e] hover:bg-[#f0e8d8] rounded-[10px] transition-colors">
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
          <div className="mb-10">
            <h1 className="text-[#3d1f00] text-[36px] font-normal mb-2">
              Личный кабинет
            </h1>
            <p className="text-[#83451e] text-[14px]">
              Управляйте своим профилем и настройками
            </p>
          </div>

          {/* Profile Section */}
          <div className="bg-white rounded-[20px] p-8 mb-6 shadow-sm">
            <div className="mb-8">
              {/* User Info */}
              <div>
                <h2 className="text-[#3d1f00] text-[24px] font-semibold mb-1">
                  {name} {lastName}
                </h2>
                <p className="text-[#83451e] text-[14px] mb-4">
                  {email}
                </p>
                <div className="flex gap-4">
                  {sportType && <div className="bg-[#f0e8d8] px-4 py-2 rounded-full">
                    <span className="text-[#83451e] text-[14px]">{sportLabels[sportType] || sportType}</span>
                  </div>}
                  <div className="bg-[#f0e8d8] px-4 py-2 rounded-full">
                    <span className="text-[#83451e] text-[14px]">{gender === 'male' ? 'Мужской' : gender === 'female' ? 'Женский' : ''}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <div className="space-y-5">
              {/* Name Fields Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block pl-5 text-[#83451e] text-[14px]">
                    Имя
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-[56px] px-6 bg-[#faf8f0] rounded-[25px] text-[#3d1f00] text-[16px] placeholder:text-[rgba(131,69,30,0.5)] focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:bg-[#f0e8d8] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block pl-5 text-[#83451e] text-[14px]">
                    Фамилия
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full h-[56px] px-6 bg-[#faf8f0] rounded-[25px] text-[#3d1f00] text-[16px] placeholder:text-[rgba(131,69,30,0.5)] focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:bg-[#f0e8d8] transition-colors"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block pl-5 text-[#83451e] text-[14px]">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full h-[56px] px-6 bg-[#faf8f0] rounded-[25px] text-[#3d1f00] text-[16px] placeholder:text-[rgba(131,69,30,0.5)] focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:bg-[#f0e8d8] transition-colors opacity-60"
                />
              </div>

              {/* Sport Type */}
              <div className="space-y-2">
                <label className="block pl-5 text-[#83451e] text-[14px]">
                  Вид спорта
                </label>
                <select
                  value={sportType}
                  onChange={(e) => setSportType(e.target.value)}
                  className="w-full h-[56px] px-6 bg-[#faf8f0] rounded-[25px] text-[#3d1f00] text-[16px] focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:bg-[#f0e8d8] appearance-none cursor-pointer transition-colors"
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

              {/* Gender Selection */}
              <div className="space-y-3">
                <label className="block pl-5 text-[#83451e] text-[14px]">
                  Пол
                </label>
                <div className="flex gap-3">
                  <button onClick={() => setGender('female')} className={`flex-1 h-[56px] rounded-[25px] text-[16px] transition-colors ${gender === 'female' ? 'bg-[#83451e] text-[#fffee7] shadow-md hover:bg-[#6d3918]' : 'bg-[#faf8f0] text-[#83451e] hover:bg-[#f0e8d8]'}`}>
                    Женский
                  </button>
                  <button onClick={() => setGender('male')} className={`flex-1 h-[56px] rounded-[25px] text-[16px] transition-colors ${gender === 'male' ? 'bg-[#83451e] text-[#fffee7] shadow-md hover:bg-[#6d3918]' : 'bg-[#faf8f0] text-[#83451e] hover:bg-[#f0e8d8]'}`}>
                    Мужской
                  </button>
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-4">
                <button onClick={handleSave} disabled={saving} className="w-full h-[56px] bg-[#83451e] rounded-[25px] text-[#fffee7] text-[16px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] hover:bg-[#6d3918] transition-colors disabled:opacity-50">
                  {saving ? 'Сохранение...' : saved ? 'Сохранено ✓' : 'Сохранить изменения'}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white relative rounded-[20px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0 w-full p-8 mb-8">
            <div className="flex flex-col gap-6">
                <div className="h-[30px] relative shrink-0 w-full">
                    <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[30px] left-0 text-[#3d1f00] text-[20px] top-[-2.4px]">Подписка</p>
                </div>
                
                {subscription && subscription.is_active ? (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-[#f0fdf4] rounded-[20px] border border-[#bbf7d0]">
                    <div>
                      <p className="text-[#3d1f00] font-['Arimo:Bold',sans-serif] text-[18px] font-bold">
                        {subscription.plan?.name || 'Premium'}
                      </p>
                      <div className="flex flex-col gap-1 mt-2">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                          <p className="text-[#83451e] font-['Arimo:Regular',sans-serif] text-[14px]">
                            {subscription.plan?.price_rub} руб/мес
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                          <p className="text-[#83451e] font-['Arimo:Regular',sans-serif] text-[14px]">
                            Действует до {new Date(subscription.expires_at).toLocaleDateString('ru-RU')}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                          <p className="text-[#83451e] font-['Arimo:Regular',sans-serif] text-[14px]">
                            До {subscription.plan?.daily_requests_limit} запросов в день
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleCancelSubscription}
                      disabled={cancelling}
                      className="shrink-0 bg-red-50 hover:bg-red-100 text-red-600 font-['Arimo:Bold',sans-serif] font-bold py-3 px-6 rounded-[15px] transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                      {cancelling ? 'Отмена...' : 'Отменить подписку'}
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-[#faf8f0] rounded-[20px]">
                    <div>
                      <p className="text-[#3d1f00] font-['Arimo:Bold',sans-serif] text-[18px] font-bold">Бесплатный план</p>
                      <div className="flex flex-col gap-1 mt-2">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#83451e]" />
                          <p className="text-[#83451e] font-['Arimo:Regular',sans-serif] text-[14px]">ограниченное количество персональных рекомендаций</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#83451e]" />
                          <p className="text-[#83451e] font-['Arimo:Regular',sans-serif] text-[14px]">базовый уровень анализа прогресса</p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate('/subscription')}
                      className="shrink-0 bg-[#f5a623] hover:bg-[#e59615] text-white font-['Arimo:Bold',sans-serif] font-bold py-3 px-6 rounded-[15px] shadow-md transition-all active:scale-[0.98]"
                    >
                      Купить подписку
                    </button>
                  </div>
                )}
            </div>
        </div>

        {/* Admin Panel */}
          {isAdmin && (
            <div className="bg-white rounded-[20px] p-8 shadow-sm mb-6 border-2 border-[#f5a623]">
              <h3 className="text-[#3d1f00] text-[20px] font-semibold mb-4">
                Админ-панель
              </h3>
              <button
                onClick={() => navigate('/admin/plans')}
                className="flex items-center justify-between w-full p-4 hover:bg-[#faf8f0] rounded-[15px] transition-colors group"
              >
                <span className="text-[#3d1f00] text-[16px]">Управление тарифами</span>
                <ChevronRight className="text-[#83451e] group-hover:text-[#f5a623] transition-colors" size={20} />
              </button>
            </div>
          )}

          {/* TODO: раскомментировать когда будут реализованы функции
          <div className="bg-white rounded-[20px] p-8 shadow-sm">
            <h3 className="text-[#3d1f00] text-[20px] font-semibold mb-6">
              Дополнительные настройки
            </h3>

            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 hover:bg-[#faf8f0] rounded-[15px] transition-colors group">
                <span className="text-[#3d1f00] text-[16px]">Изменить пароль</span>
                <ChevronRight className="text-[#83451e] group-hover:text-[#f5a623] transition-colors" size={20} />
              </button>

              <button className="w-full flex items-center justify-between p-4 hover:bg-[#faf8f0] rounded-[15px] transition-colors group">
                <span className="text-[#3d1f00] text-[16px]">О приложении</span>
                <ChevronRight className="text-[#83451e] group-hover:text-[#f5a623] transition-colors" size={20} />
              </button>
            </div>
          </div>
          */}
        </div>
      </motion.main>
    </div>
  );
}
