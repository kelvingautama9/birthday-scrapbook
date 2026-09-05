import React, { useState } from 'react';
import { Camera, Heart, Sparkles, X, ZoomIn } from 'lucide-react';
import { PolaroidItem } from '../types';
import { triggerHaptic } from '../utils/soundAndHaptics';

export const PolaroidGallery: React.FC = () => {
  const [activeModalPhoto, setActiveModalPhoto] = useState<PolaroidItem | null>(null);

  // =========================================================================
  // DATA FOTO POLAROID SCRAPBOOK (ESTETIK BERANTAKAN / SCATTERED)
  // <!-- Ganti link gambar & caption di sini -->
  // =========================================================================
  const photos: PolaroidItem[] = [
    {
      id: 'p1',
      title: 'Senyuman Favoritku',
      date: 'Sweet Memories',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80',
      caption: 'Senyum tercantik yang selalu berhasil bikin hariku tenang.',
      tapeColor: 'pink',
      rotation: '-rotate-4',
      sticker: '💖 Cantik Banget',
    },
    {
      id: 'p2',
      title: 'Cafe Date Berdua',
      date: 'Weekend Date',
      imageUrl: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=700&q=80',
      caption: 'Waktu berhenti setiap kali kita duduk berhadapan sambil ngobrol.',
      tapeColor: 'beige',
      rotation: 'rotate-3',
      sticker: '☕ Coffee & You',
    },
    {
      id: 'p3',
      title: 'Tatap Matamu',
      date: 'Forever With You',
      imageUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=700&q=80',
      caption: 'Di matamu, aku menemukan rumah tempat hatiku ingin selalu pulang.',
      tapeColor: 'maroon',
      rotation: '-rotate-2',
      sticker: '✨ My Sunshine',
    },
    {
      id: 'p4',
      title: 'Silly & Happy Moments',
      date: 'Random Laughs',
      imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=80',
      caption: 'Tawa lepasmu adalah melodi paling indah yang pernah kudengar.',
      tapeColor: 'pink',
      rotation: 'rotate-4',
      sticker: '🥰 Gemas Banget',
    },
    {
      id: 'p5',
      title: 'Sunset Jalan Berdua',
      date: 'Golden Hour',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80',
      caption: 'Sunset-nya indah, tapi tetap kalah indah dibanding pemandangan di sampingku.',
      tapeColor: 'beige',
      rotation: '-rotate-3',
      sticker: '🌅 Golden Hour',
    },
    {
      id: 'p6',
      title: 'Hari Spesial Shareen',
      date: '9 September 2026',
      imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=700&q=80',
      caption: 'Selamat ulang tahun bidadariku! Panjang umur dan bahagia selalu yaa.',
      tapeColor: 'maroon',
      rotation: 'rotate-2',
      sticker: '🎂 Birthday Girl',
    },
  ];

  const getTapeClass = (color?: string) => {
    switch (color) {
      case 'maroon':
        return 'washi-tape-maroon';
      case 'beige':
        return 'washi-tape-beige';
      default:
        return 'washi-tape-pink';
    }
  };

  return (
    <section id="polaroid-gallery-section" className="py-16 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Title */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FADADD] text-[#800000] text-xs font-bold uppercase tracking-widest shadow-xs mb-3">
          <Camera className="w-3.5 h-3.5" />
          <span>Scattered Polaroid Scrapbook</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-['Dancing_Script'] font-bold text-[#800000] tracking-tight">
          Galeri Polaroid Kenangan
        </h2>
        <p className="mt-3 text-xs sm:text-sm uppercase tracking-widest font-bold text-[#141414]/70 font-sans">
          Arahkan kursor atau sentuh foto untuk meluruskan dan melihat momen manis kita lebih dekat.
        </p>
      </div>

      {/* Scattered Polaroid Grid (Aesthetic Messy Layout) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 p-2 sm:p-6">
        {photos.map((item) => (
          <div
            key={item.id}
            id={`polaroid-card-${item.id}`}
            onClick={() => {
              triggerHaptic('light');
              setActiveModalPhoto(item);
            }}
            className={`group relative bg-white p-4 pt-6 pb-6 rounded-2xl polaroid-shadow border border-stone-200/90 cursor-pointer transition-all duration-300 ease-out hover:rotate-0 hover:scale-105 hover:z-30 hover:shadow-2xl ${item.rotation}`}
          >
            {/* Washi Tape Sticked on Top */}
            <div
              className={`absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-6.5 ${getTapeClass(
                item.tapeColor
              )} rotate-1 rounded-sm border-dashed border-t border-b border-black/10 z-10 transition-transform group-hover:scale-95`}
            />

            {/* Polaroid Photo Box */}
            <div className="relative aspect-[4/4.5] overflow-hidden rounded-xl bg-stone-100 border border-stone-200 shadow-inner">
              {/* <!-- Ganti link foto galeri polaroid di sini --> */}
              <img
                src={item.imageUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Hover Zoom Icon Indicator */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="p-2.5 bg-white/95 rounded-full text-[#800000] shadow-md backdrop-blur-xs">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>

              {/* Little date badge inside photo */}
              <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-xs text-white text-[10px] px-2.5 py-0.5 rounded-md font-sans font-bold uppercase tracking-wider">
                {item.date}
              </div>
            </div>

            {/* Handwritten Polaroid Caption */}
            <div className="mt-4 px-1 text-center">
              <h4 className="font-['Dancing_Script'] text-2xl sm:text-3xl text-[#800000] font-bold tracking-wide group-hover:text-[#660000] transition-colors">
                {item.title}
              </h4>
              <p className="font-sans text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                {item.caption}
              </p>
            </div>

            {/* Decorative Cute Sticker Badge */}
            {item.sticker && (
              <div className="absolute -bottom-2 -right-2 bg-[#FADADD] border border-[#800000]/20 text-[#800000] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md rotate-3 flex items-center gap-1 group-hover:rotate-6 transition-transform">
                <span>{item.sticker}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal / Lightbox for zoomed photo view */}
      {activeModalPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setActiveModalPhoto(null)}
        >
          <div
            className="relative max-w-lg w-full bg-white rounded-3xl p-6 sm:p-8 border border-[#800000]/20 shadow-2xl animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveModalPhoto(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 text-stone-700 hover:bg-[#FADADD] hover:text-[#800000] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image Preview */}
            <div className="relative aspect-[4/4.5] overflow-hidden rounded-2xl bg-stone-100 border border-stone-200 shadow-inner mb-4">
              <img
                src={activeModalPhoto.imageUrl}
                alt={activeModalPhoto.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Caption & Details */}
            <div className="text-center">
              <span className="text-xs font-bold text-[#800000] uppercase tracking-widest">
                {activeModalPhoto.date}
              </span>
              <h3 className="font-['Dancing_Script'] text-3xl sm:text-4xl text-[#800000] font-bold mt-1">
                {activeModalPhoto.title}
              </h3>
              <p className="text-stone-600 text-sm sm:text-base mt-2 leading-relaxed font-sans">
                {activeModalPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scaleUp {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </section>
  );
};
