import type { DeckSlide } from '#/components/ui/card-deck-carousel'

import { covers, stockImages } from './images'

export const trustSlides: DeckSlide[] = [
  {
    image: stockImages.metrology,
    title: 'Spesialis Aplikasi',
    caption: 'Metrologi & Kalibrasi',
  },
  {
    image: stockImages.material,
    title: 'Tim Teknis & Servis',
    caption: 'Pengujian Material & Mekanik',
  },
  {
    image: stockImages.calibration,
    title: 'Lab Kalibrasi KAN',
    caption: 'Terakreditasi ISO/IEC 17025',
  },
  {
    image: covers.hexagonMou,
    title: 'Kemitraan Prinsipal',
    caption: '40+ Merek Instrumen Global',
  },
]

// kata besar di belakang kartu; ghost = pudar, ink = tegas
export const trustWords = [
  [
    { word: 'Instrumen', tone: 'ghost' },
    { word: 'Presisi', tone: 'ink' },
  ],
  [
    { word: 'Dukungan', tone: 'ink' },
    { word: 'Ahli', tone: 'ghost' },
  ],
] as const
