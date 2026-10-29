# Konteks Perusahaan & Situs

Dokumen ini menjelaskan **siapa kliennya, situs apa yang sedang didesain
ulang, dan batas data yang diambil frontend**. Bacalah bersama
[`data-flow.md`](data-flow.md) (kontrak data) dan [`seo-i18n.md`](seo-i18n.md)
(SEO & bilingual). Fakta di sini diverifikasi langsung dari situs live dan
REST API pada **23 Oktober 2026**.

## Profil perusahaan

**PT Dynatech International** adalah **perusahaan distribusi B2B** yang
menyediakan instrumen pengujian industri, instrumen laboratorium analitik, dan
peralatan didaktik (pendidikan) di Indonesia — lengkap dengan **solusi aplikasi
dan dukungan purna-jual**. Mereka bukan toko ritel dan bukan produsen merek
sendiri: nilai inti mereka adalah mendistribusikan **merek principal global**
plus konsultasi aplikasi, instalasi, kalibrasi, dan servis. (Fakta identitas di
bawah dikuatkan oleh Company Profile 2025 — "mining & laboratory".)

- **Visi:** menjadi mitra terdepan untuk pengujian dan instrumentasi ilmiah di
  Indonesia.
- **Misi:** melayani kebutuhan pelanggan secara kompetitif lewat solusi +
  dukungan purna-jual berkualitas tinggi; membangun tim teknis & marketing yang
  kuat; serta mengembangkan SDM lewat pelatihan profesional.
- **Model bisnis: B2B.** Pelanggan: laboratorium QC/QA, pabrik, perusahaan
  tambang, instansi, dan institusi pendidikan/riset — bukan konsumen ritel.
- **Tiga pasar utama (market):** **Laboratory · Mining · Research** (basis
  pelanggan: University & Industry). **Mining adalah pembeda utama** — mencakup
  preparasi sampel (jaw/roller/hammer crusher, disc/ball mill, vibration
  pulverizer, sieve shaker), fire assay (fusion/cupellation/muffle furnace),
  dan field spectrometer untuk eksplorasi. Struktur ini sejalan dengan
  taksonomi WooCommerce **By Market / By Manufacturer / By Product**.
- **Enam lini bisnis:** Pengujian Mekanik · Pengujian Material · Pengujian
  Keandalan · Mikroskopi · Didaktik · Metrologi.
- **Purna-jual = pilar nilai.** Ada Chief of Service + tim engineer tersebar di
  tiap kantor; "reliable after-sales" adalah janji inti brand.
- **Empat kantor** (alamat mengikuti web resmi, dikonfirmasi user):
  - Jakarta, Pusat — Kebon Jeruk Business Park Blok F2-9, Jl. Raya Meruya Ilir
    No. 88, Meruya Utara, Jakarta Barat 11620.
  - Cikarang — Jl. Niaga Raya, Kabupaten Bekasi, Jawa Barat 17530.
  - Surabaya — Gedung Bumi Mandiri, Jl. Jend. Basuki Rachmat No. 129-137,
    Embong Kaliasin, Genteng, Surabaya 60271.
  - **Kendari** — Jl. Malaka Blok A01/015, Citraland, dekat area tambang
    Sulawesi. Hanya ada di Company Profile 2025, belum tercantum di web.
  - Semua kantor memakai telepon +62 21 5859365 dan sales@dynatech-int.com.
- **Sertifikasi:** ISO 9001:2015, ISO 14001:2015, ISO 45001:2018, serta
  ISO/IEC 17025 dengan akreditasi **KAN** untuk laboratorium kalibrasi.
- **Principal (±40 merek):** **Bruker mendominasi** (XRF S2/S6/S8, XRD D6/D8,
  SkyScan micro-CT, NMR Ascend/Fourier, EPR), **Mettler Toledo** (timbangan,
  titrasi, pH, moisture, densitas/refraktometer), **Spectral Evolution**
  (remote sensing / field spectrometer), Specac, Oreas (CRM), serta Hitachi
  High-Tech, Hexagon, Thermo Scientific, Mahr, Renishaw, Meiji Techno,
  LD Didactic, Nabertherm, Montech, Solartron, Polytec, dll.
- **Sejarah & skala:** berdiri **2004** (4 karyawan), tumbuh lewat cabang
  Cikarang → Surabaya → Kendari; basis **100+ customer & 200+ installbase**
  (masing-masing di segmen University dan Industry).
- **Kontak:** Tel. +62 21 5859 365 · sales@dynatech-int.com ·
  www.dynatech-int.com · IG @dynatechint · LinkedIn pt-dynatech-international.
- **Media sosial:** Facebook, Instagram, LinkedIn.

## Situs yang sedang didesain ulang

Situs lama adalah WordPress self-hosted di `dynatech-int.com` dengan:

- **Plugin/page builder:** Elementor + Elementor Pro, WooLentor, Templately.
- **Konten:** WooCommerce (katalog produk), post editorial, dan page.
- **Bilingual:** WPML dengan prefix `/en` dan `/id`; root domain menyajikan
  versi Indonesia dan ada switcher EN/ID.
- **SEO & performa:** Yoast SEO, LiteSpeed Cache, Jetpack, Google Site Kit.

### Navigasi situs lama

Beranda · Tentang Kami · Products (Berdasarkan Produk, Berdasarkan Manufaktur,
Berdasarkan Market) · Artikel · Events · Berita · Karir · Hubungi Kami.

### Struktur beranda saat ini

1. Hero slider (3 slide) dengan tagline enam lini bisnis.
2. Ringkasan perusahaan + tautan "Baca selengkapnya" ke Tentang Kami.
3. **Why Us:** Complete Resources · Best Quality Product · Reliable After
   Sales Product.
4. **Produk Baru** dan **Produk kami** — tiga kolom kategori (Pasar,
   Manufaktur, Produk).
5. **Artikel** terbaru.
6. **Video**.
7. **Berita dan Acara**.
8. Form langganan email.

Halaman lain: Tentang Kami, Hubungi Kami (tiga kantor), Karir, daftar
Artikel/Berita/Events, serta halaman produk dan kategori produk.

## Ruang lingkup frontend baru: fetch-only, katalog B2B

Frontend ini **hanya membaca** data publik lewat REST API dan menampilkan
ulang dengan desain baru. Tidak ada penulisan konten dari frontend.

- WooCommerce adalah **basis data katalog**, bukan toko. Saat ini semua produk
  berharga `$0.00` dan tidak ada alur belanja.
- **Jangan bangun** keranjang, checkout, akun pelanggan, pembayaran, ulasan,
  atau tampilan harga — meskipun respons Store API menyertakan `add_to_cart`
  dan `is_purchasable: true`. Abaikan field tersebut.
- **Jangan parse** HTML Elementor / WooLentor / Templately. Ambil field
  terstruktur dari produk, post, page, taksonomi, dan ACF yang tampil di REST.
- Media produk/artikel tetap diambil dari URL WordPress
  (`wp-content/uploads/...`). Salinan di `public/` (logo, sertifikasi, hero,
  brand, cover) hanyalah **aset placeholder desain**, bukan sumber data
  runtime.
- Form (newsletter/kontak) belum diputuskan backend-nya. Jangan mengarang
  endpoint tulis; selesaikan setelah desain form final.

## Peta menu → sumber data

Terverifikasi dari `https://dynatech-int.com/wp-json/` pada 2026-10-23.

| Menu / halaman                         | Sumber data                         | Endpoint publik                                 |
| -------------------------------------- | ----------------------------------- | ----------------------------------------------- |
| Beranda — produk baru, artikel, berita | gabungan produk + post              | `wc/store/v1/products`, `wp/v2/posts`           |
| Products (semua)                       | daftar produk                       | `wc/store/v1/products`                          |
| Berdasarkan Produk                     | `product_cat` id `145`              | `wc/store/v1/products/categories`               |
| Berdasarkan Manufaktur                 | `product_cat` id `135`              | `wc/store/v1/products/categories`               |
| Berdasarkan Market                     | `product_cat` id `147`              | `wc/store/v1/products/categories`               |
| Kategori produk                        | produk per kategori                 | `wc/store/v1/products?category=<id>`            |
| Detail produk                          | satu produk                         | `wc/store/v1/products/<id>` atau `?slug=<slug>` |
| Artikel                                | post, kategori `artikel` (id `236`) | `wp/v2/posts?categories=236`                    |
| Berita                                 | post, kategori `news` (id `258`)    | `wp/v2/posts?categories=258`                    |
| Events                                 | post, kategori `events` (id `237`)  | `wp/v2/posts?categories=237`                    |
| Karir                                  | post, kategori `career` (id `238`)  | `wp/v2/posts?categories=238`                    |
| Tentang Kami, Hubungi Kami             | page                                | `wp/v2/pages`                                   |

Catatan penting:

- **Satu produk bisa berada di beberapa cabang sekaligus.** Contoh:
  X-Strata920 masuk ke By Product → Coating Thickness, By Market → Electronics
  / Otomotif / Academia, dan By Manufacturer → Hitachi High-Tech. Jangan
  asumsikan satu kategori per produk.
- Hitungan cabang saat verifikasi: By Manufacturer 157, By Product 143,
  By Market 85 (hitungan kategori, bukan jumlah produk unik).
- Kategori editorial saat verifikasi: Artikel 155 post, Events 15, Berita 6,
  Karir 0. Nama kategori berbahasa Indonesia, slug berbahasa Inggris.
- Permalink produk lama berpola
  `/id/product/<cabang>/<slug-kategori>/<slug-produk>/`; halaman kategori
  berpola `/id/product-categories/<cabang>/<slug-kategori>/`. Keduanya perlu
  dipetakan saat cutover (lihat `seo-i18n.md`).
- Endpoint `wp/v2/product` juga tersedia sebagai alternatif, tetapi
  `wc/store/v1` yang dipakai sebagai kontrak utama.

## Glosarium & konsistensi istilah

| Istilah UI (Indonesia) | Kategori / slug REST | Catatan                          |
| ---------------------- | -------------------- | -------------------------------- |
| Artikel                | `artikel`            | slug Indonesia, bukan `articles` |
| Berita                 | `news`               | label Indonesia, slug Inggris    |
| Acara / Events         | `events`             | label Indonesia, slug Inggris    |
| Karir                  | `career`             | label Indonesia, slug Inggris    |

- Nama kategori di REST bercampur bahasa ("Otomotif", "Academia and Research
  Tools"). **Mapper harus mengandalkan `id`/`slug`, bukan `name`.**
- Beberapa slug warisan memiliki akhiran `-1` (mis. `coating-thickness-1`,
  `bruker-1`). Jangan "membersihkan" slug; pakai apa adanya.
- Enam lini bisnis memakai istilah resmi: Pengujian Mekanik, Pengujian
  Material, Metrologi, Mikroskopi, Didaktik, Pengujian Keandalan.

## Larangan

- Keranjang, checkout, akun, pembayaran, ulasan, harga, dan skema `Offer`
  palsu.
- Parsing output page builder sebagai konten atau layout.
- Membuat CPT baru untuk editorial sebelum ada bukti dari WordPress.
- Menulis ke WordPress dari frontend publik.
