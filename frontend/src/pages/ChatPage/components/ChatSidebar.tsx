import { Plus, Clock, Search, Settings, LogOut, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onNewChat: () => void;
}

const RECENT_CHATS = [
  { id: '1', title: 'План тренировок на неделю', time: '2ч назад' },
  { id: '2', title: 'Советы по питанию', time: '5ч назад' },
  { id: '3', title: 'Упражнения для спины', time: 'Вчера' },
  { id: '4', title: 'Восстановление после бега', time: '2 дня назад' },
];

const MENU_ITEMS = [
  { label: 'Трекер прогресса', badge: 'Новое' },
  { label: 'Упражнения', badge: null },
  { label: 'Дневник питания', badge: null },
  { label: 'FAQs', badge: null },
];

export function ChatSidebar({ isOpen, onToggle, onNewChat }: ChatSidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
            className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed lg:relative z-50 h-full w-80 bg-white/80 backdrop-blur-2xl border-r border-black/5 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-black/5">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#f6b044] to-[#f39c12] flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">N</span>
                  </div>
                  <span className="font-semibold text-gray-900">NIKA</span>
                </div>
                <button
                  onClick={onToggle}
                  className="lg:hidden p-2 hover:bg-black/5 rounded-xl transition-all"
                >
                  <ChevronLeft size={18} className="text-gray-500" />
                </button>
              </div>
              
              <motion.button
                onClick={onNewChat}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-[#f6b044] to-[#f39c12] hover:from-[#f39c12] hover:to-[#f6b044] text-white rounded-2xl px-4 py-3.5 flex items-center justify-center gap-2.5 shadow-lg shadow-[#f6b044]/20 transition-all group font-medium"
              >
                <Plus size={20} className="group-hover:rotate-90 transition-transform" strokeWidth={2.5} />
                <span>Новый чат</span>
              </motion.button>
            </div>

            {/* Search */}
            <div className="px-6 py-4">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} strokeWidth={2.5} />
                <input
                  type="text"
                  placeholder="Поиск..."
                  className="w-full bg-white border border-black/10 rounded-xl pl-11 pr-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#f6b044]/30 focus:ring-2 focus:ring-[#f6b044]/10 transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Recent Chats */}
            <div className="flex-1 px-3 overflow-y-auto">
              <div className="mb-6">
                <div className="flex items-center gap-2 px-3 mb-3">
                  <Clock size={14} className="text-gray-500" strokeWidth={2.5} />
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Недавние</h3>
                </div>
                <div className="space-y-1">
                  {RECENT_CHATS.map((chat, index) => (
                    <motion.button
                      key={chat.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 4 }}
                      className="w-full flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-black/5 transition-all group text-left border border-transparent hover:border-black/10"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-600 group-hover:text-gray-900 truncate transition-colors font-medium">
                          {chat.title}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">{chat.time}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Menu Items */}
              <div>
                <div className="px-3 mb-3">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Меню</h3>
                </div>
                <div className="space-y-1">
                  {MENU_ITEMS.map((item, index) => (
                    <motion.button
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (RECENT_CHATS.length + index) * 0.05 }}
                      whileHover={{ x: 4 }}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-black/5 transition-all group text-left border border-transparent hover:border-black/10"
                    >
                      <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors font-medium">
                        {item.label}
                      </span>
                      {item.badge && (
                        <span className="text-xs bg-[#f6b044]/20 text-[#f6b044] px-2 py-0.5 rounded-full font-semibold">
                          {item.badge}
                        </span>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-black/5 space-y-1">
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-black/5 transition-all text-gray-600 hover:text-gray-900 group">
                <Settings size={18} className="text-gray-400 group-hover:text-gray-600 transition-colors" strokeWidth={2.5} />
                <span className="text-sm font-medium">Настройки</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 transition-all text-gray-600 hover:text-red-500 group">
                <LogOut size={18} className="text-gray-400 group-hover:text-red-500 transition-colors" strokeWidth={2.5} />
                <span className="text-sm font-medium">Выйти</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
