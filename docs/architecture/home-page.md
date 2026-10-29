# Homepage — Sections, Data, Motion

Peta cepat homepage `/`. Baca ini sebelum mengubah section, data, atau
animasinya. Visual dan animasi saat ini sudah disetujui; refactor harus
menjaga hasil render tetap sama.

## Urutan section

| #   | Section            | File                                             | Data (`constants/`)    | id            |
| --- | ------------------ | ------------------------------------------------ | ---------------------- | ------------- |
| 1   | Hero               | `components/hero/hero-section.tsx`               | `hero.ts`, `images.ts` | `hero`        |
| 2   | Trust (kartu deck) | `components/trust-section.tsx`                   | `trust.ts`             | `trust`       |
| 3   | Products (katalog) | `components/products/products-section.tsx`       | `catalog.ts`           | `facilities`  |
| 4   | Customer (marquee) | `components/customers-section.tsx`               | `customers.ts`         | `customers`   |
| 5   | Berita & Events    | `components/news-events/news-events-section.tsx` | `news-events.ts`       | `news-events` |
| 6   | Artikel            | `components/insights-section.tsx`                | `articles.ts`          | `insights`    |
| 7   | Cabang (peta)      | `components/contact/contact-section.tsx`         | `offices.ts`           | `contact`     |

Header dan footer ada di `components/layout/` dan dirender `routes/__root.tsx`
di luar `<main>`. Anchor nav (`#trust`, `#facilities`, ...) memakai `id` di
tabel ini — ganti id berarti ganti link di `navigation-data.ts` juga.

## Aliran data

```text
constants/*.ts  (typed, statis)
  → section component  (markup + props saja)
    → components/ui/*  (primitive tanpa konteks bisnis)
```

- Konten tidak pernah ditulis langsung di JSX. Ubah teks atau gambar di
  `constants/`; tipe di file itu adalah kontrak untuk data WordPress nanti.
- Logika ada di hook, bukan komponen:
  - `use-catalog-browser` — tab cabang, pencarian, geser 4 kartu.
  - `use-office-map` — lazy-load MapLibre, pin, `flyTo` kantor aktif.
  - `use-home-motion` — Lenis + semua scene GSAP halaman ini.
- Nav → section: header memanggil `selectSectionTab('products', 'by-market')`
  dari `hooks/use-section-tab`; section mendengarkan dengan `useSectionTab`.
  Layout tidak pernah import dari `features/`.

## Gerak (motion)

`use-home-motion.ts` memegang semua animasi scroll lewat atribut data, jadi
komponen tidak perlu ref:

| Atribut                       | Efek                                      |
| ----------------------------- | ----------------------------------------- |
| `data-hero-word`              | judul hero naik saat load                 |
| `data-hero-reveal`            | elemen hero menyusul (fade + naik)        |
| `data-hero-img`               | parallax gambar hero                      |
| `data-drift="ghost" \| "ink"` | kata besar trust bergeser berlawanan      |
| `data-trust-card`             | kartu deck parallax halus                 |
| `data-reveal`                 | reveal generik sekali saat masuk viewport |

Animasi CSS (marquee, panel berita, pin peta, glow footer) didefinisikan
sebagai token `--animate-*` di `styles.css`, dipakai sebagai `animate-*`.
Semua menghormati `prefers-reduced-motion`.

## Performa — aturan yang sudah diterapkan

- Footer `fixed` di bawah `<main>` hanya dipaint saat dekat viewport
  (`use-in-view`), glow blur-nya berhenti saat tertutup.
- Peta (≈1 MB) dimuat dinamis saat section Cabang mendekat.
- Drag kartu deck menulis transform langsung ke DOM, tanpa re-render.
- Font Plus Jakarta Sans self-hosted lewat `@fontsource-variable`, bukan
  request ke Google Fonts.
- Gambar di bawah fold memakai `loading="lazy"`.

## Pindah ke data WordPress nanti

1. Buat `features/<domain>/api/` sesuai `data-flow.md`.
2. Mapper mengembalikan tipe yang sama dengan `constants/` (mis. `NewsEvent`).
3. Section mengganti import konstanta dengan hasil query; markup tetap.
