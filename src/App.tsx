/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Heart, Sparkles, Lock, Star, Music, Cake } from 'lucide-react';
import { FloatingHearts } from './components/FloatingHearts';
import { GateLockScreen } from './components/GateLockScreen';
import { HeroWelcome } from './components/HeroWelcome';
import { LoveDaysCounter } from './components/LoveDaysCounter';
import { OurJourneyTimeline } from './components/OurJourneyTimeline';
import { PolaroidGallery } from './components/PolaroidGallery';
import { SecretLoveLetter } from './components/SecretLoveLetter';
import { PlayfulPrankSection } from './components/PlayfulPrankSection';
import { LoveCouponsSection } from './components/LoveCouponsSection';
import { BirthdayWishesCapsule } from './components/BirthdayWishesCapsule';
import { MusicFloatingPlayer } from './components/MusicFloatingPlayer';
import { romanticMusicBox, triggerHaptic } from './utils/soundAndHaptics';

export default function App() {
  // Gating status: starts as locked (false)
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Toggle BGM player
  const handleToggleMusic = () => {
    const nextState = romanticMusicBox.toggle();
    setIsMusicPlaying(nextState);
  };

  const handleUnlock = () => {
    setIsUnlocked(true);
    // Auto-start soft romantic music box melody upon unlocking
    if (!isMusicPlaying) {
      romanticMusicBox.start();
      setIsMusicPlaying(true);
    }
  };

  const handleRelock = () => {
    triggerHaptic('light');
    setIsUnlocked(false);
    romanticMusicBox.stop();
    setIsMusicPlaying(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#141414] relative overflow-x-hidden selection:bg-[#FADADD] selection:text-[#800000]">
      {/* Decorative Geometric Accents from Theme */}
      <div className="absolute top-20 right-[35%] w-32 h-32 border-4 border-[#FADADD]/40 rounded-full mix-blend-multiply animate-pulse pointer-events-none z-0" />
      <div className="absolute bottom-10 left-[45%] w-16 h-16 border-2 border-[#800000]/10 rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/2 left-4 w-12 h-1 bg-[#FADADD] -rotate-45 pointer-events-none z-0" />

      {/* 3D Floating Hearts in the background */}
      <FloatingHearts density={isUnlocked ? 20 : 12} />

      {/* Floating Music Player (Bottom Right) */}
      {isUnlocked && (
        <MusicFloatingPlayer
          isPlaying={isMusicPlaying}
          onToggle={handleToggleMusic}
        />
      )}

      {/* 1. GATE / LOCK SCREEN (HALAMAN DEPAN) */}
      {!isUnlocked ? (
        <GateLockScreen onUnlock={handleUnlock} />
      ) : (
        /* MAIN SCRAPBOOK CONTENT AFTER UNLOCKING */
        <div className="relative z-10 animate-fadeIn transition-opacity duration-700">
          
          {/* Top Decorative Floating Banner / Nav */}
          <header className="sticky top-0 z-30 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#800000]/20 py-3 px-4 sm:px-8 shadow-xs">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#800000] text-white flex items-center justify-center shadow-xs">
                  <Heart className="w-4 h-4 fill-white animate-soft-pulse" />
                </div>
                <div>
                  <span className="font-['Dancing_Script'] text-2xl sm:text-3xl font-bold text-[#800000] tracking-wide">
                    Kelvin & Shareen
                  </span>
                  <span className="hidden sm:inline text-xs font-bold uppercase tracking-widest text-[#800000]/60 font-sans ml-3">
                    Est. 31.01.2026
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#FADADD] text-[#800000] text-xs font-bold uppercase tracking-widest shadow-xs">
                  <Cake className="w-3.5 h-3.5" />
                  <span>Special Birthday Edition (9 Sep)</span>
                </div>

                <button
                  type="button"
                  onClick={handleRelock}
                  title="Kunci kembali scrapbook"
                  className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#800000] bg-[#FADADD]/50 hover:bg-[#FADADD] border border-[#800000]/20 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">Kunci Web</span>
                </button>
              </div>
            </div>
          </header>

          <main>
            {/* 2. HERO SECTION (WELCOME & KALENDER SEPTEMBER 2026) */}
            <HeroWelcome
              isMusicPlaying={isMusicPlaying}
              onToggleMusic={handleToggleMusic}
            />

            {/* LIVE DAYS COUNTER */}
            <LoveDaysCounter />

            {/* 3. OUR JOURNEY (VERTICAL TIMELINE) */}
            <OurJourneyTimeline />

            {/* 4. POLAROID SCRAPBOOK GALLERY (SCATTERED AESTHETIC) */}
            <PolaroidGallery />

            {/* 5. SECRET LOVE LETTER (INTERACTIVE ENVELOPE) */}
            <SecretLoveLetter />

            {/* 6. PLAYFUL PRANK SECTION (RUNAWAY BUTTON) */}
            <PlayfulPrankSection />

            {/* 7. LOVE COUPONS (VOUCHER CINTA INTERAKTIF) */}
            <LoveCouponsSection />

            {/* 8. BIRTHDAY WISHES CAPSULE */}
            <BirthdayWishesCapsule />
          </main>

          {/* Romantic Scrapbook Footer with Bold Typography Styling */}
          <footer className="mt-20 py-12 px-4 border-t border-[#800000]/20 bg-[#FAF8F3] paper-texture text-center relative">
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#FADADD] text-[#800000] mx-auto flex items-center justify-center shadow-xs">
                <Heart className="w-6 h-6 fill-[#800000] animate-soft-pulse" />
              </div>

              <h4 className="font-['Dancing_Script'] text-3xl sm:text-5xl text-[#800000] font-bold">
                Happy Birthday, My Beloved Shareen!
              </h4>

              <p className="text-sm sm:text-base text-stone-700 font-sans max-w-lg mx-auto leading-relaxed">
                Terima kasih telah menjadi bagian paling indah di hidupku. Semoga kita bakal tetep terus langgep sampai hari tua ya sayang ❤️😊
              </p>

              <div className="pt-4 border-t border-[#800000]/10 flex flex-col sm:flex-row justify-between items-center text-[10px] uppercase tracking-widest font-bold text-[#800000]/60 gap-2">
                <span>© 2026 Crafted with love by your favorite person</span>
                <div className="flex gap-4">
                  <span>Est. 31.01.26</span>
                  <span>•</span>
                  <span>Infinity & Beyond</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}
