import React, { useMemo } from 'react';

interface FloatingHeartsProps {
  density?: number;
}

export const FloatingHearts: React.FC<FloatingHeartsProps> = ({ density = 18 }) => {
  // Generate random stable particles for floating hearts
  const hearts = useMemo(() => {
    return Array.from({ length: density }).map((_, i) => ({
      id: i,
      left: `${(i * (100 / density) + Math.random() * 5).toFixed(1)}%`,
      size: Math.floor(Math.random() * 18) + 14, // 14px to 32px
      duration: (Math.random() * 10 + 12).toFixed(1), // 12s to 22s
      delay: (Math.random() * 12).toFixed(1),
      swayDuration: (Math.random() * 4 + 3).toFixed(1),
      opacity: (Math.random() * 0.35 + 0.15).toFixed(2),
      rotate: Math.floor(Math.random() * 60) - 30,
      color: ['#FDA4AF', '#F43F5E', '#FB7185', '#BE123C', '#FECDD3'][i % 5],
    }));
  }, [density]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute -bottom-10"
          style={{
            left: heart.left,
            animation: `floatUp ${heart.duration}s linear infinite`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          <div
            style={{
              animation: `sway ${heart.swayDuration}s ease-in-out infinite alternate`,
              transform: `rotate(${heart.rotate}deg)`,
            }}
          >
            <svg
              width={heart.size}
              height={heart.size}
              viewBox="0 0 24 24"
              fill={heart.color}
              style={{ opacity: heart.opacity }}
              className="drop-shadow-sm filter"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </div>
      ))}

      {/* Embedded keyframe styles for smooth hardware-accelerated animations */}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(0.8);
            opacity: 0;
          }
          10% {
            opacity: 0.9;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-115vh) scale(1.15);
            opacity: 0;
          }
        }
        @keyframes sway {
          0% {
            transform: translateX(-16px) rotate(-15deg);
          }
          100% {
            transform: translateX(16px) rotate(15deg);
          }
        }
      `}</style>
    </div>
  );
};
