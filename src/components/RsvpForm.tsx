import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RsvpResponse, RsvpOption } from '../types';
import { Send, CheckCircle2, AlertCircle, Heart, Flame } from 'lucide-react';

interface RsvpFormProps {
  dinoMode: boolean;
}

export default function RsvpForm({ dinoMode }: RsvpFormProps) {
  const [name, setName] = useState('');
  const [selectedOption, setSelectedOption] = useState<RsvpOption | null>(null);
  const [response, setResponse] = useState<RsvpResponse>({
    submitted: false,
    choice: 'hundred',
    name: '',
  });

  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [dodgeCount, setDodgeCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  // Check if RSVP exists in localStorage on mount
  useEffect(() => {
    const savedRsvp = localStorage.getItem('wedding_afterparty_rsvp');
    if (savedRsvp) {
      setResponse(JSON.parse(savedRsvp));
    }
  }, []);

  const handleDodge = () => {
    // Only dodge up to 5 times so the user isn't locked out forever if they really can't go,
    // or they find it too hard to click!
    if (dodgeCount < 5) {
      const randomX = (Math.random() - 0.5) * 160; // offset range -80 to 80
      const randomY = (Math.random() - 0.5) * 100; // offset range -50 to 50
      setNoButtonPosition({ x: randomX, y: randomY });
      setDodgeCount(prev => prev + 1);
    } else {
      // Show humorous popup
      setErrorMessage("Ой да ладно тебе, шутим! Но бассейн правда с подогревом 😉");
    }
  };

  const handleSelectOption = (opt: RsvpOption) => {
    setSelectedOption(opt);
    setErrorMessage('');
    if (opt !== 'boring') {
      // reset dodge if they select a positive option
      setNoButtonPosition({ x: 0, y: 0 });
      setDodgeCount(0);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage('Пожалуйста, введи своё имя/никнейм!');
      return;
    }
    if (!selectedOption) {
      setErrorMessage('Выбери один из вариантов присутствия!');
      return;
    }

    const newResponse: RsvpResponse = {
      submitted: true,
      choice: selectedOption,
      name: name.trim(),
    };

    localStorage.setItem('wedding_afterparty_rsvp', JSON.stringify(newResponse));
    setResponse(newResponse);
  };

  const handleReset = () => {
    localStorage.removeItem('wedding_afterparty_rsvp');
    setResponse({ submitted: false, choice: 'hundred', name: '' });
    setName('');
    setSelectedOption(null);
    setDodgeCount(0);
    setNoButtonPosition({ x: 0, y: 0 });
    setErrorMessage('');
  };

  return (
    <section id="rsvp" className="py-24 px-4 flex flex-col items-center justify-center relative bg-brand-darker/20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-brand-pink/5 blur-[100px] pointer-events-none" />

      <div className="max-w-2xl w-full z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-brand-cyan font-mono text-sm tracking-widest uppercase mb-2 font-bold">// RSVP</p>
          <h2 className="font-display font-black italic text-3xl md:text-5xl uppercase tracking-tighter text-white leading-tight">
            ПОДТВЕРДИ УЧАСТИЕ
          </h2>
          <div className="h-1.5 w-24 bg-brand-pink mx-auto mt-4 rounded-full" />
        </div>

        <AnimatePresence mode="wait">
          {!response.submitted ? (
            <motion.form
              key="rsvp-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleSubmit}
              className="bg-[#1a1a1a] border border-white/10 p-6 md:p-10 rounded-3xl shadow-2xl relative"
            >
              {/* Name field */}
              <div className="mb-6">
                <label className="block text-zinc-400 font-mono text-xs uppercase tracking-widest font-bold mb-3">
                  Твоё имя или Имена гостей
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder="Например: Саня и Даша"
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-brand-pink text-white rounded-2xl px-5 py-4 font-sans text-sm focus:outline-none transition-colors shadow-inner"
                />
              </div>

              {/* Attendance Options */}
              <div className="mb-8">
                <label className="block text-zinc-400 font-mono text-xs uppercase tracking-widest font-bold mb-4">
                  Ты в деле?
                </label>
                
                <div className="flex flex-col gap-4">
                  {/* Option 1: 100% In */}
                  <div
                    onClick={() => handleSelectOption('hundred')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      selectedOption === 'hundred'
                        ? 'border-brand-cyan bg-brand-cyan/10 text-brand-cyan shadow-[0_0_15px_rgba(0,240,255,0.1)]'
                        : 'border-zinc-800 bg-zinc-950/40 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🍹</span>
                      <div className="text-left">
                        <span className="block font-sans font-bold text-sm text-white">Буду на 100%, наливайте!</span>
                        <span className="block font-mono text-[10px] text-zinc-500">Готов(а) к безудержному веселью</span>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedOption === 'hundred' ? 'border-brand-cyan bg-brand-cyan' : 'border-zinc-700'
                    }`}>
                      {selectedOption === 'hundred' && <div className="w-2.5 h-2.5 rounded-full bg-black" />}
                    </div>
                  </div>

                  {/* Option 2: Dino / Swimsuit */}
                  <div
                    onClick={() => handleSelectOption('dino')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      selectedOption === 'dino'
                        ? 'border-brand-neon bg-brand-neon/10 text-brand-neon shadow-[0_0_15px_rgba(57,255,20,0.1)]'
                        : 'border-zinc-800 bg-zinc-950/40 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🦖</span>
                      <div className="text-left">
                        <span className="block font-sans font-bold text-sm text-white">Да, возьму купальник и очки!</span>
                        <span className="block font-mono text-[10px] text-zinc-500">И костюм динозавра прихвачу</span>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedOption === 'dino' ? 'border-brand-neon bg-brand-neon' : 'border-zinc-700'
                    }`}>
                      {selectedOption === 'dino' && <div className="w-2.5 h-2.5 rounded-full bg-black" />}
                    </div>
                  </div>

                  {/* Option 3: Sleep Home / Dodge target */}
                  <div className="relative">
                    <motion.div
                      animate={{ x: noButtonPosition.x, y: noButtonPosition.y }}
                      transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                      onMouseEnter={handleDodge}
                      onClick={() => handleSelectOption('boring')}
                      className={`p-4 rounded-2xl border cursor-pointer transition-colors flex items-center justify-between ${
                        selectedOption === 'boring'
                          ? 'border-brand-pink bg-brand-pink/10 text-brand-pink shadow-[0_0_15px_rgba(255,0,127,0.1)]'
                          : 'border-zinc-800 bg-zinc-950/40 text-zinc-500 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🛌</span>
                        <div className="text-left">
                          <span className="block font-sans font-bold text-sm text-zinc-400">Буду спать дома, я зануда</span>
                          <span className="block font-mono text-[10px] text-zinc-600">Попробую увернуться от приглашения</span>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedOption === 'boring' ? 'border-brand-pink bg-brand-pink' : 'border-zinc-800'
                      }`}>
                        {selectedOption === 'boring' && <div className="w-2.5 h-2.5 rounded-full bg-black" />}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Display error if there is any */}
              {errorMessage && (
                <div className="mb-6 flex items-center gap-2 text-brand-pink text-xs font-mono font-bold uppercase border border-brand-pink/30 bg-brand-pink/5 p-3 rounded-xl">
                  <AlertCircle size={16} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                className={`w-full py-4.5 px-6 rounded-2xl font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg ${
                  dinoMode 
                    ? 'bg-brand-neon text-black hover:shadow-[0_0_20px_rgba(57,255,20,0.4)]' 
                    : 'bg-brand-pink text-white hover:bg-brand-pink/90 hover:shadow-[0_0_20px_rgba(255,0,127,0.4)]'
                }`}
              >
                <span>ОТПРАВИТЬ ОТВЕТ</span>
                <Send size={14} />
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="rsvp-success"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1a1a1a] border-2 border-brand-neon/40 p-8 md:p-12 rounded-3xl shadow-[0_0_40px_rgba(57,255,20,0.15)] text-center relative overflow-hidden"
            >
              {/* Confetti celebration style glows */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-neon/10 rounded-bl-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-cyan/10 rounded-tr-full blur-2xl pointer-events-none" />

              <CheckCircle2 className="text-brand-neon mx-auto mb-6 stroke-[1.5]" size={64} />
              
              <h3 className="font-display font-black text-xl md:text-2xl text-white uppercase tracking-tight mb-3">
                ЮХУУУ! РЕСПЕКТ! 🎉
              </h3>
              
              <p className="text-zinc-300 font-sans text-sm md:text-base max-w-lg mx-auto leading-relaxed mb-6">
                Привет, <span className="text-white font-bold">{response.name}</span>! Твой ответ успешно сохранен в секретных списках гостей. 
                {response.choice === 'boring' ? (
                  <span> И всё же, мы очень ждем, что ты передумаешь спать дома и придешь греться в баньке! 😉</span>
                ) : (
                  <span> Мы уже закупаем вкусности и готовим бассейн! Ждём тебя 8 августа в 17:00! 🍹🏊‍♂️</span>
                )}
              </p>

              <div className="bg-zinc-950/80 border border-zinc-800 p-4 rounded-2xl flex items-center justify-center gap-3 text-brand-yellow mb-8 inline-flex max-w-sm mx-auto">
                <Flame size={18} className="animate-pulse" />
                <span className="font-mono text-xs font-bold uppercase">ТВОЙ СТАТУС: ИЗБРАННЫЙ ГОСТЬ</span>
              </div>

              <div>
                <button
                  onClick={handleReset}
                  className="font-mono text-xs text-zinc-500 hover:text-white transition-colors underline underline-offset-4"
                >
                  Изменить или обновить ответ
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
