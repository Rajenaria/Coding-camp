# Requirements — Tuntas

**Versi:** 1.0  
**Catatan:** Requirement dituliskan berdasarkan kode aktual, constraint wajib, dan arahan produk. Kolom "Sumber" membedakan ketentuan dari constraint wajib (TC), perilaku yang ditemukan di kode (IMPL), dan usulan dokumentasi (PROP). Brief asli tidak tersedia; requirement tidak dapat divalidasi penuh terhadap brief.

---

## Bagian 1 — Constraint Teknis Wajib

### REQ-TC-1: Technology Stack
**Sumber:** TC-1 (constraint wajib)

WHEN aplikasi dikembangkan atau diperbarui,  
THE SYSTEM SHALL menggunakan hanya HTML, CSS, dan Vanilla JavaScript.  
THE SYSTEM SHALL NOT menggunakan framework JavaScript (React, Vue, Angular, Svelte, dll.).  
THE SYSTEM SHALL NOT memerlukan build tool atau bundler untuk dijalankan.

**Acceptance criteria:**
- [ ] `index.html`, `css/style.css`, dan `js/app.js` dapat dijalankan langsung di browser tanpa proses build.
- [ ] Tidak ada `package.json` dengan framework sebagai dependensi.

---

### REQ-TC-2: Data Storage
**Sumber:** TC-2 (constraint wajib)

WHEN aplikasi menyimpan atau membaca data pengguna,  
THE SYSTEM SHALL menggunakan hanya `localStorage` API browser.  
THE SYSTEM SHALL NOT mengirim data pengguna ke server eksternal.

**Kunci penyimpanan yang digunakan (IMPL):**
- `tuntas:v1` — state aplikasi (schema v3 saat ini).
- `tuntas:onboarding` — status panduan.

**Acceptance criteria:**
- [ ] Semua data tugas, link, nama, tema, dan timer dapat ditemukan di `localStorage['tuntas:v1']`.
- [ ] Tidak ada network request untuk data pengguna (dapat diverifikasi di DevTools Network tab).

---

### REQ-TC-3: Browser Compatibility
**Sumber:** TC-3 (constraint wajib)

WHEN pengguna membuka Tuntas di browser modern,  
THE SYSTEM SHALL berfungsi penuh di Chrome, Firefox, Edge, dan Safari versi terkini.  
THE SYSTEM SHALL diimplementasikan sebagai web app (bukan browser extension).

**Acceptance criteria:**
- [ ] Semua fitur inti (tugas, timer, link, tema, nama) berfungsi di Chrome.
- [ ] Semua fitur inti berfungsi di Firefox.
- [ ] Semua fitur inti berfungsi di Edge.
- [ ] Semua fitur inti berfungsi di Safari.

**Catatan:** Pengujian lintas browser belum dilakukan — lihat GAP-03 di `prd.md`.

---

## Bagian 2 — Manajemen Tugas

### REQ-T-01: Tambah Tugas
**Sumber:** IMPL

WHEN pengguna mengisi nama tugas (1–120 karakter) dan memilih prioritas lalu submit form,  
THE SYSTEM SHALL membuat tugas baru dengan status `not_started`, `id` unik (UUID), `createdAt` dan `updatedAt` berupa timestamp Unix, dan `resumeNote` kosong.  
THE SYSTEM SHALL menyimpan tugas ke `localStorage`.  
THE SYSTEM SHALL menampilkan tugas di daftar tanpa reload halaman.  
THE SYSTEM SHALL mengosongkan form setelah berhasil.

**Acceptance criteria:**
- [ ] Tugas muncul di daftar setelah ditambahkan.
- [ ] Tugas tersimpan di `localStorage` dan muncul kembali setelah reload.
- [ ] Jumlah karakter nama tugas di-enforce: maks 120 karakter (via `maxlength` HTML).
- [ ] Field prioritas menerima nilai: `high`, `medium`, `low`.

---

### REQ-T-02: Validasi Nama Tugas Kosong
**Sumber:** IMPL

WHEN pengguna submit form tambah tugas dengan nama kosong atau hanya spasi,  
THE SYSTEM SHALL menampilkan pesan error "Nama tugas tidak boleh kosong."  
THE SYSTEM SHALL menandai input sebagai `aria-invalid="true"`.  
THE SYSTEM SHALL memindahkan fokus ke input nama tugas.  
THE SYSTEM SHALL NOT menyimpan tugas.

---

### REQ-T-03: Pencegahan Duplikasi Tugas Aktif (Challenge CH-04)
**Sumber:** IMPL

WHEN pengguna mencoba menambah tugas dengan nama yang sudah ada di daftar tugas aktif (bukan completed),  
THE SYSTEM SHALL menolak penambahan dan menampilkan pesan error "Tugas tersebut masih ada dalam daftar tugas aktif."

**Aturan duplikasi yang diimplementasikan (IMPL):**
- Perbandingan dilakukan setelah `trim()` dan `toLowerCase()` pada kedua judul.
- Hanya tugas dengan `status !== 'completed'` yang diperiksa.
- Tugas `completed` dengan nama sama **diperbolehkan** ditambahkan kembali.

**Acceptance criteria:**
- [ ] Menambah "Belajar" lalu menambah "belajar" menghasilkan pesan error.
- [ ] Menambah "BELAJAR" (semua kapital) juga menghasilkan error jika "belajar" sudah ada dan aktif.
- [ ] Jika tugas "Belajar" sudah di-complete, tugas "Belajar" baru dapat ditambahkan.

---

### REQ-T-04: Edit Tugas
**Sumber:** IMPL

WHEN pengguna membuka dialog edit dan menyimpan perubahan nama/prioritas yang valid,  
THE SYSTEM SHALL memperbarui nama, prioritas, dan `updatedAt` tugas.  
THE SYSTEM SHALL menyimpan ke `localStorage`.  
THE SYSTEM SHALL menutup dialog dan memperbarui tampilan daftar tugas.

**Validasi edit (IMPL):**
- Nama tidak boleh kosong dan tidak boleh > 120 karakter.
- Untuk tugas aktif (bukan completed): nama baru tidak boleh duplikat dengan tugas aktif lain.
- Untuk tugas completed: validasi duplikasi dilewati.

---

### REQ-T-05: Hapus Tugas
**Sumber:** IMPL

WHEN pengguna mengklik tombol hapus pada kartu atau detail tugas,  
THE SYSTEM SHALL menampilkan dialog konfirmasi: "Hapus tugas '[judul]' beserta catatannya?"  
WHEN pengguna mengonfirmasi,  
THE SYSTEM SHALL menghapus tugas dari state dan `localStorage`.  
THE SYSTEM SHALL mereset `selectedTaskId` jika tugas yang dihapus sedang dipilih.  
THE SYSTEM SHALL mereset timer jika timer sedang terhubung ke tugas tersebut.

---

### REQ-T-06: Status Tugas
**Sumber:** IMPL

WHEN pengguna mengubah status tugas via dropdown di panel detail,  
THE SYSTEM SHALL menyimpan perubahan status ke `localStorage`.

**Status yang didukung:**
- `not_started` — Belum dimulai (default saat dibuat)
- `in_progress` — Sedang dikerjakan (diset otomatis saat memulai fokus dari tugas `not_started`)
- `completed` — Selesai

**Transisi status (IMPL):**
- Mencentang checkbox pada kartu: toggle antara `completed` dan `not_started`.
- Membuka kembali tugas completed: status diset ke `not_started` (bukan ke status sebelumnya).
- Membuka kembali tugas completed dengan nama duplikat aktif: ditolak dengan pesan error.
- Perubahan status yang melepas timer (tugas timer berubah dari/ke non-`in_progress`) meminta konfirmasi reset timer.

---

### REQ-T-07: Pengurutan Tugas (Challenge CH-05)
**Sumber:** IMPL

WHEN pengguna memilih opsi urutan dari dropdown,  
THE SYSTEM SHALL mengurutkan daftar tugas sesuai opsi yang dipilih.

**Opsi yang tersedia:**
- `priority` (default): Urutkan berdasarkan rank prioritas (Tinggi → Sedang → Rendah), lalu `createdAt` terlama, lalu `id` (lexicografis).
- `status`: Urutkan berdasarkan rank status (Belum dimulai → Sedang dikerjakan → Selesai), lalu prioritas, lalu `createdAt`.
- `newest`: `createdAt` terbaru terlebih dahulu, lalu `id`.
- `oldest`: `createdAt` terlama terlebih dahulu, lalu `id`.

**Aturan tambahan (IMPL):**
- Tugas `completed` selalu diletakkan di bawah tugas aktif, terlepas dari opsi sort yang dipilih.
- Pengurutan tidak mengubah data — hanya tampilan render.

---

### REQ-T-08: Detail dan Pilihan Tugas
**Sumber:** IMPL

WHEN pengguna mengklik kartu tugas,  
THE SYSTEM SHALL menampilkan panel detail dengan: judul, prioritas, status (dropdown), informasi sesi fokus, tombol Mulai Fokus, tombol Tandai Selesai/Buka Kembali, dan slot catatan progres.  
THE SYSTEM SHALL menyimpan `selectedTaskId` ke `localStorage`.

**Layout responsif (IMPL):**
- Desktop (≥1200px): panel detail ditampilkan inline di samping daftar.
- Tablet/mobile (<1200px): panel detail dibuka sebagai `<dialog>` modal.

---

## Bagian 3 — Timer Pomodoro

### REQ-F-01: Timer Start / Jeda / Reset
**Sumber:** IMPL

WHEN pengguna mengklik Start,  
THE SYSTEM SHALL memulai hitungan mundur dari `remainingSeconds`.  
THE SYSTEM SHALL menyimpan `endAt = Date.now() + remainingSeconds * 1000` ke state dan `localStorage`.  
WHEN pengguna mengklik Jeda (Stop),  
THE SYSTEM SHALL menyimpan `remainingSeconds` saat ini dan mengubah status ke `paused`.  
WHEN pengguna mengklik Reset,  
THE SYSTEM SHALL mengembalikan timer ke durasi penuh (`durationSeconds`) tanpa menjalankannya.

**Perilaku lintas tab (IMPL):**
- Timer menggunakan `endAt` (timestamp absolut) untuk menghitung sisa waktu — bukan jumlah tick.
- Berpindah tab atau menutup browser tidak menjeda timer.
- Saat halaman dibuka kembali, sisa waktu dihitung dari `endAt - Date.now()`.

**Acceptance criteria:**
- [ ] Timer berjalan tanpa gangguan saat pengguna berpindah ke tab lain.
- [ ] Sisa waktu akurat setelah halaman di-reload selama timer berjalan.
- [ ] Timer selesai tidak otomatis menandai tugas sebagai selesai.

---

### REQ-F-02: Pengaturan Durasi Timer (Challenge CH-03)
**Sumber:** IMPL

WHEN pengguna memilih preset atau mengisi nilai kustom lalu klik "Terapkan durasi",  
THE SYSTEM SHALL memvalidasi nilai (bilangan bulat, 1–180 menit).  
THE SYSTEM SHALL menyimpan `focusMinutes` ke state dan `localStorage`.

**Perilaku saat sesi aktif (IMPL):**
- Jika sesi sedang berjalan atau dijeda: pengguna ditawarkan pilihan "Terapkan sesi berikutnya" (simpan preferensi, sesi sekarang lanjut) atau "Reset sesi ini" (reset timer ke durasi baru).
- "Batal" membatalkan perubahan.

**Nilai yang didukung:**
- Preset: 15, 25 (default), 45, 60 menit.
- Custom: 1–180 menit.

**Acceptance criteria:**
- [ ] Input di luar rentang 1–180 menampilkan pesan error.
- [ ] Durasi tersimpan dan berlaku pada sesi timer berikutnya setelah reload.

---

### REQ-F-03: Tugas Terhubung ke Timer
**Sumber:** IMPL

WHEN pengguna memulai fokus dari kartu atau detail tugas,  
THE SYSTEM SHALL mengaitkan `timer.taskId` dengan ID tugas.  
THE SYSTEM SHALL mengubah status tugas dari `not_started` ke `in_progress` secara otomatis.  
THE SYSTEM SHALL memindahkan navigasi ke tab Fokus.

WHEN tugas yang terhubung ke timer dihapus atau diselesaikan,  
THE SYSTEM SHALL melepas `timer.taskId` dan mereset timer ke timer mandiri.

---

### REQ-F-04: Catatan Progres
**Sumber:** IMPL

WHEN pengguna mengisi textarea catatan dan mengklik "Simpan catatan",  
THE SYSTEM SHALL menyimpan catatan ke `task.resumeNote` dan `task.updatedAt`.  
THE SYSTEM SHALL menyimpan ke `localStorage`.

**Manajemen draft (IMPL):**
- Draft catatan disimpan di memori (Map `noteDrafts`) saat pengguna mengetik.
- Draft dipertahankan saat berpindah tab.
- Sebelum aksi yang meninggalkan tugas dengan draft belum tersimpan (navigasi, beginFocus, deleteTask, dll.): pengguna ditanya "Simpan / Buang draft / Batal".
- Sebelum menutup/reload halaman dengan draft belum tersimpan: browser menampilkan dialog konfirmasi native (`beforeunload`).

**Acceptance criteria:**
- [ ] Catatan muncul di kartu tugas sebagai preview (2 baris).
- [ ] Catatan tersimpan setelah reload.
- [ ] Batas 2000 karakter diterapkan.

---

## Bagian 4 — Akses Cepat

### REQ-L-01: Tambah Tautan
**Sumber:** IMPL

WHEN pengguna mengisi nama (1–50 karakter) dan URL valid (http/https) lalu menyimpan,  
THE SYSTEM SHALL menambah tautan ke state dan `localStorage`.  
THE SYSTEM SHALL mendeteksi platform dari hostname (GitHub, YouTube, GitLab, atau generic).  
THE SYSTEM SHALL menampilkan tautan di daftar akses cepat.

**Normalisasi URL (IMPL):**
- URL tanpa skema (`github.com`) dilengkapi `https://` secara otomatis.
- URL dengan `//` di awal dilengkapi `https:`.
- URL dengan `http:` atau `https:` diterima apa adanya.
- URL dengan protokol lain (ftp, dll.) ditolak.

---

### REQ-L-02: Edit dan Hapus Tautan
**Sumber:** IMPL

WHEN pengguna membuka menu ⋮ pada tautan,  
THE SYSTEM SHALL menampilkan opsi Edit dan Hapus.  
WHEN pengguna memilih Edit,  
THE SYSTEM SHALL membuka dialog dengan data tautan yang sudah terisi.  
WHEN pengguna memilih Hapus,  
THE SYSTEM SHALL meminta konfirmasi sebelum menghapus.

---

### REQ-L-03: Buka Tautan
**Sumber:** IMPL

WHEN pengguna mengklik nama/area tautan,  
THE SYSTEM SHALL membuka URL di tab baru (`target="_blank"`, `rel="noopener noreferrer"`).

---

## Bagian 5 — Personalisasi

### REQ-P-01: Nama Panggilan (Challenge CH-02)
**Sumber:** IMPL

WHEN pengguna mengisi nama panggilan (1–30 karakter) dan menyimpan,  
THE SYSTEM SHALL memperbarui `state.nickname` dan menyimpan ke `localStorage`.  
THE SYSTEM SHALL memperbarui sapaan di heading: "Selamat [pagi/siang/sore/malam], [nama]."

WHEN nama panggilan kosong,  
THE SYSTEM SHALL menampilkan sapaan tanpa nama: "Selamat pagi.", dll.

**Acceptance criteria:**
- [ ] Nama maksimal 30 karakter diterapkan.
- [ ] Nama tersimpan setelah reload.
- [ ] Sapaan diperbarui langsung setelah dialog ditutup.

---

### REQ-P-02: Light / Dark Mode (Challenge CH-01)
**Sumber:** IMPL

WHEN pengguna mengklik tombol toggle tema,  
THE SYSTEM SHALL beralih antara tema `light` dan `dark`.  
THE SYSTEM SHALL menyimpan pilihan ke `state.theme` dan `localStorage`.

WHEN `state.theme` bernilai `null` (belum diset pengguna),  
THE SYSTEM SHALL mengikuti `prefers-color-scheme` sistem operasi.

WHEN halaman pertama dimuat,  
THE SYSTEM SHALL menerapkan tema sebelum elemen dirender untuk mencegah flash (`applyInitialTheme()` dipanggil sebelum DOMContentLoaded).

**Acceptance criteria:**
- [ ] Tema tersimpan setelah reload.
- [ ] Mengikuti system preference jika belum pernah diset manual.
- [ ] Tidak ada kedipan tema saat halaman pertama dibuka.

---

### REQ-P-03: Jam dan Tanggal Lokal
**Sumber:** IMPL

WHEN halaman aktif,  
THE SYSTEM SHALL menampilkan jam (`HH:MM`, format 24 jam) dan tanggal (format Indonesia panjang) yang diperbarui setiap detik.  
THE SYSTEM SHALL menggunakan `Intl.DateTimeFormat` dengan locale `id-ID`.

**Acceptance criteria:**
- [ ] Jam berubah setiap menit.
- [ ] Sapaan ("Selamat pagi/siang/sore/malam") berubah sesuai jam perangkat.

---

## Bagian 6 — Onboarding

### REQ-O-01: Panduan Interaktif
**Sumber:** IMPL

WHEN pengguna pertama kali membuka Tuntas (status panduan belum `completed` atau `skipped`) dan tidak ada error storage,  
THE SYSTEM SHALL menampilkan panduan interaktif secara otomatis.

WHEN panduan aktif,  
THE SYSTEM SHALL menavigasi antar tab sesuai langkah panduan.  
THE SYSTEM SHALL menyorot elemen target dengan highlight dan memposisikan panel panduan di dekatnya.  
THE SYSTEM SHALL menyediakan tombol Lewati, Sebelumnya, dan Berikutnya/Selesai.

WHEN panduan ditutup (skip atau selesai),  
THE SYSTEM SHALL menyimpan status ke `localStorage['tuntas:onboarding']`.  
THE SYSTEM SHALL mengembalikan pengguna ke halaman dan posisi scroll semula.

WHEN pengguna mengklik tombol ? di header,  
THE SYSTEM SHALL membuka panduan dari langkah pertama kapan saja.

**Jumlah langkah panduan:** 19 langkah (dari `dashboard-welcome` hingga `guide-finish`).

---

## Bagian 7 — Responsivitas

### REQ-R-01: Layout Responsif
**Sumber:** IMPL

WHEN lebar layar < 640px (mobile),  
THE SYSTEM SHALL menampilkan navigasi sebagai bottom bar (4 tab di bawah).  
THE SYSTEM SHALL memindahkan logo dan header tools ke area header mobile.  
THE SYSTEM SHALL menampilkan detail tugas sebagai dialog (bukan panel inline).

WHEN lebar layar 640–1023px (tablet),  
THE SYSTEM SHALL menampilkan sidebar ikon saja (label tersembunyi, tooltip on hover).

WHEN lebar layar ≥ 1200px (desktop lebar),  
THE SYSTEM SHALL menampilkan detail tugas inline di samping daftar tugas.

---

## Bagian 8 — Penyimpanan dan Validasi Data

### REQ-D-01: Persistensi State
**Sumber:** IMPL

WHEN state berubah,  
THE SYSTEM SHALL segera menyimpan seluruh state ke `localStorage['tuntas:v1']`.

WHEN penyimpanan gagal (storage penuh atau dibatasi),  
THE SYSTEM SHALL menampilkan pesan error yang jelas.  
THE SYSTEM SHALL mempertahankan state sesi aktif di memori.  
THE SYSTEM SHALL NOT menimpa data lama yang tersimpan.

---

### REQ-D-02: Validasi Data Saat Muat
**Sumber:** IMPL

WHEN halaman dimuat dan data `localStorage` tidak valid atau tidak dapat di-parse,  
THE SYSTEM SHALL memulai dengan state kosong (sesi sementara).  
THE SYSTEM SHALL NOT menimpa data lama.  
THE SYSTEM SHALL menampilkan pesan error kepada pengguna.

---

### REQ-D-03: Migrasi Schema
**Sumber:** IMPL

WHEN data yang dimuat memiliki `schemaVersion` 1 atau 2,  
THE SYSTEM SHALL melakukan migrasi otomatis ke schema v3.  
THE SYSTEM SHALL mempertahankan semua tugas, catatan, dan waktu sesi yang ada.  
THE SYSTEM SHALL menyimpan hasil migrasi dan menampilkan notifikasi.
