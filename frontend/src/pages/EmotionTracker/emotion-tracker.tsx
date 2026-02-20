import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import svgPaths from './imports/svg-nfsr0erm4u';
import svgPathsBack from './imports/svg-n101rx8ak0';
import { NavLink } from 'react-router-dom';

interface EmotionEntry {
  date: string; // YYYY-MM-DD format
  emotion: EmotionType;
}

type EmotionType = 'anger' | 'fear' | 'sadness' | 'sorrow' | 'weakness' | 'stress' | 'calm' | 'joy';

interface Emotion {
  type: EmotionType;
  label: string;
  emoji: string;
  color: string;    
}

const emotions: Emotion[] = [
  { type: 'anger', label: 'Злость', emoji: '😠', color: '#f44336' },
  { type: 'fear', label: 'Страх', emoji: '😨', color: '#9c27b0' },
  { type: 'sadness', label: 'Грусть', emoji: '😢', color: '#2196f3' },
  { type: 'sorrow', label: 'Печаль', emoji: '😔', color: '#3f51b5' },
  { type: 'weakness', label: 'Слабость', emoji: '😓', color: '#9e9e9e' },
  { type: 'stress', label: 'Стресс', emoji: '😰', color: '#ff9800' },
  { type: 'calm', label: 'Спокойствие', emoji: '😌', color: '#4caf50' },
  { type: 'joy', label: 'Радость', emoji: '😊', color: '#8bc34a' },
];

export default function EmotionTracker() {
  const [currentMonth, setCurrentMonth] = useState(1); // 1-12 for 2026
  const [emotionEntries, setEmotionEntries] = useState<EmotionEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const getDaysInMonth = (month: number, year: number = 2026) => {
    return new Date(year, month, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number = 2026) => {
    const day = new Date(year, month - 1, 1).getDay();
    return day === 0 ? 7 : day; // Convert Sunday from 0 to 7
  };

  const formatDate = (day: number, month: number) => {
    return `2026-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getEmotionForDate = (date: string): Emotion | null => {
    const entry = emotionEntries.find(e => e.date === date);
    if (!entry) return null;
    return emotions.find(e => e.type === entry.emotion) || null;
  };

  const handleDayClick = (day: number) => {
    const date = formatDate(day, currentMonth);
    setSelectedDate(date);
    setShowModal(true);
  };

  const handleEmotionSelect = (emotionType: EmotionType) => {
    if (!selectedDate) return;

    const existingIndex = emotionEntries.findIndex(e => e.date === selectedDate);
    
    if (existingIndex >= 0) {
      const newEntries = [...emotionEntries];
      newEntries[existingIndex] = { date: selectedDate, emotion: emotionType };
      setEmotionEntries(newEntries);
    } else {
      setEmotionEntries([...emotionEntries, { date: selectedDate, emotion: emotionType }]);
    }

    setShowModal(false);
    setSelectedDate(null);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 1; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = formatDate(day, currentMonth);
      const emotion = getEmotionForDate(date);
      const today = new Date();
      const isToday = day === today.getDate() && 
                      currentMonth === today.getMonth() + 1 && 
                      today.getFullYear() === 2026;

      days.push(
        <button
          key={day}
          onClick={() => handleDayClick(day)}
          className={`aspect-square rounded-[15px] flex flex-col items-center justify-center transition-all hover:bg-[#f0e8d8] relative ${
            isToday ? 'ring-2 ring-[#f5a623]' : ''
          }`}
        >
          <span className={`text-[16px] mb-1 ${emotion ? 'text-[#3d1f00] font-semibold' : 'text-[#83451e]'}`}>
            {day}
          </span>
          {emotion && (
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-[20px]"
              style={{ backgroundColor: emotion.color + '20' }}
            >
              {emotion.emoji}
            </div>
          )}
        </button>
      );
    }

    return days;
  };

  const getEmotionStats = () => {
    const stats: { [key: string]: number } = {};
    emotionEntries.forEach(entry => {
      stats[entry.emotion] = (stats[entry.emotion] || 0) + 1;
    });
    return stats;
  };

  const prevMonth = () => {
    setCurrentMonth(prev => prev === 1 ? 12 : prev - 1);
  };

  const nextMonth = () => {
    setCurrentMonth(prev => prev === 12 ? 1 : prev + 1);
  };

  const emotionStats = getEmotionStats();
  const totalEntries = emotionEntries.length;

  return (
    <div className="min-h-screen bg-[#fffee7] flex">
      {/* Sidebar */}
      <aside className="w-[264px] bg-[#faf8f0] flex flex-col p-6 shrink-0 border-r border-[#e8dcc8]">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-[#f5a623] flex items-center justify-center shadow-md">
            <span className="text-white text-[18px] font-bold">N</span>
          </div>
          <span className="text-[#3d1f00] text-[18px] font-bold">NIKA</span>
        </div>

        {/* Back to Dialog Button */}
        <NavLink to='/chat'>
          <button className="w-full flex items-center gap-3 px-4 py-3 mb-6 text-white bg-[#f5a623] hover:bg-[#e59615] rounded-[10px] transition-colors shadow-md">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d={svgPathsBack.p11678e00} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
           </svg>
          <span className="text-[14px]">Назад к диалогу</span>
        </button>
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
              <a className="flex items-center gap-3 px-3 py-2 text-[#83451e] hover:bg-[#f0e8d8] rounded-[10px] transition-colors h-[37px]">
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
              </a>
              </NavLink>

              {/* Трекер питания */}
              <NavLink to='/food-tracker'>
              <a className="flex items-center gap-3 px-3 py-2 text-[#83451e] hover:bg-[#f0e8d8] rounded-[10px] transition-colors h-[37px]">
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
              </a>
              </NavLink>

              {/* Трекер прогресса */}
              <NavLink to="">
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-[#83451e] hover:bg-[#f0e8d8] rounded-[10px] transition-colors h-[37px]">
                <div className="h-[20px] w-[20px] overflow-clip relative shrink-0">
                  <div className="absolute contents inset-[10%]">
                    <div className="absolute inset-[10%]">
                      <div className="absolute inset-[-5.21%]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.6667 17.6667">
                          <path d={svgPaths.p8bb5780} stroke="#83451E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute bottom-[35%] left-1/2 right-[35%] top-[30%]">
                      <div className="absolute inset-[-11.9%_-27.78%]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.66667 8.66667">
                          <path d={svgPaths.p2b744180} stroke="#83451E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="text-[14px] leading-[21px]">Трекер прогресса</span>
              </a>
              </NavLink>
              {/* Дневник эмоций */}
              <NavLink to="/emotion-tracker">
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-[#83451e] bg-[#f0e8d8] rounded-[10px] h-[37px]">
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
              </a>
              </NavLink>

              {/* Настройки */}
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-[#83451e] hover:bg-[#f0e8d8] rounded-[10px] transition-colors h-[37px]">
                <div className="h-[20px] w-[20px] overflow-clip relative shrink-0">
                  <div className="absolute contents inset-[8.41%_12.68%]">
                    <div className="absolute inset-[8.41%_12.68%]">
                      <div className="absolute inset-[-5.01%_-5.58%]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5939 18.3035">
                          <path d={svgPaths.p33ad6400} stroke="#83451E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute inset-[37.5%]">
                      <div className="absolute inset-[-16.67%]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.66667 6.66667">
                          <path d={svgPaths.p3d26e2c0} stroke="#83451E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="text-[14px] leading-[21px]">Настройки</span>
              </a>
            </nav>
          </div>
        </div>

        {/* Exit Button */}
        <button className="flex items-center gap-3 px-3 py-2 text-[#83451e] hover:bg-[#f0e8d8] rounded-[10px] transition-colors">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d={svgPathsBack.p14ca9100} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d="M17.5 10H7.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d={svgPathsBack.p38966ca0} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
          <span className="text-[14px]">Выйти</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-[1000px] mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-[#3d1f00] text-[32px] mb-2">Дневник эмоций</h1>
            <p className="text-[#83451e] text-[16px]">
              Отслеживайте свое эмоциональное состояние каждый день
            </p>
          </div>

          {/* Calendar Card */}
          <div className="bg-white rounded-[20px] p-8 mb-6 shadow-sm">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={prevMonth}
                className="w-10 h-10 rounded-full bg-[#faf8f0] hover:bg-[#f0e8d8] flex items-center justify-center transition-colors"
              >
                <ChevronLeft size={20} className="text-[#83451e]" />
              </button>
              
              <h2 className="text-[#3d1f00] text-[24px] font-semibold">
                {monthNames[currentMonth - 1]} 2026
              </h2>

              <button
                onClick={nextMonth}
                className="w-10 h-10 rounded-full bg-[#faf8f0] hover:bg-[#f0e8d8] flex items-center justify-center transition-colors"
              >
                <ChevronRight size={20} className="text-[#83451e]" />
              </button>
            </div>

            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-2 mb-3">
              {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
                <div key={day} className="text-center text-[#83451e] text-[14px] font-medium py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {renderCalendar()}
            </div>
          </div>

          {/* Emotion Stats - Figma Design */}
          {totalEntries > 0 && (
            <div className="bg-white rounded-[20px] p-8 shadow-sm">
              <div className="h-[36px] relative shrink-0 w-[249.475px] mb-6">
                <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[36px] left-0 text-[#3d1f00] text-[24px] top-[-2.4px]">Статистика эмоций</p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                {emotions.map(emotion => {
                  const count = emotionStats[emotion.type] || 0;
                  const percentage = totalEntries > 0 ? (count / totalEntries) * 100 : 0;

                  if (count === 0) return null;

                  return (
                    <div key={emotion.type} className="bg-[#faf8f0] rounded-[15px] p-4 min-w-[240px]">
                      <div className="content-stretch flex gap-[16px] h-[40px] items-center relative shrink-0 mb-3">
                        <div className="relative rounded-[26843500px] shrink-0 size-[40px]" style={{ backgroundColor: `${emotion.color}21` }}>
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
                            <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[#0a0a0a] text-[20px] text-center">{emotion.emoji}</p>
                          </div>
                        </div>
                        <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0">
                          <div className="h-[24px] relative shrink-0">
                            <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[24px] left-0 text-[#3d1f00] text-[16px] top-[-2.2px]">{emotion.label}</p>
                          </div>
                          <div className="h-[18px] relative shrink-0">
                            <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[18px] text-[#83451e] text-[12px] mt-1 mb-2">{count} {count === 1 ? 'день' : 'дня'}</p>
                          </div>
                        </div>
                      </div>
                      <div className="h-[8px] relative w-full">
                        <div className="bg-[#e8dcc8] h-[8px] left-0 absolute rounded-[26843500px] top-0 w-full" />
                        <div 
                          className="h-[8px] left-0 absolute rounded-[26843500px] top-0 transition-all"
                          style={{ width: `${percentage}%`, backgroundColor: emotion.color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Emotion Selection Modal */}
      {showModal && selectedDate && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-[20px] p-8 w-[560px] shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-[#3d1f00] text-[24px] font-semibold">
                  Как вы себя чувствовали?
                </h3>
                <p className="text-[#83451e] text-[14px] mt-1">
                  {new Date(selectedDate).toLocaleDateString('ru-RU', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedDate(null);
                }}
                className="text-[#83451e] hover:text-[#3d1f00]"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {emotions.map(emotion => (
                <button
                  key={emotion.type}
                  onClick={() => handleEmotionSelect(emotion.type)}
                  className="flex flex-col items-center p-4 rounded-[15px] hover:bg-[#faf8f0] transition-all group"
                  style={{ 
                    backgroundColor: getEmotionForDate(selectedDate)?.type === emotion.type 
                      ? emotion.color + '20' 
                      : 'transparent' 
                  }}
                >
                  <span className="text-[40px] mb-2 group-hover:scale-110 transition-transform">
                    {emotion.emoji}
                  </span>
                  <span 
                    className="text-[14px] text-center font-medium"
                    style={{ color: emotion.color }}
                  >
                    {emotion.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
