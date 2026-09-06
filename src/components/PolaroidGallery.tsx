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
      title: 'My Fav Girl',
      date: 'Sweet Memories',
      // File statis: public/gallery-1.jpg
      imageUrl: '/gallery-1.jpg',
      fallbackUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80',
      caption: 'Bocil cantik yang kalo lagi jalan bareng, kayak berasa jalan sama anak😝',
      tapeColor: 'pink',
      rotation: '-rotate-4',
      sticker: '💖 Cantik Banget',
    },
    {
      id: 'p2',
      title: 'My Birthday Date',
      date: 'Birthday Date',
      // File statis: public/gallery-2.jpg
      imageUrl: '/gallery-2.jpg',
      fallbackUrl: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=700&q=80',
      caption: 'Makasi waktu aku ulang tahun, kamu kasih aku Surprise Date ke Cia Gio Pizeria 😊❤️',
      tapeColor: 'beige',
      rotation: 'rotate-3',
      sticker: '🍕 Pizza Date',
    },
    {
      id: 'p3',
      title: 'Dogs, Coffee, and You ☕',
      date: 'Doggy Date',
      // File statis: public/gallery-3.jpg
      imageUrl: '/gallery-3.jpg',
      fallbackUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=700&q=80',
      caption: 'Ngedate bareng doggy, mam di Pluit, sm nongks di Cafe Puding Tikus 🐭🐹',
      tapeColor: 'maroon',
      rotation: '-rotate-2',
      sticker: '🐶 Doggy Date',
    },
    {
      id: 'p4',
      title: 'Happy Moments',
      date: 'Best Moment',
      // File statis: public/gallery-4.jpg
      imageUrl: '/gallery-4.jpg',
      fallbackUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=80',
      caption: 'Finally ! Setelah sekian panjang perjuangan kamu kuliah, akhirnya berakhir. Happy Graduation Shareen Lorenza S.Ds 🎓',
      tapeColor: 'pink',
      rotation: 'rotate-4',
      sticker: '🎓 Happy Graduation',
    },
    {
      id: 'p5',
      title: 'Jalan Random Berdua',
      date: 'Golden Hour',
      // File statis: public/gallery-5.jpg
      imageUrl: '/gallery-5.jpg',
      fallbackUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80',
      caption: 'Awalnya cuma coba mie ayam aja, tapi sekalian keliling & berakhir nyasar di Museum🤭 I love moments like this, pas kita jalan random',
      tapeColor: 'beige',
      rotation: '-rotate-3',
      sticker: '🍜 Jalan Random',
    },
    {
      id: 'p6',
      title: 'My First Valentine Day',
      date: 'Valentine Day',
      // File statis: public/gallery-6.jpg
      imageUrl: '/gallery-6.jpg',
      fallbackUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=700&q=80',
      caption: 'Keinget moment pertama kali aku ngerayain valentine day langsung & itu sama kamu. Sempet malu-malu bawa bucket bunga nya dari Cikarang 🤫😅 untungnya berhasil sampe dari tangan aku, ke kamu, niat mau surprise, tapi di kagetin duluan di Minisoo kocak 😏',
      tapeColor: 'maroon',
      rotation: 'rotate-2',
      sticker: '🌹 Valentine Day',
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
          our gallery
        </h2>
        <p className="mt-3 text-xs sm:text-sm uppercase tracking-widest font-bold text-[#141414]/70 font-sans">
          Arahkan kursor atau sentuh foto buat meluruskan dan liat momen kita lebih deket.
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
              {/* <!-- Ganti link foto galeri polaroid di sini atau upload ke public/gallery-X.jpg --> */}
              <img
                src={item.imageUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  const githubRawUrl = `https://raw.githubusercontent.com/kelvingautama9/birthday-scrapbook/main/public${item.imageUrl}`;
                  if (!target.dataset.triedGithub && !target.src.includes('raw.githubusercontent.com')) {
                    target.dataset.triedGithub = 'true';
                    target.src = githubRawUrl;
                  } else if (item.fallbackUrl && target.src !== item.fallbackUrl) {
                    target.src = item.fallbackUrl;
                  }
                }}
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
                onError={(e) => {
                  const target = e.currentTarget;
                  const githubRawUrl = `https://raw.githubusercontent.com/kelvingautama9/birthday-scrapbook/main/public${activeModalPhoto.imageUrl}`;
                  if (!target.dataset.triedGithub && !target.src.includes('raw.githubusercontent.com')) {
                    target.dataset.triedGithub = 'true';
                    target.src = githubRawUrl;
                  } else if (activeModalPhoto.fallbackUrl && target.src !== activeModalPhoto.fallbackUrl) {
                    target.src = activeModalPhoto.fallbackUrl;
                  }
                }}
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
