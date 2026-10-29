import { useEffect, useRef, useState } from 'react'
import type { Map as MapLibreMap, Marker } from 'maplibre-gl'

import type { Office } from '../constants/offices'

// gratis & open source, tanpa API key
const MAP_STYLE = 'https://tiles.openfreemap.org/styles/positron'

// kelas Tailwind dipakai di string karena pin dibuat imperatif
const PIN_CLASS =
  'group/pin relative grid size-7 cursor-pointer place-items-center before:absolute before:inset-0 before:rounded-full before:bg-primary/30 before:opacity-0 data-[active=true]:before:animate-pin-pulse'
const PIN_INNER = `
  <span class="size-3.5 rounded-full bg-primary ring-4 ring-primary/22 transition-transform duration-400 ease-smooth group-data-[active=true]/pin:scale-125"></span>
  <span class="pointer-events-none absolute bottom-[calc(100%+4px)] left-1/2 -translate-x-1/2 rounded-full bg-background px-2.5 py-1 text-xs leading-[1.2] font-semibold whitespace-nowrap text-foreground opacity-0 shadow-[0_4px_14px_rgba(31,42,55,0.14)] transition-opacity duration-300 group-hover/pin:opacity-100 group-data-[active=true]/pin:opacity-100"></span>`

type UseOfficeMapOptions = {
  offices: Office[]
  active: number
  onSelect: (index: number) => void
}

// peta dimuat saat container mendekat, biar bundle awal ringan
export function useOfficeMap({
  offices,
  active,
  onSelect,
}: UseOfficeMapOptions) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<MapLibreMap | null>(null)
  const markersRef = useRef<Marker[]>([])
  const selectRef = useRef(onSelect)
  selectRef.current = onSelect
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    let cancelled = false

    const init = async () => {
      const [lib, worker] = await Promise.all([
        import('maplibre-gl'),
        import('maplibre-gl/dist/maplibre-gl-worker.mjs?url'),
        import('maplibre-gl/dist/maplibre-gl.css'),
      ])
      if (cancelled) return
      // Vite tidak ikut membundel worker bawaan MapLibre
      lib.setWorkerUrl(worker.default)

      const bounds = new lib.LngLatBounds()
      offices.forEach((o) => bounds.extend(o.coords))
      const map = new lib.Map({
        container: el,
        style: MAP_STYLE,
        bounds,
        fitBoundsOptions: { padding: 60 },
        attributionControl: { compact: true },
        // wheel tetap untuk scroll halaman, bukan zoom peta
        scrollZoom: false,
        dragPan: !window.matchMedia('(pointer: coarse)').matches,
        dragRotate: false,
        pitchWithRotate: false,
      })
      map.touchZoomRotate.disableRotation()
      map.addControl(
        new lib.NavigationControl({ showCompass: false }),
        'bottom-right',
      )
      mapRef.current = map

      map.on('load', () => {
        // air diwarnai tint primary agar senada dengan brand
        const tint = getComputedStyle(el)
          .getPropertyValue('--color-primary-100')
          .trim()
        if (tint) {
          for (const layer of map.getStyle().layers) {
            if (layer.type === 'fill' && layer.id.includes('water'))
              map.setPaintProperty(layer.id, 'fill-color', tint)
          }
        }
        // atribusi compact defaultnya terbuka; tutup biar peta lega
        el.querySelector('.maplibregl-ctrl-attrib')?.classList.remove(
          'maplibregl-compact-show',
        )
        setReady(true)
      })

      markersRef.current = offices.map((office, idx) => {
        const pin = document.createElement('button')
        pin.type = 'button'
        pin.className = PIN_CLASS
        pin.setAttribute('aria-label', `Lihat kantor ${office.city}`)
        pin.innerHTML = PIN_INNER
        pin.lastElementChild?.replaceChildren(office.city)
        pin.addEventListener('click', () => selectRef.current(idx))
        return new lib.Marker({ element: pin, anchor: 'center' })
          .setLngLat(office.coords)
          .addTo(map)
      })
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        void init()
      },
      { rootMargin: '600px 0px' },
    )
    io.observe(el)

    return () => {
      cancelled = true
      io.disconnect()
      markersRef.current.forEach((m) => m.remove())
      markersRef.current = []
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [offices])

  useEffect(() => {
    markersRef.current.forEach((m, idx) => {
      m.getElement().dataset.active = String(idx === active)
    })
    if (!ready || !mapRef.current) return
    mapRef.current.flyTo({
      center: offices[active].coords,
      zoom: 14.2,
      speed: 0.9,
      curve: 1.6,
    })
  }, [active, ready, offices])

  return containerRef
}
