import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Copy, RotateCcw, ThumbsUp, ThumbsDown, Check } from 'lucide-react';
import type { Message } from './ChatInterface';

interface ChatMessageProps {
  message: Message;
  avatarUrl?: string;
  showAvatar?: boolean;
  isFirstInGroup?: boolean;
  isLastInGroup?: boolean;
}

export function ChatMessage({ message, avatarUrl, showAvatar = true, isFirstInGroup = true, isLastInGroup = true }: ChatMessageProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const isUser = message.role === 'user';
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group flex items-start gap-3 px-4 py-2 hover:bg-black/[0.02] rounded-2xl transition-colors ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      <div className={`w-10 h-10 flex-shrink-0 ${showAvatar ? 'opacity-100' : 'opacity-0'}`}>
        {showAvatar && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`w-full h-full rounded-2xl flex items-center justify-center shadow-lg border ${
              isUser 
                ? 'bg-gradient-to-br from-[#5a6444] to-[#3d2b1f] border-black/10' 
                : 'overflow-hidden border-black/10'
            }`}
          >
            {isUser ? (
              <User className="text-white" size={20} strokeWidth={2.5} />
            ) : avatarUrl ? (
              <img src={avatarUrl} alt="NIKA" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#f6b044] to-[#f39c12]" />
            )}
          </motion.div>
        )}
      </div>

      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} flex-1 max-w-[85%] ${!showAvatar ? (isUser ? 'mr-13' : 'ml-13') : ''}`}>
        <motion.div
          initial={{ scale: 0.97 }}
          animate={{ scale: 1 }}
          className={`relative group/message`}
        >
          <div className={`rounded-2xl px-5 py-3.5 backdrop-blur-xl border transition-all shadow-sm ${
            isUser
              ? 'bg-gradient-to-br from-[#f6b044]/15 to-[#f39c12]/10 border-[#f6b044]/20 text-gray-900'
              : 'bg-white/90 border-black/10 text-gray-900'
          } ${!isFirstInGroup ? (isUser ? 'rounded-tr-md' : 'rounded-tl-md') : ''} ${!isLastInGroup ? (isUser ? 'rounded-br-md' : 'rounded-bl-md') : ''}`}>
            <p className="whitespace-pre-wrap leading-relaxed text-[15px]">
              {message.content}
            </p>
          </div>

          <AnimatePresence>
            {isHovered && isLastInGroup && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className={`absolute ${isUser ? 'left-0' : 'right-0'} -bottom-10 flex items-center gap-1 bg-white backdrop-blur-xl border border-black/10 rounded-xl px-2 py-1.5 shadow-2xl`}
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopy}
                  className="p-1.5 hover:bg-black/5 rounded-lg transition-colors"
                  title="Копировать"
                >
                  {isCopied ? (
                    <Check className="text-emerald-500" size={14} strokeWidth={2.5} />
                  ) : (
                    <Copy className="text-gray-600" size={14} strokeWidth={2.5} />
                  )}
                </motion.button>
                
                {!isUser && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-1.5 hover:bg-black/5 rounded-lg transition-colors"
                      title="Регенерировать"
                    >
                      <RotateCcw className="text-gray-600" size={14} strokeWidth={2.5} />
                    </motion.button>
                    
                    <div className="w-px h-4 bg-black/10 mx-0.5"></div>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-1.5 hover:bg-black/5 rounded-lg transition-colors"
                      title="Нравится"
                    >
                      <ThumbsUp className="text-gray-600" size={14} strokeWidth={2.5} />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-1.5 hover:bg-black/5 rounded-lg transition-colors"
                      title="Не нравится"
                    >
                      <ThumbsDown className="text-gray-600" size={14} strokeWidth={2.5} />
                    </motion.button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {isLastInGroup && (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xs text-gray-400 mt-2 px-2"
          >
            {formatTime(message.timestamp)}
          </motion.span>
        )}
      </div>
    </motion.div>
  );
}