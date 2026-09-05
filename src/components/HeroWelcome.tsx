import React, { useState } from 'react';
import { Heart, Sparkles, Cake, Calendar as CalendarIcon, Volume2, VolumeX, Music, Utensils } from 'lucide-react';
import confetti from 'canvas-confetti';
import { triggerHaptic, playUnlockChime, romanticMusicBox } from '../utils/soundAndHaptics';

interface HeroWelcomeProps {
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
}

export const HeroWelcome: React.FC<HeroWelcomeProps> = ({ isMusicPlaying, onToggleMusic }) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(9);
  const [dateCelebrated, setDateCelebrated] = useState(false);

  // September 2026: Day 1 starts on Tuesday (2 offset if Sunday=0)
  // Total days in September: 30
  const daysInMonth = 30;
  const startDayOffset = 2; // Sunday=0, Monday=1, Tuesday=2
  const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

  const handleDateClick = (day: number) => {
    setSelectedDay(day);
    triggerHaptic('light');

    if (day === 9) {
      setDateCelebrated(true);
      triggerHaptic('success');
      playUnlockChime();
      try {
        confetti({
          particleCount: 60,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#FDA4AF', '#F43F5E', '#BE123C', '#F59E0B'],
        });
      } catch {
        // Confetti fallback
      }
    } else if (day === 13) {
      triggerHaptic('success');
      playUnlockChime();
      try {
        confetti({
          particleCount: 60,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#800000', '#FADADD', '#D4AF37', '#FFD700'],
        });
      } catch {
        // Confetti fallback
      }
    }
  };

  return (
    <section id="hero-welcome-section" className="relative pt-12 pb-16 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Decorative Floating Scrapbook Elements */}
      <div className="absolute -top-6 right-8 w-20 h-20 bg-rose-200/30 rounded-full blur-2xl pointer-events-none" />

      {/* Main Greeting Banner with Bold Typography */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 border-b border-[#800000]/20 pb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FADADD] text-[#800000] text-xs font-bold uppercase tracking-widest shadow-xs mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#800000] animate-spin" style={{ animationDuration: '8s' }} />
          <span>A Digital Scrapbook of Our Infinite Love</span>
          <Heart className="w-3.5 h-3.5 fill-[#800000]" />
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-['Dancing_Script'] text-[#800000] font-bold tracking-tight leading-tight">
          For My Dearest Shareen
        </h1>

        <p className="mt-3 text-xs sm:text-sm uppercase tracking-widest font-bold text-[#141414]/70 max-w-2xl mx-auto leading-relaxed">
          Web kecil ini aku buat special buat rayain Ultah kamu & flashback story kita berdua sampai ke hubungan yang sekarang. Enjoy !👌😘
        </p>

        {/* Music Control Bar */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            id="btn-hero-toggle-music"
            type="button"
            onClick={onToggleMusic}
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer active:scale-95 ${
              isMusicPlaying
                ? 'bg-[#800000] text-white shadow-[#800000]/25 hover:bg-[#660000]'
                : 'bg-white text-[#800000] border-2 border-[#800000]/30 hover:bg-[#FADADD]/40'
            }`}
          >
            {isMusicPlaying ? (
              <>
                <Volume2 className="w-4 h-4 animate-pulse" />
                <span>Play Music backsound disini 🎵</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4" />
                <span>Play Music backsound disini 🎶</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Grid Content: Polaroid Utama & Kalender September 2026 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* =========================================================================
            1. FOTO UTAMA BERBENTUK POLAROID
            <!-- Ganti link gambar utama di sini -->
           ========================================================================= */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative group max-w-sm w-full">
            {/* Washi Tape Accent at Top Left */}
            <div className="absolute -top-3 left-6 w-24 h-7 washi-tape-pink -rotate-6 z-20 rounded-sm border-dashed border-t border-b border-[#800000]/20" />
            {/* Washi Tape Accent at Top Right */}
            <div className="absolute -top-2 right-6 w-20 h-6 washi-tape-beige rotate-12 z-20 rounded-sm" />

            {/* Polaroid Body Frame */}
            <div className="bg-white p-4 sm:p-5 pt-6 pb-6 rounded-2xl polaroid-shadow border border-stone-200/90 transition-transform duration-500 hover:rotate-0 hover:scale-[1.02] transform -rotate-2">
              
              {/* Photo Area */}
              <div className="relative aspect-[4/4.8] overflow-hidden rounded-xl bg-stone-100 shadow-inner border border-stone-200">
                {/* <!-- Ganti link gambar utama di sini (Kelvin bisa ganti url foto kalian berdua) --> */}
                <img
                  src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80"
                  alt="Kelvin & Shareen Sweet Memory"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Subtle light overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

                {/* Polaroid Badge Tag */}
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#800000] flex items-center gap-1 shadow-sm border border-[#800000]/10">
                  <Heart className="w-3 h-3 fill-[#800000]" />
                  <span>My Favorite Person</span>
                </div>
              </div>

              {/* Handwritten Polaroid Caption */}
              <div className="mt-4 text-center">
                {/* <!-- Ganti caption foto utama di sini --> */}
                <p className="font-['Dancing_Script'] text-2xl sm:text-3xl text-[#800000] font-bold tracking-wide">
                  "Love of my life"
                </p>
                <p className="text-xs text-[#800000]/60 font-sans mt-0.5 tracking-widest uppercase font-bold">
                  Kelvin & Shareen • Forever & Always
                </p>
              </div>
            </div>

            {/* Cute Pin/Sticker Decoration */}
            <div className="absolute -bottom-3 -right-3 z-20 bg-[#FADADD] border border-[#800000]/20 text-[#800000] text-xs font-bold px-3.5 py-1.5 rounded-full shadow-md rotate-6 flex items-center gap-1 uppercase tracking-wider">
              <span>✨ My Little Princess🤫</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            2. TAMPILAN KALENDER BULAN SEPTEMBER 2026
            Tanggal 9 dilingkari hati (Ulang tahun Shareen!)
            Animasi melayang / gerak-gerak pada setiap angka kalender
           ========================================================================= */}
        <div className="lg:col-span-7">
          <div className="relative bg-white/85 backdrop-blur-sm p-6 sm:p-8 rounded-3xl polaroid-shadow border border-[#800000]/20 paper-texture">
            {/* Scrapbook Tape Header */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-36 h-7 washi-tape-maroon rotate-1 rounded-sm text-center flex items-center justify-center">
              <span className="text-[11px] text-white font-bold tracking-widest uppercase">
                Special Month
              </span>
            </div>

            {/* Header Kalender */}
            <div className="flex items-center justify-between border-b border-[#800000]/20 pb-4 mb-5 mt-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FADADD] text-[#800000] flex items-center justify-center shadow-xs">
                  <CalendarIcon className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-['Dancing_Script'] font-bold text-[#800000]">
                    September 2026
                  </h2>
                  <p className="text-xs uppercase tracking-widest font-bold text-[#800000]/60 font-sans">
                    Special Edition • Bulan Kelahiran Shareen
                  </p>
                </div>
              </div>

              {/* Event Pills */}
              <div className="flex items-center gap-2 flex-wrap justify-end">
                <div 
                  onClick={() => handleDateClick(9)}
                  className="px-3 py-1.5 bg-[#FADADD] hover:bg-[#FADADD]/80 text-[#800000] rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 border border-[#800000]/20 shadow-xs cursor-pointer transition-transform hover:scale-105"
                >
                  <Cake className="w-3.5 h-3.5 text-[#800000]" />
                  <span>9 Sep: Ultah 🎂</span>
                </div>
                <div 
                  onClick={() => handleDateClick(13)}
                  className="px-3 py-1.5 bg-[#800000] hover:bg-[#660000] text-white rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-xs cursor-pointer transition-transform hover:scale-105"
                >
                  <Utensils className="w-3.5 h-3.5 text-[#FADADD]" />
                  <span>13 Sep: JW Marriott 🍷</span>
                </div>
              </div>
            </div>

            {/* Nama Hari (Grid 7 Kolom) */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2 text-center mb-2">
              {dayNames.map((day, idx) => (
                <div
                  key={day}
                  className={`text-xs font-bold py-1.5 uppercase tracking-wider ${
                    idx === 0 ? 'text-[#800000]' : 'text-stone-500'
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Grid Angka Tanggal dengan Animasi Melayang (Floating Wobble) */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2 text-center">
              {/* Offset kosong untuk hari sebelum 1 September 2026 (Selasa) */}
              {Array.from({ length: startDayOffset }).map((_, i) => (
                <div key={`empty-${i}`} className="p-2 sm:p-3" />
              ))}

              {/* Tanggal 1 sampai 30 */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const dayNum = i + 1;
                const isShareenBirthday = dayNum === 9;
                const isDinnerDate = dayNum === 13;
                const isSelected = selectedDay === dayNum;

                // Hitung animasi melayang unik untuk setiap angka kalender
                const floatDelay = ((dayNum * 0.15) % 2).toFixed(2);
                const floatDuration = (2.4 + (dayNum % 4) * 0.4).toFixed(2);

                return (
                  <div
                    key={`day-${dayNum}`}
                    onClick={() => handleDateClick(dayNum)}
                    className="relative flex items-center justify-center cursor-pointer group select-none"
                  >
                    {/* Lingkaran angka dengan floating animation */}
                    <div
                      style={{
                        animationName: 'calFloat',
                        animationDuration: `${floatDuration}s`,
                        animationTimingFunction: 'ease-in-out',
                        animationDelay: `${floatDelay}s`,
                        animationIterationCount: 'infinite',
                        animationDirection: 'alternate',
                      }}
                      className={`w-9 h-9 sm:w-11 sm:h-11 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 relative font-bold ${
                        isShareenBirthday
                          ? 'bg-[#800000] text-white shadow-lg shadow-[#800000]/30 scale-110 ring-4 ring-[#FADADD] z-10'
                          : isDinnerDate
                          ? 'bg-[#800000] text-white shadow-md shadow-[#800000]/30 scale-105 ring-3 ring-[#FADADD] z-10'
                          : isSelected
                          ? 'bg-[#FADADD] text-[#800000] font-bold'
                          : 'bg-white hover:bg-[#FADADD]/40 text-stone-800 hover:text-[#800000] border border-stone-200/80 shadow-2xs'
                      }`}
                    >
                      {/* Tanggal 9: Ditandai hati | Tanggal 13: Dinner JW Marriott */}
                      {isShareenBirthday ? (
                        <>
                          <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-white drop-shadow-xs animate-bounce" />
                          <span className="text-[11px] sm:text-xs font-extrabold leading-none">
                            9
                          </span>
                        </>
                      ) : isDinnerDate ? (
                        <>
                          <Utensils className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FADADD] drop-shadow-xs animate-pulse" />
                          <span className="text-[11px] sm:text-xs font-extrabold leading-none text-white">
                            13
                          </span>
                        </>
                      ) : (
                        <span className="text-xs sm:text-sm">
                          {dayNum}
                        </span>
                      )}

                      {/* Sparkle badge khusus pada tanggal 9 & 13 */}
                      {isShareenBirthday && (
                        <span className="absolute -top-2 -right-2 text-[10px] animate-pulse">
                          ✨
                        </span>
                      )}
                      {isDinnerDate && (
                        <span className="absolute -top-2 -right-2 text-[10px] animate-pulse" title="Our Dinner at JW Marriott">
                          🍷
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Note Detail Bawah Kalender */}
            <div className="mt-6 pt-4 border-t border-[#800000]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-stone-700">
                <span className="w-2.5 h-2.5 rounded-full bg-[#800000] animate-ping" />
                <p className="font-medium text-stone-700">
                  {selectedDay === 9 ? (
                    <span className="text-[#800000] font-bold flex items-center gap-1">
                      🎂 9 September 2026: Hari Ulang Tahun Princess Shareen !
                    </span>
                  ) : selectedDay === 13 ? (
                    <span className="text-[#800000] font-bold flex items-center gap-1">
                      🍷 13 September 2026: Our Dinner at JW Marriott ✨
                    </span>
                  ) : (
                    <span>
                      Jadwal Spesial: <strong>9 Sep</strong> (Ultah Princess) & <strong>13 Sep</strong> (Our Dinner at JW Marriott) ✨
                    </span>
                  )}
                </p>
              </div>

              {selectedDay === 9 && (
                <button
                  type="button"
                  onClick={() => {
                    triggerHaptic('success');
                    playUnlockChime();
                    confetti({
                      particleCount: 80,
                      spread: 90,
                      origin: { y: 0.6 },
                    });
                  }}
                  className="px-4 py-1.5 rounded-full bg-[#800000] hover:bg-[#660000] text-white font-bold text-xs transition-all cursor-pointer shadow-xs active:scale-95 uppercase tracking-wider"
                >
                  Rayakan Lagi! 🎉
                </button>
              )}

              {selectedDay === 13 && (
                <button
                  type="button"
                  onClick={() => {
                    triggerHaptic('success');
                    playUnlockChime();
                    confetti({
                      particleCount: 80,
                      spread: 90,
                      origin: { y: 0.6 },
                      colors: ['#800000', '#FADADD', '#D4AF37', '#FFD700'],
                    });
                  }}
                  className="px-4 py-1.5 rounded-full bg-[#800000] hover:bg-[#660000] text-white font-bold text-xs transition-all cursor-pointer shadow-xs active:scale-95 uppercase tracking-wider flex items-center gap-1"
                >
                  <Utensils className="w-3.5 h-3.5" />
                  Dinner Date! 🍷
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Keyframe khusus animasi melayang angka kalender */}
      <style>{`
        @keyframes calFloat {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-3px) rotate(1.5deg);
          }
          100% {
            transform: translateY(2px) rotate(-1.5deg);
          }
        }
      `}</style>
    </section>
  );
};
