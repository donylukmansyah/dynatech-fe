import { covers } from './images'

export type ArticleTeaser = {
  id: string
  date: string
  title: string
  excerpt: string
  image: string
  tags: string[]
  href: string
}

export const latestArticles: ArticleTeaser[] = [
  {
    id: 'post-8857',
    date: 'Februari 2026',
    title:
      'AFM untuk Aplikasi Aluminium Alloy — Melihat Permukaan hingga Skala Nanometer',
    excerpt:
      'Karakterisasi topografi dan kekasaran permukaan aluminium alloy menggunakan Bruker Atomic Force Microscope.',
    image: covers.afm,
    tags: ['Artikel', 'Bruker AFM', 'Nanoteknologi'],
    href: '#sitefooter',
  },
  {
    id: 'post-8852',
    date: 'Februari 2026',
    title:
      'Nanoindentation untuk Evaluasi Performa Nanolubricant: Uji Mikro Kualitas Makro',
    excerpt:
      'Pengukuran sifat mekanik lokal dan ketahanan aus lapisan pelumas nano secara presisi.',
    image: covers.coating,
    tags: ['Artikel', 'Mechanical Testing', 'R&D'],
    href: '#sitefooter',
  },
  {
    id: 'post-8810',
    date: 'November 2025',
    title:
      'Mengenal Lapisan Polimer: Material Tipis yang Mengubah Banyak Hal di Sekitar Kita',
    excerpt:
      'Karakterisasi struktur dan ketebalan lapisan polimer fungsional untuk proteksi dan rekayasa permukaan.',
    image: covers.polymer,
    tags: ['Artikel', 'Polymer Coating', 'Material Science'],
    href: '#sitefooter',
  },
]
