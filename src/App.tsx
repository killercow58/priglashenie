import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, MapPin, CheckSquare, Volume2, VolumeX, Flame } from 'lucide-react';

// Import child components
import ParticlesBackground from './components/ParticlesBackground';
import HeroSection from './components/HeroSection';
import ImportantCard from './components/ImportantCard';
import DressCodeBlock from './components/DressCodeBlock';
import MapBlock from './components/MapBlock';
import Checklist from './components/Checklist';

export default function App() {
  const [dinoMode, setDinoMode] = useState(false);
  const [dresscodeHovered, setDresscodeHovered] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  // Background ambient music setup (Royalty-free synthwave summer chill loop)
  useEffect(() => {
    const audioInstance = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3');
    audioInstance.loop = true;
    audioInstance.volume = 0.25;
    setAudio(audioInstance);

    return () => {
      audioInstance.pause();
    };
  }, []);

  const toggleAudio = () => {
    if (!audio) return;
    if (isPlayingAudio) {
      audio.pause();
      setIsPlayingAudio(false);
    } else {
      audio.play().catch(err => console.log("Audio play blocked by browser:", err));
      setIsPlayingAudio(true);
    }
  };

  // Determine current active primary color theme
  const getAccentColorClass = () => {
    if (dinoMode) return 'text-brand-neon';
    if (dresscodeHovered) return 'text-brand-yellow';
    return 'text-brand-cyan';
  };

  const getBorderColorClass = () => {
    if (dinoMode) return 'border-brand-neon';
    if (dresscodeHovered) return 'border-brand-yellow';
    return 'border-brand-pink';
  };

  const getBgColorClass = () => {
    if (dinoMode) return 'bg-brand-neon';
    if (dresscodeHovered) return 'bg-brand-yellow';
    return 'bg-brand-pink';
  };

  return (
    <div 
      className={`min-h-screen relative font-sans transition-colors duration-1000 select-none overflow-hidden ${
        dinoMode 
          ? 'bg-[#051203]' // Prehistoric dark green
          : dresscodeHovered 
            ? 'bg-[#0c0c05]' // Warm yellow-dark hybrid
            : 'bg-brand-dark' // Elegant slate black
      }`}
    >
      {/* Interactive canvas background */}
      <ParticlesBackground dinoMode={dinoMode} accentColor={dinoMode ? '#39ff14' : '#00f0ff'} />

      {/* Music Boombox widget */}
      <div className="fixed top-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleAudio}
          className={`p-3 rounded-full border backdrop-blur-md shadow-2xl flex items-center justify-center cursor-pointer transition-colors ${
            isPlayingAudio
              ? dinoMode
                ? 'bg-brand-neon/20 border-brand-neon text-brand-neon'
                : 'bg-brand-pink/20 border-brand-pink text-brand-pink shadow-[0_0_15px_rgba(255,0,127,0.4)]'
              : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white'
          }`}
        >
          {isPlayingAudio ? (
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-widest hidden md:inline uppercase animate-pulse">POOL BEAT: ON</span>
              <Volume2 size={18} className="animate-bounce" />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-widest hidden md:inline uppercase text-zinc-500">BEAT: MUTED</span>
              <VolumeX size={18} />
            </div>
          )}
        </motion.button>
      </div>

      {/* Floating Retro Boombox/Visualizer inside the screen when playing */}
      <AnimatePresence>
        {isPlayingAudio && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed bottom-24 right-6 z-40 bg-zinc-950/90 border border-zinc-800 p-3 rounded-2xl shadow-2xl backdrop-blur-md hidden sm:flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden">
              <span className="text-lg animate-spin">💿</span>
            </div>
            <div className="text-left font-mono text-[10px]">
              <span className="block text-zinc-500 uppercase font-bold tracking-wide">NOW PLAYING</span>
              <span className="block text-white font-bold max-w-[120px] truncate">Summer Pool Chillout</span>
            </div>
            {/* Visualizer bars */}
            <div className="flex items-end gap-0.5 h-6 px-1">
              {[0.6, 1.2, 0.8, 1.4, 0.4].map((delay, idx) => (
                <motion.div
                  key={idx}
                  animate={{ height: [4, 20, 4] }}
                  transition={{ duration: delay, repeat: Infinity, ease: 'easeInOut' }}
                  className={`w-1 rounded-full ${dinoMode ? 'bg-brand-neon' : 'bg-brand-cyan'}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Layout Content wrapper */}
      <main className="relative z-10 w-full max-w-5xl mx-auto pb-32">
        {/* Sections */}
        <HeroSection dinoMode={dinoMode} />
        <ImportantCard />
        <DressCodeBlock dinoMode={dinoMode} setDinoMode={setDinoMode} onHoverChange={setDresscodeHovered} />
        <MapBlock dinoMode={dinoMode} />
        <Checklist dinoMode={dinoMode} />
      </main>

      {/* Bottom Glassmorphism Navigation Dock */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-lg">
        <div className="bg-zinc-950/80 border border-zinc-800/80 p-2.5 rounded-full backdrop-blur-xl shadow-[0_15px_30px_rgba(0,0,0,0.5)] flex items-center justify-between">
          {[
            { id: 'hero', icon: Sparkles, label: 'Старт' },
            { id: 'important-block', icon: Flame, label: 'Важно' },
            { id: 'location', icon: MapPin, label: 'Где' },
            { id: 'checklist', icon: CheckSquare, label: 'Сборы' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => {
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex flex-col items-center justify-center flex-1 py-1.5 rounded-full hover:bg-zinc-900/50 transition-colors group cursor-pointer text-zinc-400 hover:text-white"
              >
                <Icon size={18} className="group-hover:scale-110 transition-transform text-zinc-400 group-hover:text-white" />
                <span className="text-[9px] font-mono mt-1 font-semibold block sm:hidden uppercase tracking-widest scale-90">
                  {item.label}
                </span>
                <span className="text-[10px] font-mono mt-1 font-semibold hidden sm:block uppercase tracking-widest scale-90">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
