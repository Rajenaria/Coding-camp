---
inclusion: always
---

# Tuntas — Identitas dan Arah Produk

## Identitas Produk

**Nama:** Tuntas  
**Tagline:** "Satu per satu, sampai tuntas."  
**Deskripsi singkat:** Ruang produktivitas pribadi berbasis web yang membantu pengguna mengelola tugas, memilih pekerjaan sesuai prioritas, dan menyelesaikannya melalui alur yang mudah dipahami.

## Target Pengguna

Individu yang mengelola pekerjaan atau studi secara mandiri dan membutuhkan alat ringan untuk mengatur tugas, menjaga fokus, dan melanjutkan pekerjaan dari titik terakhir — tanpa ketergantungan pada akun atau server eksternal.

## Tujuan Produk

1. Membantu pengguna menentukan tugas mana yang dikerjakan berikutnya berdasarkan prioritas.
2. Menyediakan timer fokus (Pomodoro) untuk mengelola sesi kerja.
3. Menyimpan catatan progres per tugas sehingga pekerjaan mudah dilanjutkan.
4. Memberikan akses cepat ke tautan yang sering digunakan.
5. Menjaga seluruh data di browser pengguna tanpa server eksternal.

## Ruang Lingkup Saat Ini

| Area | Status |
|---|---|
| Manajemen tugas (tambah, edit, hapus, status) | Ada |
| Prioritas tugas (Tinggi / Sedang / Rendah) | Ada |
| Saran tugas berikutnya | Ada |
| Timer Pomodoro dengan durasi kustom | Ada |
| Catatan progres per tugas | Ada |
| Akses cepat (tambah, edit, hapus tautan) | Ada |
| Personalisasi nama panggilan | Ada |
| Tema terang / gelap | Ada |
| Jam dan tanggal lokal realtime | Ada |
| Onboarding / panduan interaktif | Ada |
| Layout responsif (mobile, tablet, desktop) | Ada |

## Navigasi Utama

Aplikasi terdiri dari empat tab/view:

1. **Beranda (Dashboard)** — ringkasan tugas, saran tugas berikutnya, tombol aksi cepat.
2. **Tugas** — daftar tugas, form tambah, detail tugas, pengurutan.
3. **Fokus** — timer Pomodoro, pengaturan durasi, catatan progres.
4. **Akses Cepat** — daftar tautan favorit, dialog tambah/edit tautan.

## Prinsip UX

- **Satu tugas, satu fokus** — pengguna mengerjakan satu hal dalam satu sesi.
- **Progres terlihat** — status tugas (Belum dimulai / Sedang dikerjakan / Selesai) selalu tampak.
- **Tidak ada data yang hilang diam-diam** — setiap draft catatan yang belum tersimpan diconfirm sebelum dibuang.
- **Privasi lokal** — semua data tersimpan hanya di browser pengguna.
- **Aksesibel** — mendukung navigasi keyboard, focus ring, label ARIA, dan elemen semantik.

## Dasar Saran Tugas

Saran tugas berikutnya ditentukan oleh aturan lokal:

1. Hanya tugas aktif (bukan `completed`) yang dipertimbangkan.
2. Tugas diurutkan berdasarkan `priority.rank` (Tinggi = 0, Sedang = 1, Rendah = 2).
3. Jika rank sama, tugas yang lebih lama dibuat (`createdAt` lebih kecil) diprioritaskan.
4. Tugas pertama dari urutan tersebut ditampilkan sebagai saran.

Saran ini **bukan AI** — hanya aturan pengurutan deterministik berdasarkan prioritas dan waktu pembuatan.

## Hal di Luar Ruang Lingkup Saat Ini

- Sinkronisasi data lintas perangkat.
- Notifikasi push atau alarm audio saat timer selesai.
- Kolaborasi atau berbagi tugas.
- Backend / akun pengguna.
- Ekspor atau impor data.
