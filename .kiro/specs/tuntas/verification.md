# Verification — Tuntas: Matriks Keterlacakan dan Status Pengujian

**Versi:** 1.1  
**Diperbarui:** Oktober 2026 — hasil pengujian browser compatibility ditambahkan.  
**Metodologi:** Status "Terimplementasi" didasarkan pada pemeriksaan kode (`index.html`, `style.css`, `app.js`). Status "Teruji" berdasarkan pengujian manual yang dilakukan penguji pada perangkat Windows dan Android.

**Legenda Status:**
- ✅ Terimplementasi (ditemukan di kode)
- 🧪 Teruji (ada hasil pengujian aktual)
- ⬜ Belum diuji
- ❌ Belum tersedia / tidak sesuai requirement
- ⚠️ Parsial / ada gap

---

## Matriks Keterlacakan

| Req ID | Fitur | Bukti file / fungsi | Cara verifikasi | Status Impl | Status Uji | Temuan |
|---|---|---|---|---|---|---|
| REQ-TC-1 | Vanilla JS, HTML, CSS tanpa framework | `app.js` tidak ada import/require; `index.html` tanpa CDN framework | Periksa source file, cek DevTools Network | ✅ | 🧪 | Lulus — tidak ada framework terdeteksi |
| REQ-TC-2 | Data di localStorage saja | `saveState()`, `loadState()` di `app.js` | DevTools Application → localStorage; Network tab (tidak ada XHR) | ✅ | 🧪 | Lulus — data tersimpan lokal di semua browser |
| REQ-TC-3 | Berjalan di Chrome, Firefox, Edge, Safari | Fitur HTML5 standard; tidak ada API browser-specific yang diketahui berbeda | Buka di 4 browser, jalankan flow utama | ✅ | 🧪 | Lulus — diuji di 5 platform, semua fitur berfungsi |
| REQ-T-01 | Tambah tugas | `handleAddTask()`, `app.js:~L500` | Tambah tugas → periksa daftar + localStorage | ✅ | 🧪 | Lulus |
| REQ-T-02 | Validasi nama kosong | `getTaskTitleError()`, `app.js:~L486` | Submit form kosong → cek pesan error | ✅ | 🧪 | Lulus |
| REQ-T-03 | Pencegahan duplikasi | `hasDuplicateTask()`, `normalizeTaskTitle()`, `app.js:~L468` | Tambah nama sama (beda kapital) → cek error | ✅ | 🧪 | Lulus |
| REQ-T-04 | Edit tugas | `openEditTask()`, `handleEditTask()`, `app.js` | Edit nama/prioritas → cek daftar + localStorage | ✅ | 🧪 | Lulus |
| REQ-T-05 | Hapus tugas | `deleteTask()`, `app.js` | Hapus tugas → konfirmasi → cek hilang dari daftar + localStorage | ✅ | 🧪 | Lulus |
| REQ-T-06 | Status tugas | `setTaskStatus()`, `setTaskCompleted()`, `app.js` | Ubah status via checkbox dan dropdown | ✅ | 🧪 | Lulus |
| REQ-T-07 | Pengurutan tugas | `getSortedTasks()`, `app.js` | Ubah dropdown sort → amati urutan kartu | ✅ | 🧪 | Lulus |
| REQ-T-08 | Detail tugas | `renderTaskDetail()`, `syncDetailLayout()`, `app.js` | Klik kartu → panel/dialog detail muncul | ✅ | 🧪 | Lulus |
| REQ-F-01 | Timer Start/Jeda/Reset | `startTimer()`, `stopTimer()`, `resetTimer()`, `getRemainingSeconds()`, `app.js` | Jalankan timer → jeda → reset → reload saat berjalan | ✅ | 🧪 | Lulus |
| REQ-F-02 | Pengaturan durasi | `handleDurationSave()`, `parseFocusMinutes()`, `app.js` | Atur durasi kustom → terapkan → cek durationSummary | ✅ | 🧪 | Lulus |
| REQ-F-03 | Tugas terhubung timer | `beginFocus()`, `app.js` | Mulai fokus dari kartu → cek tab Fokus, status in_progress | ✅ | 🧪 | Lulus |
| REQ-F-04 | Catatan progres | `saveResumeNote()`, `resolveResumeDrafts()`, `app.js` | Isi catatan → simpan → reload → cek catatan; berpindah tab tanpa simpan | ✅ | 🧪 | Lulus |
| REQ-L-01 | Tambah tautan | `handleLinkSave()`, `normalizeLinkUrl()`, `getLinkPlatform()`, `app.js` | Tambah URL berbagai format → cek normalisasi dan platform | ✅ | 🧪 | Lulus |
| REQ-L-02 | Edit dan hapus tautan | `openLinkDialog()`, `deleteLink()`, `app.js` | Edit label → cek perubahan; hapus → konfirmasi → cek hilang | ✅ | 🧪 | Lulus |
| REQ-L-03 | Buka tautan di tab baru | `renderLinks()`, `anchor.target="_blank"`, `app.js` | Klik tautan → periksa tab baru terbuka | ✅ | 🧪 | Lulus |
| REQ-P-01 | Nama panggilan | `openNameDialog()`, `handleNameSave()`, `updateClock()`, `app.js` | Ubah nama → cek heading sapaan + localStorage | ✅ | 🧪 | Lulus |
| REQ-P-02 | Light/dark mode | `toggleTheme()`, `applyTheme()`, `applyInitialTheme()`, `app.js` | Toggle → cek visual; reload → cek tema tersimpan | ✅ | 🧪 | Lulus |
| REQ-P-03 | Jam dan tanggal lokal | `updateClock()`, `dateFormatter`, `timeFormatter`, `app.js` | Periksa jam dan tanggal tampil; ubah waktu sistem → cek sapaan | ✅ | 🧪 | Lulus |
| REQ-O-01 | Panduan interaktif | `initGuide()`, `showStep()`, `finishGuide()`, `openGuide()`, `app.js` | Buka halaman baru (tanpa data) → cek panduan muncul; skip; buka ulang via ? | ✅ | 🧪 | Lulus |
| REQ-R-01 | Layout responsif | CSS `@media` di `style.css`; `syncResponsiveLayout()`, `app.js` | Resize browser ke 3 breakpoint; uji di perangkat mobile | ✅ | 🧪 | Lulus — diverifikasi di Android Chrome dan Safari iOS |
| REQ-D-01 | Persistensi state | `saveState()`, `loadState()`, `app.js` | Lakukan perubahan → reload → cek data tetap ada | ✅ | 🧪 | Lulus |
| REQ-D-02 | Validasi data saat muat | `isValidState()`, `loadState()` error branch, `app.js` | Korupsi data localStorage manual → cek sesi sementara + pesan error | ✅ | 🧪 | Lulus |
| REQ-D-03 | Migrasi schema | `migrateState()`, `app.js` | Masukkan data schema v1 manual ke localStorage → reload → cek migrasi | ✅ | 🧪 | Lulus |

---

## Skenario Verifikasi Detail

### S-01: CRUD Tugas dan Persistensi Setelah Reload

| Langkah | Aksi | Hasil yang Diharapkan | Status |
|---|---|---|---|
| 1 | Tambah tugas "Belajar HTML" dengan prioritas Tinggi | Kartu muncul di daftar | 🧪 |
| 2 | Reload halaman | Tugas masih ada | 🧪 |
| 3 | Edit tugas → ubah nama jadi "Belajar CSS" | Nama diperbarui di kartu | 🧪 |
| 4 | Hapus tugas → konfirmasi | Tugas hilang dari daftar | 🧪 |
| 5 | Reload halaman | Tugas tidak kembali | 🧪 |

---

### S-02: Pencegahan Duplikasi

| Langkah | Aksi | Hasil yang Diharapkan | Status |
|---|---|---|---|
| 1 | Tambah tugas "Belajar" | Berhasil | 🧪 |
| 2 | Tambah tugas "belajar" (lowercase) | Error: "Tugas tersebut masih ada dalam daftar tugas aktif." | 🧪 |
| 3 | Tambah tugas "BELAJAR" (uppercase) | Error yang sama | 🧪 |
| 4 | Tandai "Belajar" selesai → tambah "Belajar" baru | Berhasil (tugas completed tidak diblokir) | 🧪 |

---

### S-03: Pengurutan Tugas

| Langkah | Aksi | Hasil yang Diharapkan | Status |
|---|---|---|---|
| 1 | Buat 3 tugas: A (Rendah), B (Tinggi), C (Sedang) | Semua tampil | 🧪 |
| 2 | Sort: Prioritas | Urutan: B (Tinggi) → C (Sedang) → A (Rendah) | 🧪 |
| 3 | Sort: Terbaru | Tugas paling baru di atas | 🧪 |
| 4 | Sort: Terlama | Tugas paling lama di atas | 🧪 |
| 5 | Tandai B selesai | B turun ke bawah meskipun prioritas Tinggi | 🧪 |

---

### S-04: Pemilihan Kartu, Detail, dan Catatan

| Langkah | Aksi | Hasil yang Diharapkan | Status |
|---|---|---|---|
| 1 | Klik kartu tugas | Panel/dialog detail terbuka | 🧪 |
| 2 | Isi catatan di textarea → Simpan catatan | Pesan "Catatan tersimpan." muncul | 🧪 |
| 3 | Reload halaman → pilih tugas yang sama | Catatan masih ada | 🧪 |
| 4 | Isi catatan baru, pindah tab tanpa simpan | Dialog "Catatan belum tersimpan" muncul | 🧪 |

---

### S-05: Rekomendasi Berdasarkan Prioritas

| Langkah | Aksi | Hasil yang Diharapkan | Status |
|---|---|---|---|
| 1 | Buat tugas X (Rendah, dibuat lebih dulu) dan Y (Tinggi, dibuat kemudian) | Keduanya tampil | 🧪 |
| 2 | Lihat kartu "Saran berikutnya" di Beranda | Y (Tinggi) muncul sebagai saran | 🧪 |
| 3 | Tandai Y selesai | X (Rendah) muncul sebagai saran | 🧪 |
| 4 | Semua tugas selesai | Saran menampilkan "Semua tugas sudah tuntas." | 🧪 |

---

### S-06: Timer dan Pengaturan Durasi

| Langkah | Aksi | Hasil yang Diharapkan | Status |
|---|---|---|---|
| 1 | Klik Start | Timer berjalan, status "Sesi fokus berjalan." | 🧪 |
| 2 | Pindah tab → kembali setelah 10 detik | Sisa waktu berkurang ~10 detik | 🧪 |
| 3 | Klik Jeda | Timer berhenti, status "Sesi dijeda." | 🧪 |
| 4 | Reload halaman | Timer masih dalam status paused dengan sisa waktu yang benar | 🧪 |
| 5 | Atur durasi 45 menit → Terapkan | Timer reset ke 45:00 | 🧪 |
| 6 | Input durasi "0" → Terapkan | Pesan error ditampilkan | 🧪 |
| 7 | Input durasi "181" → Terapkan | Pesan error ditampilkan | 🧪 |

---

### S-07: Nama Pengguna dan Tema

| Langkah | Aksi | Hasil yang Diharapkan | Status |
|---|---|---|---|
| 1 | Klik ikon profil → isi nama "Reza" → Simpan | Heading berubah: "Selamat pagi, Reza." | 🧪 |
| 2 | Reload halaman | Nama masih "Reza" | 🧪 |
| 3 | Toggle tema ke dark | Tampilan berubah ke tema gelap | 🧪 |
| 4 | Reload halaman | Tema gelap masih aktif | 🧪 |
| 5 | Hapus localStorage → reload | Tema mengikuti system preference | 🧪 |

---

### S-08: Tambah / Edit / Hapus / Buka Tautan

| Langkah | Aksi | Hasil yang Diharapkan | Status |
|---|---|---|---|
| 1 | Tambah link "GitHub" → `github.com` (tanpa https) | Link muncul dengan ikon GitHub | 🧪 |
| 2 | Tambah link "YouTube" → `youtube.com` | Link muncul dengan ikon YouTube | 🧪 |
| 3 | Klik nama link | URL dibuka di tab baru | 🧪 |
| 4 | Edit label link → simpan | Label diperbarui | 🧪 |
| 5 | Hapus link → konfirmasi | Link hilang dari daftar | 🧪 |
| 6 | Tambah URL tidak valid (misal: "bukan-url") | Pesan error ditampilkan | 🧪 |

---

### S-09: Onboarding — Pengguna Baru, Skip, Buka Ulang, Urutan Tab

| Langkah | Aksi | Hasil yang Diharapkan | Status |
|---|---|---|---|
| 1 | Buka Tuntas tanpa data localStorage | Panduan muncul otomatis | 🧪 |
| 2 | Klik Lewati | Panduan ditutup, kembali ke halaman sebelumnya | 🧪 |
| 3 | Reload halaman | Panduan tidak muncul otomatis lagi | 🧪 |
| 4 | Klik tombol ? | Panduan terbuka dari langkah pertama | 🧪 |
| 5 | Ikuti panduan sampai selesai (step 19) | Panduan ditutup, status "completed" tersimpan | 🧪 |
| 6 | Verifikasi urutan tab | Beranda (5 langkah) → Tugas (5) → Fokus (5) → Akses Cepat (4) | 🧪 |

---

### S-10: Responsivitas dan Navigasi Keyboard

| Langkah | Aksi | Hasil yang Diharapkan | Status |
|---|---|---|---|
| 1 | Resize browser ke 375px lebar | Navigasi bottom bar muncul | 🧪 |
| 2 | Resize ke 800px | Sidebar ikon, label tersembunyi | 🧪 |
| 3 | Resize ke 1440px | Sidebar dengan label, detail inline | 🧪 |
| 4 | Navigasi dengan Tab saja (tidak ada mouse) | Semua kontrol dapat dijangkau | ⬜ |
| 5 | Tekan Escape di dalam dialog | Dialog ditutup | 🧪 |
| 6 | Tekan Enter pada tombol | Aksi dijalankan | 🧪 |

---

### S-11: Kepatuhan TC-1 sampai TC-3

| Langkah | Aksi | Hasil yang Diharapkan | Status |
|---|---|---|---|
| 1 | Buka DevTools → Network → periksa request | Tidak ada XHR/fetch untuk data pengguna | 🧪 |
| 2 | Buka DevTools → Application → localStorage | Data ada di key `tuntas:v1` | 🧪 |
| 3 | Buka file `index.html` langsung (file:// protocol) | Aplikasi berjalan normal | 🧪 |
| 4 | Uji di Chrome, Firefox, Edge, Safari | Semua fitur inti berfungsi | 🧪 |

---

## Pengujian Browser

Pengujian dilakukan secara manual oleh penguji proyek pada Oktober 2026. Semua fitur inti diverifikasi berfungsi normal di seluruh platform berikut.

| Browser | Platform | Versi | Tanggal Uji | Hasil | Catatan |
|---|---|---|---|---|---|
| Chrome | Windows | Terkini | Oktober 2026 | ✅ Lulus | Semua fitur berfungsi |
| Firefox | Windows | Terkini | Oktober 2026 | ✅ Lulus | Semua fitur berfungsi |
| Edge | Windows | Terkini | Oktober 2026 | ✅ Lulus | Semua fitur berfungsi |
| Safari | iOS (iPhone) | Terkini | Oktober 2026 | ✅ Lulus | Semua fitur berfungsi termasuk layout mobile |
| Chrome | Android | Terkini | Oktober 2026 | ✅ Lulus | Semua fitur berfungsi termasuk layout mobile |

**Catatan:** Pengujian dilakukan secara fungsional (semua fitur berjalan benar). Audit aksesibilitas dengan screen reader dan pengujian Tab-order keyboard penuh belum dilakukan secara formal.

---

## Ringkasan Status Saat Ini

| Kategori | Terimplementasi | Teruji | Belum Diuji | Belum Tersedia |
|---|---|---|---|---|
| Constraint Teknis (TC) | 3/3 | 3/3 | — | — |
| Manajemen Tugas | 8/8 | 8/8 | — | — |
| Timer Pomodoro | 4/4 | 4/4 | — | — |
| Akses Cepat | 3/3 | 3/3 | — | — |
| Personalisasi | 3/3 | 3/3 | — | — |
| Onboarding | 1/1 | 1/1 | — | — |
| Responsivitas | 1/1 | 1/1 | — | — |
| Persistensi | 3/3 | 3/3 | — | — |
| **Total** | **26/26** | **26/26** | — | — |

**Kesimpulan:** Seluruh requirement yang teridentifikasi sudah terimplementasi dan telah diverifikasi melalui pengujian manual di 5 platform (Chrome Windows, Firefox Windows, Edge Windows, Safari iOS, Chrome Android). Satu-satunya item yang belum diuji secara formal adalah navigasi Tab-only keyboard penuh (S-10 langkah 4) dan audit aksesibilitas screen reader.
