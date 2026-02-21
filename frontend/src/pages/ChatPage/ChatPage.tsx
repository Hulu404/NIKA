import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChatPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(
    localStorage.getItem('chat_session_id')
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
      return;
    }

    loadHistory();
  }, [navigate]);

  const loadHistory = async () => {
    try {
      let url = '/api/v1/chat/history';
      if (sessionId) url += `?session_id=${sessionId}`;

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          // Можно добавить логику обновления токена
          localStorage.removeItem('access_token');
          navigate('/login');
        }
        throw new Error('Ошибка загрузки истории');
      }

      const data = await res.json();
      setMessages(data.messages || []);
      scrollToBottom();
    } catch (err) {
      console.error(err);
    }
  };

const sendMessage = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!input.trim() || loading) return;

  setLoading(true);

  try {
    const res = await fetch('/api/v1/chat/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify({
        message: input,
        with_audio: true,  // или false для текста
      }),
    });

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.error);
    }

    setMessages((prev) => [
      ...prev,
      { role: 'user', content: input },
      { role: 'assistant', content: data.reply },
    ]);

    if (data.audio_base64) {
      const audio = new Audio(`data:audio/mp3;base64,${data.audio_base64}`);
      audio.play();
    }

    // Обновляем лимиты (если фронт их отображает)
    console.log(data.limit_info);

    scrollToBottom();
  } catch (e) {
    console.error(e);
    // Покажи тост или ошибку
  } finally {
    setLoading(false);
    setInput('');
  }
};

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="flex flex-col h-screen bg-[#fffee7]">
      {/* Заголовок чата */}
      <div className="bg-[#83451e] text-[#fffee7] p-4 text-center text-xl font-bold">
        Чат с психологом
      </div>

      {/* Сообщения */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] p-3 rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-[#83451e] text-[#fffee7]'
                  : 'bg-white text-[#3d1f00] shadow'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Поле ввода */}
      <form onSubmit={sendMessage} className="p-4 bg-white border-t flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Напишите сообщение..."
          className="flex-1 p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#83451e]"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-[#83451e] text-[#fffee7] rounded-full hover:bg-[#6b3818] disabled:opacity-50 transition-colors"
        >
          {loading ? '...' : '→'}
        </button>
      </form>
    </div>
  );
}