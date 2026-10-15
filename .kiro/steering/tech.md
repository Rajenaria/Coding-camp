---
inclusion: always
---

# Tuntas — Constraint Teknis dan Konvensi Kode

## Constraint Wajib

### TC-1 — Technology Stack
- **HTML** untuk struktur halaman.
- **CSS** untuk tampilan dan responsivitas.
- **Vanilla JavaScript** (ES2020+, `"use strict"`) untuk logika aplikasi.
- **Tidak ada framework** (tidak ada React, Vue, Angular, Svelte, atau sejenisnya).
- **Tidak ada build tool** — file dijalankan langsung dari sistem file atau server statis.

### TC-2 — Data Storage
- Seluruh data aplikasi disimpan menggunakan **Local Storage API** browser.
- Dua kunci penyimpanan digunakan:
  - `tuntas:v1` — menyimpan state aplikasi (tugas, link, tema, nama, timer, preferensi durasi).
  - `tuntas:onboarding` — menyimpan status panduan (skipped / completed).
- Tidak ada backend, tidak ada database eksternal, tidak ada komunikasi jaringan untuk data pengguna.

### TC-3 — Browser Compatibility
- Harus berjalan di browser modern: **Chrome, Firefox, Edge, Safari**.
- Diimplementasikan sebagai **web app** (bukan browser extension).
- Fitur yang digunakan: `localStorage`, `crypto.randomUUID()`, `Intl.DateTimeFormat`, `dialog` element, `ResizeObserver`, `visualViewport`, CSS custom properties, `color-mix()`.

## Stack Aktual

| Layer | Teknologi |
|---|---|
| Markup | HTML5 semantik (`<dialog>`, `<details>`, `<aside>`, `<nav>`, `<main>`) |
| Styling | CSS dengan custom properties (CSS variables), media queries |
| Logika | Vanilla JavaScript, satu file `app.js` |
| Ikon | SVG inline, dibuat secara programatik via `createIcon()` |
| Aset gambar | SVG logo dan ikon platform di `assets/` |

## Aturan Local Storage

- State dibaca sekali saat `initApp()`, disimpan ke variabel `state`.
- Setiap perubahan pada `state` harus diikuti pemanggilan `saveState()`.
- `saveState()` mengembalikan `boolean` — gagal jika storage penuh atau dibatasi browser.
- Kegagalan simpan **tidak boleh merusak state sesi**; state tetap valid dalam memori.
- Validasi data dilakukan saat pemuatan (`isValidState()`). Data tidak valid mengakibatkan sesi sementara tanpa menimpa data lama.
- Schema version saat ini: **3**. Migrasi otomatis dari v1 dan v2.

## Konvensi Kode

- Satu file JavaScript (`js/app.js`) mengelola seluruh logika.
- Variabel modul-level sebagai state global (tidak ada modul ES atau bundler).
- Fungsi render dipanggil ulang setelah perubahan state (pola render ulang sederhana, bukan virtual DOM).
- Elemen DOM dikumpulkan sekali di `collectElements()` dan disimpan ke variabel modul-level.
- ID elemen HTML digunakan sebagai referensi utama; tidak ada querySelector berulang dalam hot path.

## Aksesibilitas

- Semua tombol ikon memiliki `aria-label` eksplisit.
- Input invalid ditandai dengan `aria-invalid="true"` dan pesan error terhubung via `aria-describedby`.
- Dialog menggunakan `<dialog>` native dengan `showModal()` untuk focus trap bawaan.
- Focus ring aktif untuk semua elemen interaktif (`focus-visible`).
- Elemen dekoratif menggunakan `aria-hidden="true"`.
- Timer menggunakan `role="timer"` dan `role="status"` untuk pembaca layar.
- Heading hierarki: `h1` (greeting) → `h2` (judul view/dialog) → `h3` (sub-section) → `h4` (judul detail tugas).

## Komentar Kode

- Komentar singkat menjelaskan blok logika yang tidak jelas dari nama fungsi.
- Tidak ada banner, dekorasi garis, atau komentar JSDoc formal.
- Bahasa komentar: Indonesia.

## Larangan

- Jangan menambahkan framework JavaScript.
- Jangan menambahkan backend atau API call untuk data pengguna.
- Jangan menggunakan `innerHTML` untuk konten yang berasal dari input pengguna (gunakan `textContent` atau DOM API).
- Jangan menimpa data Local Storage yang sudah ada saat terjadi error pembacaan.
