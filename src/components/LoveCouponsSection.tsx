import React, { useState, useEffect } from 'react';
import { Ticket, Sparkles, Check, Coffee, Heart, Film, Download, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LoveCoupon } from '../types';
import { triggerHaptic, playUnlockChime } from '../utils/soundAndHaptics';
import { CouponClaimModal } from './CouponClaimModal';
import { downloadCouponImage } from '../utils/couponImageGenerator';

export const LoveCouponsSection: React.FC = () => {
  // =========================================================================
  // VOUCHER SPESIAL UNTUK SHAREEN (DENGAN KETERANGAN 1X DAN UNLIMITED)
  // =========================================================================
  const initialCoupons: LoveCoupon[] = [
    {
      id: 'coupon-1',
      title: 'Voucher UNLIMITED Hug',
      subtitle: 'Bebas pakai kapanpun dan dimanapun kalo kamu lagi capek, kangen, atau lain lain 🤭',
      iconName: 'Heart',
      terms: 'Unlimited',
      code: 'HUG-24H',
      isRedeemed: false,
      usageLimit: 'unlimited',
    },
    {
      id: 'coupon-2',
      title: 'Voucher Matcha Date (1x)',
      subtitle: '(Khusus 1x Date) Demi asupan infusan yang tercukupi. Jadi ini wajib ada 🍵',
      iconName: 'Coffee',
      terms: '1x Pakai',
      code: 'MATCHA-1X',
      isRedeemed: false,
      usageLimit: '1x',
    },
    {
      id: 'coupon-3',
      title: 'Voucher UNLIMITED Kiss',
      subtitle: 'Bebas pakai kapan aja dan dimana aja WKWK 🤫😙 Tak terbatasss',
      iconName: 'Heart',
      terms: 'Unlimited',
      code: 'KISS-24H',
      isRedeemed: false,
      usageLimit: 'unlimited',
    },
    {
      id: 'coupon-4',
      title: 'Voucher Movie Date (1x)',
      subtitle: '(Khusus 1x Date) Bebas nonton Film Bioskop yang kamu suka, aku pasti tetep ikut suka 🎬',
      iconName: 'Film',
      terms: '1x Pakai',
      code: 'MOVIE-1X',
      isRedeemed: false,
      usageLimit: '1x',
    },
  ];

  // Default selalu mulai dari awal (unclaimed) agar Shareen bisa menikmati proses mengklaimnya
  const [coupons, setCoupons] = useState<LoveCoupon[]>(initialCoupons);
  const [activeClaimCoupon, setActiveClaimCoupon] = useState<LoveCoupon | null>(null);

  // Bersihkan data lama di localStorage jika sebelumnya pernah tersimpan saat testing
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('romantic_scrapbook_coupons_v2');
        localStorage.removeItem('romantic_scrapbook_coupons');
      } catch {
        // ignore
      }
    }
  }, []);

  const handleRedeem = (coupon: LoveCoupon) => {
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

    const updatedCoupon = { ...coupon, isRedeemed: true };
    setCoupons((prev) =>
      prev.map((c) => (c.id === coupon.id ? updatedCoupon : c))
    );

    // Buka modal klaim kupon bergambar & opsi unduh PNG
    setActiveClaimCoupon(updatedCoupon);
  };

  const handleResetCoupons = () => {
    triggerHaptic('light');
    setCoupons(initialCoupons);
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
          Kupon cinta spesial untuk Shareen! Klik "Klaim & Simpan Kupon Ini" untuk menyimpan tiket kuponmu
        </p>

        {coupons.some((c) => c.isRedeemed) && (
          <div className="mt-3 flex justify-center animate-fadeIn">
            <button
              type="button"
              onClick={handleResetCoupons}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-stone-500 hover:text-[#800000] hover:bg-[#FADADD]/40 transition-colors cursor-pointer"
              title="Kembalikan semua kupon ke status belum diklaim"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Semua Kupon</span>
            </button>
          </div>
        )}
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
              {/* Top Row: Icon, Usage Limit Badge & Code */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-11 h-11 rounded-2xl bg-[#FADADD] flex items-center justify-center shadow-xs">
                    {getIcon(coupon.iconName)}
                  </div>
                  <span
                    className={`text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full uppercase ${
                      coupon.usageLimit === '1x'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300/80'
                        : 'bg-[#FADADD]/60 text-[#800000] border border-[#800000]/20'
                    }`}
                  >
                    {coupon.usageLimit === '1x' ? '★ 1x Pakai' : '∞ Unlimited'}
                  </span>
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
            <div className="pt-3 border-t border-[#800000]/10 mt-auto space-y-2.5">
              {coupon.isRedeemed ? (
                <div>
                  <div className="relative py-1 flex items-center justify-center">
                    {/* Vintage Red Rubber Stamp Effect */}
                    <div className="border-2 border-dashed border-[#800000] px-4 py-1.5 rounded-lg text-[#800000] font-bold text-xs uppercase tracking-widest rotate-[-2deg] shadow-xs flex items-center gap-1.5 animate-fadeIn">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>
                        {coupon.usageLimit === '1x'
                          ? 'SUDAH TERKLAIM (1x PAKAI) ✨'
                          : 'SUDAH TERKLAIM (UNLIMITED) ✨'}
                      </span>
                    </div>
                  </div>

                  {/* Tombol aksi kupon yang dapat digunakan seumur hidup */}
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => {
                        triggerHaptic('light');
                        setActiveClaimCoupon(coupon);
                      }}
                      className="py-2.5 px-3 rounded-xl bg-[#FADADD] hover:bg-[#F8CCD3] active:scale-95 text-[#800000] font-bold text-[11px] uppercase tracking-wider shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      title="Lihat tiket kupon"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Lihat Tiket</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        triggerHaptic('light');
                        downloadCouponImage(coupon);
                      }}
                      className="py-2.5 px-3 rounded-xl bg-[#800000] hover:bg-[#660000] active:scale-95 text-white font-bold text-[11px] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                      title="Unduh gambar kupon (PNG)"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Unduh PNG</span>
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => handleRedeem(coupon)}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#800000] hover:bg-[#660000] active:scale-95 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
                  <span>Klaim & Simpan Kupon Ini</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal Preview & Simpan Gambar Kupon */}
      <CouponClaimModal
        coupon={activeClaimCoupon}
        onClose={() => setActiveClaimCoupon(null)}
      />
    </section>
  );
};
