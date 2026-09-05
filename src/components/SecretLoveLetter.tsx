import React, { useState, useEffect, useRef } from 'react';
import { Mail, Heart, Sparkles, Volume2, FastForward, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { triggerHaptic, playPaperPop, playTypewriterKey } from '../utils/soundAndHaptics';

export const SecretLoveLetter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimerRef = useRef<number | null>(null);

  // =========================================================================
  // ISI SURAT CINTA (Kelvin dapat mengganti isi pesan di sini)
  // =========================================================================
  const fullLetter = `Untuk Shareen, cintaku yang paling berharga...

Sejak hari pertama kita melangkah bersama pada 31 Januari 2026, duniaku dipenuhi rasa syukur yang tak pernah habis. Setiap senyummu adalah penghangat di hari-hariku yang lelah, dan setiap canda tawamu adalah alasan hatiku selalu merasa bahagia.

Di hari ulang tahunmu yang spesial ini, pada 9 September 2026, aku ingin mengingatkanmu betapa istimewanya dirimu bagiku. Terima kasih sudah menjadi sosok yang selalu sabar, penuh perhatian, dan mencintaiku apa adanya.

Aku berjanji akan terus berusaha membuatmu tersenyum, menjadi tempatmu bersandar saat lelah, dan menggenggam tanganmu melewati hari-hari ke depan.

Semoga di usiamu yang baru ini, setiap impianmu dipermudah, kesehatan dan kebahagiaan selalu memelukmu, dan semoga cinta kita terus bertumbuh semakin indah.

Selamat ulang tahun, kesayanganku Shareen! Aku sayang banget sama kamu, hari ini, esok, dan selamanya. ❤️✨

Dengan segenap cintaku,
Kelvin`;

  // Handle open envelope
  const handleOpenEnvelope = () => {
    if (isOpen) return;

    triggerHaptic('medium');
    playPaperPop();
    setIsOpen(true);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#FDA4AF', '#BE123C', '#F43F5E'],
      });
    } catch {
      // fallback
    }

    // Start typewriter effect after envelope animation completes
    setTimeout(() => {
      startTyping();
    }, 700);
  };

  const startTyping = () => {
    setIsTyping(true);
    let index = 0;
    setDisplayedText('');

    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
    }

    typingTimerRef.current = window.setInterval(() => {
      if (index < fullLetter.length) {
        setDisplayedText(fullLetter.slice(0, index + 1));
        if (index % 5 === 0) {
          playTypewriterKey();
        }
        index++;
      } else {
        if (typingTimerRef.current) {
          clearInterval(typingTimerRef.current);
          typingTimerRef.current = null;
        }
        setIsTyping(false);
      }
    }, 28);
  };

  const handleSkipTyping = () => {
    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
      typingTimerRef.current = null;
    }
    setDisplayedText(fullLetter);
    setIsTyping(false);
    triggerHaptic('light');
  };

  const handleCloseEnvelope = () => {
    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
      typingTimerRef.current = null;
    }
    setIsOpen(false);
    setDisplayedText('');
    setIsTyping(false);
    triggerHaptic('light');
  };

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) {
        clearInterval(typingTimerRef.current);
      }
    };
  }, []);

  return (
    <section id="secret-love-letter-section" className="py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FADADD] text-[#800000] text-xs font-bold uppercase tracking-widest shadow-xs mb-3">
          <Mail className="w-3.5 h-3.5" />
          <span>Special Secret Message</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-['Dancing_Script'] font-bold text-[#800000] tracking-tight">
          Surat Cinta Rahasia
        </h2>
        <p className="mt-3 text-xs sm:text-sm uppercase tracking-widest font-bold text-[#141414]/70 font-sans">
          Sebuah pesan yang kutulis dengan penuh ketulusan dari lubuk hatiku yang terdalam.
        </p>
      </div>

      {/* Interactive Envelope Container */}
      <div className="flex flex-col items-center justify-center">
        {!isOpen ? (
          /* =========================================================================
             1. KONDISI AMPLOP TERTUTUP (SEALED ENVELOPE WITH WAX STAMP)
             ========================================================================= */
          <div
            id="sealed-envelope-box"
            onClick={handleOpenEnvelope}
            className="relative w-full max-w-md aspect-[16/11] bg-[#FAF8F3] rounded-3xl polaroid-shadow border-2 border-[#800000]/20 cursor-pointer group transition-all duration-300 hover:scale-105 p-6 flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Washi Tape Header */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 washi-tape-maroon rotate-1 rounded-sm z-20" />

            {/* Envelope Flap Lines */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Top triangle flap */}
              <div
                className="w-0 h-0 border-x-[180px] sm:border-x-[224px] border-x-transparent border-t-[115px] sm:border-t-[140px] border-t-[#EBE3D5] drop-shadow-xs transition-transform duration-500 group-hover:-translate-y-1"
                style={{ margin: '0 auto' }}
              />
              {/* Bottom fold */}
              <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-[#F4EDE4]/60 border-t border-[#800000]/10" />
            </div>

            {/* Vintage Wax Seal Stamp */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#800000] flex items-center justify-center text-white shadow-xl ring-4 ring-[#FADADD] group-hover:scale-110 transition-transform">
                <Heart className="w-8 h-8 sm:w-9 sm:h-9 fill-white text-white animate-pulse" />
              </div>

              {/* Call to Action Button */}
              <button
                type="button"
                className="mt-5 px-6 py-2.5 rounded-full bg-[#800000] hover:bg-[#660000] text-white text-xs font-bold uppercase tracking-wider shadow-md flex items-center gap-2 group-hover:shadow-lg transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Buka Surat Cinta</span>
              </button>
              <p className="text-[11px] text-[#800000]/70 mt-2 font-bold uppercase tracking-wider">
                (Sentuh atau klik amplop untuk membuka segel)
              </p>
            </div>
          </div>
        ) : (
          /* =========================================================================
             2. KONDISI AMPLOP TERBUKA & KERTAS SURAT DENGAN ANIMASI KETIKAN
             ========================================================================= */
          <div
            id="opened-letter-sheet"
            className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-10 polaroid-shadow border border-[#800000]/20 notebook-lines relative animate-scaleUp transition-all"
          >
            {/* Washi Tape on top */}
            <div className="absolute -top-3.5 left-10 w-24 h-7 washi-tape-pink -rotate-2 rounded-sm z-20 border-dashed border-t border-b border-[#800000]/20" />
            <div className="absolute -top-3.5 right-10 w-24 h-7 washi-tape-beige rotate-3 rounded-sm z-20" />

            {/* Letter Top Controls */}
            <div className="flex items-center justify-between border-b border-[#800000]/20 pb-3 mb-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#800000]">
                <Heart className="w-4 h-4 fill-[#800000]" />
                <span className="font-sans">Surat Cinta Untuk Shareen</span>
              </div>

              <div className="flex items-center gap-2">
                {isTyping && (
                  <button
                    type="button"
                    onClick={handleSkipTyping}
                    className="px-3 py-1 rounded-lg bg-[#FADADD] hover:bg-[#FADADD]/80 text-[#800000] text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <FastForward className="w-3.5 h-3.5" />
                    <span>Lewati Animasi</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleCloseEnvelope}
                  className="px-3 py-1 rounded-lg bg-stone-100 hover:bg-[#FADADD] text-stone-700 hover:text-[#800000] text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Tutup Amplop</span>
                </button>
              </div>
            </div>

            {/* Isi Teks Surat dengan Font Tulisan Tangan 'Dancing_Script' */}
            <div className="min-h-[280px]">
              <p className="font-['Dancing_Script'] text-2xl sm:text-3xl text-[#141414] font-bold leading-[1.65] whitespace-pre-line tracking-wide">
                {displayedText}
                {isTyping && (
                  <span className="inline-block w-1.5 h-6 bg-[#800000] ml-1 animate-pulse align-middle" />
                )}
              </p>
            </div>

            {/* Vintage Postmark Stamp at Bottom */}
            <div className="mt-8 pt-4 border-t border-[#800000]/20 flex items-center justify-between">
              <div className="flex items-center gap-2 text-stone-600 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#800000]" />
                <span>Ditulis dari hati untuk Shareen • 2026</span>
              </div>

              <div className="w-12 h-12 rounded-full border-2 border-dashed border-[#800000]/50 flex items-center justify-center text-[10px] text-[#800000] font-bold rotate-12 uppercase tracking-tighter">
                Forever
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
