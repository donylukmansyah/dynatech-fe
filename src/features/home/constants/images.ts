// Foto Unsplash (sudah dicek 200). Tema lab, mikroskop, metrologi.
const unsplash = (id: string, width: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=${width}`

export const stockImages = {
  hero: unsplash('photo-1639772823907-a716be4bdecc', 1800),
  featured: unsplash('photo-1614308460927-5024ba2e1dcb', 480),
  stat: unsplash('photo-1617155093730-a8bf47be792d', 360),
  metrology: unsplash('photo-1518152006812-edab29b069ac', 1000),
  material: unsplash('photo-1646956141271-05281b4ef472', 1000),
  calibration: unsplash('photo-1614308460927-5024ba2e1dcb', 900),
  newsMou: unsplash('photo-1521791136064-7986c2920216', 1200),
  newsExpo: unsplash('photo-1540575467063-178a50c2df87', 1200),
  newsLab: unsplash('photo-1532094349884-543bc11b234d', 1200),
  newsMining: unsplash('photo-1523848309072-c199db53f137', 1200),
}

const cover = (file: string) => `/images/covers/${file}`

export const covers = {
  afm: cover('cover-bruker-afm.png'),
  coating: cover('a4-8.png'),
  hexagonMou: cover('mou-hexagon.webp'),
  polymer: cover('polymer-coating.png'),
  s8Tiger: cover('s8-tiger-series-3.png'),
}
