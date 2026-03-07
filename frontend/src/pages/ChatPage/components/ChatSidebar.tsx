import { Plus, Clock, Search, LogOut, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useNavigate} from 'react-router';

interface ChatSidebarProps {
  isOpen: boolean;
  sessions: Array<object>;
  onToggle: () => void;
  onNewChat: () => void;
  onHistory: (id: string) => void;
}


export function ChatSidebar({ isOpen, onToggle, onNewChat, sessions, onHistory }: ChatSidebarProps) {
  const navigate = useNavigate();


  const onLogout = async () => {
  try {
    const response = await fetch('/api/v1/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('refresh_token')}`,
      },
    })
    if (!response.ok) {
        throw new Error('Ошибка выхода');
      }
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/');
  } catch (err) {
    console.error(err);
  }
}

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
                  className="p-2 hover:bg-black/5 rounded-xl transition-all"
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
                <div className={sessions.length ? "flex items-center gap-2 px-3 mb-3" : 'hidden'}>
                  <Clock size={14} className="text-gray-500" strokeWidth={2.5} />
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Недавние</h3>
                </div>
                <div className="space-y-1">
                  {sessions.map((s: any, i: number) => (
                    <motion.button
                      onClick={() => onHistory(s.session_id)}
                      key={s.session_id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i++  * 0.05 }}
                      whileHover={{ x: 4 }}
                      className="w-full flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-black/5 transition-all group text-left border border-transparent hover:border-black/10"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-600 group-hover:text-gray-900 truncate transition-colors font-medium">
                          {s.preview}
                        </p>
                        
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
                    <NavLink to='/emotion-tracker' className={({isActive}) => isActive ? 'active' : ''}>
                      <motion.button
                        key={'Дневник эмоций'}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (sessions.length + 2) * 0.05 }}
                        whileHover={{ x: 4 }}
                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-black/5 transition-all group text-left border border-transparent hover:border-black/10"
                      >
                        <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors font-medium">
                          {'Дневник эмоций'}
                        </span>
                      </motion.button>
                    </NavLink>
                    <NavLink to='/food-tracker' className={({isActive}) => isActive ? 'active' : ''}>
                      <motion.button
                        key={'Дневник питания'}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (sessions.length + 2) * 0.05 }}
                        whileHover={{ x: 4 }}
                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-black/5 transition-all group text-left border border-transparent hover:border-black/10"
                      >
                        <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors font-medium">
                          {'Трекер питания'}
                        </span>
                      </motion.button>
                    </NavLink>
                    <NavLink to='/profile' className={({isActive}) => isActive ? 'active' : ''}>
                      <motion.button
                        key={'Профиль'}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (sessions.length + 2) * 0.05 }}
                        whileHover={{ x: 4 }}
                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-black/5 transition-all group text-left border border-transparent hover:border-black/10"
                      >
                        <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors font-medium">
                          {'Профиль'}
                        </span>
                      </motion.button>
                    </NavLink>
                    <NavLink to='/FAQ' className={({isActive}) => isActive ? 'active' : ''}>
                      <motion.button
                        key={'FAQs'}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (sessions.length + 3) * 0.05 }}
                        whileHover={{ x: 4 }}
                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-black/5 transition-all group text-left border border-transparent hover:border-black/10"
                      >
                        <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors font-medium">
                          {'FAQs'}
                        </span>
                      </motion.button>
                    </NavLink>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-black/5 space-y-1">
              <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 transition-all text-gray-600 hover:text-red-500 group">
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
