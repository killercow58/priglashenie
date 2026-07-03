import { Flame } from 'lucide-react';

interface DressCodeBlockProps {
  dinoMode: boolean;
  setDinoMode: (active: boolean) => void;
  onHoverChange: (isHovered: boolean) => void;
}

export default function DressCodeBlock({ dinoMode, onHoverChange }: DressCodeBlockProps) {
  return (
    <section 
      id="dress-code"
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      className="py-24 px-4 flex flex-col items-center justify-center relative transition-colors duration-1000 overflow-hidden"
    >
      {/* Background radial highlight */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none transition-colors duration-1000 ${
        dinoMode ? 'bg-green-500/10' : 'bg-brand-yellow/5'
      }`} />

      <div className="max-w-4xl w-full z-10 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-12 max-w-xl">
          <p className="text-brand-cyan font-mono text-sm tracking-widest uppercase mb-2 font-bold">// DRESS_CODE</p>
          <h2 className="font-display font-black italic text-3xl md:text-5xl uppercase tracking-tighter text-white leading-tight">
            АБСОЛЮТНЫЙ РАССЛАБОН
          </h2>
          <div className="h-1.5 w-24 bg-brand-pink mx-auto mt-4 rounded-full" />
        </div>

        {/* Main Concept Card */}
        <div className="w-full">
          <div className="bg-[#1a1a1a] border border-white/10 p-6 md:p-8 rounded-3xl flex flex-col justify-between h-full relative group shadow-2xl">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-yellow/5 rounded-bl-full blur-xl pointer-events-none" />
            
            <div>
              <span className="font-mono text-xs text-brand-cyan font-bold uppercase tracking-widest block mb-4">
                [ DRESS_CODE // БЕЗ ПРАВИЛ ]
              </span>
              <h3 className="font-display font-black text-xl md:text-2xl text-white uppercase tracking-tight mb-4">
                ПРИХОДИ В ЧЕМ УГОДНО!
              </h3>
              <p className="text-zinc-300 font-sans leading-relaxed text-sm md:text-base">
                Дресс-кода <span className="text-brand-pink font-extrabold uppercase">абсолютно нет</span>. Нам плевать на смокинги и вечерние платья — это было вчера. 
              </p>
              <p className="text-zinc-400 font-sans text-xs sm:text-sm mt-4 leading-relaxed">
                Приходи хоть в <span className="text-white underline decoration-brand-cyan underline-offset-4">мягкой пижаме</span>, хоть в удобных пляжных шортах, хоть в <span className="text-white underline decoration-brand-neon underline-offset-4 font-bold">костюме динозавра</span>. Главное — чтобы тебе было по кайфу!
              </p>
            </div>

            {/* Tags from the theme mockup */}
            <div className="flex flex-wrap gap-2.5 mt-6 pt-6 border-t border-white/5">
              <span className="px-3.5 py-1.5 border border-white/10 bg-white/5 rounded-full text-[10px] font-mono font-bold uppercase text-brand-cyan">#NoRules</span>
              <span className="px-3.5 py-1.5 border border-white/10 bg-white/5 rounded-full text-[10px] font-mono font-bold uppercase text-brand-pink">#JustFriends</span>
              <span className="px-3.5 py-1.5 border border-white/10 bg-white/5 rounded-full text-[10px] font-mono font-bold uppercase text-brand-yellow">#SummerVibes</span>
            </div>
          </div>
        </div>

        {/* Warning sticker below the grid */}
        <div className="mt-8 bg-brand-pink/10 border border-brand-pink/30 p-4 rounded-2xl flex items-center gap-3 text-brand-pink max-w-2xl w-full">
          <Flame size={20} className="shrink-0 animate-pulse" />
          <p className="text-xs font-mono font-bold leading-normal uppercase">
            ЕДИНСТВЕННОЕ НАРУШЕНИЕ — ЭТО ОТСУТСТВИЕ НАСТРОЕНИЯ НА ЧИЛЛ!
          </p>
        </div>
      </div>
    </section>
  );
}
