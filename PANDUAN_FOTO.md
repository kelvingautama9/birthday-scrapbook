# 📸 Panduan Lengkap Upload & Ganti Foto (Manual via GitHub)

Dokumen ini berisi panduan direktori folder, aturan penamaan file, dan letak foto yang akan ditampilkan pada website romantis **Kelvin & Shareen**.

---

## 📁 1. Lokasi Direktori Folder di GitHub

Semua foto statis diletakkan di dalam folder:
```
📁 public/
   ├── 🖼️ shareen.png          (Foto Utama Hero Polaroid)
   ├── 🖼️ timeline-1.jpg       (Timeline Kenalan Online)
   ├── 🖼️ timeline-2.jpg       (Timeline First Date)
   ├── 🖼️ timeline-3.jpg       (Timeline Resmi Jadian)
   ├── 🖼️ timeline-4.jpg       (Timeline Our Memory / Sweet Moment)
   ├── 🖼️ timeline-5.jpg       (Timeline Spesial Ulang Tahun)
   ├── 🖼️ gallery-1.jpg        (Galeri: Senyuman Favoritku)
   ├── 🖼️ gallery-2.jpg        (Galeri: Cafe Date Berdua)
   ├── 🖼️ gallery-3.jpg        (Galeri: Tatap Matamu)
   ├── 🖼️ gallery-4.jpg        (Galeri: Silly & Happy Moments)
   ├── 🖼️ gallery-5.jpg        (Galeri: Sunset Jalan Berdua)
   └── 🖼️ gallery-6.jpg        (Galeri: Hari Spesial Shareen)
```

> 💡 **Catatan Penting**: Folder `public/` di Vite adalah folder aset publik. Setiap file yang kamu letakkan langsung di dalam `public/` dapat diakses langsung oleh browser (misalnya `/shareen.png` atau `/timeline-1.jpg`) tanpa perlu build ulang dan akan selalu muncul di device manapun.

---

## 📋 2. Tabel Daftar File & Letak Tampilannya

| Nama File di `public/` | Bagian / Section Website | Deskripsi / Judul Momen | Rasio Rekomendasi |
| :--- | :--- | :--- | :--- |
| **`shareen.png`** *(atau `image.png`)* | **Hero Section** (Paling Atas) | **"My Favorite Person"**<br>Polaroid utama Shareen dengan caption *"Love of my life"*, *"Kelvin & Shareen • Forever & Always"*, dan stiker *"✨ My Little Princess🤫"*. | Vertikal / Portrait (4:5 atau 1:1) |
| **`timeline-1.jpg`** | **Love Story (Timeline #1)** | **"Pertama Kali Kenal ✨"**<br>Momen kenalan online di Line Openchat, notice Shareen pelihara tikus bernama Miyo. | Horizontal (16:10 atau 4:3) |
| **`timeline-2.jpg`** | **Love Story (Timeline #2)** | **"First Date ☕"**<br>First date di Central Park (CP), ketemu di Boost saat Shareen glow up dan bikin Kelvin meleleh. | Horizontal (16:10 atau 4:3) |
| **`timeline-3.jpg`** | **Love Story (Timeline #3)** | **"Hari Resmi Jadian Kita 💍"**<br>31 Januari 2026, momen jadian di eskalator Grand Indonesia (GI) menjelang pulang. | Horizontal (16:10 atau 4:3) |
| **`timeline-4.jpg`** | **Love Story (Timeline #4)** | **"Sweet Moment 🚗"**<br>Our Memory: jalan cari makan, baking, nonton bareng, dan deep talk tengah malam. | Horizontal (16:10 atau 4:3) |
| **`timeline-5.jpg`** | **Love Story (Timeline #5)** | **"Spesial Ulang Tahun My Princess 🎉"**<br>9 September 2026: Ucapan doa ulang tahun & harapan kebersamaan. | Horizontal (16:10 atau 4:3) |
| **`gallery-1.jpg`** | **Our Gallery (Foto #1)** | **"Senyuman Favoritku"**<br>Caption: *Senyum tercantik yang selalu berhasil bikin hariku tenang.* | Portrait / Square (4:4.5 atau 1:1) |
| **`gallery-2.jpg`** | **Our Gallery (Foto #2)** | **"Cafe Date Berdua"**<br>Caption: *Waktu berhenti setiap kali kita duduk berhadapan sambil ngobrol.* | Portrait / Square (4:4.5 atau 1:1) |
| **`gallery-3.jpg`** | **Our Gallery (Foto #3)** | **"Tatap Matamu"**<br>Caption: *Di matamu, aku menemukan rumah tempat hatiku ingin selalu pulang.* | Portrait / Square (4:4.5 atau 1:1) |
| **`gallery-4.jpg`** | **Our Gallery (Foto #4)** | **"Silly & Happy Moments"**<br>Caption: *Tawa lepasmu adalah melodi paling indah yang pernah kudengar.* | Portrait / Square (4:4.5 atau 1:1) |
| **`gallery-5.jpg`** | **Our Gallery (Foto #5)** | **"Sunset Jalan Berdua"**<br>Caption: *Sunset-nya indah, tapi tetap kalah indah dibanding pemandangan di sampingku.* | Portrait / Square (4:4.5 atau 1:1) |
| **`gallery-6.jpg`** | **Our Gallery (Foto #6)** | **"Hari Spesial Shareen"**<br>Caption: *Selamat ulang tahun bidadariku! Panjang umur dan bahagia selalu yaa.* | Portrait / Square (4:4.5 atau 1:1) |

---

## 🚀 3. Cara Upload Foto Manual ke GitHub

### Cara 1: Lewat Web GitHub (Paling Mudah)
1. Buka repository website kamu di **GitHub.com** melalui browser di laptop/HP.
2. Klik dan buka folder **`public`**.
3. Di pojok kanan atas folder, klik tombol **`Add file`** lalu pilih **`Upload files`**.
4. Drag & drop atau pilih file foto dari komputer kamu.
   - **Pastikan nama file sudah diganti terlebih dahulu** sesuai tabel di atas (contoh: `shareen.png`, `timeline-1.jpg`, `gallery-1.jpg`).
   - Huruf kecil semua (*lowercase*), tanpa spasi.
5. Scroll ke bawah, pada bagian *Commit changes*, klik tombol hijau **`Commit changes`**.
6. Selesai! Website kamu (misalnya yang di-host di Vercel, Netlify, atau GitHub Pages) akan otomatis update dan menampilkan foto aslimu.

### Cara 2: Lewat Git Command Line (Terminal)
Jika kamu clone repository ke laptop:
```bash
# 1. Masuk ke folder proyek
cd kelvin-shareen-app

# 2. Copy foto-foto kamu ke dalam folder public/
cp /path/ke/foto-kamu/shareen.png public/shareen.png
cp /path/ke/foto-kamu/timeline-1.jpg public/timeline-1.jpg
# ... ulangi untuk file lainnya

# 3. Commit dan Push ke GitHub
git add public/
git commit -m "feat: tambahkan foto asli Kelvin dan Shareen"
git push origin main
```

---

## 💡 4. Tips & Pertanyaan Umum

- **Apakah format `.png` dan `.jpg` bisa dipakai?**
  Bisa! Kode aplikasi sudah disiapkan dengan penamaan standar `.png` untuk foto hero utama (`shareen.png` / `image.png`), dan `.jpg` untuk timeline/gallery.
- **Bagaimana jika saya belum sempat upload semua foto?**
  Tenang saja, sistem sudah dilengkapi **otomatisasi fallback**. Jika suatu foto belum kamu upload, website akan tetap menampilkan foto estetik cadangan sehingga tidak akan pernah muncul ikon gambar rusak (broken image). Begitu kamu upload foto aslimu dengan nama yang sesuai, foto aslimu akan langsung menggantikannya secara otomatis.
- **Apakah ukuran foto mempengaruhi kecepatan loading?**
  Disarankan ukuran per foto antara **200 KB hingga 1.5 MB** agar website tetap terbuka sangat cepat dan hemat kuota saat Shareen membukanya di HP.
