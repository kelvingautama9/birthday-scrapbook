import React, { useEffect, useState } from 'react';
import { X, Download, Sparkles, Heart } from 'lucide-react';
import { LoveCoupon } from '../types';
import {
  renderCouponToCanvas,
  downloadCouponImage,
} from '../utils/couponImageGenerator';
import { triggerHaptic } from '../utils/soundAndHaptics';

interface CouponClaimModalProps {
  coupon: LoveCoupon | null;
  onClose: () => void;
}

export const CouponClaimModal: React.FC<CouponClaimModalProps> = ({ coupon, onClose }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!coupon) return;

    // Render canvas ke data URL untuk tampilan preview gambar beresolusi tinggi
    const canvas = renderCouponToCanvas(coupon);
    const url = canvas.toDataURL('image/png');
    setPreviewUrl(url);
  }, [coupon]);

  if (!coupon) return null;

  const handleDownload = () => {
    triggerHaptic('success');
    downloadCouponImage(coupon);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Modal Container */}
      <div className="relative w-full max-w-xl bg-[#FDFBF7] rounded-3xl p-5 sm:p-7 shadow-2xl border border-[#800000]/20 flex flex-col max-h-[92vh] overflow-y-auto">
        {/* Tombol Tutup */}
        <button
          type="button"
          onClick={() => {
            triggerHaptic('light');
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-[#800000] hover:bg-[#FADADD]/40 rounded-full transition-colors cursor-pointer"
          title="Tutup Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FADADD] text-[#800000] text-[11px] font-bold tracking-widest uppercase mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Kupon Cinta Spesial</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#800000]">
            {coupon.title}
          </h3>
          <p className="text-xs text-stone-600 mt-1 max-w-md mx-auto">
            {coupon.usageLimit === '1x'
              ? 'Tiket kupon ini berlaku khusus untuk 1x kencan spesial! Simpan gambarnya untuk kamu tunjukkan ke Kelvin saat ingin dipakai.'
              : 'Tiket kupon ini berlaku seumur hidup & unlimited! Simpan gambarnya untuk kamu tunjukkan ke Kelvin kapanpun kamu mau.'}
          </p>
        </div>

        {/* Gambar Kupon Digital (Preview Hasil Render Canvas) */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#800000]/20 bg-white mb-5 group">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt={`Tiket Kupon ${coupon.title}`}
              className="w-full h-auto object-contain block transition-transform duration-300 group-hover:scale-[1.01]"
            />
          ) : (
            <div className="h-48 flex items-center justify-center text-stone-400">
              Menyiapkan kupon...
            </div>
          )}
        </div>

        {/* Aksi: Simpan Gambar PNG */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={handleDownload}
            className="w-full py-3.5 px-5 rounded-2xl bg-[#800000] hover:bg-[#660000] active:scale-[0.98] text-white font-bold text-sm tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer uppercase"
          >
            <Download className="w-5 h-5 text-amber-300" />
            <span>Simpan / Unduh Gambar Kupon (PNG)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              triggerHaptic('light');
              onClose();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-transparent hover:bg-stone-100 text-stone-600 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center cursor-pointer"
          >
            Tutup
          </button>
        </div>

        {/* Catatan Kaki */}
        <p className="text-[11px] text-center text-stone-500 mt-3 italic flex items-center justify-center gap-1">
          <Heart className="w-3 h-3 text-[#800000] fill-[#800000]" />
          <span>Klaim langsung ke Kelvin kapanpun, Kelvin wajib nurut tanpa alasan!</span>
        </p>
      </div>
    </div>
  );
};
