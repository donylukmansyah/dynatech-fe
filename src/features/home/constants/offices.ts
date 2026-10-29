export type Office = {
  id: string
  city: string
  role: string
  address: string
  showPhone?: boolean
  // [lng, lat] — koordinat perkiraan, konfirmasi saat cutover
  coords: [number, number]
}

export const offices: Office[] = [
  {
    id: 'jakarta',
    city: 'Jakarta',
    role: 'Kantor Pusat',
    address:
      'Kebon Jeruk Business Park Blok F2-9, Jl. Raya Meruya Ilir No. 88, Meruya Utara, Jakarta Barat 11620',
    showPhone: true,
    coords: [106.7663, -6.1942],
  },
  {
    id: 'cikarang',
    city: 'Cikarang',
    role: 'Lab Kalibrasi KAN',
    address: 'Jl. Niaga Raya, Kabupaten Bekasi, Jawa Barat 17530',
    coords: [107.156, -6.299],
  },
  {
    id: 'surabaya',
    city: 'Surabaya',
    role: 'Kantor Jawa Timur',
    address:
      'Gedung Bumi Mandiri, Jl. Jend. Basuki Rachmat No. 129-137, Embong Kaliasin, Genteng, Surabaya, Jawa Timur 60271',
    coords: [112.7406, -7.2683],
  },
  // belum tercantum di web lama; sumbernya Company Profile 2025
  {
    id: 'kendari',
    city: 'Kendari',
    role: 'Layanan Tambang Sulawesi',
    address: 'Jl. Malaka Blok A01/015, CitraLand, Kendari, Sulawesi Tenggara',
    coords: [122.5183, -4.0089],
  },
]

// satu nomor untuk semua kantor, cukup tampil di Pusat
export const officePhone = {
  label: '+62 21 5859 365',
  href: 'tel:+62215859365',
}
export const salesEmail = 'sales@dynatech-int.com'

export const directionsUrl = (office: Office) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `PT Dynatech International ${office.address}`,
  )}`
