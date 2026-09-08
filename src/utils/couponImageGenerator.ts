import { LoveCoupon } from '../types';

/**
 * Helper untuk menggambar rounded rectangle pada canvas
 */
function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/**
 * Render Kupon Cinta resolusi tinggi (840x480) ke HTML Canvas
 */
export function renderCouponToCanvas(coupon: LoveCoupon): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 840;
  canvas.height = 480;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // 1. Background Cream Lembut
  ctx.fillStyle = '#FDFBF7';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Garis Tepi Ganda Mewah (Outer & Inner Border)
  ctx.strokeStyle = '#800000';
  ctx.lineWidth = 4;
  drawRoundedRect(ctx, 20, 20, canvas.width - 40, canvas.height - 40, 24);
  ctx.stroke();

  // Inner Dashed Border
  ctx.save();
  ctx.strokeStyle = '#800000';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([8, 6]);
  drawRoundedRect(ctx, 30, 30, canvas.width - 60, canvas.height - 60, 18);
  ctx.stroke();
  ctx.restore();

  // 3. Ticket Perforations (Lingkaran Potongan Tiket di Kiri & Kanan)
  ctx.fillStyle = '#F4EDE4'; // Warna bayangan luar
  ctx.beginPath();
  ctx.arc(20, canvas.height / 2, 22, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(canvas.width - 20, canvas.height / 2, 22, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // 4. Garis Sobekan Tiket (Perforation Divider Vertikal antara Tiket & Stub)
  const dividerX = 590;
  ctx.save();
  ctx.strokeStyle = '#800000';
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 6]);
  ctx.beginPath();
  ctx.moveTo(dividerX, 32);
  ctx.lineTo(dividerX, canvas.height - 32);
  ctx.stroke();
  ctx.restore();

  // Potongan lingkaran kecil di atas & bawah garis divider
  ctx.fillStyle = '#FDFBF7';
  ctx.beginPath();
  ctx.arc(dividerX, 20, 14, 0, Math.PI * 2);
  ctx.arc(dividerX, canvas.height - 20, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#800000';
  ctx.lineWidth = 2;
  ctx.stroke();

  // 5. Dekorasi Pita Washi Tape di Atas Kiri
  ctx.save();
  ctx.translate(65, 12);
  ctx.rotate(-0.04);
  ctx.fillStyle = '#FADADD';
  ctx.fillRect(0, 0, 130, 26);
  ctx.strokeStyle = '#800000';
  ctx.lineWidth = 1;
  ctx.strokeRect(0, 0, 130, 26);
  ctx.fillStyle = '#800000';
  ctx.font = 'bold 10px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('SPECIAL EDITION', 65, 17);
  ctx.restore();

  // 6. Header Tiket (Sisi Kiri Utama)
  ctx.fillStyle = '#800000';
  ctx.font = 'bold 13px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('✦ KUPON CINTA SPESIAL SHAREEN & KELVIN ✦', 60, 80);

  // 7. Judul Kupon (Besar & Elegan)
  ctx.fillStyle = '#141414';
  ctx.font = 'bold 32px Georgia, serif';
  ctx.fillText(coupon.title, 60, 135);

  // 8. Badge Kode Voucher
  ctx.fillStyle = '#FADADD';
  drawRoundedRect(ctx, 60, 155, 160, 32, 16);
  ctx.fill();
  ctx.strokeStyle = '#800000';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#800000';
  ctx.font = 'bold 14px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(`KODE: ${coupon.code}`, 140, 176);

  // 9. Deskripsi / Subtitle Kupon (Multi-line wrapping)
  ctx.textAlign = 'left';
  ctx.fillStyle = '#444444';
  ctx.font = '16px sans-serif';
  const subtitle = coupon.subtitle;
  const maxWidth = 480;
  const words = subtitle.split(' ');
  let line = '';
  let yPos = 225;

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && i > 0) {
      ctx.fillText(line, 60, yPos);
      line = words[i] + ' ';
      yPos += 26;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, 60, yPos);

  // 10. Syarat & Ketentuan Lucu di Bawah
  const isOneTime = coupon.usageLimit === '1x' || coupon.code.includes('1X') || coupon.title.includes('(1x)');

  ctx.fillStyle = '#800000';
  ctx.font = 'italic bold 13px Georgia, serif';
  ctx.fillText(
    isOneTime
      ? '✓ Berlaku Khusus 1x Pemakaian (Single-Use Special Date)'
      : '✓ Berlaku Seumur Hidup • Bebas Digunakan Kapanpun (Unlimited)',
    60,
    370
  );
  ctx.fillStyle = '#666666';
  ctx.font = '12px sans-serif';
  ctx.fillText('✓ Klaim langsung ke Kelvin kapanpun!', 60, 395);
  ctx.fillText('✓ Kelvin WAJIB menuruti tanpa alasan apapun! 💖', 60, 418);

  // =========================================================================
  // 11. SISI STUB TIKET (Kanan: x > 600)
  // =========================================================================
  ctx.fillStyle = '#800000';
  ctx.font = 'bold 11px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('CLAIM STUB', 710, 75);

  ctx.fillStyle = '#666666';
  ctx.font = '11px sans-serif';
  ctx.fillText('FOR KELVIN', 710, 95);

  // Cap Stempel Merah Vintage "APPROVED & TERKLAIM"
  ctx.save();
  ctx.translate(710, 240);
  ctx.rotate(-0.16);

  // Stempel Outer Circle / Oval
  ctx.strokeStyle = '#BE123C';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(0, 0, 85, 75, 0, 0, Math.PI * 2);
  ctx.stroke();

  // Stempel Inner Dashed Circle
  ctx.setLineDash([4, 3]);
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.ellipse(0, 0, 76, 66, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  // Teks Stempel
  ctx.fillStyle = '#BE123C';
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText('★ OFFICIAL CLAIM ★', 0, -32);
  ctx.font = 'bold 20px Georgia, serif';
  ctx.fillText('TERKLAIM', 0, -2);
  ctx.font = 'bold 11px sans-serif';
  ctx.fillText('KELVIN ❤️ SHAREEN', 0, 24);
  ctx.font = 'italic 10px sans-serif';
  ctx.fillText(isOneTime ? '1X SPECIAL PASS' : 'LIFETIME VOUCHER', 0, 44);

  ctx.restore();

  // Teks di Bagian Bawah Stub
  ctx.fillStyle = '#800000';
  ctx.font = 'bold 11px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(isOneTime ? 'VALID FOR 1X USE' : 'VALID FOREVER', 710, 410);

  return canvas;
}

/**
 * Mendownload Kupon sebagai file PNG beresolusi tinggi ke perangkat pengguna
 */
export function downloadCouponImage(coupon: LoveCoupon) {
  const canvas = renderCouponToCanvas(coupon);
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = `Kupon-Shareen-${coupon.code}.png`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
