import { useState, useRef, useEffect } from 'react';
import { Send, Menu, X, Sparkles, Mic, Paperclip, MoreVertical, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage } from './ChatMessage';
import { ChatSidebar } from './ChatSidebar';
import { SuggestedPrompts } from './SuggestedPrompts';
import imgImage2 from "../assets/avatar.png";

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    content: 'Привет! Я НИКА, твой помощник по спорту. Я помогу тебе: понять свои спортивные возможности, построить правильный план тренировок, восстанавливаться после нагрузок и многое другое!\n\nОтветь: Готово\\Расскажи подробнее',
    role: 'assistant',
    timestamp: new Date(Date.now() - 600000)
  },
  {
    id: '2',
    content: 'Готово',
    role: 'user',
    timestamp: new Date(Date.now() - 540000)
  },
  {
    id: '3',
    content: 'Отлично! Для начала мне нужно узнать о тебе. Какой вид спорта тебя интересует?',
    role: 'assistant',
    timestamp: new Date(Date.now() - 480000)
  },
  {
    id: '4',
    content: 'Бег',
    role: 'user',
    timestamp: new Date(Date.now() - 420000)
  },
  {
    id: '5',
    content: 'Супер! Бег— отличный выбор. А ты уже бегаешь или только начинаешь?',
    role: 'assistant',
    timestamp: new Date(Date.now() - 360000)
  },
  {
    id: '6',
    content: 'Я начала бегать еще месяц назад, выходила на пробежку через день. Получалось по полчаса бега в легком темпе',
    role: 'user',
    timestamp: new Date(Date.now() - 300000)
  }
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
    
    setIsTyping(true);
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Отличный прогресс! Продолжайте в том же духе. Хотите я составлю для вас персональный план тренировок?',
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleNewChat = () => {
    setMessages([]);
  };

  const handlePromptSelect = (prompt: string) => {
    setInputValue(prompt);
    inputRef.current?.focus();
  };

  // Group consecutive messages from the same sender
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
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fafafa] via-[#ffffff] to-[#f5f5f5]">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#f6b044]/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#f39c12]/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Sidebar */}
      <ChatSidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onNewChat={handleNewChat}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Header */}
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
                  <h1 className="font-semibold text-gray-900 tracking-tight">NIKA Pro</h1>
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

        {/* Messages Container */}
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
                {groupedMessages.map((message) => (
                  <ChatMessage 
                    key={message.id} 
                    message={message}
                    avatarUrl={message.role === 'assistant' ? imgImage2 : undefined}
                    showAvatar={message.showAvatar}
                    isFirstInGroup={message.isFirstInGroup}
                    isLastInGroup={message.isLastInGroup}
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

        {/* Input Area */}
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
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
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
                    className="p-2 rounded-xl hover:bg-black/5 transition-colors"
                  >
                    <Mic className="text-gray-400 hover:text-gray-600 transition-colors" size={20} />
                  </motion.button>
                  
                  <motion.button
                    onClick={handleSend}
                    disabled={!inputValue.trim()}
                    whileHover={{ scale: inputValue.trim() ? 1.05 : 1 }}
                    whileTap={{ scale: inputValue.trim() ? 0.95 : 1 }}
                    className="p-2.5 rounded-xl bg-gradient-to-r from-[#f6b044] to-[#f39c12] hover:from-[#f39c12] hover:to-[#f6b044] disabled:from-gray-200 disabled:to-gray-200 disabled:cursor-not-allowed shadow-lg disabled:shadow-none transition-all"
                  >
                    <Send className={`${inputValue.trim() ? 'text-white' : 'text-gray-400'} transition-colors`} size={18} strokeWidth={2.5} />
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
