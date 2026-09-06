import React, { useState } from 'react';
import { Heart, Lock, Unlock, Sparkles, HelpCircle, Key } from 'lucide-react';
import { triggerHaptic, playUnlockChime, playErrorBuzz } from '../utils/soundAndHaptics';
import { triggerBirthdayCelebrationConfetti } from '../utils/confettiCelebration';

interface GateLockScreenProps {
  onUnlock: () => void;
}

export const GateLockScreen: React.FC<GateLockScreenProps> = ({ onUnlock }) => {
  const [inputAnswer, setInputAnswer] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // =========================================================================
  // GANTI JAWABAN PASSWORD DI SINI (Kelvin bisa ubah bila diinginkan)
  // Format jawaban yang diterima fleksibel (DD-MM-YYYY, tanggal teks, dll)
  // =========================================================================
  const checkAnswer = (raw: string): boolean => {
    const clean = raw.trim().toLowerCase().replace(/[\s\-_/.]+/g, '');
    
    // Daftar variasi jawaban yang dianggap benar:
    const validAnswers = [
      '31012026',           // 31-01-2026 atau 31/01/2026
      '3112026',            // 31-1-2026
      '31january2026',      // 31 january 2026
      '31januari2026',      // 31 januari 2026
      '31jan2026',          // 31 jan 2026
      '31january',          // 31 january
      '31januari',          // 31 januari
    ];

    return validAnswers.includes(clean);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputAnswer.trim()) return;

    if (checkAnswer(inputAnswer)) {
      // JAWABAN BENAR
      setErrorMsg('');
      setIsUnlocking(true);
      triggerHaptic('success');
      playUnlockChime();

      // Ledakan animasi pesta confetti meriah untuk ulang tahun Shareen ke-24
      triggerBirthdayCelebrationConfetti();

      // Berikan jeda animasi gembok terbuka sebelum membuka web
      setTimeout(() => {
        onUnlock();
      }, 1600);
    } else {
      // JAWABAN SALAH
      triggerHaptic('error');
      playErrorBuzz();
      setIsShaking(true);
      setErrorMsg('Eits sayang, masa lupa tanggal spesial kita? 🥺 Coba ingat lagi yuk ❤️');
      setTimeout(() => setIsShaking(false), 600);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#FDFBF7]/95 backdrop-blur-md transition-opacity duration-1000">
      {/* Background Decorative Rings from Design Theme */}
      <div className="absolute top-12 left-10 w-48 h-48 border-4 border-[#FADADD]/50 rounded-full mix-blend-multiply animate-pulse pointer-events-none" />
      <div className="absolute bottom-12 right-10 w-40 h-40 border-2 border-[#800000]/15 rounded-full pointer-events-none" />

      {/* Main Lock Card with bold top border */}
      <div
        id="lock-screen-card"
        className={`relative w-full max-w-md bg-white rounded-3xl p-7 sm:p-9 polaroid-shadow border border-stone-200/80 border-t-8 border-[#800000] text-center transition-all duration-700 ${
          isShaking ? 'animate-[shake_0.5s_ease-in-out]' : ''
        } ${isUnlocking ? 'scale-105 opacity-90' : 'scale-100'}`}
      >
        {/* Aesthetic Washi Tape on top */}
        <div className="absolute -top-4.5 left-1/2 -translate-x-1/2 w-28 h-7 washi-tape-pink rotate-1 rounded-sm border-dashed border-t border-b border-[#800000]/20" />

        {/* Gembok Visual & Animasi */}
        <div className="flex justify-center mb-6 mt-2">
          <div className="relative">
            {/* Shackle & Padlock Body with ring accent */}
            <div
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center transition-all duration-700 ring-4 ring-[#FADADD] ${
                isUnlocking
                  ? 'bg-emerald-600 text-white shadow-lg rotate-6 scale-110'
                  : 'bg-[#800000] text-white shadow-xl shadow-[#800000]/25'
              }`}
            >
              {isUnlocking ? (
                <Unlock className="w-10 h-10 sm:w-12 sm:h-12 animate-bounce stroke-[2.2]" />
              ) : (
                <Lock className="w-10 h-10 sm:w-12 sm:h-12 stroke-[2.2]" />
              )}
            </div>

            {/* Sparkle badge */}
            <div className="absolute -bottom-2 -right-2 bg-[#FADADD] text-[#800000] p-1.5 rounded-full shadow-xs border border-[#800000]/20">
              <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
          </div>
        </div>

        {/* Greeting & Prompt */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#FADADD] text-[#800000] text-xs font-bold uppercase tracking-widest shadow-xs mb-3">
            <Heart className="w-3.5 h-3.5 fill-[#800000]" />
            LOCKED: ACCESS REQUIRED
          </span>
          <h1 className="text-3xl sm:text-4xl font-['Dancing_Script'] text-[#800000] font-bold tracking-tight">
            Terkunci
          </h1>
          <p className="mt-2 text-xs sm:text-sm uppercase tracking-widest text-[#141414]/70 font-sans font-medium leading-relaxed">
            Masukkan kunci rahasia untuk membuka seluruh scrapbook ini:
          </p>
        </div>

        {/* Question & Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-left">
            <label
              htmlFor="date-password-input"
              className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-[#800000] mb-1.5 flex items-center gap-1.5"
            >
              <Key className="w-3.5 h-3.5 text-[#800000]" />
              {/* Ganti teks pertanyaan jika perlu */}
              Kapan tanggal jadian kita? (DD-MM-YYYY)
            </label>
            <div className="relative">
              <input
                id="date-password-input"
                type="text"
                value={inputAnswer}
                onChange={(e) => {
                  setInputAnswer(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                disabled={isUnlocking}
                placeholder="Contoh: 14-02-2025 atau 14 Februari 2025"
                className="w-full px-5 py-3 sm:py-3.5 rounded-full border-2 border-[#800000]/25 focus:border-[#800000] focus:ring-4 focus:ring-[#FADADD]/60 outline-none text-[#141414] bg-white font-medium text-sm sm:text-base transition-all placeholder:text-stone-400 placeholder:text-xs sm:placeholder:text-sm shadow-inner"
                autoComplete="off"
                autoFocus
              />
            </div>
          </div>

          {/* Pesan Error / Feedback */}
          {errorMsg && (
            <div className="p-3 bg-[#FADADD]/70 border border-[#800000]/30 rounded-xl text-xs sm:text-sm text-[#800000] font-bold animate-fadeIn">
              {errorMsg}
            </div>
          )}

          {/* Tombol Submit */}
          <button
            id="btn-unlock-scrapbook"
            type="submit"
            disabled={isUnlocking || !inputAnswer.trim()}
            className="w-full py-3.5 px-6 rounded-full bg-[#800000] hover:bg-[#660000] active:scale-95 text-white font-bold text-sm sm:text-base shadow-lg shadow-[#800000]/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
          >
            {isUnlocking ? (
              <>
                <Sparkles className="w-5 h-5 animate-spin text-amber-300" />
                <span>🎉 Happy 24th Birthday Shareen! ✨</span>
              </>
            ) : (
              <>
                <Heart className="w-4 h-4 fill-white" />
                Buka Disini
              </>
            )}
          </button>
        </form>

        {/* Hint Tooltip / Clue */}
        <div className="mt-5 pt-4 border-t border-[#800000]/15 flex flex-col items-center">
          <button
            type="button"
            onClick={() => {
              setShowHint(!showHint);
              triggerHaptic('light');
            }}
            className="text-xs font-bold uppercase tracking-wider text-[#800000]/70 hover:text-[#800000] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            {showHint ? 'Sembunyikan Petunjuk' : 'Lupa atau butuh petunjuk? Klik di sini'}
          </button>

          {showHint && (
            <div className="mt-2 text-xs bg-[#FADADD]/50 text-[#800000] border border-[#800000]/20 px-3.5 py-2.5 rounded-xl leading-relaxed animate-fadeIn font-medium text-center">
              💡 <em>Petunjuk:</em> Tanggal angka ganjil dan bulan pertama di awal tahun 2026 (Format: <strong>DD-MM-YYYY</strong> atau <strong>DD NamaBulan YYYY</strong>)
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
