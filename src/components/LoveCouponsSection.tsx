import React, { useState } from 'react';
import { Ticket, Gift, Sparkles, Check, Send, Coffee, Heart, Utensils, Moon, Crown, Film } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LoveCoupon } from '../types';
import { triggerHaptic, playPaperPop, playUnlockChime } from '../utils/soundAndHaptics';

export const LoveCouponsSection: React.FC = () => {
  // =========================================================================
  // VOUCHER CINTA SPESIAL UNTUK SHAREEN
  // Kelvin dapat menambah atau mengubah isi voucher di sini:
  // =========================================================================
  const initialCoupons: LoveCoupon[] = [
    {
      id: 'coupon-1',
      title: 'Voucher Peluk & Deep Talk 24 Jam',
      subtitle: 'Berlaku saat Shareen lagi capek, kangen, atau pengen cerita panjang.',
      iconName: 'Heart',
      terms: 'Kelvin siap mendengarkan tanpa memotong dan memeluk sampai tenang.',
      code: 'HUG-24H',
      isRedeemed: false,
    },
    {
      id: 'coupon-2',
      title: 'Voucher Ditraktir Makanan Kesukaan',
      subtitle: 'Shareen bebas pilih tempat makan dan menu apapun tanpa penolakan!',
      iconName: 'Utensils',
      terms: 'Kelvin yang bayar dan temani makan sampai kenyang.',
      code: 'FOOD-FEAST',
      isRedeemed: false,
    },
    {
      id: 'coupon-3',
      title: 'Voucher Bebas Ngambek (Auto Baikan)',
      subtitle: 'Klaim ini kalau Kelvin bikin kesel, Kelvin langsung minta maaf!',
      iconName: 'Gift',
      terms: 'Wajib disayang-sayang, dielus rambutnya, dan dibeliin es krim.',
      code: 'PEACE-AUTO',
      isRedeemed: false,
    },
    {
      id: 'coupon-4',
      title: 'Voucher Night Drive & Ice Cream Date',
      subtitle: 'Keliling kota malam hari sambil dengerin playlist lagu romantis favorit kita.',
      iconName: 'Moon',
      terms: 'Disertai obrolan hangat dan udara malam yang syahdu.',
      code: 'NIGHT-DRIVE',
      isRedeemed: false,
    },
    {
      id: 'coupon-5',
      title: 'Voucher Jadi Ratu Seharian 👑',
      subtitle: 'Selama 24 jam penuh, semua keinginan Shareen adalah perintah bagi Kelvin.',
      iconName: 'Crown',
      terms: 'Diberikan layanan terbaik dengan senyum paling manis.',
      code: 'QUEEN-DAY',
      isRedeemed: false,
    },
    {
      id: 'coupon-6',
      title: 'Voucher Movie Marathon & Camilan',
      subtitle: 'Nonton film atau series favorit berdua seharian lengkap dengan snack favorit.',
      iconName: 'Film',
      terms: 'Bebas pilih film apapun yang Shareen sukai.',
      code: 'MOVIE-DATE',
      isRedeemed: false,
    },
  ];

  const [coupons, setCoupons] = useState<LoveCoupon[]>(() => {
    // Load persisted redemption from local storage if available
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('romantic_scrapbook_coupons');
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
        localStorage.setItem('romantic_scrapbook_coupons', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'Utensils':
        return <Utensils className="w-5 h-5 text-[#800000]" />;
      case 'Moon':
        return <Moon className="w-5 h-5 text-[#800000]" />;
      case 'Crown':
        return <Crown className="w-5 h-5 text-[#800000]" />;
      case 'Film':
        return <Film className="w-5 h-5 text-[#800000]" />;
      default:
        return <Heart className="w-5 h-5 text-[#800000]" />;
    }
  };

  return (
    <section id="love-coupons-section" className="py-16 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FADADD] text-[#800000] text-xs font-bold tracking-widest uppercase mb-3 shadow-xs">
          <Ticket className="w-3.5 h-3.5" />
          <span>Surprise Feature: Love Coupons</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-['Dancing_Script'] font-bold text-[#800000] tracking-tight">
          Kupon Cinta Spesial Shareen
        </h2>
        <p className="mt-3 text-xs sm:text-sm uppercase tracking-widest font-bold text-[#141414]/70 font-sans">
          Voucher ini berlaku seumur hidup! Klik "Klaim Kupon" kapan saja kamu mau gunakan ke Kelvin.
        </p>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            id={coupon.id}
            className={`relative bg-white rounded-3xl p-5 sm:p-6 border border-[#800000]/15 polaroid-shadow flex flex-col justify-between overflow-hidden transition-all duration-300 hover:scale-[1.02] ${
              coupon.isRedeemed ? 'opacity-90' : ''
            }`}
          >
            {/* Washi Tape Header */}
            <div className="absolute -top-3 left-6 w-20 h-6 washi-tape-beige rotate-2 rounded-sm" />

            {/* Ticket Notches / Perforation edges */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FDFBF7] border border-[#800000]/15" />
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FDFBF7] border border-[#800000]/15" />

            <div>
              {/* Top Row: Icon & Code */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#FADADD] flex items-center justify-center shadow-xs">
                  {getIcon(coupon.iconName)}
                </div>
                <span className="text-[10px] font-mono font-bold tracking-widest bg-[#FAF8F3] border border-[#800000]/20 px-2.5 py-0.5 rounded-full text-[#800000] uppercase">
                  {coupon.code}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="font-serif text-lg sm:text-xl font-extrabold text-[#141414] mb-1.5 leading-snug">
                {coupon.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed mb-3">
                {coupon.subtitle}
              </p>

              {/* Terms */}
              <div className="p-2.5 rounded-xl bg-[#FAF8F3] border border-[#800000]/15 text-[11px] text-stone-700 mb-5">
                <strong className="text-[#800000]">Syarat & Ketentuan:</strong> {coupon.terms}
              </div>
            </div>

            {/* Bottom Action or Redeemed Stamp */}
            <div className="pt-2">
              {coupon.isRedeemed ? (
                <div className="relative py-2 flex items-center justify-center">
                  {/* Vintage Red Rubber Stamp Effect */}
                  <div className="border-2 border-dashed border-[#800000] px-4 py-1.5 rounded-lg text-[#800000] font-bold text-xs uppercase tracking-widest rotate-[-5deg] shadow-xs flex items-center gap-1.5 animate-fadeIn">
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>SUDAH TERKLAIM ✨</span>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => handleRedeem(coupon.id, coupon.title)}
                  className="w-full py-3 px-4 rounded-xl bg-[#800000] hover:bg-[#660000] active:scale-95 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
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
