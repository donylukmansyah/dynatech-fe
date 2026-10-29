export type NavLink = {
  label: string
  href: string
  // tab yang dipilih di section tujuan (lihat use-section-tab)
  tab?: { section: string; value: string }
}

export const certLogos = [
  { src: '/logos/certifications/iso-9001.webp', alt: 'ISO 9001:2015' },
  { src: '/logos/certifications/iso-14001.webp', alt: 'ISO 14001:2015' },
  { src: '/logos/certifications/iso-45001.webp', alt: 'ISO 45001:2018' },
  { src: '/logos/certifications/iso-17025.webp', alt: 'ISO 17025:2017' },
  {
    src: '/logos/certifications/kan-accreditation.webp',
    alt: 'Terakreditasi KAN',
  },
]

const productTab = (value: string) => ({ section: 'products', value })
const newsTab = (value: string) => ({ section: 'news-events', value })

export const productsLink: NavLink = {
  label: 'Products',
  href: '#facilities',
  tab: productTab('by-product'),
}

export const productBranches: NavLink[] = [
  {
    label: 'Berdasarkan Produk',
    href: '#facilities',
    tab: productTab('by-product'),
  },
  {
    label: 'Berdasarkan Manufaktur',
    href: '#facilities',
    tab: productTab('by-manufacturer'),
  },
  {
    label: 'Berdasarkan Market',
    href: '#facilities',
    tab: productTab('by-market'),
  },
]

export const leftLinks: NavLink[] = [
  { label: 'Tentang Kami', href: '#trust' },
  { label: 'Artikel', href: '#insights' },
]

export const rightLinks: NavLink[] = [
  { label: 'Events', href: '#news-events', tab: newsTab('events') },
  { label: 'Berita', href: '#news-events', tab: newsTab('news') },
  { label: 'Karir', href: '#sitefooter' },
  { label: 'Hubungi Kami', href: '#contact' },
]

export const menuLinks: NavLink[] = [
  { label: 'Tentang Kami', href: '#trust' },
  productsLink,
  { label: 'Artikel', href: '#insights' },
  ...rightLinks,
]

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=520`

export const menuImages = [
  unsplash('photo-1614308460927-5024ba2e1dcb'),
  unsplash('photo-1646956141271-05281b4ef472'),
]

export const officeCities = 'Jakarta · Cikarang · Surabaya · Kendari'
