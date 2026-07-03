import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Copy, Check, ExternalLink, Compass } from 'lucide-react';

interface MapBlockProps {
  dinoMode: boolean;
}

export default function MapBlock({ dinoMode }: MapBlockProps) {
  const [copied, setCopied] = useState(false);
  
  const addressText = "СНТ Радуга, сектор Б, участок 44";
  const coordinatesText = "55.854203, 38.125641"; // Approximate coordinates for illustration

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${addressText} (${coordinatesText})`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const yandexMapsUrl = `https://yandex.ru/maps/?text=${encodeURIComponent(addressText)}`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressText)}`;

  return (
    <section id="location" className="py-24 px-4 flex flex-col items-center justify-center relative bg-brand-darker/50">
      {/* Background radial glowing effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-brand-cyan/5 blur-[90px] pointer-events-none" />

      <div className="max-w-3xl w-full z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-brand-cyan font-mono text-sm tracking-widest uppercase mb-2 font-bold">// LOCATION</p>
          <h2 className="font-display font-black italic text-3xl md:text-5xl uppercase tracking-tighter text-white leading-tight">
            МЕСТО ВСТРЕЧИ
          </h2>
          <div className="h-1.5 w-24 bg-brand-pink mx-auto mt-4 rounded-full" />
        </div>

        {/* Dynamic Card */}
        <div className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:24px_24px] opacity-10" />
          
          <div className="relative z-10 flex flex-col items-center text-center w-full">
            <Compass className={`animate-spin-slow mb-4 ${dinoMode ? 'text-brand-neon' : 'text-brand-yellow'}`} size={32} />

            {/* Structured Address */}
            <div className="mb-8">
              <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest font-bold block mb-2">ПОЛНЫЙ АДРЕС</span>
              <h3 className="font-display font-extrabold text-xl sm:text-2xl md:text-3xl text-white tracking-tight uppercase max-w-xl">
                {addressText}
              </h3>
              <p className="text-zinc-400 font-sans text-xs mt-3 bg-zinc-900/80 px-4 py-2 rounded-full inline-block border border-zinc-800/60">
                Координаты: <span className="font-mono text-white font-bold">{coordinatesText}</span>
              </p>
            </div>

            {/* Actions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl mt-4">
              {/* Copy address */}
              <button
                onClick={handleCopy}
                className="relative flex items-center justify-center gap-2.5 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 p-4 rounded-2xl font-mono text-xs font-bold text-white uppercase transition-all transform active:scale-95 group shadow-lg"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div
                      key="checked"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      className="flex items-center gap-2 text-brand-neon"
                    >
                      <Check size={16} className="stroke-[3]" />
                      <span>СКОПИРОВАНО!</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Copy size={16} className="text-zinc-400 group-hover:text-white transition-colors" />
                      <span>КОПИРОВАТЬ АДРЕС</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              {/* Yandex Maps */}
              <a
                href={yandexMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 bg-[#f51414]/10 hover:bg-[#f51414]/20 border border-[#f51414]/30 p-4 rounded-2xl font-mono text-xs font-bold text-[#ff4c4c] uppercase transition-all transform active:scale-95 shadow-lg"
              >
                <span>ЯНДЕКС КАРТЫ</span>
                <ExternalLink size={14} />
              </a>

              {/* Google Maps */}
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 bg-brand-cyan/10 hover:bg-brand-cyan/20 border border-brand-cyan/30 p-4 rounded-2xl font-mono text-xs font-bold text-brand-cyan uppercase transition-all transform active:scale-95 shadow-lg"
              >
                <span>GOOGLE MAPS</span>
                <ExternalLink size={14} />
              </a>
            </div>

            {/* Travel Guide Tip */}
            <div className="mt-8 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/40 max-w-xl text-left">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest font-bold block mb-1">💡 КАК ДОБРАТЬСЯ</span>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                На машине: в навигатор вбивайте <span className="text-white">«СНТ Радуга»</span>. 
                На такси: отлично вызывается до адреса. Если потеряетесь — пишите / звоните, встретим! 📞
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
