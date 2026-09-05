import React, { useState, useEffect } from 'react';
import { Heart, Clock, Sparkles, Flame, CalendarCheck } from 'lucide-react';

export const LoveDaysCounter: React.FC = () => {
  // Tanggal jadian: 31 Januari 2026 00:00:00
  const startDate = new Date('2026-01-31T00:00:00');

  const [timeElapsed, setTimeElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diff = Math.max(0, now.getTime() - startDate.getTime());

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeElapsed({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="love-days-counter" className="w-full max-w-4xl mx-auto px-4 my-8">
      <div className="relative bg-white rounded-3xl p-6 sm:p-8 polaroid-shadow border border-[#800000]/20 paper-texture overflow-hidden">
        {/* Washi Tape Header */}
        <div className="absolute -top-3 left-12 w-28 h-6.5 washi-tape-beige rotate-2 rounded-sm" />
        <div className="absolute -top-3 right-12 w-28 h-6.5 washi-tape-pink -rotate-2 rounded-sm border-dashed border-t border-b border-[#800000]/20" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Title */}
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#FADADD] text-[#800000] text-xs font-bold uppercase tracking-widest shadow-xs mb-2">
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Together Since 31 Jan 2026</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-['Dancing_Script'] font-bold text-[#800000]">
              Waktu Indah Bersamamu
            </h3>
            <p className="text-xs uppercase tracking-widest font-bold text-[#141414]/70 font-sans mt-1">
              Dan setiap detiknya selalu membuatku semakin jatuh cinta kepadamu.
            </p>
          </div>

          {/* Right Live Counter Digits with Bold Typography */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
            {/* Hari */}
            <div className="bg-[#FAF8F3] px-3 sm:px-4 py-3 rounded-2xl border border-[#800000]/15 shadow-xs flex flex-col items-center min-w-[65px] sm:min-w-[78px]">
              <span className="text-xl sm:text-3xl font-extrabold font-serif text-[#800000]">
                {timeElapsed.days}
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-[#800000]/70 uppercase tracking-wider mt-0.5">
                Hari
              </span>
            </div>

            {/* Jam */}
            <div className="bg-[#FAF8F3] px-3 sm:px-4 py-3 rounded-2xl border border-[#800000]/15 shadow-xs flex flex-col items-center min-w-[65px] sm:min-w-[78px]">
              <span className="text-xl sm:text-3xl font-extrabold font-serif text-[#141414]">
                {String(timeElapsed.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-stone-600 uppercase tracking-wider mt-0.5">
                Jam
              </span>
            </div>

            {/* Menit */}
            <div className="bg-[#FAF8F3] px-3 sm:px-4 py-3 rounded-2xl border border-[#800000]/15 shadow-xs flex flex-col items-center min-w-[65px] sm:min-w-[78px]">
              <span className="text-xl sm:text-3xl font-extrabold font-serif text-[#141414]">
                {String(timeElapsed.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-stone-600 uppercase tracking-wider mt-0.5">
                Menit
              </span>
            </div>

            {/* Detik */}
            <div className="bg-[#800000] text-white px-3 sm:px-4 py-3 rounded-2xl shadow-md flex flex-col items-center min-w-[65px] sm:min-w-[78px]">
              <span className="text-xl sm:text-3xl font-extrabold font-serif text-white animate-pulse">
                {String(timeElapsed.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-[#FADADD] uppercase tracking-wider mt-0.5">
                Detik
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
