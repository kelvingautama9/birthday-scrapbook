import confetti from 'canvas-confetti';

/**
 * Efek animasi confetti meletus bertingkat untuk perayaan ulang tahun Shareen ke-24.
 * Menghadirkan ledakan meriam dari tengah, kiri, dan kanan dengan taburan warna romantis & festive.
 */
export function triggerBirthdayCelebrationConfetti() {
  try {
    // 1. Ledakan Utama di Tengah (Pop Pertama)
    confetti({
      particleCount: 110,
      spread: 90,
      origin: { y: 0.55, x: 0.5 },
      colors: ['#800000', '#FADADD', '#FFD700', '#FF69B4', '#FFF1F2', '#E11D48'],
      startVelocity: 45,
      zIndex: 9999,
      scalar: 1.15,
    });

    // 2. Meriam Confetti Kiri (Sudut 60 derajat menembak ke atas-kanan)
    setTimeout(() => {
      confetti({
        particleCount: 85,
        angle: 60,
        spread: 65,
        origin: { x: 0.05, y: 0.75 },
        colors: ['#800000', '#FFD700', '#FADADD', '#F43F5E', '#FB7185'],
        startVelocity: 55,
        zIndex: 9999,
      });
    }, 200);

    // 3. Meriam Confetti Kanan (Sudut 120 derajat menembak ke atas-kiri)
    setTimeout(() => {
      confetti({
        particleCount: 85,
        angle: 120,
        spread: 65,
        origin: { x: 0.95, y: 0.75 },
        colors: ['#800000', '#FFD700', '#FADADD', '#F43F5E', '#FB7185'],
        startVelocity: 55,
        zIndex: 9999,
      });
    }, 380);

    // 4. Hujan Emas & Pink Berkelip (Romantic Birthday Sparkle Rain)
    setTimeout(() => {
      confetti({
        particleCount: 75,
        spread: 120,
        origin: { y: 0.25, x: 0.5 },
        colors: ['#FFD700', '#FADADD', '#800000', '#FFFFFF', '#F43F5E'],
        gravity: 0.75,
        ticks: 320,
        scalar: 1.25,
        zIndex: 9999,
      });
    }, 650);

    // 5. Salvo penutup kejutan ulang tahun ke-24
    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 90,
        spread: 110,
        origin: { y: 0.6, x: 0.5 },
        colors: ['#FFD700', '#FF69B4', '#800000', '#FADADD'],
        startVelocity: 38,
        zIndex: 9999,
      });
    }, 1000);
  } catch (err) {
    console.error('Confetti animation error:', err);
  }
}
