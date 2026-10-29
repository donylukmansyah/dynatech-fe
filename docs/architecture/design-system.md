# Design System — Warna, Radius, Font

Sumber kebenaran token ada di [`src/styles.css`](../../src/styles.css). Dokumen
ini menjelaskan **peran tiap token dan aturan pakainya**. Jangan pernah tulis
hex mentah di komponen — selalu pakai utility semantik Tailwind
(`bg-primary`, `text-muted-foreground`, `bg-cta`, dst).

Stack: Tailwind CSS v4 (`@theme`) + shadcn/ui `base-nova` (base color neutral,
CSS variables). Tema saat ini **light-only**; struktur `.dark {}` sudah
disiapkan tapi belum diisi.

## Prinsip

1. **Biru = brand, oranye = aksi.** Primary biru membawa identitas; CTA oranye
   hanya untuk tombol aksi utama. Oranye itu langka — idealnya satu per layar
   ("Minta Penawaran", "Hubungi Kami"). Kalau oranye di mana-mana, dia berhenti
   berarti "klik aku". Di homepage, aksi sekunder seperti "Lihat Semua" memakai
   `<GlowButton variant="outline">`. Animasi magnetic-nya sama, tapi warnanya
   mengikuti teks section, jadi tidak oranye.
2. **90% halaman itu neutral.** B2B = tenang & kredibel. Warna brand jadi aksen,
   bukan dominan.
3. **Satu skala radius.** Tombol selalu `rounded-md`, card selalu `rounded-lg`.
   Pengecualian: bingkai media besar di homepage (hero, kartu artikel, panel
   berita) memakai `rounded-card` (28px).
4. **Aksesibilitas AA.** Teks putih di atas CTA oranye GAGAL kontras, maka
   `--cta-foreground` memakai navy `#10213F` (kontras ~8:1).

## Peran warna

| Peran          | Token / utility                               | Dipakai untuk                                         |
| -------------- | --------------------------------------------- | ----------------------------------------------------- |
| Primary (biru) | `primary` / `bg-primary`                      | link, tombol sekunder, icon aktif, fokus, chart utama |
| CTA (oranye)   | `cta` / `bg-cta`                              | HANYA tombol aksi utama                               |
| Neutral        | `background`, `foreground`, `muted`, `border` | teks, surface, garis — mayoritas UI                   |
| Status         | `success` `warning` `error` `info`            | feedback form, badge, alert                           |

## Token warna

### Brand — Primary (biru), skala 50–900, DEFAULT = `primary-600`

`bg-primary-50` … `bg-primary-900`. `#092F87` (600) tombol/link/surface utama ·
`#08266E` (700) hover · `#061D56` (800) pressed · `#04143D` (900) section gelap.

### Brand — CTA (oranye), DEFAULT = `cta` (= `cta-500`)

`#F28B3B` fill · `cta-600` `#E0771F` hover · `cta-700` `#C2611A` pressed ·
`cta-foreground` `#10213F` teks di atas tombol.

### Neutral

| Utility                                         | Hex       | Catatan                                                                    |
| ----------------------------------------------- | --------- | -------------------------------------------------------------------------- |
| `bg-background`                                 | `#FFFFFF` | dasar                                                                      |
| `bg-background-soft`                            | `#F6F8FC` | section selang-seling, area form                                           |
| `bg-background-muted`                           | `#EEF2F8` | card hover, disabled                                                       |
| `bg-surface-dark`                               | `#13294E` | footer, banner gelap                                                       |
| `bg-navy`                                       | `#10213F` | kaca/scrim gelap di atas foto (`bg-navy/46`), sama dengan `cta-foreground` |
| `text-foreground`                               | `#1F2A37` | teks utama                                                                 |
| `text-muted-foreground` / `text-text-secondary` | `#5B6672` | deskripsi, body-muted                                                      |
| `text-text-tertiary`                            | `#94A3B8` | placeholder, caption, meta                                                 |
| `border-border`                                 | `#E3E8EF` | garis card, divider                                                        |
| `border-border-strong` / `border-input`         | `#CBD5E1` | input, tabel                                                               |
| `ring-ring`                                     | `#092F87` | focus ring (= primary)                                                     |

### Status — pola `base` / `foreground` / `soft` / `soft-foreground`

| Status                  | base      | soft (bg) | soft-foreground (teks) |
| ----------------------- | --------- | --------- | ---------------------- |
| `success`               | `#16A34A` | `#ECFDF3` | `#15803D`              |
| `warning`               | `#CA8A04` | `#FEF9C3` | `#854D0E`              |
| `error` / `destructive` | `#DC2626` | `#FEF2F2` | `#B91C1C`              |
| `info`                  | `#0284C7` | `#EFF8FF` | `#0369A1`              |

Badge/alert: `bg-success-soft text-success-soft-foreground`. Tombol solid:
`bg-success text-success-foreground`. Warning sengaja amber (bukan oranye) biar
tidak tertukar dengan CTA.

### Chart / data viz

`chart-1` primary · `chart-2` cta · `chart-3` success · `chart-4` info ·
`chart-5` warning. Konsisten dengan brand.

## Radius

`--radius: 0.5rem` → shadcn menurunkan: `rounded-sm` 4px (badge/chip) ·
`rounded-md` 6px (**button, input**) · `rounded-lg` 8px (**card, panel**) ·
`rounded-xl` 12px (modal) · `rounded-full` (avatar, pill status) ·
`rounded-card` 28px (khusus bingkai media homepage).

## Font

**Plus Jakarta Sans Variable**, self-hosted lewat
`@fontsource-variable/plus-jakarta-sans` (di-import di `styles.css`), tanpa
request ke Google Fonts.
Heading 600/700 · body 400 · label/button 500/600. `font-sans` default di body.
`font-mono` = system mono stack, untuk nomor model instrumen (mis.
`X-Strata920`) — tanpa beban font tambahan.

## Layout & motion

| Token / utility                                              | Nilai                                   | Dipakai untuk                     |
| ------------------------------------------------------------ | --------------------------------------- | --------------------------------- |
| `px-page`                                                    | `var(--pad)` = clamp(20px, 4.2vw, 68px) | jarak tepi semua section          |
| `w-frame`                                                    | min(1440px, 100% − 2×gutter)            | hero & header transparan          |
| breakpoint `nav:`                                            | 981px                                   | nav desktop vs burger             |
| `ease-smooth`                                                | cubic-bezier(.22, 1, .36, 1)            | easing default UI                 |
| `ease-snap`                                                  | cubic-bezier(.625, .05, 0, 1)           | huruf menu bergulir               |
| `animate-marquee`                                            | loop `--duration`                       | marquee logo                      |
| `animate-panel-in(-late)` / `animate-panel-img`              | rise / zoom                             | panel berita terbuka              |
| `animate-pin-pulse`, `animate-breathe`, `animate-fade-scale` | —                                       | pin peta, glow footer, kartu hero |

## Komponen dasar

- **`SectionHeader`** — pill + judul section (`text-3xl … lg:text-[40px]`) +
  slot aksi; `tone="dark"` untuk section biru. Semua section memakainya agar
  ukuran judul seragam.
- **`GlowButton`** — pill magnetic. `variant="cta"` (oranye, aksi utama) atau
  `variant="outline"` (aksi sekunder, warna ikut teks section).
- **`ArrowButton`** — tombol panah bulat `outline` / `solid`.
- **`.glass-pill`** — pill kaca di latar gelap (footer).

## Menambah / mengubah token

1. Nilai mentah brand → blok `@theme` di `styles.css`.
2. Token semantik (yang bisa ganti per tema) → `:root`, lalu map di
   `@theme inline`.
3. Dark mode → isi `.dark {}` dengan override var `:root` yang sama.
4. Jangan tambah warna baru ad-hoc di komponen; usulkan token dulu di sini.
