import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChecklistItem } from '../types';
import { Check, Info, Sparkles, Smile, Flame } from 'lucide-react';

interface ChecklistProps {
  dinoMode: boolean;
}

export default function Checklist({ dinoMode }: ChecklistProps) {
  const [items, setItems] = useState<ChecklistItem[]>([
    { id: 'swimwear', text: '🩲 Плавки или Купальник (Абсолютный Must Have!)', required: true },
    { id: 'towel', text: '🧖 Полотенце (хотя мы приготовим, лишним не будет)', required: false },
    { id: 'slippers', text: '🩴 Сменные шлепки / тапочки для бани', required: false },
    { id: 'mood', text: '🦖 Отличное настроение или дух динозавра', required: true },
    { id: 'carbon', text: '💊 Активированный уголь / аспирин на утро', required: false },
  ]);

  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    if (checkedIds.includes(id)) {
      setCheckedIds(checkedIds.filter(item => item !== id));
    } else {
      setCheckedIds([...checkedIds, id]);
    }
  };

  const requiredCount = items.filter(item => item.required).length;
  const checkedRequiredCount = items.filter(item => item.required && checkedIds.includes(item.id)).length;
  const totalCount = items.length;
  const checkedTotalCount = checkedIds.length;

  const progressPercentage = Math.round((checkedTotalCount / totalCount) * 100);
  const isFullyReady = checkedTotalCount === totalCount;
  const isRequiredReady = checkedRequiredCount === requiredCount;

  return (
    <section id="checklist" className="py-24 px-4 flex flex-col items-center justify-center relative bg-brand-darker/40">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-brand-cyan/5 blur-[100px] pointer-events-none" />

      <div className="max-w-2xl w-full z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-brand-cyan font-mono text-sm tracking-widest uppercase mb-2 font-bold">// CHECKLIST</p>
          <h2 className="font-display font-black italic text-3xl md:text-5xl uppercase tracking-tighter text-white leading-tight">
            ЧЕК-ЛИСТ ГОСТЯ
          </h2>
          <div className="h-1.5 w-24 bg-brand-pink mx-auto mt-4 rounded-full" />
        </div>

        {/* Card wrapper */}
        <div className="bg-[#1a1a1a] border border-white/10 p-6 md:p-10 rounded-3xl shadow-2xl">
          {/* Progress bar info */}
          <div className="mb-8">
            <div className="flex justify-between items-end mb-3">
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider font-bold">Твоя готовность:</span>
              <span className={`font-display text-2xl font-black ${
                isFullyReady 
                  ? 'text-brand-neon drop-shadow-[0_0_10px_rgba(57,255,20,0.5)]' 
                  : progressPercentage > 50 
                    ? 'text-brand-cyan' 
                    : 'text-brand-pink'
              }`}>
                {progressPercentage}%
              </span>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full h-3 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800/80 relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ type: 'spring', damping: 15 }}
                className={`h-full rounded-full transition-all duration-300 ${
                  isFullyReady
                    ? 'bg-gradient-to-r from-brand-cyan via-brand-pink to-brand-yellow'
                    : dinoMode
                      ? 'bg-brand-neon'
                      : 'bg-gradient-to-r from-brand-pink to-brand-cyan'
                }`}
              />
            </div>
          </div>

          {/* List group */}
          <div className="flex flex-col gap-3">
            {items.map((item) => {
              const isChecked = checkedIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer select-none transition-all duration-200 ${
                    isChecked
                      ? 'border-zinc-800 bg-zinc-950/40 text-zinc-300'
                      : 'border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-4 text-left">
                    {/* Checkbox circle */}
                    <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
                      isChecked
                        ? dinoMode 
                          ? 'bg-brand-neon border-brand-neon text-black' 
                          : 'bg-brand-pink border-brand-pink text-white'
                        : 'border-zinc-700 bg-zinc-950'
                    }`}>
                      {isChecked && <Check size={14} className="stroke-[3]" />}
                    </div>
                    
                    <span className={`font-sans text-sm ${isChecked ? 'line-through text-zinc-500' : 'text-white'}`}>
                      {item.text}
                    </span>
                  </div>

                  {item.required && (
                    <span className="font-mono text-[9px] font-bold text-brand-pink border border-brand-pink/30 bg-brand-pink/5 px-2 py-0.5 rounded-full uppercase shrink-0">
                      MUST HAVE
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Dynamic feedback display */}
          <AnimatePresence mode="wait">
            {isFullyReady ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-8 p-4 bg-brand-neon/10 border-2 border-brand-neon/40 rounded-2xl flex items-center gap-3 text-brand-neon"
              >
                <Sparkles size={20} className="animate-spin" />
                <p className="font-mono text-xs font-bold uppercase text-left leading-relaxed">
                  РЮКЗАК СОБРАН ИДЕАЛЬНО! УРОВЕНЬ ГОТОВНОСТИ К ТУСОВКЕ: МАКСИМАЛЬНЫЙ! ТЫ ЛУЧШИЙ(АЯ)! 🚀
                </p>
              </motion.div>
            ) : isRequiredReady ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-8 p-4 bg-brand-cyan/10 border border-brand-cyan/30 rounded-2xl flex items-center gap-3 text-brand-cyan"
              >
                <Smile size={20} className="animate-bounce" />
                <p className="font-mono text-xs font-bold uppercase text-left leading-relaxed">
                  ОТЛИЧНО! Самые важные вещи уже упакованы. Осталось положить мелочи для полного дзен-комплекта.
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-8 p-4 bg-zinc-950 border border-zinc-800/80 rounded-2xl flex items-center gap-3 text-zinc-500"
              >
                <Info size={16} className="shrink-0" />
                <p className="font-sans text-xs text-left">
                  Пожалуйста, упакуйте как минимум <span className="text-brand-pink font-bold">купальник/плавки</span> и <span className="text-white">настроение</span>, чтобы получить зеленую отметку допуска!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
