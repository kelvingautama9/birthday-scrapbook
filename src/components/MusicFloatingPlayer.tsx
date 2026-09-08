import React from 'react';
import { VolumeX, Disc, SkipForward } from 'lucide-react';
import { triggerHaptic } from '../utils/soundAndHaptics';

interface MusicFloatingPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
  currentTrackTitle?: string;
  onNextTrack?: () => void;
}

export const MusicFloatingPlayer: React.FC<MusicFloatingPlayerProps> = ({
  isPlaying,
  onToggle,
  currentTrackTitle,
  onNextTrack,
}) => {
  const handleClick = () => {
    triggerHaptic('light');
    onToggle();
  };

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerHaptic('medium');
    onNextTrack?.();
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <div
        id="floating-music-container"
        onClick={handleClick}
        className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-full shadow-xl transition-all duration-300 cursor-pointer select-none ${
          isPlaying
            ? 'bg-[#800000] text-white ring-4 ring-[#FADADD] scale-105'
            : 'bg-[#FDFBF7] text-[#141414] hover:text-[#800000] border border-[#800000]/20 hover:border-[#800000]'
        }`}
        title={isPlaying ? `Sedang memutar: ${currentTrackTitle || 'Song'}. Klik untuk jeda.` : 'Putar Song'}
      >
        {/* Animated Vinyl Disc Icon */}
        <div className="relative flex items-center justify-center">
          <Disc
            className={`w-5 h-5 ${
              isPlaying ? 'animate-spin text-[#FADADD]' : 'text-[#800000]'
            }`}
            style={{ animationDuration: '4s' }}
          />
        </div>

        {/* Text & Sound Waves */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider">
            {isPlaying && currentTrackTitle ? `Song: ${currentTrackTitle}` : 'Song'}
          </span>

          {isPlaying ? (
            <div className="flex items-end gap-0.5 h-3.5">
              <span className="w-1 bg-[#FADADD] rounded-full animate-[bounce_0.8s_infinite]" />
              <span className="w-1 bg-[#FADADD] rounded-full animate-[bounce_1.1s_infinite]" style={{ animationDelay: '0.2s' }} />
              <span className="w-1 bg-[#FADADD] rounded-full animate-[bounce_0.9s_infinite]" style={{ animationDelay: '0.4s' }} />
            </div>
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-stone-400" />
          )}
        </div>

        {/* Skip to Next Song Button (Active when playlist is playing) */}
        {isPlaying && onNextTrack && (
          <button
            type="button"
            onClick={handleSkip}
            className="ml-1 p-1 hover:bg-white/20 rounded-full transition-colors text-[#FADADD] hover:text-white"
            title="Lanjut ke lagu berikutnya"
          >
            <SkipForward className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        )}
      </div>
    </div>
  );
};
