import { useNavigate } from 'react-router';
import { ArrowLeft, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Subscription() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fffee7] flex flex-col items-center justify-center p-8 font-['Arimo:Regular',sans-serif]">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        whileHover={{ x: -4 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate('/profile')}
        className="absolute top-8 left-8 flex items-center gap-2 text-[#83451e] hover:text-[#3d1f00] transition-colors"
      >
        <ArrowLeft size={24} />
        <span className="text-[16px]">Назад</span>
      </motion.button>

      {/* Subscription Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
        className="bg-white rounded-[30px] p-12 shadow-lg max-w-md w-full relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-[#f5a623]" />
        
        <div className="text-center mb-8">
          <h1 className="text-[#3d1f00] text-[32px] font-bold mb-2 font-['Arimo:Bold',sans-serif]">Premium</h1>
          <p className="text-[#83451e] text-[16px]">Получите полный доступ ко всем возможностям NIKA</p>
        </div>

        <div className="flex items-end justify-center gap-2 mb-10">
          <span className="text-[#3d1f00] text-[48px] font-bold leading-none font-['Arimo:Bold',sans-serif]">299</span>
          <span className="text-[#83451e] text-[24px] mb-1">руб.</span>
          <span className="text-[#83451e] text-[16px] mb-2 text-opacity-60">/ мес</span>
        </div>

        <div className="space-y-4 mb-10">
          {[
            'Полный доступ к персонализированному сопровождению',
            'Расширенный анализ данных',
            'Постоянная адаптация личной стратегии'
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="mt-1 bg-[#f5a623] rounded-full p-1 text-white shrink-0">
                <Check size={12} strokeWidth={3} />
              </div>
              <span className="text-[#3d1f00] text-[16px] leading-tight">{item}</span>
            </div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full bg-[#f5a623] hover:bg-[#e59615] text-white font-bold py-4 rounded-[15px] text-[18px] transition-all shadow-md">
          Оформить подписку
        </motion.button>
      </motion.div>
      {/* Company Information */}
      <div className="mt-12 text-center text-[12px] text-[#83451e] opacity-70">
        ООО «Медицинская индустрия разработок (МИР)» ИНН 6453180874 ОГРН 1256400010987
      </div>
    </div>
  );
}
