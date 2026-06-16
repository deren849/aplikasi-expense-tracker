Expense Tracker App

Aplikasi berbasis web statis (Vanilla JavaScript) yang dirancang untuk membantu pengguna mencatat, melacak, dan memvisualisasikan pengeluaran keuangan harian agar manajemen finansial menjadi lebih teratur. 

Proyek ini dibangun sebagai bagian dari **Submission Kelas Front-End Web Pemula di Dicoding**, sekaligus sebagai sarana uji kemampuan dalam memanipulasi DOM dan mengelola *state* data secara mandiri.

---

## Fitur Utama

Aplikasi ini dilengkapi dengan berbagai fitur interaktif dan fungsional:

* **Manipulasi DOM Dinamis:** Menambah dan menghapus data pengeluaran secara langsung tanpa memuat ulang (*refresh*) halaman.
* **Web Storage API (`localStorage`):** Data pengeluaran disimpan secara persisten di dalam peramban (*browser*), sehingga data tidak akan hilang meskipun halaman ditutup atau di-*refresh*.
* **Visualisasi Grafik (Chart.js):** Integrasi dengan grafik lingkaran (*Doughnut Chart*) yang interaktif untuk melihat persentase distribusi pengeluaran berdasarkan kategori secara *real-time*.
* **Fitur Pencarian & Filter:** Memudahkan pencarian riwayat pengeluaran berdasarkan kata kunci judul atau filter spesifik per kategori (Makanan, Transportasi, Hiburan, Lainnya).
* **Desain Modern & Responsif:** Antarmuka dengan tema *Dark Mode* yang estetik, memanfaatkan efek modern seperti *radial-gradient* pada latar belakang dan *glassmorphism* (`backdrop-filter`) pada navigasi, serta optimal diakses melalui perangkat *mobile* maupun *desktop*.

---

## Teknologi yang Digunakan

* **HTML5:** Untuk menyusun struktur semantik halaman web.
* **CSS3:** Untuk styling kustom, menggunakan variabel (*Custom Properties*), *Flexbox*, *Grid*, serta *Media Queries* untuk responsivitas.
* **Vanilla JavaScript (ES6+):** Untuk menangani logika aplikasi, manajemen data array, event listener, dan integrasi penyimpanan lokal.
* **Chart.js (via CDN):** Pustaka JavaScript pihak ketiga untuk merender grafik pengeluaran yang interaktif.

---

##  Struktur Berkas

```text
├── index.html       # Struktur utama halaman web & form input
├── expense.css      # Desain tampilan antarmuka (Dark Mode & UI)
├── tracker.js       # Logika utama aplikasi, Web Storage, & Chart.js
└── README.md        # Dokumentasi proyek
