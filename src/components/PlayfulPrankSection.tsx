import React, { useState, useRef } from 'react';
import { Heart, Laugh, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';
import confetti from 'canvas-confetti';
import { triggerHaptic, playErrorBuzz, playCelebrationSound } from '../utils/soundAndHaptics';

export const PlayfulPrankSection: React.FC = () => {
  const [dodgeCount, setDodgeCount] = useState(0);
  const [buttonPos, setButtonPos] = useState({ top: 0, left: 0 });
  const [hasDodged, setHasDodged] = useState(false);
  const [isAnsweredYes, setIsAnsweredYes] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Daftar pesan jahil saat tombol menghindar
  const playfulPhrases = [
    'Enggak ah, mikir-mikir dulu 😜',
    'Eits gak kena! Coba lagi wkwk 😝',
    'Tombol ini alergi disentuh sayang! 🏃💨',
    'Dilarang pilih ini pokoknya! 🙅‍♂️',
    'Aduh lincah banget kan tombolnya? 😂',
    'Error 404: Pilihan "Enggak" tidak tersedia! 💕',
    'Pencet yang merah aja yuk, jangan bandel! 🥰',
  ];

  // Fungsi memindahkan tombol ke koordinat acak di dalam kotak
  const dodgeButton = (e?: React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    triggerHaptic('medium');
    playErrorBuzz();

    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const btnWidth = 160;
    const btnHeight = 48;

    // Pastikan tombol tetap berada di dalam area container yang aman
    const maxLeft = Math.max(10, containerRect.width - btnWidth - 20);
    const maxTop = Math.max(10, containerRect.height - btnHeight - 20);

    const randomLeft = Math.floor(Math.random() * maxLeft);
    const randomTop = Math.floor(Math.random() * maxTop);

    setButtonPos({ left: randomLeft, top: randomTop });
    setHasDodged(true);
    setDodgeCount((prev) => prev + 1);
  };

  const handleYesClick = () => {
    setIsAnsweredYes(true);
    triggerHaptic('success');
    playCelebrationSound();

    try {
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#FDA4AF', '#F43F5E', '#BE123C', '#FBBF24', '#FB7185'],
      });
    } catch {
      // fallback
    }
  };

  const currentNoText = playfulPhrases[Math.min(dodgeCount, playfulPhrases.length - 1)];

  return (
    <section id="prank-section" className="py-16 sm:py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FADADD] text-[#800000] text-xs font-bold tracking-widest uppercase mb-3 border border-[#800000]/20 shadow-xs">
          <Laugh className="w-3.5 h-3.5 text-[#800000]" />
          <span>Section Wajib di Jawab</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-['Dancing_Script'] font-bold text-[#800000] tracking-tight">
          Pertanyaan Kejujuran
        </h2>
        <p className="mt-3 text-xs sm:text-sm uppercase tracking-widest font-bold text-[#141414]/70 font-sans">
          Jawab dengan jujur yaa, jangan ada yang disembunyikan! 😜
        </p>
      </div>

      {/* Main Interactive Prank Card */}
      <div
        id="prank-interactive-card"
        className="relative bg-white p-6 sm:p-10 rounded-3xl polaroid-shadow border border-[#800000]/20 text-center overflow-hidden"
      >
        {/* Washi Tape Header */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-32 h-7 washi-tape-pink rotate-1 rounded-sm border-dashed border-t border-b border-[#800000]/20" />

        {!isAnsweredYes ? (
          <div>
            <div className="inline-block p-3 rounded-2xl bg-[#FADADD] text-[#800000] mb-4 shadow-xs">
              <Heart className="w-8 h-8 fill-[#800000] animate-soft-pulse" />
            </div>

            {/* Pertanyaan yang diajukan */}
            <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-extrabold text-[#141414] max-w-xl mx-auto leading-snug">
              "Jujur dari lubuk hati terdalam, kamu sayang banget kan sama aku sm mau terus barengan selamanya 😘"
            </h3>
            <p className="text-xs uppercase tracking-widest font-bold text-stone-500 font-sans mt-2">
              (Pilih salah satu jawaban di bawah ini dengan sungguh-sungguh)
            </p>

            {dodgeCount > 0 && (
              <div className="mt-3 inline-block px-3.5 py-1 bg-[#FADADD]/60 border border-[#800000]/20 text-[#800000] text-xs rounded-full font-bold uppercase tracking-wider animate-fadeIn">
                💨 Tombol "Enggak" sudah menghindar sebanyak {dodgeCount} kali!
              </div>
            )}

            {/* Area Tombol dengan Deteksi Evasion (Kabur) */}
            <div
              ref={containerRef}
              className="relative min-h-[190px] sm:min-h-[170px] mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 p-4 border border-dashed border-[#800000]/20 rounded-2xl bg-[#FAF8F3]"
            >
              {/* Tombol IYA (Jawaban yang Dituju) */}
              <button
                id="btn-prank-yes"
                type="button"
                onClick={handleYesClick}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#800000] hover:bg-[#660000] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-[#800000]/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer z-10"
              >
                <Heart className="w-5 h-5 fill-white animate-bounce" />
                <span>IYA BANGET, SAYANG BANGET! 🥰</span>
              </button>

              {/* Tombol ENGGAK (Tombol Jahil yang Selalu Menghindar saat Didekati / Disentuh di HP) */}
              <button
                id="btn-prank-no"
                type="button"
                onMouseEnter={dodgeButton}
                onTouchStart={dodgeButton}
                onClick={dodgeButton}
                style={
                  hasDodged
                    ? {
                        position: 'absolute',
                        left: `${buttonPos.left}px`,
                        top: `${buttonPos.top}px`,
                        transition: 'all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      }
                    : {}
                }
                className="px-5 py-3 rounded-2xl bg-stone-200 hover:bg-stone-300 text-stone-700 font-semibold text-xs sm:text-sm border border-stone-300 shadow-sm cursor-pointer select-none transition-all flex items-center justify-center gap-1.5"
              >
                <span>{currentNoText}</span>
              </button>
            </div>
          </div>
        ) : (
          /* =========================================================================
             HASIL SETELAH SHAREEN MEMILIH JAWABAN IYA
             ========================================================================= */
          <div className="py-6 animate-scaleUp">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 shadow-md">
              <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
            </div>

            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
              Jawaban Berhasil Diverifikasi! ❤️
            </span>

            <h3 className="text-2xl sm:text-4xl font-serif font-extrabold text-[#141414] mt-3">
              Yeeey! Aku tauu Pasti Kamu Sayangggg ! 🥰
            </h3>

            <p className="font-['Dancing_Script'] text-2xl sm:text-3xl text-[#800000] mt-3 font-bold max-w-xl mx-auto leading-relaxed">
              "Gak ada pilihan lain selain saling menyayangi selamanya yaa sayang. Aku janji bakal selalu jagain dan bikin km bahagia terussss! ❤️✨"
            </p>

            <button
              type="button"
              onClick={() => {
                setIsAnsweredYes(false);
                setHasDodged(false);
                setDodgeCount(0);
              }}
              className="mt-6 px-5 py-2 text-xs uppercase tracking-wider font-bold text-stone-500 hover:text-[#800000] underline transition-colors cursor-pointer"
            >
              Ulangi Pertanyaan
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
