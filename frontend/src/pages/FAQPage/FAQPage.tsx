import { useState } from 'react';
import { ChevronDown, ChevronUp, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import svgPathsBack from './imports/svg-n101rx8ak0';
import svgPaths from './imports/svg-nfsr0erm4u';
import { NavLink, useNavigate } from 'react-router-dom';
import { fetchWithAuth } from '../../JWT_token_refresh';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'Что такое НИКА?',
    answer: 'НИКА — это цифровой AI-ассистент для здоровья и фитнеса, который помогает людям выстраивать персональный путь к лучшей физической форме и самочувствию. НИКА анализирует данные пользователя, сопровождает его в процессе тренировок и восстановления, помогает формировать устойчивые привычки и поддерживает мотивацию.',
  },
  {
    question: 'Кому подойдёт НИКА?',
    answer: 'НИКА подойдёт людям, которые хотят улучшить физическую форму, следить за здоровьем, заниматься фитнесом осознанно и безопасно — независимо от уровня подготовки. Она одинаково полезна новичкам, тем, кто возвращается к тренировкам после перерыва, и более опытным пользователям.',
  },
  {
    question: 'Чем НИКА отличается от фитнес-приложений?',
    answer: 'НИКА — это не просто набор тренировок. Это персональный AI-ассистент, который адаптируется под пользователя, учитывает его цели, состояние и динамику прогресса. НИКА не заменяет тренера или врача, но помогает принимать более осознанные решения и выстраивать системный подход к тренировкам и здоровью.',
  },
  {
    question: 'Заменяет ли НИКА тренера или врача?',
    answer: 'Нет. Ни в коем случае НИКА не является медицинским продуктом и не ставит диагнозы. Она служит вспомогательным инструментом, то есть помогает ориентироваться в тренировочном процессе, отслеживать прогресс и формировать здоровые привычки. При наличии медицинских ограничений рекомендуется консультироваться со специалистами!',
  },
  {
    question: 'Нужно ли специальное оборудование?',
    answer: 'Нет. Для работы с НИКОЙ достаточно смартфона и доступа к интернету.',
  },
  {
    question: 'Сколько стоит использование НИКИ?',
    answer: 'У НИКИ есть бесплатная версия с базовым функционалом. Также доступна платная подписка с расширенными возможностями, персонализацией и дополнительными сценариями использования. Актуальные условия всегда указаны на сайте.',
  },
  {
    question: 'Можно ли отменить подписку?',
    answer: 'Да. Подписку можно отменить в любой момент через личный кабинет. После отмены платный функционал будет доступен до конца оплаченного периода.',
  },
  {
    question: 'Как защищены мои данные?',
    answer: 'Мы уделяем особое внимание безопасности и конфиденциальности. Все данные пользователей хранятся и обрабатываются в соответствии с действующим законодательством РФ.',
  },
  {
    question: 'Где доступна НИКА?',
    answer: 'На первом этапе НИКА доступна в формате веб-сервиса через сайт.',
  },
];

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-[1000px] space-y-4">
      {faqData.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className="backdrop-blur-[25px] bg-white/50 rounded-[20px] border-2 border-white/70 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)] overflow-hidden transition-all hover:shadow-[0px_8px_32px_0px_rgba(0,0,0,0.1)] hover:border-white/90"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-8 py-6 flex items-center justify-between text-left transition-all group"
            >
              <span className="font-['Manrope:SemiBold',sans-serif] font-semibold text-[19px] text-[#2d3625] pr-8 leading-relaxed group-hover:text-[#f6b044] transition-colors">
                {item.question}
              </span>
              <div className="flex-shrink-0 w-11 h-11 rounded-full bg-gradient-to-br from-[#f6b044] to-[#f39c12] flex items-center justify-center transition-all group-hover:scale-110 shadow-md">
                {isOpen ? (
                  <ChevronUp size={22} className="text-white" strokeWidth={2.5} />
                ) : (
                  <ChevronDown size={22} className="text-white" strokeWidth={2.5} />
                )}
              </div>
            </button>

            {isOpen && (
              <div className="px-8 pb-6 pt-3 border-t-2 border-white/60 backdrop-blur-sm bg-white/20">
                <p className="font-['Manrope:Regular',sans-serif] text-[17px] text-[#5a6444] leading-[1.75]">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function FAQPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const onLogout = async () => {
    try {
      const response = await fetchWithAuth('/api/v1/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Ошибка выхода');
      }
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      navigate('/');
    } catch (err) {
      console.error(err);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#fffee7] flex">
      {/* Background Gradients */}
      <div className="hidden md:block absolute pointer-events-none bg-[rgba(246,176,68,0.08)] blur-[100px] left-[15%] opacity-50 rounded-full w-[450px] h-[450px] top-0" />
      <div className="hidden md:block absolute pointer-events-none bg-[rgba(243,156,18,0.08)] blur-[100px] right-[15%] rounded-full w-[450px] h-[450px] top-[250px]" />

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
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden fixed inset-0 bg-black/50 z-40 cursor-pointer"
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
            className="md:hidden p-3 -mr-2 text-[#83451e] hover:bg-[#f0e8d8] rounded-lg cursor-pointer relative z-[60] active:scale-95"
          >
            <X size={24} />
          </button>
        </div>

        <NavLink to="/chat">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full flex items-center gap-3 px-4 py-3 mb-6 text-white bg-[#f5a623] hover:bg-[#e59615] rounded-[10px] transition-colors shadow-md"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d={svgPathsBack.p11678e00} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[14px]">Назад к диалогу</span>
          </motion.button>
        </NavLink>

        <div className="flex-1">
          <div className="mb-6">
            <h3 className="text-[#83451e] text-[12px] uppercase tracking-[0.6px] mb-4 px-3 leading-[18px]">
              МЕНЮ
            </h3>
            <nav className="flex flex-col gap-1">
              {/* Личный кабинет */}
              <NavLink to="/profile">
                <motion.span
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-3 px-3 py-2 text-[#83451e] hover:bg-[#f0e8d8] rounded-[10px] transition-colors h-[37px]"
                >
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
              <NavLink to="/food-tracker">
                <motion.span
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-3 px-3 py-2 text-[#83451e] hover:bg-[#f0e8d8] rounded-[10px] transition-colors h-[37px]"
                >
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
                <motion.span
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-3 px-3 py-2 text-[#83451e] hover:bg-[#f0e8d8] rounded-[10px] transition-colors h-[37px]"
                >
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
            </nav>
          </div>
        </div>

        <motion.button
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.97 }}
          onClick={onLogout}
          className="flex items-center gap-3 px-3 py-2 text-[#83451e] hover:bg-[#f0e8d8] rounded-[10px] transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d={svgPathsBack.p14ca9100} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d="M17.5 10H7.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d={svgPathsBack.p38966ca0} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
          <span className="text-[14px]">Выйти</span>
        </motion.button>
      </motion.aside>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
        className="flex-1 p-4 sm:p-6 md:p-8 overflow-auto pt-16 md:pt-8"
      >
        <div className="max-w-[1050px]">
          <div className="mb-8 md:mb-12">
            <h1 className="font-['Manrope:Bold',sans-serif] text-[32px] md:text-[44px] font-bold text-[#2d3625] mb-2 md:mb-3 tracking-tight">
              Часто задаваемые вопросы
            </h1>
            <p className="font-['Manrope:Regular',sans-serif] text-[18px] text-[#5a6444] leading-relaxed">
              Ответы на самые популярные вопросы о НИКЕ
            </p>
          </div>

          <FAQAccordion />
        </div>
      </motion.div>
    </div>
  );
}