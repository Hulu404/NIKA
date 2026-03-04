import { useState, useEffect } from 'react';
import { Plus, Trash2, X, TrendingUp, Sparkles } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import svgPathsBack from './imports/svg-n101rx8ak0';
import svgPaths from './imports/svg-nfsr0erm4u';

// ---------- Типы ----------
interface FoodItem {
  id: string;
  name: string;
  calories: number;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  timestamp: Date;
}

interface DailySummary {
  date: string;
  total: number;
}

// ---------- Компонент ----------
export default function FoodTracker() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack' | null>(null);
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [aiAdvice, setAiAdvice] = useState<string>('');
  const [loadingAdvice, setLoadingAdvice] = useState(false);
  const navigate = useNavigate();

  // Загрузка истории с сервера (заглушка – замените на реальный API)
  useEffect(() => {
    // Пример: fetch('/api/food/history').then(...)
    // Пока оставим пустым
  }, []);

  // Сохранение на сервер при каждом добавлении (заглушка)
  useEffect(() => {
    // Можно отправлять на сервер
  }, [foodItems]);

  // Логаут
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

  // Типы приёмов пищи
  const mealTypes = [
    { type: 'breakfast' as const, label: 'Завтрак', icon: '🍳', color: '#f5a623' },
    { type: 'lunch' as const, label: 'Обед', icon: '🥗', color: '#4caf50' },
    { type: 'dinner' as const, label: 'Ужин', icon: '🍽️', color: '#ff9800' },
    { type: 'snack' as const, label: 'Перекус', icon: '🍎', color: '#e91e63' },
  ];

  // ---------- Работа с данными ----------
  const handleAddFood = (mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack') => {
    setSelectedMealType(mealType);
    setShowAddModal(true);
  };

  const handleSaveFood = async () => {
    if (!foodName.trim() || !calories.trim() || !selectedMealType) return;

    const newFood: FoodItem = {
      id: Date.now().toString(),
      name: foodName.trim(),
      calories: parseInt(calories),
      mealType: selectedMealType,
      timestamp: new Date(),
    };

    // Отправка на сервер
    try {
      // await fetch('/api/food/add', { method: 'POST', body: JSON.stringify(newFood) })
      setFoodItems([...foodItems, newFood]);
    } catch (error) {
      console.error('Ошибка сохранения', error);
    }

    setFoodName('');
    setCalories('');
    setShowAddModal(false);
    setSelectedMealType(null);
  };

  const handleDeleteFood = async (id: string) => {
    try {
      // await fetch(`/api/food/${id}`, { method: 'DELETE' })
      setFoodItems(foodItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Ошибка удаления', error);
    }
  };

  // Сумма калорий за сегодня
  const getMealCalories = (mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack') => {
    return foodItems
      .filter(item => item.mealType === mealType)
      .reduce((sum, item) => sum + item.calories, 0);
  };

  const getTotalCalories = () => foodItems.reduce((sum, item) => sum + item.calories, 0);

  const getMealLabel = (mealType: string) => mealTypes.find(m => m.type === mealType)?.label || '';

  // ---------- Данные для графика (последние 7 дней) ----------
  const getLast7Days = (): DailySummary[] => {
    const days: DailySummary[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
      // Здесь нужно получать реальные данные с сервера за прошлые дни
      // Пока заглушка – случайные числа
      days.push({
        date: dateStr,
        total: Math.floor(Math.random() * 800) + 1200, // Замените на реальные данные
      });
    }
    return days;
  };

  const chartData = getLast7Days();

  // ---------- AI совет ----------
  const requestAiAdvice = async () => {
  setLoadingAdvice(true);
  try {
    const todayTotal = getTotalCalories();
    const mealsBreakdown = mealTypes
      .map(m => `${m.label}: ${getMealCalories(m.type)} ккал`)
      .join(', ');

    const prompt = `Сегодня я съел(а) ${todayTotal} ккал. Распределение: ${mealsBreakdown}. Дай краткий совет по улучшению питания (1-2 предложения).`;

    const response = await fetch('/api/v1/food/advice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
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

  // ---------- Рендер ----------
  return (
    <div className="min-h-screen bg-[#fffee7] flex">
      {/* Sidebar (без изменений, оставлен как в оригинале) */}
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
              <NavLink to='/profile'>
                <span className="flex items-center gap-3 px-3 py-2 text-[#83451e] hover:bg-[#f0e8d8] rounded-[10px] transition-colors h-[37px]">
                  <div className="h-[20px] w-[20px] overflow-clip relative shrink-0">
                  
                  </div>
                  <span className="text-[14px] leading-[21px]">Личный кабинет</span>
                </span>
              </NavLink>

              <NavLink to='/food-tracker'>
                <span className="flex items-center gap-3 px-3 py-2 text-[#83451e] bg-[#f0e8d8] rounded-[10px] h-[37px]">
                  <div className="h-[20px] w-[20px] overflow-clip relative shrink-0">
                    {/* иконка трекера питания */}
                  </div>
                  <span className="text-[14px] leading-[21px]">Трекер питания</span>
                </span>
              </NavLink>

              <NavLink to="/emotion-tracker">
                <span className="flex items-center gap-3 px-3 py-2 text-[#83451e] hover:bg-[#f0e8d8] rounded-[10px] transition-colors h-[37px]">
                  <div className="h-[20px] w-[20px] overflow-clip relative shrink-0">
                    {/* иконка эмоций */}
                  </div>
                  <span className="text-[14px] leading-[21px]">Дневник эмоций</span>
                </span>
              </NavLink>
            </nav>
          </div>
        </div>

        {/* Exit Button */}
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
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-[1000px] mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-[#3d1f00] text-[32px] mb-2">Трекер питания</h1>
            <div className="flex items-center justify-between">
              <p className="text-[#83451e] text-[16px]">
                {new Date().toLocaleDateString('ru-RU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <div className="text-right">
                <span className="text-[#83451e] text-[14px]">Всего калорий</span>
                <p className="text-[#f5a623] text-[28px] font-semibold">{getTotalCalories()} ккал</p>
              </div>
            </div>
          </div>

          {/* Meal Cards (без изменений) */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {mealTypes.map((meal) => (
              <div key={meal.type} className="bg-white rounded-[20px] p-6 shadow-sm">
                <div className="flex flex-col items-center">
                  <div className="text-[48px] mb-3">{meal.icon}</div>
                  <h3 className="text-[#3d1f00] text-[16px] mb-2">{meal.label}</h3>
                  <p className="text-[#83451e] text-[14px] mb-4">
                    {getMealCalories(meal.type)} ккал
                  </p>
                  <button
                    onClick={() => handleAddFood(meal.type)}
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-colors shadow-md"
                    style={{ backgroundColor: meal.color }}
                  >
                    <Plus size={24} color="white" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Intake Log (без изменений) */}
          <div className="bg-white rounded-[20px] p-8 shadow-sm">
            <h2 className="text-[#3d1f00] text-[24px] mb-6">Журнал питания</h2>

            {foodItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-[#83451e] text-[16px]">Нет записей. Добавьте свой первый приём пищи!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {mealTypes.map((meal) => {
                  const mealItems = foodItems.filter(item => item.mealType === meal.type);
                  if (mealItems.length === 0) return null;

                  return (
                    <div key={meal.type}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-[24px]">{meal.icon}</span>
                          <h3 className="text-[#3d1f00] text-[18px] font-semibold">{meal.label}</h3>
                        </div>
                        <span className="text-[#f5a623] text-[20px] font-semibold">
                          {getMealCalories(meal.type)} ккал
                        </span>
                      </div>

                      <div className="space-y-2 ml-8">
                        {mealItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between p-4 bg-[#faf8f0] rounded-[15px] hover:bg-[#f0e8d8] transition-colors group"
                          >
                            <div>
                              <p className="text-[#3d1f00] text-[16px] font-medium">{item.name}</p>
                              <p className="text-[#83451e] text-[14px]">
                                {item.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-[#3d1f00] text-[16px] font-medium">{item.calories} ккал</span>
                              <button
                                onClick={() => handleDeleteFood(item.id)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity text-[#83451e] hover:text-[#f5a623]"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ---------- НОВЫЙ БЛОК: Аналитика и AI советы ---------- */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* График динамики калорий (занимает 2 колонки) */}
            <div className="md:col-span-2 bg-white rounded-[20px] p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="text-[#f5a623]" size={24} />
                <h3 className="text-[#3d1f00] text-[20px] font-semibold">Недельная динамика</h3>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0d6c8" />
                    <XAxis dataKey="date" stroke="#83451e" />
                    <YAxis stroke="#83451e" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#faf8f0', borderColor: '#e8dcc8', borderRadius: '10px' }}
                      labelStyle={{ color: '#3d1f00' }}
                    />
                    <Line type="monotone" dataKey="total" stroke="#f5a623" strokeWidth={2} dot={{ r: 4, fill: '#f5a623' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-[#83451e] text-sm mt-2 text-center">
                * Данные за последние 7 дней (заглушка, замените реальными)
              </p>
            </div>

            {/* AI-совет */}
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
                    Нажмите кнопку, чтобы получить персональный совет по питанию.
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
          </div>
        </div>
      </main>

      {/* Add Food Modal (без изменений) */}
      {showAddModal && selectedMealType && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-[20px] p-8 w-[480px] shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[#3d1f00] text-[24px] font-semibold">
                Добавить {getMealLabel(selectedMealType).toLowerCase()}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setFoodName('');
                  setCalories('');
                  setSelectedMealType(null);
                }}
                className="text-[#83451e] hover:text-[#3d1f00]"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[#3d1f00] text-[14px] mb-2">
                  Название блюда
                </label>
                <input
                  type="text"
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  placeholder="Например: Овсяная каша"
                  className="w-full h-[56px] px-6 bg-[#faf8f0] rounded-[25px] text-[#3d1f00] text-[16px] placeholder:text-[rgba(131,69,30,0.5)] focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:bg-[#f0e8d8] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[#3d1f00] text-[14px] mb-2">
                  Калории
                </label>
                <input
                  type="number"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  placeholder="Например: 350"
                  className="w-full h-[56px] px-6 bg-[#faf8f0] rounded-[25px] text-[#3d1f00] text-[16px] placeholder:text-[rgba(131,69,30,0.5)] focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:bg-[#f0e8d8] transition-colors"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setFoodName('');
                    setCalories('');
                    setSelectedMealType(null);
                  }}
                  className="flex-1 h-[56px] bg-[#faf8f0] rounded-[25px] text-[#83451e] text-[16px] hover:bg-[#f0e8d8] transition-colors"
                >
                  Отмена
                </button>
                <button
                  onClick={handleSaveFood}
                  disabled={!foodName.trim() || !calories.trim()}
                  className="flex-1 h-[56px] bg-[#83451e] rounded-[25px] text-[#fffee7] text-[16px] shadow-md hover:bg-[#6d3918] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Добавить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}