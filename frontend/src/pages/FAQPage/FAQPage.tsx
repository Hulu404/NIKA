import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import svgPathsBack from './imports/svg-n101rx8ak0';
import { NavLink, useNavigate } from 'react-router-dom';


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
  const navigate = useNavigate()
  const onLogout = async () => {
    try {
      const response = await fetch('/api/v1/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('refresh_token')}`,
        },
      });
      if (!response.ok) throw new Error('Ошибка выхода');
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="min-h-screen bg-[#fffee7] flex">
      {/* Background Gradients */}
      <div className="absolute bg-[rgba(246,176,68,0.08)] blur-[100px] left-[15%] opacity-50 rounded-full w-[450px] h-[450px] top-0" />
      <div className="absolute bg-[rgba(243,156,18,0.08)] blur-[100px] right-[15%] rounded-full w-[450px] h-[450px] top-[250px]" />
      
      {/* Sidebar */}
      <aside className="w-[264px] bg-[#faf8f0] flex flex-col p-6 shrink-0 border-r border-[#e8dcc8]">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-[#f5a623] flex items-center justify-center shadow-md">
            <span className="text-white text-[18px] font-bold">N</span>
          </div>
          <span className="text-[#3d1f00] text-[18px] font-bold">NIKA</span>
        </div>

        <NavLink to='/chat'>
          <button className="w-full flex items-center gap-3 px-4 py-3 mb-6 text-white bg-[#f5a623] hover:bg-[#e59615] rounded-[10px] transition-colors shadow-md">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d={svgPathsBack.p11678e00} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[14px]">Назад к диалогу</span>
          </button>
        </NavLink>

        <div className="flex-1">
          <div className="mb-6">
            <h3 className="text-[#83451e] text-[12px] uppercase tracking-[0.6px] mb-4 px-3 leading-[18px]">МЕНЮ</h3>
            <nav className="flex flex-col gap-1">
              <NavLink to='/profile'>
                <span className="flex items-center gap-3 px-3 py-2 text-[#83451e] hover:bg-[#f0e8d8] rounded-[10px] transition-colors h-[37px]">
                  <div className="h-[20px] w-[20px] overflow-clip relative shrink-0"></div>
                  <span className="text-[14px] leading-[21px]">Личный кабинет</span>
                </span>
              </NavLink>
              <NavLink to='/food-tracker'>
                <span className="flex items-center gap-3 px-3 py-2 text-[#83451e] hover:bg-[#f0e8d8] rounded-[10px] transition-colors h-[37px]">
                  <div className="h-[20px] w-[20px] overflow-clip relative shrink-0"></div>
                  <span className="text-[14px] leading-[21px]">Трекер питания</span>
                </span>
              </NavLink>
              <NavLink to="/emotion-tracker">
                <span className="flex items-center gap-3 px-3 py-2 text-[#83451e] hover:bg-[#f0e8d8] rounded-[10px] transition-colors h-[37px]">
                  <div className="h-[20px] w-[20px] overflow-clip relative shrink-0"></div>
                  <span className="text-[14px] leading-[21px]">Дневник эмоций</span>
                </span>
              </NavLink>
            </nav>
          </div>
        </div>

        <button onClick={onLogout} className="flex items-center gap-3 px-3 py-2 text-[#83451e] hover:bg-[#f0e8d8] rounded-[10px] transition-colors">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d={svgPathsBack.p14ca9100} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d="M17.5 10H7.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d={svgPathsBack.p38966ca0} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
          <span className="text-[14px]">Выйти</span>
        </button>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-[1050px]">
          <div className="mb-12">
            <h1 className="font-['Manrope:Bold',sans-serif] text-[44px] font-bold text-[#2d3625] mb-3 tracking-tight">
              Часто задаваемые вопросы
            </h1>
            <p className="font-['Manrope:Regular',sans-serif] text-[18px] text-[#5a6444] leading-relaxed">
              Ответы на самые популярные вопросы о НИКЕ
            </p>
          </div>
          
          <FAQAccordion />
        </div>
      </div>
    </div>
  );
}
