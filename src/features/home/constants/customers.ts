export type Customer = { name: string; logo: string }

const logo = (file: string) => `/logos/customers/${file}`

export const industryCustomers: Customer[] = [
  { name: 'Amman Mineral', logo: logo('amman.png') },
  { name: 'Antam', logo: logo('antam.png') },
  { name: 'Harita Group', logo: logo('harita.png') },
  { name: 'Ceria Nugraha Indotama', logo: logo('ceria-nugraha-indotama.png') },
  { name: 'Gunbuster Nickel Industry', logo: logo('gni.png') },
  { name: 'VDNI', logo: logo('vale-vdni.png') },
  { name: 'PT Geoservices', logo: logo('geoservices.png') },
  { name: 'Triagung Jaya Abadi', logo: logo('triagung.png') },
]

export const researchCustomers: Customer[] = [
  { name: 'BRIN', logo: logo('brin.png') },
  { name: 'Sucofindo', logo: logo('sucofindo.png') },
  { name: 'Intertek', logo: logo('intertek.png') },
  { name: 'tekMIRA', logo: logo('tekmira.png') },
  { name: 'Carsurin', logo: logo('carsurin.png') },
  { name: 'Pupuk Sriwidjaja (Pusri)', logo: logo('pusri.png') },
  { name: 'INA', logo: logo('ina.png') },
]
