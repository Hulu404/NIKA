import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Pencil, Trash2, Save, X } from 'lucide-react';
import { fetchWithAuth } from '../../JWT_token_refresh';

interface Plan {
  id: number;
  name: string;
  description: string;
  price: number;
  price_rub: number;
  duration_days: number;
  daily_requests_limit: number;
  is_active: boolean;
}

interface PlanForm {
  name: string;
  description: string;
  price: string;
  duration_days: string;
  daily_requests_limit: string;
}

const emptyForm: PlanForm = {
  name: '',
  description: '',
  price: '',
  duration_days: '30',
  daily_requests_limit: '100',
};

export default function AdminPlans() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState<PlanForm>(emptyForm);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const res = await fetchWithAuth('/api/v1/admin/plans');
      const data = await res.json();
      if (data.success) {
        setPlans(data.data);
      } else if (res.status === 403) {
        navigate('/profile');
      }
    } catch {
      setError('Ошибка загрузки');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    setError('');
    if (!form.name || !form.price) {
      setError('Название и цена обязательны');
      return;
    }
    try {
      const res = await fetchWithAuth('/api/v1/admin/plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          price: Math.round(parseFloat(form.price) * 100),
          duration_days: parseInt(form.duration_days) || 30,
          daily_requests_limit: parseInt(form.daily_requests_limit) || 100,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setShowCreate(false);
        setForm(emptyForm);
        loadPlans();
      } else {
        setError(data.message);
      }
    } catch {
      setError('Ошибка создания');
    }
  };

  const handleUpdate = async (planId: number) => {
    setError('');
    try {
      const res = await fetchWithAuth(`/api/v1/admin/plans/${planId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          price: Math.round(parseFloat(form.price) * 100),
          duration_days: parseInt(form.duration_days) || 30,
          daily_requests_limit: parseInt(form.daily_requests_limit) || 100,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setEditingId(null);
        setForm(emptyForm);
        loadPlans();
      } else {
        setError(data.message);
      }
    } catch {
      setError('Ошибка обновления');
    }
  };

  const handleDelete = async (planId: number) => {
    if (!confirm('Деактивировать этот тариф?')) return;
    try {
      await fetchWithAuth(`/api/v1/admin/plans/${planId}`, { method: 'DELETE' });
      loadPlans();
    } catch {
      setError('Ошибка удаления');
    }
  };

  const startEdit = (plan: Plan) => {
    setEditingId(plan.id);
    setShowCreate(false);
    setForm({
      name: plan.name,
      description: plan.description || '',
      price: plan.price_rub.toString(),
      duration_days: plan.duration_days.toString(),
      daily_requests_limit: plan.daily_requests_limit.toString(),
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setShowCreate(false);
    setForm(emptyForm);
    setError('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fffee7] flex items-center justify-center">
        <p className="text-[#83451e]">Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffee7] p-8 font-['Arimo:Regular',sans-serif]">
      <div className="max-w-[900px] mx-auto">
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2 text-[#83451e] hover:text-[#3d1f00] transition-colors mb-8"
        >
          <ArrowLeft size={24} />
          <span className="text-[16px]">Назад</span>
        </button>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-[#3d1f00] text-[32px] font-bold font-['Arimo:Bold',sans-serif]">
            Управление тарифами
          </h1>
          <button
            onClick={() => {
              setShowCreate(true);
              setEditingId(null);
              setForm(emptyForm);
            }}
            className="flex items-center gap-2 bg-[#f5a623] hover:bg-[#e59615] text-white font-bold py-3 px-6 rounded-[15px] shadow-md transition-all"
          >
            <Plus size={20} />
            Новый тариф
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-[15px] mb-6">{error}</div>
        )}

        {/* Create form */}
        {showCreate && (
          <div className="bg-white rounded-[20px] p-8 shadow-sm mb-6">
            <h2 className="text-[#3d1f00] text-[20px] font-bold mb-6">Новый тариф</h2>
            <PlanFormFields form={form} setForm={setForm} />
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCreate}
                className="flex items-center gap-2 bg-[#f5a623] hover:bg-[#e59615] text-white font-bold py-3 px-6 rounded-[15px] transition-all"
              >
                <Save size={18} />
                Создать
              </button>
              <button
                onClick={cancelEdit}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-3 px-6 rounded-[15px] transition-all"
              >
                <X size={18} />
                Отмена
              </button>
            </div>
          </div>
        )}

        {/* Plans list */}
        <div className="space-y-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-[20px] p-8 shadow-sm ${!plan.is_active ? 'opacity-50' : ''}`}
            >
              {editingId === plan.id ? (
                <>
                  <PlanFormFields form={form} setForm={setForm} />
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => handleUpdate(plan.id)}
                      className="flex items-center gap-2 bg-[#f5a623] hover:bg-[#e59615] text-white font-bold py-3 px-6 rounded-[15px] transition-all"
                    >
                      <Save size={18} />
                      Сохранить
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-3 px-6 rounded-[15px] transition-all"
                    >
                      <X size={18} />
                      Отмена
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-[#3d1f00] text-[20px] font-bold">{plan.name}</h3>
                      {!plan.is_active && (
                        <span className="bg-gray-200 text-gray-500 text-[12px] px-3 py-1 rounded-full">
                          Неактивен
                        </span>
                      )}
                    </div>
                    {plan.description && (
                      <p className="text-[#83451e] text-[14px] mb-2">{plan.description}</p>
                    )}
                    <div className="flex gap-4 text-[#83451e] text-[14px]">
                      <span>{plan.price_rub} руб.</span>
                      <span>{plan.duration_days} дней</span>
                      <span>{plan.daily_requests_limit} запросов/день</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(plan)}
                      className="p-3 hover:bg-[#faf8f0] rounded-full transition-colors text-[#83451e]"
                    >
                      <Pencil size={18} />
                    </button>
                    {plan.is_active && (
                      <button
                        onClick={() => handleDelete(plan.id)}
                        className="p-3 hover:bg-red-50 rounded-full transition-colors text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          {plans.length === 0 && !showCreate && (
            <div className="text-center py-12 text-[#83451e]">
              <p className="text-[18px] mb-2">Тарифов пока нет</p>
              <p className="text-[14px]">Создайте первый тариф, чтобы пользователи могли оформить подписку</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PlanFormFields({
  form,
  setForm,
}: {
  form: PlanForm;
  setForm: React.Dispatch<React.SetStateAction<PlanForm>>;
}) {
  const inputClass =
    'w-full h-[48px] px-5 bg-[#faf8f0] rounded-[15px] text-[#3d1f00] text-[16px] focus:outline-none focus:ring-2 focus:ring-[#f5a623] transition-colors';

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="block pl-3 text-[#83451e] text-[14px]">Название</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Premium"
          className={inputClass}
        />
      </div>
      <div className="space-y-2">
        <label className="block pl-3 text-[#83451e] text-[14px]">Цена (руб.)</label>
        <input
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          placeholder="299"
          className={inputClass}
        />
      </div>
      <div className="col-span-2 space-y-2">
        <label className="block pl-3 text-[#83451e] text-[14px]">Описание</label>
        <input
          type="text"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Получите полный доступ ко всем возможностям NIKA"
          className={inputClass}
        />
      </div>
      <div className="space-y-2">
        <label className="block pl-3 text-[#83451e] text-[14px]">Длительность (дней)</label>
        <input
          type="number"
          value={form.duration_days}
          onChange={(e) => setForm({ ...form, duration_days: e.target.value })}
          className={inputClass}
        />
      </div>
      <div className="space-y-2">
        <label className="block pl-3 text-[#83451e] text-[14px]">Лимит запросов/день</label>
        <input
          type="number"
          value={form.daily_requests_limit}
          onChange={(e) => setForm({ ...form, daily_requests_limit: e.target.value })}
          className={inputClass}
        />
      </div>
    </div>
  );
}
