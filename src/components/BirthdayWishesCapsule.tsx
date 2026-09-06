import React, { useState, useEffect } from 'react';
import { Sparkles, MessageCircleHeart, Send, Heart, Cake } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WishNote } from '../types';
import { triggerHaptic, playUnlockChime } from '../utils/soundAndHaptics';

export const BirthdayWishesCapsule: React.FC = () => {
  const initialWishes: WishNote[] = [
    {
      id: 'w1',
      author: 'Kelvin (Your Beloved) ❤️',
      message: 'Semoga di ulang tahunmu ini, kamu selalu diberikan kesehatan, senyum yang gak pernah pudar, dan bahagia yang melimpah. Aku akan selalu ada di samping kamu buat support kamu di keadaan apapun',
      date: '9 September 2026',
      avatar: '👑',
    },
    {
      id: 'w2',
      author: 'Kelvin',
      message: 'Terima kasih sudah lahir ke dunia dan memilih buat ada di sampingku & jadi pasangan aku. I\'m happy to have you',
      date: '9 September 2026',
      avatar: '✨',
    },
  ];

  const [wishes, setWishes] = useState<WishNote[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('romantic_scrapbook_wishes_v2');
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return initialWishes;
  });

  const [authorInput, setAuthorInput] = useState('');
  const [messageInput, setMessageInput] = useState('');

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    triggerHaptic('success');
    playUnlockChime();

    const newWish: WishNote = {
      id: `wish-${Date.now()}`,
      author: authorInput.trim() || 'Shareen Tersayang 💖',
      message: messageInput.trim(),
      date: 'Hari Ini',
      avatar: '🎂',
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    try {
      localStorage.setItem('romantic_scrapbook_wishes_v2', JSON.stringify(updated));
    } catch {
      // ignore
    }

    setAuthorInput('');
    setMessageInput('');

    try {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FDA4AF', '#BE123C', '#F43F5E', '#FBBF24'],
      });
    } catch {
      // fallback
    }
  };

  return (
    <section id="birthday-wishes-section" className="py-16 sm:py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FADADD] text-[#800000] text-xs font-bold tracking-widest uppercase mb-3 shadow-xs">
          <Cake className="w-3.5 h-3.5" />
          <span>Birthday Wish Capsule</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-['Dancing_Script'] font-bold text-[#800000] tracking-tight">
          Note Wish & Doa buat kamu
        </h2>
        <p className="mt-3 text-xs sm:text-sm uppercase tracking-widest font-bold text-[#141414]/70 font-sans">
          Tulis doa dan impian terbesarmu di hari ulang tahun kamu ini, terus screenshot & kasih tau ke aku ya
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Form Note */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl polaroid-shadow border border-[#800000]/15 relative">
          <div className="absolute -top-3 left-8 w-24 h-6 washi-tape-pink rotate-2 rounded-sm border-dashed border-t border-b border-[#800000]/20" />

          <h3 className="font-serif text-xl font-extrabold text-[#141414] mb-4 flex items-center gap-2">
            <MessageCircleHeart className="w-5 h-5 text-[#800000]" />
            <span>Tuliskan Harapanmu</span>
          </h3>

          <form onSubmit={handleAddWish} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-stone-700 mb-1">
                Nama Pengirim:
              </label>
              <input
                type="text"
                value={authorInput}
                onChange={(e) => setAuthorInput(e.target.value)}
                placeholder="Contoh: Shareen (Birthday Girl)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-[#800000] focus:ring-2 focus:ring-[#FADADD] outline-none text-sm bg-white text-[#141414]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-stone-700 mb-1">
                Pesan / Harapan Manis:
              </label>
              <textarea
                rows={4}
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Tuliskan apapun harapanmu di usia baru ini..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-[#800000] focus:ring-2 focus:ring-[#FADADD] outline-none text-sm bg-white text-[#141414] resize-none font-sans"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-5 rounded-xl bg-[#800000] hover:bg-[#660000] text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>Tempel Harapan di Scrapbook</span>
            </button>
          </form>
        </div>

        {/* Sticky Notes Wall / Scrapbook Notes */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {wishes.map((wish, index) => {
            const rotations = ['-rotate-1', 'rotate-2', '-rotate-2', 'rotate-1'];
            const rot = rotations[index % rotations.length];
            const colors = ['bg-[#FEF9C3]', 'bg-[#FFE4E6]', 'bg-[#F0FDF4]', 'bg-[#EDE9FE]'];
            const noteColor = colors[index % colors.length];

            return (
              <div
                key={wish.id}
                className={`${noteColor} p-5 rounded-2xl polaroid-shadow border border-stone-300/40 relative transform ${rot} transition-transform hover:rotate-0 hover:scale-105 duration-300`}
              >
                {/* Pin clip on top */}
                <div className="w-3.5 h-3.5 rounded-full bg-[#800000] absolute -top-1.5 left-1/2 -translate-x-1/2 shadow-xs ring-2 ring-white" />

                <div className="flex items-center justify-between text-xs text-stone-600 mb-2 mt-1">
                  <span className="font-bold flex items-center gap-1 text-[#141414]">
                    <span>{wish.avatar}</span>
                    <span>{wish.author}</span>
                  </span>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-stone-500">{wish.date}</span>
                </div>

                <p className="font-['Dancing_Script'] text-xl sm:text-2xl text-[#141414] leading-snug font-bold">
                  "{wish.message}"
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
