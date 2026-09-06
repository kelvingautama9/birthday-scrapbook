import React, { useState } from 'react';
import { Ticket, Sparkles, Check, Coffee, Heart, Film } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LoveCoupon } from '../types';
import { triggerHaptic, playUnlockChime } from '../utils/soundAndHaptics';

export const LoveCouponsSection: React.FC = () => {
  // =========================================================================
  // VOUCHER SPESIAL UNTUK SHAREEN (UNLIMITED)
  // =========================================================================
  const initialCoupons: LoveCoupon[] = [
    {
      id: 'coupon-1',
      title: 'Voucher UNLIMITED Hug',
      subtitle: 'Bebas pakai kapanpun dan dimanapun kalo kamu lagi capek, kangen, atau lain lain 🤭',
      iconName: 'Heart',
      terms: '',
      code: 'HUG-24H',
      isRedeemed: false,
    },
    {
      id: 'coupon-2',
      title: 'Voucher Matcha Date',
      subtitle: 'Demi asupan infusan yang tercukupi. Jadi ini wajib ada',
      iconName: 'Coffee',
      terms: '',
      code: 'MATCHA-DATE',
      isRedeemed: false,
    },
    {
      id: 'coupon-3',
      title: 'Voucher UNLIMITED Kiss',
      subtitle: 'Bebas pakai kapan aja dan dimana aja WKWK 🤫😙 Tak terbatasss',
      iconName: 'Heart',
      terms: '',
      code: 'KISS-24H',
      isRedeemed: false,
    },
    {
      id: 'coupon-4',
      title: 'Voucher Movie Date',
      subtitle: 'Bebas nonton Film Bioskop yang kamu suka, aku pasti tetep ikut suka.',
      iconName: 'Film',
      terms: '',
      code: 'MOVIE-DATE',
      isRedeemed: false,
    },
  ];

  const [coupons, setCoupons] = useState<LoveCoupon[]>(() => {
    // Load persisted redemption from local storage if available
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('romantic_scrapbook_coupons_v2');
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return initialCoupons;
  });

  const handleRedeem = (id: string, title: string) => {
    triggerHaptic('success');
    playUnlockChime();

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#FDA4AF', '#BE123C', '#F59E0B'],
      });
    } catch {
      // fallback
    }

    setCoupons((prev) => {
      const updated = prev.map((c) => (c.id === id ? { ...c, isRedeemed: true } : c));
      try {
        localStorage.setItem('romantic_scrapbook_coupons_v2', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'Coffee':
        return <Coffee className="w-5 h-5 text-[#800000]" />;
      case 'Film':
        return <Film className="w-5 h-5 text-[#800000]" />;
      default:
        return <Heart className="w-5 h-5 text-[#800000]" />;
    }
  };

  return (
    <section id="love-coupons-section" className="py-16 sm:py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FADADD] text-[#800000] text-xs font-bold tracking-widest uppercase mb-3 shadow-xs">
          <Ticket className="w-3.5 h-3.5" />
          <span>Surprise Feature: Love Coupons</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-['Dancing_Script'] font-bold text-[#800000] tracking-tight">
          Kupon Spesial Shareen
        </h2>
        <p className="mt-3 text-xs sm:text-sm uppercase tracking-widest font-bold text-[#141414]/70 font-sans leading-relaxed">
          Voucher ini berlaku seumur hidup! Klik "Klaim Kupon" dan kamu bisa gunain kapan aja UNLIMITED
        </p>
      </div>

      {/* Coupons Grid (2x2 on desktop/tablet) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            id={coupon.id}
            className={`relative bg-white rounded-3xl p-6 sm:p-7 border border-[#800000]/15 polaroid-shadow flex flex-col justify-between overflow-hidden transition-all duration-300 hover:scale-[1.02] ${
              coupon.isRedeemed ? 'opacity-90' : ''
            }`}
          >
            {/* Washi Tape Header */}
            <div className="absolute -top-3 left-8 w-20 h-6 washi-tape-beige rotate-2 rounded-sm" />

            {/* Ticket Notches / Perforation edges */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FDFBF7] border border-[#800000]/15" />
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FDFBF7] border border-[#800000]/15" />

            <div>
              {/* Top Row: Icon & Code */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-[#FADADD] flex items-center justify-center shadow-xs">
                  {getIcon(coupon.iconName)}
                </div>
                <span className="text-[11px] font-mono font-bold tracking-widest bg-[#FAF8F3] border border-[#800000]/20 px-3 py-1 rounded-full text-[#800000] uppercase">
                  {coupon.code}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-[#141414] mb-2 leading-snug">
                {coupon.title}
              </h3>
              <p className="text-sm text-stone-600 font-sans leading-relaxed mb-6">
                {coupon.subtitle}
              </p>
            </div>

            {/* Bottom Action or Redeemed Stamp */}
            <div className="pt-2 border-t border-[#800000]/10 mt-auto">
              {coupon.isRedeemed ? (
                <div className="relative py-2 flex items-center justify-center">
                  {/* Vintage Red Rubber Stamp Effect */}
                  <div className="border-2 border-dashed border-[#800000] px-5 py-2 rounded-lg text-[#800000] font-bold text-xs uppercase tracking-widest rotate-[-3deg] shadow-xs flex items-center gap-1.5 animate-fadeIn">
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>SUDAH TERKLAIM ✨</span>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => handleRedeem(coupon.id, coupon.title)}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#800000] hover:bg-[#660000] active:scale-95 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Klaim Kupon Ini Sekarang</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
