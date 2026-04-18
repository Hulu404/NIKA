import { useState, useRef, useEffect } from 'react';
import { Send, Menu, Sparkles, Mic } from 'lucide-react';
import { motion } from 'framer-motion';
import { ChatMessage } from './ChatMessage';
import { ChatSidebar } from './ChatSidebar';
import { SuggestedPrompts } from './SuggestedPrompts';
import imgImage2 from "../assets/avatar.png";
import { NavLink, useNavigate } from 'react-router-dom';
import { fetchWithAuth } from '../../../JWT_token_refresh';
import { v4 as uuidv4 } from 'uuid';

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => window.innerWidth >= 1024);
  const [sessions, setSessions] = useState([])
  const isTyping = false
  const [isFocused, setIsFocused] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(localStorage.getItem('chat_session_id'));
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);
  const navigate = useNavigate();

  // Lock body scroll when sidebar is open on mobile
  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    if (isMobile && isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isSidebarOpen]);

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

  const prevRecording = useRef(false);
  useEffect(() => {
    if (prevRecording.current && !isRecording && input.trim()) {
      sendVoiceMessage(input);
    }
    prevRecording.current = isRecording;
  }, [isRecording]);

  const loadHistory = async () => {
      try {
        const url = sessionId ? `/api/v1/chat/history?session_id=${sessionId}` : '/api/v1/chat/history';
        const res = await fetchWithAuth(url);
        if (!res.ok) throw new Error('Ошибка загрузки истории');
        const data = await res.json();
        const messagesWithDates = (data.data.messages || []).map((msg: any) => ({
          ...msg,
          timestamp: msg.created_at ? new Date(msg.created_at) : new Date()
        }));
        setMessages(messagesWithDates);
        scrollToBottom();
      } catch (err) {
        console.error(err);
      }
  };


  const sendVoiceMessage = (text: string) => {
    if (!text.trim() || loading) return;

    const userMessage = {
      role: 'user',
      content: text,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    fetchWithAuth('/api/v1/chat/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: text,
        with_audio: true,
        session_id: sessionId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) throw new Error(data.error || 'Ошибка отправки');

        setSessionId(data.data.session_id);
        localStorage.setItem('chat_session_id', data.data.session_id);

        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: data.data.assistant_response,
            id: (Date.now() + 1).toString(),
            timestamp: new Date()
          },
        ]);

        if (data.data.audio_base64) {
          const audio = new Audio(`data:audio/mp3;base64,${data.data.audio_base64}`);
          audio.play().catch((e) => console.error('Ошибка аудио:', e));
        }

        getSessions();
        scrollToBottom();
      })
      .catch((err) => {
        console.error(err);
        isError(true);
      })
      .finally(() => {
        isError(false);
        setLoading(false);
      });
  };

  const startRecording = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Ваш браузер не поддерживает голосовой ввод. Используйте Chrome или Edge.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ru-RU';
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onstart = () => setIsRecording(true);

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join('');
      setInput(transcript);
    };

    recognition.onend = () => {
      setIsRecording(false);
      recognitionRef.current = null;
    };

    recognition.onerror = (event: any) => {
      console.error('Ошибка распознавания:', event.error);
      setIsRecording(false);
      recognitionRef.current = null;
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.onend = () => {
        setIsRecording(false);
        recognitionRef.current = null;
      };
      recognitionRef.current.stop();
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

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
          },
          body: JSON.stringify({
            message: input,
            with_audio: false,
            session_id: sessionId,
          }),
        });
  
        const data = await res.json();
        
        if (res.status === 429) {
          const timeString = new Date(data.errors.remaining_seconds * 1000).toISOString().substr(11, 8);
          setMessages((prev) => [
          ...prev,
          { 
            role: 'assistant', 
            content: data.message + ' Сброс лимита через ' + timeString,
            id: (Date.now() + 1).toString(),
            timestamp: new Date()
          },
        ]);
        } else {
        if (!data.success) {
          throw new Error(data.error || 'Ошибка отправки');
        }
  
        setSessionId(data.data.session_id);
        localStorage.setItem('chat_session_id', data.data.session_id);
  
        setMessages((prev) => [
          ...prev,
          { 
            role: 'assistant', 
            content: data.data.assistant_response,
            id: (Date.now() + 1).toString(),
            timestamp: new Date()
          },
        ]);
  
        if (data.data.audio_base64) {
          const audio = new Audio(`data:audio/mp3;base64,${data.data.audio_base64}`);
          audio.play().catch((e) => console.error('Ошибка аудио:', e));
        }

        getSessions()
  
        scrollToBottom();
      }
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
      });

      if (!res.ok) {
        throw new Error('Ошибка загрузки истории');
      }

      const data = await res.json();
      setSessions(data.data.sessions)
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
    <div className="flex h-[100dvh] bg-gradient-to-br from-[#fafafa] via-[#ffffff] to-[#f5f5f5] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#fafafa] via-[#ffffff] to-[#f5f5f5]">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[rgba(246,176,68,0.15)] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[rgba(243,156,18,0.15)] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <ChatSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onNewChat={handleNewChat}
        sessions={sessions ? sessions : []}
        onHistory={(id) => onOldChatClick(id)}
      />

      {/* Main content — full width always (sidebar is fixed overlay on mobile) */}
      <div className="flex-1 flex flex-col relative z-10 min-w-0">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-0 z-20 backdrop-blur-2xl bg-white/80 border-b border-black/5"
        >
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              {!isSidebarOpen && (
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="p-2.5 hover:bg-black/5 rounded-xl transition-all border border-transparent hover:border-black/10"
                >
                  <Menu size={20} className="text-gray-600" />
                </button>
              )}
              
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
                
                <motion.div
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <h1 className="font-semibold text-gray-900 tracking-tight">NIKA</h1>
                  <p className="text-xs text-gray-500">Наш самый умный помощник</p>
                </motion.div>
              </div>
            </div>

          </div>
        </motion.div>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 md:px-6 py-2 md:py-8">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center py-2 sm:py-6 md:py-20">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="w-12 h-12 md:w-20 md:h-20 rounded-3xl bg-gradient-to-br from-[#f6b044] to-[#f39c12] flex items-center justify-center shadow-2xl shadow-[#f6b044]/20 mb-2 md:mb-6">
                    <Sparkles className="text-white" size={28} strokeWidth={2.5} />
                  </div>
                </motion.div>
                
                <motion.h2 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-3"
                >
                  Чем могу помочь?
                </motion.h2>
                
                <motion.p 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-xs md:text-base text-gray-500 mb-4 md:mb-12 text-center max-w-md px-2"
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
          <div className="max-w-4xl mx-auto px-3 py-2 md:px-6 md:py-6">
            <motion.div 
              animate={{ 
                scale: isFocused ? 1.01 : 1,
              }}
              className="relative"
            >
              <div className={`flex items-end gap-3 p-2 rounded-3xl bg-white backdrop-blur-xl border transition-all shadow-lg ${
                isFocused ? 'border-[#f6b044]/30 shadow-2xl shadow-[#f6b044]/10' : 'border-black/10'
              }`}>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Напишите сообщение или нажмите / для команд..."
                  rows={1}
                  className="flex-1 resize-none bg-transparent px-2 py-3 focus:outline-none text-gray-900 placeholder:text-gray-400 max-h-32 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                  style={{
                    minHeight: '44px',
                  }}
                />

                <div className="flex gap-2 px-2 pb-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleRecording}
                    className={`p-2 rounded-xl transition-colors ${
                      isRecording
                        ? 'bg-red-500/20 text-red-500 animate-pulse'
                        : 'text-gray-400 hover:text-gray-600 hover:bg-black/5'
                    }`}
                    title={isRecording ? 'Остановить запись' : 'Голосовое сообщение'}
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
            <p className="text-[10px] md:text-xs text-center text-gray-400 mt-1.5 md:mt-4">
              NIKA может делать ошибки. Проверяйте важную информацию.
              {' '}
              <NavLink to="/contact" className="text-amber-600 hover:underline ml-1">
                Обратная связь
              </NavLink>
            </p>
          </div> 
        </div>
      </div>
    </div>
  );
}