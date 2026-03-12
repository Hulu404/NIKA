import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, TrendingUp, Sparkles } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import svgPaths from './imports/svg-nfsr0erm4u';
import svgPathsBack from './imports/svg-n101rx8ak0';
import { fetchWithAuth } from '../../JWT_token_refresh';

interface EmotionEntry {
  date: string; // YYYY-MM-DD
  emotion: EmotionType;
}

type EmotionType = 'anger' | 'fear' | 'sadness' | 'sorrow' | 'weakness' | 'stress' | 'calm' | 'joy';

interface Emotion {
  type: EmotionType;
  label: string;
  emoji: string;
  color: string;
  valence: number;
}

const emotions: Emotion[] = [
  { type: 'anger', label: 'Злость', emoji: '😠', color: '#f44336', valence: -2 },
  { type: 'fear', label: 'Страх', emoji: '😨', color: '#9c27b0', valence: -1.5 },
  { type: 'sadness', label: 'Грусть', emoji: '😢', color: '#2196f3', valence: -1 },
  { type: 'sorrow', label: 'Печаль', emoji: '😔', color: '#3f51b5', valence: -1 },
  { type: 'weakness', label: 'Слабость', emoji: '😓', color: '#9e9e9e', valence: -0.5 },
  { type: 'stress', label: 'Стресс', emoji: '😰', color: '#ff9800', valence: -1.5 },
  { type: 'calm', label: 'Спокойствие', emoji: '😌', color: '#4caf50', valence: 1 },
  { type: 'joy', label: 'Радость', emoji: '😊', color: '#8bc34a', valence: 2 },
];

export default function EmotionTracker() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [emotionEntries, setEmotionEntries] = useState<EmotionEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [aiAdvice, setAiAdvice] = useState<string>('');
  const [loadingAdvice, setLoadingAdvice] = useState(false);
  const [setLoading] = useState(false);
  const navigate = useNavigate();

  // Загрузка записей с сервера
  useEffect(() => {
    const fetchEntries = async () => {
      setLoading(true);
      try {
        const response = await fetchWithAuth('/api/v1/emotion/entries');
        if (!response.ok) throw new Error('Ошибка загрузки');
        const data = await response.json();
        const entries = data.map((item: any) => ({
          date: item.date,
          emotion: item.emotion,
        }));
        setEmotionEntries(entries);
      } catch (error) {
        console.error('Не удалось загрузить эмоции:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEntries();
  }, []);

  const onLogout = async () => {
    try {
      const response = await fetch('/api/v1/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('refresh_token')}`,
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

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const getDaysInMonth = (month: number, year: number = 2026) => new Date(year, month, 0).getDate();
  const getFirstDayOfMonth = (month: number, year: number = 2026) => {
    const day = new Date(year, month - 1, 1).getDay();
    return day === 0 ? 7 : day;
  };
  const formatDate = (day: number, month: number) => `2026-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  const getEmotionForDate = (date: string): Emotion | null => {
    const entry = emotionEntries.find(e => e.date === date);
    if (!entry) return null;
    return emotions.find(e => e.type === entry.emotion) || null;
  };

  const handleDayClick = (day: number) => {
    setSelectedDate(formatDate(day, currentMonth));
    setShowModal(true);
  };

  const handleEmotionSelect = async (emotionType: EmotionType) => {
    if (!selectedDate) return;

    const newEntry = { date: selectedDate, emotion: emotionType };

    try {
      const response = await fetchWithAuth('/api/v1/emotion/entries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEntry),
      });
      if (!response.ok) throw new Error('Ошибка сохранения');

      const existingIndex = emotionEntries.findIndex(e => e.date === selectedDate);
      let updatedEntries;
      if (existingIndex >= 0) {
        updatedEntries = [...emotionEntries];
        updatedEntries[existingIndex] = newEntry;
      } else {
        updatedEntries = [...emotionEntries, newEntry];
      }
      setEmotionEntries(updatedEntries);

      setShowModal(false);
      setSelectedDate(null);
    } catch (error) {
      console.error('Ошибка сохранения эмоции:', error);
      alert('Не удалось сохранить эмоцию. Попробуйте позже.');
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    for (let i = 1; i < firstDay; i++) days.push(<div key={`empty-${i}`} className="aspect-square"></div>);

    for (let day = 1; day <= daysInMonth; day++) {
      const date = formatDate(day, currentMonth);
      const emotion = getEmotionForDate(date);
      const today = new Date();
      const isToday = day === today.getDate() && currentMonth === today.getMonth() + 1 && today.getFullYear() === 2026;

      days.push(
        <button
          key={day}
          onClick={() => handleDayClick(day)}
          className={`aspect-square rounded-[15px] flex flex-col items-center justify-center transition-all hover:bg-[#f0e8d8] relative ${isToday ? 'ring-2 ring-[#f5a623]' : ''}`}
        >
          <span className={`text-[16px] mb-1 ${emotion ? 'text-[#3d1f00] font-semibold' : 'text-[#83451e]'}`}>{day}</span>
          {emotion && (
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-[20px]" style={{ backgroundColor: emotion.color + '20' }}>
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

  const getMonthlyChartData = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const data = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const date = formatDate(day, currentMonth);
      const emotion = getEmotionForDate(date);
      data.push({
        day: day,
        valence: emotion ? emotion.valence : 0,
        emotion: emotion?.emoji || '',
      });
    }
    return data;
  };

  const chartData = getMonthlyChartData();

  const requestAiAdvice = async () => {
    setLoadingAdvice(true);
    try {
      const stats = getEmotionStats();
      const total = emotionEntries.length;
      const topEmotion = Object.entries(stats).sort((a, b) => b[1] - a[1])[0];
      const topEmotionObj = emotions.find(e => e.type === topEmotion?.[0]);
      const daysWithEmotions = chartData.filter(d => d.valence !== 0); // или d.count > 0
      const avgValence = daysWithEmotions.reduce((sum, d) => sum + d.valence, 0) / daysWithEmotions.length;

      const prompt = `За последний месяц (${monthNames[currentMonth - 1]}) у меня было ${total} дней с отмеченными эмоциями. Чаще всего я чувствовал(а) ${topEmotionObj?.label || 'неизвестно'}. Средний эмоциональный фон (от -2 до +2) за отмеченные дни составил ${avgValence.toFixed(2)}. Дай краткий совет по улучшению эмоционального состояния (1-2 предложения).`;
      const response = await fetchWithAuth('/api/v1/emotion/advice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) throw new Error('Ошибка сервера');
      const data = await response.json();
      setAiAdvice(data.advice);
    } catch (error) {
      console.error('Ошибка получения совета', error);
      setAiAdvice('Не удалось получить совет. Попробуйте позже.');
    } finally {
      setLoadingAdvice(false);
    }
  };

  const prevMonth = () => {
    setCurrentMonth(prev => prev === 1 ? 12 : prev - 1);
    setAiAdvice('');
  };

  const nextMonth = () => {
    setCurrentMonth(prev => prev === 12 ? 1 : prev + 1);
    setAiAdvice('');
  };

  const emotionStats = getEmotionStats();
  const totalEntries = emotionEntries.length;

  return (
    <div className="min-h-screen bg-[#fffee7] flex">
      {/* Sidebar (unchanged) */}
      <aside className="w-[264px] bg-[#faf8f0] flex flex-col p-6 shrink-0 border-r border-[#e8dcc8]">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-[#f5a623] flex items-center justify-center shadow-md">
            <span className="text-white text-[18px] font-bold">N</span>
          </div>
          <span className="text-[#3d1f00] text-[18px] font-bold">NIKA</span>
        </div>
        <NavLink to='/chat'>
          <button className="w-full flex items-center gap-3 px-4 py-3 mb-6 text-white bg-[#f5a623] hover:bg-[#e59615] rounded-[10px] transition-colors shadow-md">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d={svgPathsBack.p11678e00} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[14px]">Назад к диалогу</span>
          </button>
        </NavLink>
        <div className="flex-1">
                  <div className="mb-6">
                    <h3 className="text-[#83451e] text-[12px] uppercase tracking-[0.6px] mb-4 px-3 leading-[18px]">
                      МЕНЮ
                    </h3>
                    <nav className="flex flex-col gap-1">
                      {/* Личный кабинет  - ACTIVE */}
                      <NavLink to='/profile'>
                      <span className="flex items-center gap-3 px-3 py-2 text-[#83451e] hover:bg-[#f0e8d8] rounded-[10px] transition-colors h-[37px]">
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
                      </span>
                      </NavLink>
        
                      {/* Трекер питания */}
                      <NavLink to='/food-tracker'>
                      <span className="flex items-center gap-3 px-3 py-2 text-[#83451e] hover:bg-[#f0e8d8] rounded-[10px] transition-colors h-[37px]">
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
                      </span>
                      </NavLink>
                      {/* Дневник эмоций */}
                      <NavLink to="/emotion-tracker">
                      <span className="flex items-center gap-3 px-3 py-2 text-[#83451e] bg-[#f0e8d8] rounded-[10px] h-[37px]">
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
                      </span>
                      </NavLink>
                    </nav>
                  </div>
                </div>
        <button onClick={onLogout} className="flex items-center gap-3 px-3 py-2 text-[#83451e] hover:bg-[#f0e8d8] rounded-[10px] transition-colors">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
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
            <p className="text-[#83451e] text-[16px]">Отслеживайте свое эмоциональное состояние каждый день</p>
          </div>

          {/* Calendar Card */}
          <div className="bg-white rounded-[20px] p-8 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <button onClick={prevMonth} className="w-10 h-10 rounded-full bg-[#faf8f0] hover:bg-[#f0e8d8] flex items-center justify-center">
                <ChevronLeft size={20} className="text-[#83451e]" />
              </button>
              <h2 className="text-[#3d1f00] text-[24px] font-semibold">{monthNames[currentMonth - 1]} 2026</h2>
              <button onClick={nextMonth} className="w-10 h-10 rounded-full bg-[#faf8f0] hover:bg-[#f0e8d8] flex items-center justify-center">
                <ChevronRight size={20} className="text-[#83451e]" />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-2 mb-3">
              {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
                <div key={day} className="text-center text-[#83451e] text-[14px] font-medium py-2">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">{renderCalendar()}</div>
          </div>

          {/* Statistics and AI Advice */}
          {totalEntries > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-[20px] p-6 shadow-sm flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="text-[#f5a623]" size={24} />
                  <h3 className="text-[#3d1f00] text-[20px] font-semibold">Совет NIKA</h3>
                </div>
                <div className="flex-1 min-h-[120px]">
                  {aiAdvice ? (
                    <p className="text-[#3d1f00] text-[16px] leading-relaxed">{aiAdvice}</p>
                  ) : (
                    <p className="text-[#83451e] text-[14px] italic">
                      Нажмите кнопку, чтобы получить персональный совет по эмоциональному состоянию.
                    </p>
                  )}
                </div>
                <button
                  onClick={requestAiAdvice}
                  disabled={loadingAdvice}
                  className="mt-4 w-full h-12 bg-gradient-to-r from-[#f6b044] to-[#f39c12] text-white rounded-[20px] font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loadingAdvice ? (
                    <>
                      <span className="animate-spin">🌀</span>
                      <span>Думаю...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} />
                      <span>Спросить NIKA</span>
                    </>
                  )}
                </button>
              </div>
              
              <div className="md:col-span-2 bg-white rounded-[20px] p-8 shadow-sm">
                <h3 className="text-[#3d1f00] text-[24px] mb-6">Статистика эмоций</h3>
                <div className="flex flex-wrap gap-4">
                  {emotions.map(emotion => {
                    const count = emotionStats[emotion.type] || 0;
                    const percentage = totalEntries > 0 ? (count / totalEntries) * 100 : 0;
                    if (count === 0) return null;
                    return (
                      <div key={emotion.type} className="bg-[#faf8f0] rounded-[15px] p-4 min-w-[240px]">
                        <div className="flex gap-4 items-center mb-3">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-[20px]" style={{ backgroundColor: `${emotion.color}21` }}>
                            {emotion.emoji}
                          </div>
                          <div>
                            <p className="text-[#3d1f00] text-[16px] font-bold">{emotion.label}</p>
                            <p className="text-[#83451e] text-[12px]">{count} {count === 1 ? 'день' : 'дня'}</p>
                          </div>
                        </div>
                        <div className="h-2 relative w-full">
                          <div className="bg-[#e8dcc8] h-2 rounded-full w-full" />
                          <div className="h-2 rounded-full absolute top-0 left-0" style={{ width: `${percentage}%`, backgroundColor: emotion.color }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Emotional Graph */}
          {totalEntries > 0 && (
            <div className="bg-white rounded-[20px] p-6 mb-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="text-[#f5a623]" size={24} />
                <h3 className="text-[#3d1f00] text-[20px] font-semibold">Динамика настроения</h3>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0d6c8" />
                    <XAxis dataKey="day" stroke="#83451e" />
                    <YAxis domain={[-2, 2]} ticks={[-2, -1, 0, 1, 2]} stroke="#83451e" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#faf8f0', borderColor: '#e8dcc8', borderRadius: '10px' }}
                      labelStyle={{ color: '#3d1f00' }}
                      formatter={(value: number | undefined, name: string | undefined, props: any) => {
                          // Извлекаем точку данных (payload) из props
                          const point = props?.payload;
                          // Если нет данных – возвращаем пустые значения
                          if (!point) return ['', ''];

                          // Формируем метку: если есть emotion, показываем его и значение, иначе "Нет записи"
                          const label = point.emotion ? `${point.emotion} (${value ?? ''})` : 'Нет записи';

                          // Возвращаем кортеж: [метка, название серии данных]
                          return [label, 'Валентность'];
                        }}
                    />
                    <Line type="monotone" dataKey="valence" stroke="#f5a623" strokeWidth={2} dot={{ r: 4, fill: '#f5a623' }} />
                  </LineChart>
                </ResponsiveContainer>
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
                <h3 className="text-[#3d1f00] text-[24px] font-semibold">Как вы себя чувствовали?</h3>
                <p className="text-[#83451e] text-[14px] mt-1">
                  {new Date(selectedDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
              <button onClick={() => { setShowModal(false); setSelectedDate(null); }} className="text-[#83451e] hover:text-[#3d1f00]">
                <X size={24} />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {emotions.map(emotion => (
                <button
                  key={emotion.type}
                  onClick={() => handleEmotionSelect(emotion.type)}
                  className="flex flex-col items-center p-4 rounded-[15px] hover:bg-[#faf8f0] transition-all group"
                  style={{ backgroundColor: getEmotionForDate(selectedDate)?.type === emotion.type ? emotion.color + '20' : 'transparent' }}
                >
                  <span className="text-[40px] mb-2 group-hover:scale-110 transition-transform">{emotion.emoji}</span>
                  <span className="text-[14px] text-center font-medium" style={{ color: emotion.color }}>{emotion.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
