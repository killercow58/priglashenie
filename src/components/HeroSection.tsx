import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Volume2, VolumeX } from 'lucide-react';

interface HeroSectionProps {
  dinoMode: boolean;
}

export default function HeroSection({ dinoMode }: HeroSectionProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false,
  });

  useEffect(() => {
    // Target: August 8, 2026, 17:00 (Moscow/local standard time zone)
    const targetDate = new Date('2026-08-08T17:00:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft(prev => ({ ...prev, isOver: true }));
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isOver: false });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', damping: 20, stiffness: 100 },
    },
  };

  const floatVariants = {
    animate: {
      y: [0, -8, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.section
      id="hero"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 py-16 overflow-hidden"
    >
      {/* Background radial glowing effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[600px] md:h-[600px] rounded-full bg-brand-cyan/10 blur-[80px] md:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] rounded-full bg-brand-pink/10 blur-[80px] pointer-events-none" />

      {/* Hero Badge */}
      <motion.div
        variants={itemVariants}
        className={`px-4 py-1.5 rounded-full border text-xs md:text-sm font-mono tracking-widest uppercase mb-6 backdrop-blur-md ${
          dinoMode 
            ? 'border-brand-neon text-brand-neon bg-brand-neon/5' 
            : 'border-brand-pink text-brand-pink bg-brand-pink/5'
        }`}
      >
        {dinoMode ? '🦖 РЕВУЩИЙ ДИНО-РЕЖИМ АКТИВЕН' : '🍹 WEDDING AFTERPARTY • FRIENDLY ONLY'}
      </motion.div>

      {/* Main Title and Header */}
      <motion.div variants={itemVariants} className="max-w-4xl z-10 w-full flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-10 text-center md:text-left">
        <div>
          <p className="text-brand-cyan font-mono text-xs md:text-sm tracking-widest uppercase mb-3 font-bold">
            The Wedding Afterparty
          </p>
          <h1 className="text-[55px] sm:text-[85px] md:text-[120px] font-black leading-[0.85] tracking-tighter uppercase select-none">
            ВТОРОЙ<br/>
            <span className={`block mt-2 text-transparent text-stroke ${
              dinoMode ? 'text-stroke-pink' : ''
            }`}>
              ДЕНЬ
            </span>
          </h1>
        </div>
        
      </motion.div>

      {/* Subtitle / Ticket Details */}
      <motion.p
        variants={itemVariants}
        className="mt-2 text-zinc-300 text-base sm:text-lg md:text-xl max-w-2xl font-medium leading-relaxed"
      >
        Свадьба <span className="text-white font-black underline decoration-brand-cyan decoration-2 underline-offset-4">Александры и Дмитрия</span> продолжается! 
        Забываем про пафос, официальные костюмы и собираемся на максимальный расслабон только для своих.
      </motion.p>

      {/* Event Details Row */}
      <motion.div
        variants={itemVariants}
        className="flex flex-wrap items-center justify-center gap-6 mt-10 font-mono text-sm md:text-base bg-brand-darker/60 border border-zinc-800/80 p-4 md:p-6 rounded-2xl backdrop-blur-lg z-10 max-w-xl"
      >
        <div className="flex items-center gap-3 px-4 py-2">
          <Calendar className={dinoMode ? 'text-brand-neon' : 'text-brand-cyan'} size={20} />
          <div className="text-left">
            <span className="block text-xs text-zinc-500 uppercase">КОГДА</span>
            <span className="text-white font-bold">08.08 (Суббота)</span>
          </div>
        </div>
        <div className="hidden sm:block w-[1px] h-8 bg-zinc-800" />
        <div className="flex items-center gap-3 px-4 py-2">
          <Clock className={dinoMode ? 'text-brand-neon' : 'text-brand-yellow'} size={20} />
          <div className="text-left">
            <span className="block text-xs text-zinc-500 uppercase">ВРЕМЯ</span>
            <span className="text-white font-bold">17:00</span>
          </div>
        </div>
      </motion.div>

      {/* Countdown Timer Block */}
      <motion.div
        variants={itemVariants}
        className="mt-12 w-full max-w-lg z-10"
      >
        <div className="text-xs uppercase font-mono tracking-widest text-zinc-500 mb-4">До старта безумия осталось:</div>
        
        {timeLeft.isOver ? (
          <div className="text-2xl md:text-4xl font-display font-extrabold text-brand-neon uppercase animate-pulse">
            🔥 МЫ УЖЕ ТУСИМ! ЖДЕМ ТОЛЬКО ТЕБЯ! 🔥
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {[
              { label: 'Дней', value: timeLeft.days, color: 'text-brand-cyan' },
              { label: 'Часов', value: timeLeft.hours, color: 'text-brand-pink' },
              { label: 'Минут', value: timeLeft.minutes, color: 'text-brand-yellow' },
              { label: 'Секунд', value: timeLeft.seconds, color: dinoMode ? 'text-brand-neon' : 'text-brand-cyan' },
            ].map((unit, i) => (
              <div 
                key={i} 
                className="bg-zinc-900/80 border border-zinc-800/50 p-3 sm:p-5 rounded-xl sm:rounded-2xl backdrop-blur-md flex flex-col items-center justify-center min-w-[70px] sm:min-w-[90px]"
              >
                <span className={`font-display text-2xl sm:text-4xl font-black ${unit.color}`}>
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs text-zinc-500 font-mono mt-1 uppercase">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Down indicator */}
      <motion.div
        variants={floatVariants}
        animate="animate"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600 text-[10px] sm:text-xs font-mono tracking-widest uppercase cursor-pointer hover:text-white transition-colors"
        onClick={() => {
          document.getElementById('important-block')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span>Листай ниже</span>
        <div className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
      </motion.div>
    </motion.section>
  );
}
