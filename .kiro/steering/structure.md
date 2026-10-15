---
inclusion: always
---

# Tuntas — Struktur Direktori dan Konvensi Penamaan

## Struktur Direktori Aktual

```
Tuntas - To do list Web/
├── index.html                  # Entry point tunggal aplikasi
├── css/
│   └── style.css               # Seluruh styling aplikasi
├── js/
│   └── app.js                  # Seluruh logika aplikasi
└── assets/
    ├── Icon/                   # Logo dan wordmark Tuntas
    │   ├── tuntas-icon-light.svg
    │   ├── tuntas-icon-dark.svg
    │   ├── tuntas-wordmark-light.svg
    │   └── tuntas-wordmark-dark.svg
    └── icons/
        └── platforms/          # Ikon platform untuk tautan akses cepat
            ├── github.svg
            ├── gitlab.svg
            ├── youtube.svg
            ├── LICENSE.md
            └── README.md
```

## Tanggung Jawab File

### `index.html`
- Mendefinisikan seluruh struktur HTML aplikasi.
- Memuat `app.js` di `<head>` dengan tag `<script>` (tanpa `defer`/`async`) — ini disengaja agar `applyInitialTheme()` berjalan sebelum render halaman untuk mencegah flash tema.
- Memuat `style.css` setelah script.
- Berisi empat view utama sebagai `<section data-view="...">`, semua dialog (`<dialog>`), dan elemen navigasi sidebar.
- Menggunakan `lang="id"` untuk bahasa Indonesia.

### `css/style.css`
- Mendefinisikan CSS custom properties (variables) untuk tema terang di `:root` dan tema gelap di `:root[data-theme="dark"]`.
- Mengatur layout grid dua kolom (sidebar + konten utama).
- Mendefinisikan semua komponen: kartu tugas, dialog, timer, form, kartu saran, tautan akses cepat, panduan.
- Memuat tiga breakpoint responsif:
  - Desktop: `min-width: 1200px` (detail tugas inline di samping daftar)
  - Tablet: `min-width: 640px` dan `max-width: 1023px` (sidebar ikon, header column)
  - Mobile: `max-width: 639px` (navigasi bottom bar, layout satu kolom)

### `js/app.js`
- Satu file JavaScript dengan `"use strict"`.
- Menjalankan `applyInitialTheme()` segera saat dimuat (sebelum DOMContentLoaded).
- Menjalankan `initApp()` saat DOMContentLoaded atau langsung jika DOM sudah siap.
- Menyimpan seluruh state aplikasi dalam variabel modul `state`.
- Tidak menggunakan modul ES (`import`/`export`).

### `assets/Icon/`
- Logo dan wordmark Tuntas dalam dua varian tema: `light` dan `dark`.
- Digunakan di `<img>` dan `<source>` di HTML untuk logo sidebar/header.
- Diperbarui secara programatik saat tema berubah via `applyTheme()` di `app.js`.
- Nama file mengikuti pola: `tuntas-{icon|wordmark}-{light|dark}.svg`.

### `assets/icons/platforms/`
- Ikon SVG platform untuk tautan akses cepat: GitHub, GitLab, YouTube.
- Digunakan via CSS `mask` property (bukan tag `<img>`).
- Platform terdeteksi otomatis dari hostname URL oleh fungsi `getLinkPlatform()`.
- URL tidak dikenali salah satu platform digunakan sebagai `generic` (ikon bawaan).

## Konvensi Penamaan

| Jenis | Konvensi | Contoh |
|---|---|---|
| File HTML/CSS/JS | kebab-case lowercase | `style.css`, `app.js` |
| Aset SVG | kebab-case dengan sufiks tema | `tuntas-icon-dark.svg` |
| ID elemen HTML | kebab-case | `task-form`, `timer-display` |
| Class CSS | kebab-case dengan BEM longgar | `task-card`, `task-card__body` (flat) |
| Variabel JS (state/DOM) | camelCase | `taskTitleInput`, `editingTaskId` |
| Fungsi JS | camelCase verba | `renderTasks()`, `handleAddTask()` |
| Kunci Local Storage | `tuntas:v{n}` | `tuntas:v1`, `tuntas:onboarding` |
| Hash navigasi | bahasa Indonesia, tanpa spasi | `#beranda`, `#tugas`, `#fokus`, `#akses-cepat` |

## Penempatan Aset

- Logo dan ikon merek ditempatkan di `assets/Icon/` (huruf kapital I).
- Ikon platform pihak ketiga ditempatkan di `assets/icons/platforms/`.
- Path aset dalam kode merujuk ke direktori aktual. Jangan memindahkan atau mengubah nama aset tanpa memperbarui referensi di `index.html` dan `app.js`.

## Tidak Ada di Repositori

Struktur berikut tidak ada dan tidak perlu dibuat:
- Folder `dist/` atau `build/` — tidak ada proses build.
- Folder `node_modules/` — tidak ada dependensi npm.
- File konfigurasi bundler (`webpack.config.js`, `vite.config.js`, dll.).
- Folder `src/` — source langsung di root direktori.
