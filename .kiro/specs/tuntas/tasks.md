# Tasks — Tuntas: Status Implementasi dan Pekerjaan Tersisa

**Versi:** 1.0  
**Catatan:** Checkbox dicentang hanya jika ada bukti implementasi di kode aktual (`index.html`, `style.css`, `app.js`). Pengujian yang belum dijalankan secara formal tetap ditandai belum selesai.

---

## Kelompok 1 — Fondasi Teknis

### 1.1 Stack dan Struktur
- [x] HTML semantik sebagai struktur halaman (`index.html`) — REQ-TC-1
- [x] CSS dengan custom properties untuk styling — REQ-TC-1
- [x] Vanilla JavaScript (`app.js`, `"use strict"`) — REQ-TC-1
- [x] Tidak ada framework atau build tool — REQ-TC-1
- [x] Dua kunci Local Storage (`tuntas:v1`, `tuntas:onboarding`) — REQ-TC-2
- [x] Entry point tunggal (`index.html`) dapat dijalankan langsung di browser — REQ-TC-1

### 1.2 State dan Penyimpanan
- [x] `createInitialState()` menghasilkan state kosong dengan nilai default — REQ-D-01
- [x] `loadState()` membaca dan memvalidasi data dari localStorage — REQ-D-02
- [x] `isValidState()` memvalidasi struktur data sebelum digunakan — REQ-D-02
- [x] `saveState()` menyimpan state dan mengembalikan boolean sukses/gagal — REQ-D-01
- [x] Kegagalan penyimpanan menampilkan pesan error; state sesi tetap valid — REQ-D-01
- [x] Sesi sementara digunakan jika data tidak valid tanpa menimpa data lama — REQ-D-02
- [x] `migrateState()` menangani schema v1 dan v2 ke v3 — REQ-D-03
- [x] Notifikasi ditampilkan setelah migrasi berhasil — REQ-D-03
- [x] Schema version saat ini: 3 — REQ-D-03

### 1.3 Inisialisasi
- [x] `applyInitialTheme()` berjalan sebelum DOMContentLoaded untuk mencegah flash tema — REQ-P-02
- [x] `collectElements()` melakukan cache semua referensi DOM — IMPL
- [x] `initApp()` memanggil semua fungsi init dan render secara berurutan — IMPL
- [x] `setInterval(1s)` mengupdate jam dan timer setiap detik — REQ-P-03, REQ-F-01

---

## Kelompok 2 — Navigasi

- [x] Routing berbasis URL hash (`#beranda`, `#tugas`, `#fokus`, `#akses-cepat`) — IMPL
- [x] `renderActiveView()` menampilkan view yang sesuai dengan hash aktif — IMPL
- [x] `aria-current="page"` diset pada nav link aktif — IMPL
- [x] Hash default ke `#beranda` jika hash tidak dikenali — IMPL
- [x] Navigasi back/forward browser berfungsi via `hashchange` event — IMPL
- [x] Klik link internal (`<a href="#...">`) dicegat dan diproses oleh `navigateToView()` — IMPL

---

## Kelompok 3 — Manajemen Tugas

### 3.1 Tambah Tugas
- [x] Form tambah tugas: input nama (maks 120 karakter) dan select prioritas — REQ-T-01
- [x] Validasi nama kosong dengan pesan error dan aria-invalid — REQ-T-02
- [x] Validasi duplikasi (case-insensitive, hanya tugas aktif) — REQ-T-03
- [x] Tugas baru dibuat dengan UUID, createdAt, updatedAt, status `not_started` — REQ-T-01
- [x] State disimpan ke localStorage setelah tambah — REQ-T-01
- [x] Form di-reset dan fokus kembali ke input nama setelah berhasil — REQ-T-01

### 3.2 Edit Tugas
- [x] Dialog edit tugas dengan input nama dan select prioritas — REQ-T-04
- [x] Validasi nama dan duplikasi saat edit (excludedTaskId) — REQ-T-04
- [x] `task.updatedAt` diperbarui saat edit — REQ-T-04
- [x] Dialog ditutup dan daftar diperbarui setelah edit berhasil — REQ-T-04

### 3.3 Hapus Tugas
- [x] Dialog konfirmasi sebelum hapus — REQ-T-05
- [x] `selectedTaskId` direset jika tugas yang dihapus sedang dipilih — REQ-T-05
- [x] Timer direset jika timer terhubung ke tugas yang dihapus — REQ-T-05
- [x] Draft catatan dari memori dihapus saat tugas dihapus — REQ-T-05

### 3.4 Status Tugas
- [x] Checkbox pada kartu: toggle `completed` ↔ `not_started` — REQ-T-06
- [x] Dropdown status di panel detail (Belum dimulai / Sedang dikerjakan / Selesai) — REQ-T-06
- [x] Membuka kembali tugas completed diset ke `not_started` — REQ-T-06
- [x] Membuka kembali tugas dengan nama duplikat aktif ditolak dengan pesan error — REQ-T-06
- [x] Konfirmasi reset timer saat perubahan status melepas timer — REQ-T-06
- [x] `task.updatedAt` diperbarui saat status berubah — REQ-T-06

### 3.5 Pengurutan Tugas
- [x] Dropdown sort dengan 4 opsi: Prioritas, Status, Terbaru, Terlama — REQ-T-07
- [x] Tugas completed selalu di bawah tugas aktif (semua opsi sort) — REQ-T-07
- [x] Pengurutan hanya mengubah tampilan, tidak mengubah array `state.tasks` — REQ-T-07

### 3.6 Detail Tugas
- [x] Panel detail menampilkan: judul, prioritas, status, info sesi, tombol aksi, catatan — REQ-T-08
- [x] `selectedTaskId` disimpan ke localStorage — REQ-T-08
- [x] Detail inline pada desktop lebar (≥1200px), dialog pada <1200px — REQ-T-08
- [x] Tombol tutup detail berfungsi — REQ-T-08
- [x] Preview catatan (2 baris, klik untuk select task) pada kartu tugas — IMPL

---

## Kelompok 4 — Timer Pomodoro

- [x] Tombol Start, Jeda (Stop), Reset — REQ-F-01
- [x] Timer menggunakan `endAt` (timestamp absolut) untuk akurasi lintas tab — REQ-F-01
- [x] Status timer: idle, running, paused, finished — REQ-F-01
- [x] Sisa waktu dihitung ulang dari `endAt` saat halaman dimuat kembali — REQ-F-01
- [x] Timer selesai tidak otomatis menandai tugas selesai — REQ-F-01
- [x] `visibilitychange` event memicu `refreshTimer()` — REQ-F-01
- [x] Form durasi: preset (15, 25, 45, 60 menit) dan input kustom (1–180 menit) — REQ-F-02
- [x] Validasi input durasi (bilangan bulat, rentang 1–180) — REQ-F-02
- [x] Dialog pilihan "Terapkan sesi berikutnya" / "Reset sesi ini" saat sesi aktif — REQ-F-02
- [x] `focusMinutes` dan `timer.durationSeconds` disimpan terpisah — REQ-F-02
- [x] Memulai fokus dari tugas mengaitkan `timer.taskId` — REQ-F-03
- [x] Status tugas `not_started` → `in_progress` saat fokus dimulai — REQ-F-03
- [x] Navigasi otomatis ke tab Fokus saat Mulai Fokus — REQ-F-03
- [x] `timer.taskId` dilepas saat tugas dihapus atau diselesaikan — REQ-F-03
- [x] Textarea catatan progres (maks 2000 karakter) — REQ-F-04
- [x] Draft catatan disimpan di memori saat berpindah tab — REQ-F-04
- [x] Konfirmasi "Simpan / Buang / Batal" saat ada draft yang belum disimpan — REQ-F-04
- [x] `beforeunload` menampilkan dialog native jika ada draft belum tersimpan — REQ-F-04

---

## Kelompok 5 — Akses Cepat

- [x] Dialog tambah tautan: nama (maks 50 karakter) dan URL — REQ-L-01
- [x] Normalisasi URL (tambah `https://` jika tidak ada skema) — REQ-L-01
- [x] Validasi URL: hanya protokol http/https diterima — REQ-L-01
- [x] Deteksi platform otomatis: GitHub, YouTube, GitLab, generic — REQ-L-01
- [x] Ikon platform via CSS mask SVG — REQ-L-01
- [x] Menu tiga titik (⋮) pada setiap tautan — REQ-L-02
- [x] Edit tautan via dialog dengan data terisi — REQ-L-02
- [x] Hapus tautan dengan konfirmasi — REQ-L-02
- [x] Tautan dibuka di tab baru dengan `rel="noopener noreferrer"` — REQ-L-03
- [x] Dropdown menu tutup saat klik di luar atau tekan Escape — IMPL

---

## Kelompok 6 — Personalisasi

- [x] Dialog ubah nama panggilan (maks 30 karakter) — REQ-P-01
- [x] Validasi nama: tidak kosong, tidak lebih dari 30 karakter — REQ-P-01
- [x] Sapaan diperbarui langsung setelah dialog ditutup — REQ-P-01
- [x] Nama tersimpan di localStorage — REQ-P-01
- [x] Toggle tema light/dark via tombol — REQ-P-02
- [x] Tema tersimpan di localStorage — REQ-P-02
- [x] Fallback ke `prefers-color-scheme` jika theme `null` — REQ-P-02
- [x] `applyInitialTheme()` mencegah flash tema saat muat — REQ-P-02
- [x] Responsif terhadap perubahan system preference — REQ-P-02
- [x] Jam realtime (format 24 jam, diperbarui setiap detik) — REQ-P-03
- [x] Tanggal panjang format Indonesia — REQ-P-03
- [x] Sapaan berdasarkan jam (pagi/siang/sore/malam) — REQ-P-03

---

## Kelompok 7 — Onboarding

- [x] Panduan dibuka otomatis untuk pengguna baru — REQ-O-01
- [x] 19 langkah panduan mencakup semua tab/view — REQ-O-01
- [x] Tombol Lewati, Sebelumnya, Berikutnya, Selesai — REQ-O-01
- [x] Highlight elemen target saat panduan aktif — REQ-O-01
- [x] Panel panduan diposisikan otomatis di dekat target — REQ-O-01
- [x] Navigasi antar tab dilakukan otomatis saat berpindah langkah — REQ-O-01
- [x] Status panduan (completed/skipped) disimpan ke localStorage — REQ-O-01
- [x] URL dan posisi scroll dikembalikan setelah panduan ditutup — REQ-O-01
- [x] Panduan dapat dibuka ulang via tombol ? di header — REQ-O-01
- [x] Fallback teks saat elemen target tidak tersedia (misal belum ada tugas) — IMPL

---

## Kelompok 8 — Responsivitas dan Layout

- [x] Layout tiga breakpoint: mobile (<640px), tablet (640–1023px), desktop — REQ-R-01
- [x] Navigasi bottom bar pada mobile — REQ-R-01
- [x] Sidebar ikon pada tablet — REQ-R-01
- [x] Detail tugas sebagai dialog pada <1200px — REQ-R-01
- [x] `syncResponsiveLayout()` memindahkan elemen DOM saat breakpoint berubah — REQ-R-01
- [x] `visualViewport` API digunakan untuk menghitung ruang tersedia di mobile — IMPL
- [x] `safe-area-inset` CSS untuk notched device — IMPL
- [x] `prefers-reduced-motion` mematikan transisi CSS — IMPL

---

## Kelompok 9 — Verifikasi dan Pengujian (Belum Dilakukan)

- [ ] Pengujian fungsional manual di Chrome — REQ-TC-3
- [ ] Pengujian fungsional manual di Firefox — REQ-TC-3
- [ ] Pengujian fungsional manual di Edge — REQ-TC-3
- [ ] Pengujian fungsional manual di Safari — REQ-TC-3
- [ ] Pengujian CRUD tugas dengan reload di setiap skenario — REQ-T-01..T-08
- [ ] Pengujian timer setelah reload halaman selama berjalan — REQ-F-01
- [ ] Pengujian pengaturan durasi (preset dan kustom) — REQ-F-02
- [ ] Pengujian catatan progres: simpan, draft, discard — REQ-F-04
- [ ] Pengujian migrasi dari schema v1 dan v2 — REQ-D-03
- [ ] Pengujian kegagalan localStorage (mode incognito, storage penuh) — REQ-D-01
- [ ] Pengujian panduan: flow lengkap, skip, buka ulang — REQ-O-01
- [ ] Pengujian navigasi keyboard (Tab order, Escape, focus trap dialog) — NF-04
- [ ] Pengujian screen reader (NVDA atau VoiceOver) — NF-04
- [ ] Pengujian responsivitas di perangkat mobile fisik — REQ-R-01
- [ ] Audit kontras warna WCAG 2.1 AA — NF-04

---

## Kelompok 10 — Gap yang Perlu Ditangani

- [ ] Notifikasi saat timer selesai (audio atau visual alert) — GAP-02
- [ ] Dokumentasi pengujian lintas browser yang formal — GAP-03
- [ ] Konfirmasi penghapusan dengan kemampuan undo — GAP-04
- [ ] Keyboard shortcuts untuk aksi umum (opsional, peningkatan masa depan)
