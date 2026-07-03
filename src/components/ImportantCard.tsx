import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { Waves, Sparkles, AlertTriangle, HelpCircle } from 'lucide-react';

export default function ImportantCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Setup Motion Values for 3D Tilt Effect on Desktop
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out tilt movements
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { damping: 20, stiffness: 150 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { damping: 20, stiffness: 150 });

  const handlePointerMove = (event: React.PointerEvent) => {
    if (!cardRef.current || isFlipped) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate values between -0.5 and 0.5
    const mouseX = (event.clientX - rect.left) / width - 0.5;
    const mouseY = (event.clientY - rect.top) / height - 0.5;
    
    x.set(mouseX);
    y.set(mouseY);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section 
      id="important-block" 
      className="py-24 px-4 flex flex-col items-center justify-center bg-brand-darker/30 relative"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-brand-pink/5 blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-10 max-w-xl z-10">
        <h2 className="font-display font-bold text-2xl md:text-3xl uppercase tracking-tight text-white">
          САМЫЙ ВАЖНЫЙ ВОПРОС ⚡️
        </h2>
        <p className="text-zinc-400 font-mono text-xs mt-2 uppercase tracking-widest">
          Кликни на карточку, чтобы открыть секретный регламент
        </p>
      </div>

      {/* Interactive 3D Flip & Tilt Container */}
      <div 
        className="w-full max-w-md h-[340px] cursor-pointer perspective-[1200px]"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          ref={cardRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          style={{
            transformStyle: 'preserve-3d',
            rotateX: isFlipped ? 0 : rotateX,
            rotateY: isFlipped ? 180 : rotateY,
          }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: 'spring', damping: 15, stiffness: 80 }}
          className="relative w-full h-full duration-500 rounded-3xl"
        >
          {/* FRONT OF CARD */}
          <div 
            className="absolute inset-0 w-full h-full bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 border-2 border-zinc-800 rounded-3xl p-6 flex flex-col items-center justify-between shadow-2xl backface-hidden"
          >
            {/* Holographic accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-pink/10 rounded-bl-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-cyan/10 rounded-tr-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between w-full font-mono text-xs text-brand-cyan uppercase">
              <span className="flex items-center gap-1.5 font-bold">
                <AlertTriangle size={14} className="animate-pulse text-brand-pink" /> ВНИМАНИЕ • ВАЖНО
              </span>
              <span>ID: 08-08</span>
            </div>

            <div className="flex flex-col items-center text-center my-auto">
              {/* Question icon */}
              <div className="w-20 h-20 rounded-full bg-zinc-800/40 border border-zinc-700/60 flex items-center justify-center mb-6 text-brand-pink shadow-lg relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-pink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <HelpCircle size={40} className="animate-pulse text-brand-pink" />
              </div>
              <h3 className="font-display font-black text-xl md:text-2xl text-white tracking-tight uppercase leading-snug">
                ГЛАВНЫЙ СЕКРЕТНЫЙ РЕГЛАМЕНТ
              </h3>
              <p className="text-zinc-400 font-sans text-xs mt-3 max-w-xs">
                Электронный пропуск на Afterparty. Нажми, чтобы разблокировать доступ
              </p>
            </div>

            <div className="w-full font-mono text-xs text-zinc-500 text-center border-t border-zinc-800/80 pt-4">
              НАЖМИ ЧТОБЫ ПЕРЕВЕРНУТЬ
            </div>
          </div>

          {/* BACK OF CARD (Flipped - High Impact Bold Theme) */}
          <div 
            style={{ transform: 'rotateY(180deg)' }}
            className="absolute inset-0 w-full h-full bg-brand-pink border-4 border-white text-black rounded-3xl p-6 flex flex-col justify-between shadow-2xl backface-hidden transform -rotate-1 hover:rotate-0 transition-transform duration-300"
          >
            <div className="flex justify-between items-start w-full">
              <div className="bg-black text-white px-3 py-1.5 font-black text-xs uppercase tracking-tighter">
                Priority 01
              </div>
              <div className="flex gap-2">
                <span className="text-3xl">🩲</span>
                <span className="text-3xl">👙</span>
              </div>
            </div>

            <div className="my-auto">
              <h2 className="text-[34px] sm:text-4xl font-black text-black leading-none mb-4 uppercase tracking-tighter">
                БЕЗ ЭТОГО <br/>НЕ ВПУСТИМ
              </h2>
              <p className="text-black font-extrabold text-sm sm:text-base leading-snug">
                Обязательно: плавки / купальник. Нас ждет бассейн, баня и тотальный расслабон. Полотенца приготовим!
              </p>
            </div>

            <div className="w-full font-mono text-xs text-black/60 text-center border-t border-black/10 pt-4 flex items-center justify-center gap-1.5 font-bold">
              <Sparkles size={12} className="animate-spin text-black" /> НАЖМИ ЧТОБЫ ВЕРНУТЬ
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
