import { useNavigate } from 'react-router';
import { ArrowLeft, Check, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchWithAuth } from '../../JWT_token_refresh';

interface Plan {
  id: number;
  name: string;
  description: string;
  price: number;
  price_rub: number;
  duration_days: number;
  daily_requests_limit: number;
}

export default function Subscription() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState<number | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await fetch('/api/v1/subscription/plans');
      const data = await res.json();
      if (data.success) {
        setPlans(data.data);
      }
    } catch {
      setError('Не удалось загрузить тарифы');
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (planId: number) => {
    setPaying(planId);
    setError('');
    try {
      const res = await fetchWithAuth('/api/v1/subscription/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan_id: planId,
          return_url: window.location.origin + '/profile',
        }),
      });
      const data = await res.json();
      if (data.success && data.data.confirmation_url) {
        window.location.href = data.data.confirmation_url;
      } else {
        setError(data.message || 'Ошибка создания платежа');
      }
    } catch {
      setError('Ошибка связи с сервером');
    } finally {
      setPaying(null);
    }
  };

  return (
    
    <div className="min-h-screen bg-[#fffee7] flex flex-col items-center p-4 sm:p-8 font-['Arimo:Regular',sans-serif]">
      {/* Company Information */}
      
       <button
        onClick={() => navigate('/profile')}
        className="self-start flex items-center gap-2 text-[#83451e] hover:text-[#3d1f00] transition-colors mb-8"
      >
        <ArrowLeft size={24} />
        <span className="text-[16px]">Назад</span>
      </button>

      {loading ? (
        <div className="flex items-center gap-3 text-[#83451e]">
          <Loader2 className="animate-spin" size={24} />
          <span>Загрузка тарифов...</span>
        </div>
      ) : plans.length === 0 ? (
        <div className="text-center">
          <p className="text-[#83451e] text-[18px] mb-4">Тарифы пока не добавлены</p>
          <button
            onClick={() => navigate('/profile')}
            className="text-[#f5a623] hover:underline"
          >
            Вернуться в профиль
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap gap-6 sm:gap-8 justify-center w-full">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-[30px] p-8 sm:p-12 shadow-lg w-full max-w-md relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-[#f5a623]" />

              <div className="text-center mb-8">
                <h1 className="text-[#3d1f00] text-[32px] font-bold mb-2 font-['Arimo:Bold',sans-serif]">
                  {plan.name}
                </h1>
                {plan.description && (
                  <p className="text-[#83451e] text-[16px]">{plan.description}</p>
                )}
              </div>

              <div className="flex items-end justify-center gap-2 mb-10">
                <span className="text-[#3d1f00] text-[48px] font-bold leading-none font-['Arimo:Bold',sans-serif]">
                  {plan.price_rub}
                </span>
                <span className="text-[#83451e] text-[24px] mb-1">руб.</span>
                <span className="text-[#83451e] text-[16px] mb-2 text-opacity-60">
                  / {plan.duration_days} дн.
                </span>
              </div>

              <div className="space-y-4 mb-10">
                {[
                  'Полный доступ к персонализированному сопровождению',
                  'Расширенный анализ данных',
                  `До ${plan.daily_requests_limit} запросов в день`,
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1 bg-[#f5a623] rounded-full p-1 text-white shrink-0">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span className="text-[#3d1f00] text-[16px] leading-tight">{item}</span>
                  </div>
                ))}
              </div>

              {error && (
                <p className="text-red-500 text-[14px] text-center mb-4">{error}</p>
              )}

              <button
                onClick={() => handleSubscribe(plan.id)}
                disabled={paying !== null}
                className="w-full bg-[#f5a623] hover:bg-[#e59615] disabled:opacity-60 text-white font-bold py-4 rounded-[15px] text-[18px] transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {paying === plan.id ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Перенаправление...
                  </>
                ) : (
                  'Оформить подписку'
                )}
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="mt-12 text-center text-[12px] text-[#83451e] opacity-70">
        ООО «Медицинская индустрия разработок (МИР)» ИНН 6453180874 ОГРН 1256400010987
      </div>
    </div>
    
  );
}
