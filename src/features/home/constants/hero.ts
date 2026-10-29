import { covers, stockImages } from './images'

export type LatestUpdate = {
  kicker: string
  title: string
  cta: string
  href: string
  image: string
}

export const latestUpdates: LatestUpdate[] = [
  {
    kicker: 'Produk Unggulan',
    title: 'Hitachi X-Strata920 — XRF Coating Thickness',
    cta: 'Lihat Produk',
    href: '#facilities',
    image: stockImages.featured,
  },
  {
    kicker: 'Berita Terbaru',
    title: 'Penandatanganan MoU PIDI 4.0 & Hexagon Manufacturing',
    cta: 'Baca Berita',
    href: '#news-events',
    image: covers.hexagonMou,
  },
  {
    kicker: 'Artikel Teknis',
    title: 'Bruker S8 TIGER Series 2 — Spektrometer WDXRF Presisi',
    cta: 'Baca Artikel',
    href: '#insights',
    image: covers.s8Tiger,
  },
]

export const principalBadges = [
  {
    id: 1,
    name: 'Bruker',
    designation: 'XRF, XRD & Mikroskopi',
    image: '/logos/principals/bruker.webp',
  },
  {
    id: 2,
    name: 'Hitachi High-Tech',
    designation: 'XRF Coating & Analitis',
    image: '/logos/principals/hitachi.png',
  },
  {
    id: 3,
    name: 'Hexagon',
    designation: 'Metrologi Industri & CMM',
    image: '/logos/principals/hexagon.webp',
  },
  {
    id: 4,
    name: 'Mahr',
    designation: 'Metrologi Dimensi Presisi',
    image: '/logos/principals/mahr.webp',
  },
  {
    id: 5,
    name: 'Thermo Scientific',
    designation: 'Instrumen Analitis Lab',
    image: '/logos/principals/thermo-scientific.webp',
  },
]

export const heroPrincipals = [
  ['Bruker', 'Analytical'],
  ['Hitachi', 'High-Tech'],
  ['Hexagon', 'Metrology'],
]
