import { useState } from 'react';
import { ChevronDown, ChevronUp, Plus, Search, Settings, LogOut, Clock } from 'lucide-react';


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

const recentChats = [
  { title: 'План тренировок на неделю', time: '2ч назад' },
  { title: 'Советы по питанию', time: '5ч назад' },
  { title: 'Упражнения для спины', time: 'Вчера' },
  { title: 'Восстановление после бега', time: '2 дня назад' },
];

const menuItems = [
  { title: 'Трекер прогресса', badge: 'Новое' },
  { title: 'Упражнения', badge: null },
  { title: 'Дневник питания', badge: null },
];

function Sidebar() {
  return (
    <div className="fixed left-0 top-0 bottom-0 w-[320px] backdrop-blur-[25px] bg-[rgba(255,255,255,0.8)] border-r border-[rgba(0,0,0,0.05)] flex flex-col shadow-[0px_8px_32px_0px_rgba(0,0,0,0.08)]">
      {/* Header */}
      <div className="px-6 pt-6 pb-6 border-b border-[rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-b from-[#f6b044] to-[#f39c12] rounded-[14px] flex items-center justify-center shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1)]">
            <span className="font-['Manrope:Bold',sans-serif] font-bold text-[14px] text-white">N</span>
          </div>
          <span className="font-['Manrope:Bold',sans-serif] font-bold text-[16px] text-[#101828]">NIKA</span>
        </div>
        
        {/* New Chat Button */}
        <button className="w-full bg-gradient-to-b from-[#f6b044] to-[#f39c12] rounded-[16px] px-4 py-3.5 flex items-center justify-center gap-2.5 shadow-[0px_10px_15px_0px_rgba(246,176,68,0.2)] hover:shadow-[0px_12px_20px_0px_rgba(246,176,68,0.3)] transition-all">
          <Plus size={20} className="text-white" strokeWidth={2} />
          <span className="font-['Manrope:Regular',sans-serif] font-normal text-[16px] text-white">Новый чат</span>
        </button>
      </div>

      {/* Search */}
      <div className="px-6 pt-6 pb-6">
        <div className="relative">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
            <Search size={18} className="text-[#99a1af]" strokeWidth={1.875} />
          </div>
          <input
            type="text"
            placeholder="Поиск..."
            className="w-full bg-white border border-[rgba(0,0,0,0.1)] rounded-[14px] pl-11 pr-4 py-2.5 text-[14px] text-[#99a1af] placeholder-[#99a1af] focus:outline-none shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)] font-['Manrope:Regular',sans-serif]"
          />
        </div>
      </div>

      {/* Recent Chats */}
      <div className="px-3 pb-6 flex-1 overflow-y-auto">
        <div className="flex items-center gap-2 mb-3 px-3">
          <Clock size={14} className="text-[#6a7282]" strokeWidth={1.458} />
          <h3 className="font-['Manrope:Bold',sans-serif] text-[12px] font-bold text-[#6a7282] uppercase tracking-[0.6px]">Недавние</h3>
        </div>
        
        <div className="space-y-1">
          {recentChats.map((chat, index) => (
            <button
              key={index}
              className="w-full text-left px-4 py-3 rounded-[14px] hover:bg-white/60 transition-all"
            >
              <p className="font-['Manrope:Regular',sans-serif] text-[14px] text-[#4a5565] font-normal leading-[20px] line-clamp-1">
                {chat.title}
              </p>
              <p className="font-['Manrope:Regular',sans-serif] text-[12px] text-[#99a1af] leading-[16px] mt-0.5">{chat.time}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Menu */}
      <div className="px-3 pb-6 border-t border-[rgba(0,0,0,0.05)] pt-6">
        <h3 className="font-['Manrope:Bold',sans-serif] text-[12px] font-bold text-[#6a7282] uppercase tracking-[0.6px] mb-3 px-3">Меню</h3>
        
        <div className="space-y-1 mb-4">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="w-full text-left px-4 py-2.5 rounded-[14px] hover:bg-white/60 transition-all flex items-center justify-between"
            >
              <span className="font-['Manrope:Regular',sans-serif] text-[14px] text-[#4a5565] font-normal leading-[20px]">{item.title}</span>
              {item.badge && (
                <span className="font-['Manrope:Bold',sans-serif] bg-[rgba(246,176,68,0.2)] text-[#f6b044] text-[12px] font-bold px-2 py-0.5 rounded-full leading-[16px]">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
        
        <div className="space-y-1">
          <button className="w-full text-left px-3 py-2.5 rounded-[14px] hover:bg-white/60 transition-all flex items-center gap-3">
            <Settings size={18} className="text-[#99a1af]" strokeWidth={1.875} />
            <span className="font-['Manrope:Regular',sans-serif] text-[14px] text-[#4a5565] font-normal leading-[20px]">Настройки</span>
          </button>
          <button className="w-full text-left px-3 py-2.5 rounded-[14px] hover:bg-white/60 transition-all flex items-center gap-3">
            <LogOut size={18} className="text-[#99a1af]" strokeWidth={1.875} />
            <span className="font-['Manrope:Regular',sans-serif] text-[14px] text-[#4a5565] font-normal leading-[20px]">Выйти</span>
          </button>
        </div>
      </div>
    </div>
  );
}

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
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf7ec] via-[#fdf8f0] to-[#f9f4e8] relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute bg-[rgba(246,176,68,0.08)] blur-[100px] left-[15%] opacity-50 rounded-full w-[450px] h-[450px] top-0" />
      <div className="absolute bg-[rgba(243,156,18,0.08)] blur-[100px] right-[15%] rounded-full w-[450px] h-[450px] top-[250px]" />
      
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="ml-[320px] mr-20 py-16 px-10 min-h-screen">
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
