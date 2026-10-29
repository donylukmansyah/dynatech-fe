import { stockImages } from './images'

export type NewsEvent = {
  num: string
  category: 'Berita' | 'Events'
  date: string
  location: string
  shortTitle: string
  title: string
  excerpt: string
  image: string
  href: string
}

export const newsEvents: NewsEvent[] = [
  {
    num: '01',
    category: 'Berita',
    date: 'Maret 2026',
    location: 'Jakarta',
    shortTitle: 'MoU PIDI 4.0 & Hexagon',
    title:
      'Penandatanganan MoU Kemenperin PIDI 4.0 & Hexagon Manufacturing Intelligence',
    excerpt:
      'Kolaborasi strategis percepatan transformasi industri 4.0 dan metrologi presisi bagi manufaktur nasional bersama PT Dynatech International.',
    image: stockImages.newsMou,
    href: '#sitefooter',
  },
  {
    num: '02',
    category: 'Events',
    date: 'Februari 2026',
    location: 'JCC Senayan, Jakarta',
    shortTitle: 'Lab Indonesia Exhibition',
    title:
      'Pameran Instrumen Analitik, XRF & Mikroskopi di Lab Indonesia Exhibition',
    excerpt:
      'Demo langsung spektrometer Bruker S8 TIGER, Hitachi X-Strata920, serta konsultasi aplikasi pengujian sampel bersama spesialis kami.',
    image: stockImages.newsExpo,
    href: '#sitefooter',
  },
  {
    num: '03',
    category: 'Berita',
    date: 'Januari 2026',
    location: 'Cikarang',
    shortTitle: 'Akreditasi Lab Kalibrasi KAN',
    title:
      'Perluasan Lingkup Akreditasi Laboratorium Kalibrasi ISO/IEC 17025 KAN',
    excerpt:
      'Peningkatan kapabilitas layanan kalibrasi dimensi, gaya mekanik, dan instrumen analitik dengan ketertelusuran standar internasional.',
    image: stockImages.newsLab,
    href: '#sitefooter',
  },
  {
    num: '04',
    category: 'Events',
    date: 'Desember 2025',
    location: 'Surabaya & Kendari',
    shortTitle: 'Workshop QC Tambang & Smelter',
    title:
      'Seminar Teknis Preparasi Sampel, Fire Assay & Analisis Elemen Mineral',
    excerpt:
      'Pelatihan teknis metode preparasi sampel bijih nikel, bauksit, dan emas menggunakan sistem fusi otomatis serta spektrometri XRF/XRD.',
    image: stockImages.newsMining,
    href: '#sitefooter',
  },
]
