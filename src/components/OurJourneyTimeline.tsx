import React from 'react';
import { Heart, Sparkles, Coffee, Calendar, MapPin, Gift, Compass } from 'lucide-react';
import { Milestone } from '../types';

export const OurJourneyTimeline: React.FC = () => {
  // =========================================================================
  // DATA TIMELINE PERJALANAN CINTA
  // Kelvin dapat dengan mudah mengganti teks, tanggal, dan link foto di sini:
  // =========================================================================
  const milestones: Milestone[] = [
    {
      id: '1',
      date: 'Awal Pertemuan Kita',
      title: 'Pertama Kali Kenal ✨',
      // // Ganti narasi di sini:
      description: 'Pertama kita kenal lewat online dari Line Openchat, aku notice ada ciwik cantik yang pelihara tikus, namanya Shareen, Nama tikusnya : Miyo. Dari situ aku tertarik sama kamu, chatting pertama emang agak canggung. Tapi ternyata setelah kenalan, kamu asik buat di ajak ngobrol, biarpun agak jual mahal & susah di deketin.',
      // File statis: public/timeline-1.jpg
      imageUrl: '/timeline-1.jpg',
      fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=700&q=80',
      tag: 'The Beginning',
      rotation: '-rotate-2',
      accentEmoji: '💬',
    },
    {
      id: '2',
      date: 'Kencan Pertama yang Berkesan',
      title: 'First Date ☕',
      // // Ganti narasi di sini:
      description: 'Awalnya aku sempet ditolak buat first date sama kamu, aku pikir kamu gak mau sama aku, tapi ternyata setelah beberapa tahun kemudian kamu start glow up, akhirnya kamu mau buat aku ajak first date di CP. Awal ketemu di Boost, aku sempet kaget krn liat kamu yang versi asli, ternyata jauh lebih cakep, postur juga senyumnya kalem banget, HADOEH AKU MELELEH 🫠 Aku sempet terppikir, apa kamu masih mau buat lanjut next date sama aku ? hmm, tapi ternyata kita lanjut ehehehe',
      // File statis: public/timeline-2.jpg
      imageUrl: '/timeline-2.jpg',
      fallbackUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=80',
      tag: 'Butterflies in Tummy',
      rotation: 'rotate-2',
      accentEmoji: '☕',
    },
    {
      id: '3',
      date: '31 Januari 2026',
      title: 'Hari Resmi Jadian Kita 💍',
      // // Ganti narasi di sini:
      description: 'Singkat cerita, akhirnya Hari paling yang ditunggu-tunggu setelah sekian lamanya kita PDKT, pas kamu mengiyakan ajakan aku buat hilangin status HTS jadi Pacaran di Eskalator GI menjelang pulang 🤫😊 Aku harap, kita bakal terus lanjut ketahap selanjutnya yang jauh lebih serius lagi, bukan cuma sekedar pacaran aja.',
      // File statis: public/timeline-3.jpg
      imageUrl: '/timeline-3.jpg',
      fallbackUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=700&q=80',
      tag: 'Official Couple',
      rotation: '-rotate-1',
      accentEmoji: '❤️',
    },
    {
      id: '4',
      date: 'Our Memory',
      title: 'Sweet Moment🚗',
      // // Ganti narasi di sini:
      description: "Dari jalan-jalan cari makan, baking, nonton bareng, bahkan deep talk sampai tengah malam. I'm so happy bisa jalanin kegiatan apapun sama kamu.",
      // File statis: public/timeline-4.jpg
      imageUrl: '/timeline-4.jpg',
      fallbackUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=700&q=80',
      tag: 'Our Memory',
      rotation: 'rotate-1',
      accentEmoji: '✨',
    },
    {
      id: '5',
      date: '9 September 2026',
      title: 'Spesial Ulang Tahun My Princess',
      // // Ganti narasi di sini:
      description: 'Happy Birthday Shareen sayang, selamat bertambah usia & tetap dikasih kesehatan selalu. Semoga semua impian kamu terwujud, dan aku bisa selalu ada di samping km buat merayakannya.',
      // File statis: public/timeline-5.jpg
      imageUrl: '/timeline-5.jpg',
      fallbackUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=700&q=80',
      tag: 'Happy Birthday Shareen!',
      rotation: '-rotate-2',
      accentEmoji: '🎉',
    },
  ];

  return (
    <section id="our-journey-timeline-section" className="py-16 sm:py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FADADD] text-[#800000] text-xs font-bold uppercase tracking-widest shadow-xs mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>Our Love Journey</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-['Dancing_Script'] font-bold text-[#800000] tracking-tight">
          Love Story
        </h2>
        <p className="mt-3 text-xs sm:text-sm uppercase tracking-widest font-bold text-[#141414]/70 font-sans leading-relaxed">
          Ini gambaran memory cerita kita dari awal sampai di tahap sekarang yang kita jalanin
        </p>
      </div>

      {/* Vertical Scrapbook Timeline */}
      <div className="relative">
        {/* Central Ribbon Line */}
        <div className="absolute top-4 bottom-4 left-6 md:left-1/2 md:-translate-x-1/2 w-1 bg-[#800000]/25 rounded-full" />

        <div className="space-y-12 sm:space-y-16">
          {milestones.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.id}
                id={`timeline-item-${item.id}`}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                } gap-6 md:gap-12 pl-14 md:pl-0`}
              >
                {/* Milestone Node Badge (Center on MD, Left on Mobile) */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-4 z-20">
                  <div className="w-10 h-10 rounded-full bg-[#800000] text-white flex items-center justify-center shadow-md ring-4 ring-[#FADADD] text-sm font-bold">
                    {item.accentEmoji || <Heart className="w-4 h-4 fill-white" />}
                  </div>
                </div>

                {/* Content Card (Polaroid + Narasi) */}
                <div className="w-full md:w-1/2">
                  <div
                    className={`bg-white p-5 sm:p-6 rounded-2xl polaroid-shadow border border-[#800000]/15 transition-all duration-300 hover:scale-[1.02] ${item.rotation} relative group`}
                  >
                    {/* Washi Tape Header */}
                    <div className="absolute -top-3 left-8 w-24 h-6 washi-tape-pink rotate-2 rounded-sm border-dashed border-t border-b border-[#800000]/20" />

                    {/* Image Box */}
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-stone-100 border border-stone-200 mb-4 shadow-inner">
                      {/* <!-- Ganti link gambar di sini atau upload ke public/timeline-X.jpg --> */}
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
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-2 right-2 bg-[#800000] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                        {item.tag}
                      </div>
                    </div>

                    {/* Date Tag */}
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#800000] mb-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.date}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-serif font-extrabold text-[#141414] mb-2">
                      {item.title}
                    </h3>

                    {/* Narrative Text */}
                    {/* // Ganti narasi di sini */}
                    <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-sans">
                      {item.description}
                    </p>

                    {/* Polaroid Bottom Signature Note */}
                    <div className="mt-4 pt-3 border-t border-[#800000]/15 flex items-center justify-between text-xs text-stone-500 font-['Dancing_Script'] text-xl font-bold">
                      <span className="text-[#141414]/70">#OurSweetMoments</span>
                      <span className="text-[#800000]">❤️ Kelvin & Shareen</span>
                    </div>
                  </div>
                </div>

                {/* Empty side on desktop to balance alternating layout */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
