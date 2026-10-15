# PRD — Tuntas: Aplikasi Manajemen Tugas Pribadi

**Versi dokumen:** 1.0  
**Status:** Draft untuk pengumpulan  
**Catatan sumber:** Brief asli tidak tersedia secara eksplisit. Dokumen ini disusun berdasarkan kode aktual, constraint wajib yang diberikan, dan arahan produk dari prompt pengerjaan. Gap terhadap brief yang tidak tersedia dicatat secara eksplisit.

---

## 1. Ringkasan Produk

Tuntas adalah aplikasi web produktivitas pribadi yang membantu pengguna mengelola tugas harian, memilih pekerjaan berikutnya berdasarkan prioritas, dan menyelesaikannya melalui sesi fokus terstruktur. Seluruh data disimpan secara lokal di browser pengguna tanpa memerlukan akun atau koneksi ke server.

### Masalah Pengguna

| Masalah | Solusi di Tuntas |
|---|---|
| Bingung harus mulai dari mana saat ada banyak tugas | Saran tugas berikutnya berdasarkan prioritas |
| Mudah terdistraksi saat bekerja | Timer Pomodoro dengan focus mode |
| Lupa sudah sampai mana pengerjaan tugas | Catatan progres per tugas |
| Butuh akses cepat ke sumber yang sering dipakai | Panel akses cepat dengan deteksi platform |
| Tidak ingin data tersebar ke layanan cloud | Semua data di Local Storage browser |

---

## 2. Target Pengguna

**Pengguna utama:** Individu (pelajar, mahasiswa, profesional mandiri) yang mengelola pekerjaan atau studi tanpa alat kolaborasi tim, menggunakan browser desktop atau mobile sehari-hari.

**Karakteristik:**
- Tidak membutuhkan kolaborasi atau berbagi tugas.
- Lebih suka alat ringan yang bisa langsung dipakai tanpa instalasi atau pendaftaran.
- Menghargai privasi — data tidak perlu keluar dari perangkat.

---

## 3. Ruang Lingkup

### 3.1 Fitur Wajib (dari constraint dan arahan produk)

| ID | Fitur |
|---|---|
| F-01 | Tambah, edit, hapus tugas dengan nama dan prioritas |
| F-02 | Status tugas: Belum dimulai / Sedang dikerjakan / Selesai |
| F-03 | Saran tugas berikutnya berdasarkan prioritas |
| F-04 | Timer Pomodoro (Start / Jeda / Reset) |
| F-05 | Pengaturan durasi timer (preset + kustom 1–180 menit) |
| F-06 | Catatan progres per tugas |
| F-07 | Akses cepat: tambah, edit, hapus, buka tautan |
| F-08 | Personalisasi nama panggilan |
| F-09 | Light / dark mode (manual + ikut sistem) |
| F-10 | Jam dan tanggal lokal realtime |
| F-11 | Onboarding / panduan interaktif (dapat dilewati, dapat dibuka ulang) |
| F-12 | Layout responsif (mobile, tablet, desktop) |
| F-13 | Seluruh data di Local Storage browser |

### 3.2 Challenge (dari arahan produk)

| ID | Challenge | Status Implementasi |
|---|---|---|
| CH-01 | Light / dark mode | Terimplementasi — toggle manual + deteksi `prefers-color-scheme` |
| CH-02 | Custom name in greeting | Terimplementasi — dialog ubah nama, sapaan diperbarui |
| CH-03 | Change Pomodoro time | Terimplementasi — form durasi dengan preset dan input kustom |
| CH-04 | Prevent duplicate tasks | Terimplementasi — validasi case-insensitive pada tugas aktif |
| CH-05 | Sort tasks | Terimplementasi — 4 opsi: Prioritas, Status, Terbaru, Terlama |

### 3.3 Hal di Luar Ruang Lingkup

- Sinkronisasi data lintas perangkat.
- Notifikasi audio / push notification saat timer selesai.
- Kolaborasi, berbagi, atau komentar antar pengguna.
- Backend, API, atau autentikasi.
- Ekspor/impor data.
- Sub-tugas atau hierarki tugas.
- Statistik produktivitas jangka panjang.
- Implementasi sebagai browser extension (proyek memilih bentuk web app).

---

## 4. Alur Pengguna Utama

### Alur 1: Tambah dan kerjakan tugas baru
1. Buka Tuntas → Beranda menampilkan ringkasan tugas.
2. Navigasi ke **Tugas** → isi nama tugas dan prioritas → klik **Tambah tugas**.
3. Kartu tugas muncul di daftar → klik kartu untuk membuka detail.
4. Di panel detail → klik **Mulai fokus** → pindah ke tab **Fokus** dengan timer berjalan.
5. Tugas otomatis berubah status ke *Sedang dikerjakan*.
6. Timer selesai → status tugas **tidak** berubah otomatis; pengguna menandai selesai secara manual.

### Alur 2: Melanjutkan pekerjaan dari catatan
1. Buka Tuntas → Beranda menampilkan saran tugas berdasarkan prioritas.
2. Klik **Kerjakan** / **Lanjutkan** → masuk ke Fokus dengan tugas terpilih.
3. Baca catatan progres di textarea → lanjutkan pekerjaan.
4. Simpan catatan progres terbaru → klik **Simpan catatan**.

### Alur 3: Mengatur tautan akses cepat
1. Navigasi ke **Akses Cepat** → klik **Tambah link**.
2. Isi nama dan URL di dialog → klik **Simpan**.
3. Tautan muncul dengan deteksi platform otomatis (GitHub, YouTube, GitLab, generic).
4. Klik nama tautan → dibuka di tab baru.
5. Edit atau hapus melalui menu tiga titik (⋮).

### Alur 4: Pengguna baru (onboarding)
1. Buka Tuntas untuk pertama kali → panduan interaktif muncul otomatis.
2. Klik **Lewati** untuk menutup panduan, atau ikuti seluruh langkah (19 langkah).
3. Status panduan tersimpan → panduan tidak muncul lagi otomatis.
4. Panduan dapat dibuka ulang kapan saja via tombol **?** di header.

---

## 5. Kebutuhan Fungsional (Ringkasan)

Rincian lengkap ada di `requirements.md`. Ringkasan per area:

| Area | Kebutuhan Utama |
|---|---|
| Tugas | CRUD, validasi duplikasi (case-insensitive, tugas aktif), persistensi via Local Storage |
| Prioritas | Tiga level (Tinggi/Sedang/Rendah), mempengaruhi urutan dan saran |
| Status | Tiga state (not_started/in_progress/completed), transisi dengan konfirmasi jika ada sesi aktif |
| Sorting | Empat opsi urutan; tugas selesai selalu di bawah tugas aktif |
| Timer | Start/Jeda/Reset; durasi dari state; persistensi sisa waktu via Local Storage |
| Catatan | Draft tersimpan dalam memori saat berpindah tab; konfirmasi discard |
| Tautan | CRUD; validasi URL http/https; deteksi platform otomatis |
| Nama | Dialog, validasi 1–30 karakter, tersimpan di state |
| Tema | Toggle manual; fallback ke system preference; tersimpan di state |

---

## 6. Kebutuhan Non-Fungsional

| ID | Kebutuhan | Status |
|---|---|---|
| NF-01 | Tidak ada dependensi jaringan untuk data pengguna | Terpenuhi |
| NF-02 | Waktu muat pertama < 2 detik pada koneksi normal (file statis) | Tidak diuji secara formal |
| NF-03 | Responsif di mobile (≤639px), tablet (640–1023px), desktop (≥1024px) | Terimplementasi |
| NF-04 | Navigasi keyboard penuh (Tab, Shift+Tab, Escape, Enter) | Sebagian — lihat gap di §8 |
| NF-05 | Kompatibel Chrome, Firefox, Edge, Safari versi modern | Belum diuji di semua browser |
| NF-06 | Tema tidak berkedip saat halaman dimuat (flash of incorrect theme) | Terimplementasi via `applyInitialTheme()` |
| NF-07 | Data tidak hilang saat halaman di-reload | Terimplementasi via Local Storage |
| NF-08 | Kegagalan penyimpanan tidak merusak sesi aktif | Terimplementasi — state tetap valid di memori |

---

## 7. Kriteria Keberhasilan yang Dapat Diperiksa

| ID | Kriteria | Cara Verifikasi |
|---|---|---|
| KK-01 | Tugas tersimpan dan muncul kembali setelah reload | Tambah tugas → reload halaman → periksa daftar |
| KK-02 | Duplikasi tugas aktif dicegah (case-insensitive) | Tambah "Belajar" → tambah "belajar" → cek pesan error |
| KK-03 | Sorting berfungsi untuk 4 opsi | Ubah dropdown sort → amati urutan kartu |
| KK-04 | Timer melanjutkan dari sisa waktu setelah reload | Jalankan timer → reload → periksa sisa waktu |
| KK-05 | Tema tersimpan setelah reload | Toggle tema → reload → periksa tema aktif |
| KK-06 | Nama panggilan muncul di sapaan | Ubah nama → periksa heading "Selamat pagi, [nama]." |
| KK-07 | Durasi timer kustom tersimpan | Atur 45 menit → terapkan → reload → periksa nilai |
| KK-08 | Catatan progres tersimpan per tugas | Isi catatan → simpan → pilih tugas lain → kembali → cek catatan |
| KK-09 | Tautan dibuka di tab baru | Klik nama tautan → periksa tab baru terbuka |
| KK-10 | Panduan dapat dilewati dan dibuka ulang | Skip panduan → klik tombol ? → panduan terbuka |

---

## 8. Constraint, Asumsi, dan Gap

### Constraint
- TC-1: HTML + CSS + Vanilla JS. Tidak ada framework. ✓ Terpenuhi.
- TC-2: Local Storage API. ✓ Terpenuhi.
- TC-3: Web app modern browser. Implementasi ada; pengujian lintas browser belum dilakukan.

### Asumsi
- Pengguna menggunakan satu browser/perangkat (tidak ada sinkronisasi).
- Data pengguna tidak bersifat sensitif — tidak ada enkripsi tambahan yang dibutuhkan.
- Koneksi internet hanya diperlukan untuk memuat halaman pertama kali (jika dihosting); tidak ada CDN asset eksternal.

### Gap yang Ditemukan

| ID Gap | Deskripsi | Dampak |
|---|---|---|
| GAP-01 | Brief asli tidak tersedia — dokumen ini tidak dapat mengonfirmasi semua ketentuan brief secara penuh | Beberapa requirement mungkin tidak tercakup |
| GAP-02 | Notifikasi saat timer selesai belum ada (tidak ada audio/visual alert) | Timer selesai tidak memperingatkan pengguna yang berpindah tab |
| GAP-03 | Pengujian lintas browser (Firefox, Edge, Safari) belum dilakukan | Kompatibilitas TC-3 belum dapat dikonfirmasi penuh |
| GAP-04 | Tidak ada feedback konfirmasi penghapusan dengan undo — hapus bersifat permanen | Risiko kehilangan data tugas |
| GAP-05 | Keyboard shortcut tidak didokumentasikan; aksesibilitas penuh belum diverifikasi dengan screen reader | Aksesibilitas belum terverifikasi secara menyeluruh |

---

## 9. Rencana Pengembangan Masa Depan (Di luar scope saat ini)

Item berikut adalah kandidat peningkatan yang **tidak termasuk** dalam scope pengumpulan saat ini:

- Notifikasi audio atau visual saat timer selesai.
- Ekspor daftar tugas (JSON/CSV).
- Statistik harian/mingguan (jumlah tugas selesai, total waktu fokus).
- Keyboard shortcuts untuk aksi umum (tambah tugas, mulai timer).
- Undo untuk penghapusan tugas dan tautan.
- Dukungan gesture swipe pada mobile untuk aksi kartu tugas.
