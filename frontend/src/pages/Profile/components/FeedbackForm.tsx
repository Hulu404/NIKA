import { useState } from 'react';
import { fetchWithAuth } from '../../../JWT_token_refresh';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    feedbackType: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetchWithAuth('/api/v1/feedback/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: formData.message,
          feedback_type: formData.feedbackType
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Спасибо за ваш отзыв! Мы обязательно его учтём.'
        });
        setFormData({ feedbackType: 'general', message: '' });
      } else {
        throw new Error(data.error || 'Ошибка отправки');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Не удалось отправить сообщение. Попробуйте позже.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Обратная связь</h3>
      <p className="text-gray-600 text-sm mb-6">
        Поделитесь своим опытом использования NIKA, сообщите об ошибке или предложите идею по улучшению.
      </p>

      {submitStatus.type && (
        <div className={`mb-4 p-3 rounded-lg text-sm ${
          submitStatus.type === 'success'
            ? 'bg-green-50 text-green-800 border border-green-200'
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Тип обращения</label>
          <select
            value={formData.feedbackType}
            onChange={(e) => setFormData(prev => ({ ...prev, feedbackType: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500"
          >
            <option value="general">💬 Общий отзыв</option>
            <option value="bug">🐛 Сообщить об ошибке</option>
            <option value="feature">💡 Предложить идею</option>
            <option value="question">❓ Задать вопрос</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Сообщение</label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            required
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            placeholder="Расскажите, что вы думаете о NIKA..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !formData.message.trim()}
          className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-xl font-medium hover:from-amber-600 hover:to-amber-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Отправка...' : 'Отправить отзыв'}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;