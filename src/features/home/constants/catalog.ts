import { covers, stockImages } from './images'

// cabang mengikuti kategori induk WooCommerce (product_cat)
export type CatalogBranch =
  'by-product' | 'by-manufacturer' | 'by-market' | 'latest'

export type CatalogItem = {
  id: string
  branch: CatalogBranch
  category: string
  subBadge: string
  title: string
  image: string
  href: string
}

export const catalogBranches: {
  key: CatalogBranch
  label: string
  count: string
}[] = [
  { key: 'by-product', label: 'Berdasarkan Produk', count: '143' },
  { key: 'by-manufacturer', label: 'Berdasarkan Manufaktur', count: '157' },
  { key: 'by-market', label: 'Berdasarkan Market', count: '85' },
  { key: 'latest', label: 'Produk Terbaru', count: 'Baru' },
]

const item = (
  id: string,
  branch: CatalogBranch,
  category: string,
  subBadge: string,
  title: string,
  image: string,
): CatalogItem => ({
  id,
  branch,
  category,
  subBadge,
  title,
  image,
  href: '#sitefooter',
})

export const catalogItems: CatalogItem[] = [
  item(
    'prod-elemental',
    'by-product',
    'Elemental Analysis',
    '11 Instrumen · XRF & OES',
    'Spektrometer WDXRF, EDXRF & Analisis Komposisi Elemen Presisi',
    covers.s8Tiger,
  ),
  item(
    'prod-cmm',
    'by-product',
    'CMM & Metrology',
    '3 Sistem · Hexagon & Mahr',
    'Coordinate Measuring Machine (CMM) & Sistem Kalibrasi 3D',
    stockImages.metrology,
  ),
  item(
    'prod-coating',
    'by-product',
    'Coating Thickness',
    '3 Instrumen · Non-Destruktif',
    'Pengukur Ketebalan Lapisan Logam, PCB & Komponen Otomotif',
    covers.coating,
  ),
  item(
    'prod-afm',
    'by-product',
    'Atomic Force Microscope',
    '6 Sistem · Skala Nanometer',
    'Mikroskopi Gaya Atom (AFM) & Karakterisasi Topografi Permukaan',
    covers.afm,
  ),
  item(
    'prod-em',
    'by-product',
    'Electron Microscope',
    '43 Instrumen · SEM & TEM',
    'Mikroskop Elektron Resolusi Tinggi untuk Riset Material & Kegagalan',
    stockImages.material,
  ),
  item(
    'prod-didactic',
    'by-product',
    'Didactic / Trainer',
    '19 Sistem · Energi & Teknik',
    'Modul Pelatihan Laboratorium Teknik, Hidrogen & Energi Terbarukan',
    covers.polymer,
  ),

  item(
    'mfg-bruker',
    'by-manufacturer',
    'Bruker',
    '15 Produk · XRF, XRD & AFM',
    'Instrumen Analitik S2 PUMA, S8 TIGER, D8 ADVANCE & SkyScan Micro-CT',
    covers.s8Tiger,
  ),
  item(
    'mfg-hitachi',
    'by-manufacturer',
    'Hitachi High Tech',
    '7 Produk · XRF & OES',
    'X-Strata920, FT200 Series & Spektrometer Analisis Lapisan Presisi',
    covers.coating,
  ),
  item(
    'mfg-hexagon',
    'by-manufacturer',
    'Hexagon Metrology',
    'Metrologi Industri 4.0',
    'Solusi CMM, Pemindaian Laser 3D & Inspeksi Kualitas Manufaktur',
    covers.hexagonMou,
  ),
  item(
    'mfg-heliocentris',
    'by-manufacturer',
    'Heliocentris Academia',
    '13 Produk · Clean Energy',
    'New Energy Lab, Solar Hydrogen Trainer & Sistem Fuel Cell Edukasi',
    stockImages.calibration,
  ),
  item(
    'mfg-mahr',
    'by-manufacturer',
    'Mahr Metrology',
    'Metrologi Dimensi Presisi',
    'Alat Ukur Kekasaran Permukaan, Kontur, Kebulatan & Hand Gauge',
    stockImages.metrology,
  ),

  item(
    'mkt-mining',
    'by-market',
    'Mining Quality Control',
    '12 Solusi · Tambang & Mineral',
    'Preparasi Sampel Tambang, Crusher, Pulverizer, Fire Assay & XRF',
    covers.s8Tiger,
  ),
  item(
    'mkt-academia',
    'by-market',
    'Academia & Research',
    '77 Produk · Universitas & R&D',
    'Instrumen Riset Material, Nanoteknologi & Sistem Pelatihan Teknik',
    covers.afm,
  ),
  item(
    'mkt-cement',
    'by-market',
    'Cement & Foundry',
    '27 Solusi · QC Pabrik',
    'Kontrol Kualitas Klinker, Bahan Baku Semen & Pengecoran Logam',
    stockImages.material,
  ),
  item(
    'mkt-oilgas',
    'by-market',
    'Oil, Gas & Energy',
    '29 Solusi · Petrokimia & Energi',
    'Pengujian Pelumas, Korosi Pipa, Polimer & Analisis Unsur Sulfur',
    covers.coating,
  ),
  item(
    'mkt-electronics',
    'by-market',
    'Electronics & Otomotif',
    '15 Solusi · Semikonduktor & PCB',
    'Uji Ketebalan Plating PCB, RoHS Screening & Metrologi Komponen',
    covers.polymer,
  ),

  item(
    'new-xstrata920',
    'latest',
    'Coating Thickness',
    'Hitachi High Tech',
    'X-Strata920 — High-Precision Desktop XRF Coatings Analyzer',
    stockImages.calibration,
  ),
  item(
    'new-ft200',
    'latest',
    'Coating Thickness',
    'Hitachi High Tech',
    'FT200 Series — Automated XRF for Rapid Coatings Analysis',
    covers.coating,
  ),
  item(
    'new-s8tiger',
    'latest',
    'Elemental Analysis',
    'Bruker AXS',
    'S8 TIGER Series 3 — Spektrometer WDXRF untuk QC Industri & Tambang',
    covers.s8Tiger,
  ),
  item(
    'new-nel',
    'latest',
    'Renewable Energy Labs',
    'Heliocentris',
    'New Energy Lab (NEL) & Hydrogen Generator HG72 Training System',
    covers.afm,
  ),
]
