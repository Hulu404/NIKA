import { useState, useRef, useEffect } from 'react';
import { Send, Menu, X, Sparkles, Mic, Paperclip, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';
import { ChatMessage } from './ChatMessage';
import { ChatSidebar } from './ChatSidebar';
import { SuggestedPrompts } from './SuggestedPrompts';
import imgImage2 from "../assets/avatar.png";
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { fetchWithAuth } from '../../../JWT_token_refresh';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface Error {
  isError: Function
}

export function ChatInterface({isError}: Error) {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sessions, setSessions] = useState([])
  const isTyping = false
  const [isFocused, setIsFocused] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(localStorage.getItem('chat_session_id'));
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  useEffect(() => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        navigate('/login');
        return;
      }
  
      loadHistory();
      getSessions()
    }, [navigate, sessionId]);

  const loadHistory = async () => {
    try {
      const url = sessionId ? `/api/v1/chat/history?session_id=${sessionId}` : '/api/v1/chat/history';

      const res = await fetchWithAuth(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          navigate('/login');
        }
        throw new Error('Ошибка загрузки истории');
      }

      const data = await res.json();
      const messagesWithDates = (data.messages || []).map((msg: any) => ({
        ...msg,
        timestamp: msg.created_at ? new Date(msg.created_at) : new Date()
      }));
      setMessages(messagesWithDates);
      scrollToBottom();
    } catch (err) {
      console.error(err);
    }
  };

  const [voiceMode, setVoiceMode] = useState<boolean>(() => {
  // Загружаем сохранённое значение из localStorage (опционально)
  const saved = localStorage.getItem('voiceMode');
  return saved ? saved === 'true' : false;
  });

  const sendMessage = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim() || loading) return;
  
      const userMessage = { 
        role: 'user', 
        content: input,
        id: Date.now().toString(),
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setLoading(true);
  
      try {
        const res = await fetchWithAuth('/api/v1/chat/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
          body: JSON.stringify({
            message: input,
            with_audio: voiceMode,
            session_id: sessionId,
          }),
        });
  
        const data = await res.json();
  
        if (!data.success) {
          throw new Error(data.error || 'Ошибка отправки');
        }
  
        setSessionId(data.session_id);
        localStorage.setItem('chat_session_id', data.session_id);
  
        setMessages((prev) => [
          ...prev,
          { 
            role: 'assistant', 
            content: data.reply,
            id: (Date.now() + 1).toString(),
            timestamp: new Date()
          },
        ]);
  
        if (data.audio_base64) {
          const audio = new Audio(`data:audio/mp3;base64,${data.audio_base64}`);
          audio.play().catch((e) => console.error('Ошибка аудио:', e));
        }
  
        scrollToBottom();
      } catch (err) {
        console.error(err);
        isError(true)
      } finally {
        isError(false)
        setLoading(false);
      }
    };

  const getSessions = async () => {
    try {
      const url = '/api/v1/chat/sessions';

      const res = await fetchWithAuth(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          navigate('/login');
        }
        throw new Error('Ошибка загрузки истории');
      }

      const data = await res.json();
      setSessions(data.sessions)
    } catch (err) {
      console.error(err);
    }
  };
  

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  };

  const handleNewChat = () => {
    getSessions()
    localStorage.setItem('chat_session_id', uuidv4())
    setSessionId(localStorage.getItem('chat_session_id'))
  };

  const onOldChatClick = (id: string) => {
    localStorage.setItem('chat_session_id', id)
    setSessionId(localStorage.getItem('chat_session_id'))
  }

  const handlePromptSelect = (prompt: string) => {
    setInput(prompt);
    inputRef.current?.focus();
  };

  const groupedMessages = messages.reduce((acc, message, index) => {
    const prevMessage = messages[index - 1];
    const isGrouped = prevMessage && prevMessage.role === message.role;
    
    acc.push({
      ...message,
      showAvatar: !isGrouped,
      isFirstInGroup: !isGrouped,
      isLastInGroup: !messages[index + 1] || messages[index + 1].role !== message.role
    });
    
    return acc;
  }, [] as (Message & { showAvatar: boolean; isFirstInGroup: boolean; isLastInGroup: boolean })[]);

  

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#fafafa] via-[#ffffff] to-[#f5f5f5] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#fafafa] via-[#ffffff] to-[#f5f5f5]">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#f6b044]/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#f39c12]/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <ChatSidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onNewChat={handleNewChat}
        sessions={sessions }
        onHistory={(id) => onOldChatClick(id)}
      />

      <div className="flex-1 flex flex-col relative z-10">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-0 z-20 backdrop-blur-2xl bg-white/80 border-b border-black/5"
        >
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2.5 hover:bg-black/5 rounded-xl transition-all border border-transparent hover:border-black/10"
              >
                {isSidebarOpen ? <X size={20} className="text-gray-600" /> : <Menu size={20} className="text-gray-600" />}
              </button>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <motion.div 
                    className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#f6b044] to-[#f39c12] flex items-center justify-center shadow-2xl shadow-[#f6b044]/20"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Sparkles className="text-white" size={22} strokeWidth={2.5} />
                  </motion.div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-black shadow-lg"></div>
                </div>
                
                <div>
                  <h1 className="font-semibold text-gray-900 tracking-tight">NIKA</h1>
                  <p className="text-xs text-gray-500">Наш самый умный помощник</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2.5 hover:bg-black/5 rounded-xl transition-all border border-transparent hover:border-black/10">
                <MoreVertical className="text-gray-600" size={20} />
              </button>
            </div>
          </div>
        </motion.div>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-6 py-8">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center py-20">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#f6b044] to-[#f39c12] flex items-center justify-center shadow-2xl shadow-[#f6b044]/20 mb-6">
                    <Sparkles className="text-white" size={36} strokeWidth={2.5} />
                  </div>
                </motion.div>
                
                <motion.h2 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-bold text-gray-900 mb-3"
                >
                  Чем могу помочь?
                </motion.h2>
                
                <motion.p 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-500 mb-12 text-center max-w-md"
                >
                  Я ваш персональный спортивный помощник с искусственным интеллектом
                </motion.p>

                <SuggestedPrompts onSelect={handlePromptSelect} />
              </div>
            ) : (
              <div className="space-y-1">
                {groupedMessages.map((message: Message) => (
                  <ChatMessage 
                    key={message.id} 
                    message={message}
                    avatarUrl={message.role === 'assistant' ? imgImage2 : undefined}
                  />
                ))}
                
                {isTyping && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 px-4 py-3"
                  >
                    <div className="w-10 h-10 rounded-2xl overflow-hidden shadow-lg flex-shrink-0 border border-black/10">
                      <img src={imgImage2} alt="NIKA" className="w-full h-full object-cover" />
                    </div>
                    <div className="bg-white/80 backdrop-blur-xl rounded-2xl px-5 py-3 border border-black/10 shadow-sm">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 bg-[#f6b044] rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-[#f6b044] rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                        <div className="w-2 h-2 bg-[#f6b044] rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>

        <div className="sticky bottom-0 border-t border-black/5 bg-white/80 backdrop-blur-2xl">
          <div className="max-w-4xl mx-auto px-6 py-6">
            <motion.div 
              animate={{ 
                scale: isFocused ? 1.01 : 1,
              }}
              className="relative"
            >
              <div className={`flex items-end gap-3 p-2 rounded-3xl bg-white backdrop-blur-xl border transition-all shadow-lg ${
                isFocused ? 'border-[#f6b044]/30 shadow-2xl shadow-[#f6b044]/10' : 'border-black/10'
              }`}>
                <div className="flex gap-2 px-2 pb-2">
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-xl hover:bg-black/5 transition-colors"
                  >
                    <Paperclip className="text-gray-400 hover:text-gray-600 transition-colors" size={20} />
                  </motion.button>
                </div>

                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Напишите сообщение или нажмите / для команд..."
                  rows={1}
                  className="flex-1 resize-none bg-transparent px-2 py-3 focus:outline-none text-gray-900 placeholder:text-gray-400 max-h-32 overflow-y-auto"
                  style={{
                    minHeight: '44px',
                  }}
                />

                <div className="flex gap-2 px-2 pb-2">
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setVoiceMode(!voiceMode)}
                    className={`p-2 rounded-xl transition-colors ${
                      voiceMode 
                        ? 'bg-[#f6b044]/20 text-[#f6b044]' 
                        : 'text-gray-400 hover:text-gray-600 hover:bg-black/5'
                    }`}
                    title={voiceMode ? 'Голосовой режим включён' : 'Голосовой режим выключен'}
                  >
                    <Mic size={20} strokeWidth={2.5} />
                  </motion.button>
                  
                  <motion.button
                    onClick={sendMessage}
                    disabled={!input.trim()}
                    whileHover={{ scale: input.trim() ? 1.05 : 1 }}
                    whileTap={{ scale: input.trim() ? 0.95 : 1 }}
                    className="p-2.5 rounded-xl bg-gradient-to-r from-[#f6b044] to-[#f39c12] hover:from-[#f39c12] hover:to-[#f6b044] disabled:from-gray-200 disabled:to-gray-200 disabled:cursor-not-allowed shadow-lg disabled:shadow-none transition-all"
                  >
                    <Send className={`${input.trim() ? 'text-white' : 'text-gray-400'} transition-colors`} size={18} strokeWidth={2.5} />
                  </motion.button>
                </div>
              </div> 
            </motion.div> 
            <p className="text-xs text-center text-gray-400 mt-4">
              NIKA может делать ошибки. Проверяйте важную информацию.
            </p>
          </div> 
        </div> 
      </div> 
    </div> 
  );
}