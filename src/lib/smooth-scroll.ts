import Lenis from 'lenis'

let lenis: Lenis | null = null

export function startSmoothScroll() {
  lenis = new Lenis({ lerp: 0.09 })
  return lenis
}

export function stopSmoothScroll() {
  lenis?.destroy()
  lenis = null
}

// dipakai menu overlay agar halaman di belakang tidak ikut scroll
export function lockScroll() {
  lenis?.stop()
  document.body.style.overflow = 'hidden'
}

export function unlockScroll() {
  lenis?.start()
  document.body.style.overflow = ''
}
