import { motion } from 'framer-motion';
import { Dumbbell, TrendingUp, Apple, Clock } from 'lucide-react';

interface SuggestedPromptsProps {
  onSelect: (prompt: string) => void;
}

const PROMPTS = [
  {
    icon: Dumbbell,
    title: 'План тренировок',
    prompt: 'Составь мне план тренировок для начинающего бегуна',
    color: 'border-blue-200 hover:border-blue-300 hover:bg-blue-50/50'
  },
  {
    icon: TrendingUp,
    title: 'Прогресс',
    prompt: 'Как правильно отслеживать свой прогресс в беге?',
    color: 'border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50/50'
  },
  {
    icon: Apple,
    title: 'Питание',
    prompt: 'Какое питание подходит для спортсменов?',
    color: 'border-orange-200 hover:border-orange-300 hover:bg-orange-50/50'
  },
  {
    icon: Clock,
    title: 'Восстановление',
    prompt: 'Расскажи про восстановление после интенсивных тренировок',
    color: 'border-purple-200 hover:border-purple-300 hover:bg-purple-50/50'
  },
];

export function SuggestedPrompts({ onSelect }: SuggestedPromptsProps) {
  return (
    <div className="grid grid-cols-2 gap-1.5 md:gap-3 w-full max-w-2xl px-1 md:px-0">
      {PROMPTS.map((prompt, index) => (
        <motion.button
          key={prompt.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + index * 0.1 }}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(prompt.prompt)}
          className={`p-3 md:p-4 rounded-[14px] md:rounded-2xl backdrop-blur-xl border transition-all text-left bg-transparent shadow-sm hover:shadow-md flex flex-col md:flex-row gap-2 md:gap-3 ${prompt.color}`}
        >
          <div className="flex items-start md:items-center gap-2 md:gap-3 w-full">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-[10px] md:rounded-xl bg-white border border-black/10 flex items-center justify-center flex-shrink-0 shadow-sm">
              <prompt.icon className="text-gray-600 w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-[13px] md:text-sm font-semibold text-gray-900 mb-0.5 md:mb-1 truncate md:whitespace-normal">
                {prompt.title}
              </h3>
              <p className="text-[11px] md:text-xs text-gray-600 hidden md:block line-clamp-2">
                {prompt.prompt}
              </p>
            </div>
          </div>
          <p className="text-[11px] text-gray-600 block md:hidden line-clamp-2 mt-0.5 leading-snug">
            {prompt.prompt}
          </p>
        </motion.button>
      ))}
    </div>
  );
}
