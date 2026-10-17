Expense Tracker App

Aplikasi berbasis web statis (Vanilla JavaScript) yang dirancang untuk membantu pengguna mencatat, melacak, dan memvisualisasikan pengeluaran keuangan harian agar manajemen finansial menjadi lebih teratur. 


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
```






---

*English Version*

# Expense Tracker App
A static web-based application (Vanilla JavaScript) designed to help users record, track, and visualize daily financial expenses for better financial management.

---
## Key Features
This application is equipped with various interactive and functional features:
* **Dynamic DOM Manipulation:** Add and delete expense data instantly without refreshing the page.
* **Web Storage API (`localStorage`):** Expense data is saved persistently in the browser, ensuring data won't be lost even if the page is closed or refreshed.
* **Graphic Visualization (Chart.js):** Integration with an interactive Doughnut Chart to view the percentage of expense distribution by category in real-time.
* **Search & Filter Features:** Makes it easy to search expense history by title keywords or specific category filters (Food, Transport, Entertainment, Other).
* **Modern & Responsive Design:** An aesthetic Dark Mode interface, utilizing modern effects like radial-gradient backgrounds and glassmorphism (`backdrop-filter`) on the navigation bar, optimized for both mobile and desktop devices.

---
## Technologies Used
* **HTML5:** To structure the semantic layout of the web page.
* **CSS3:** For custom styling, using CSS Variables (Custom Properties), Flexbox, Grid, and Media Queries for responsiveness.
* **Vanilla JavaScript (ES6+):** To handle application logic, array data management, event listeners, and local storage integration.
* **Chart.js (via CDN):** A third-party JavaScript library for rendering interactive expense charts.

---
## File Structure
```text
├── index.html       # Main web page structure & input form
├── expense.css      # Interface design (Dark Mode & UI)
├── tracker.js       # Main application logic, Web Storage, & Chart.js
└── README.md        # Project documentation
