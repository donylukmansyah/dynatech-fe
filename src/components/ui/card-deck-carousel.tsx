import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import type { PointerEvent } from 'react'

import { useReducedMotion } from '#/hooks/use-reduced-motion'
import { cn } from '#/lib/utils'

export type DeckSlide = {
  image: string
  title: string
  caption?: string
}

export type CardDeckCarouselHandle = {
  next: () => void
  prev: () => void
}

type CardDeckCarouselProps = {
  slides: DeckSlide[]
  scatter?: number
  autoplay?: number
  onChange?: (index: number) => void
  className?: string
}

type Fling = { index: number; x: number; y: number; rot: number }

const SETTLE =
  'transform 0.55s var(--ease-smooth), opacity 0.4s ease, filter 0.4s ease'
const FLING =
  'transform 0.42s cubic-bezier(0.32, 0, 0.67, 0), opacity 0.38s ease'

const wrap = (i: number, n: number) => ((i % n) + n) % n

// kemiringan acak tapi deterministik, dibulatkan agar SSR = client
function tiltFor(i: number, max: number) {
  const s = Math.sin((i + 1) * 12.9898) * 43758.5453
  const f = s - Math.floor(s)
  const dir = i % 2 === 0 ? 1 : -1
  return Math.round(dir * (2.5 + f * Math.max(0, max - 2.5)) * 100) / 100
}

export const CardDeckCarousel = forwardRef<
  CardDeckCarouselHandle,
  CardDeckCarouselProps
>(function Deck(
  { slides, scatter = 9, autoplay = 0, onChange, className },
  ref,
) {
  const n = slides.length
  const reduce = useReducedMotion()
  const [top, setTop] = useState(0)
  const [fling, setFling] = useState<Fling | null>(null)
  const drag = useRef<{
    x: number
    y: number
    t: number
    // gaya dari React, dikembalikan saat drag batal
    rest: Pick<CSSStyleDeclaration, 'transform' | 'transition' | 'zIndex'>
  } | null>(null)
  const lastTouch = useRef(0)

  const throwTop = useCallback(
    (dir: 1 | -1, x = 340, y = -40) => {
      if (n < 2 || fling) return
      const nextTop = wrap(top + dir, n)
      if (dir === 1) {
        setFling({ index: top, x, y, rot: x > 0 ? 18 : -18 })
        window.setTimeout(() => setFling(null), 420)
      }
      setTop(nextTop)
      onChange?.(nextTop)
    },
    [n, fling, top, onChange],
  )

  useImperativeHandle(
    ref,
    () => ({
      next: () => {
        lastTouch.current = performance.now()
        throwTop(1, 340, -35)
      },
      prev: () => {
        lastTouch.current = performance.now()
        throwTop(-1)
      },
    }),
    [throwTop],
  )

  useEffect(() => {
    if (autoplay <= 0 || n < 2) return
    const id = window.setInterval(() => {
      if (performance.now() - lastTouch.current < autoplay) return
      throwTop(1, 320, -30)
    }, autoplay)
    return () => window.clearInterval(id)
  }, [autoplay, n, throwTop])

  // posisi drag ditulis langsung ke DOM, tanpa re-render per gerakan
  const onPointerDown = (e: PointerEvent<HTMLElement>) => {
    if (fling || n < 2) return
    lastTouch.current = performance.now()
    const card = e.currentTarget
    card.setPointerCapture(e.pointerId)
    const { transform, transition, zIndex } = card.style
    drag.current = {
      x: e.clientX,
      y: e.clientY,
      t: performance.now(),
      rest: { transform, transition, zIndex },
    }
    card.style.transition = 'none'
    card.style.zIndex = String(n + 2)
    card.dataset.dragging = 'true'
  }

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (!drag.current) return
    lastTouch.current = performance.now()
    const dx = e.clientX - drag.current.x
    const dy = e.clientY - drag.current.y
    e.currentTarget.style.transform = `translate3d(${dx}px, ${dy}px, 0) rotate(${-2.5 + dx * 0.06}deg) scale(1.02)`
  }

  const onPointerUp = (e: PointerEvent<HTMLElement>) => {
    if (!drag.current) return
    const dx = e.clientX - drag.current.x
    const dy = e.clientY - drag.current.y
    const dt = Math.max(16, performance.now() - drag.current.t)
    const card = e.currentTarget
    Object.assign(card.style, drag.current.rest)
    delete card.dataset.dragging
    drag.current = null

    const dist = Math.hypot(dx, dy)
    if (dist > 65 || dist / dt > 0.55) {
      const sign = dx === 0 ? 1 : Math.sign(dx)
      throwTop(1, sign * Math.max(320, Math.abs(dx) * 2.2), dy * 1.6 - 24)
    }
  }

  if (!n) return null

  return (
    <div
      role="region"
      aria-label="Galeri kartu interaktif"
      className={cn(
        'relative grid touch-pan-y place-items-center select-none',
        className,
      )}
    >
      <div className="relative grid aspect-3/4 w-[clamp(220px,26vw,305px)] place-items-center">
        {slides.map((slide, i) => {
          const depth = wrap(i - top, n)
          const d = Math.min(depth, 3)
          const isFling = fling?.index === i
          const isTop = depth === 0 && !isFling
          const rot = depth === 0 || reduce ? -2.5 : tiltFor(i, scatter)

          const style = isFling
            ? {
                zIndex: n + 3,
                opacity: 0,
                transition: FLING,
                transform: `translate3d(${fling.x}px, ${fling.y}px, 0px) rotate(${fling.rot}deg) scale(0.92)`,
              }
            : {
                zIndex: n - depth,
                opacity: depth > 3 ? 0 : 1,
                transition: SETTLE,
                transform: `translate3d(0px, ${d ? -d * 14 : 0}px, 0px) scale(${1 - d * 0.055}) rotate(${rot}deg)`,
                filter: `brightness(${1 - d * 0.08})`,
              }

          return (
            <figure
              key={slide.title}
              data-top={isTop || undefined}
              onPointerDown={isTop ? onPointerDown : undefined}
              onPointerMove={isTop ? onPointerMove : undefined}
              onPointerUp={isTop ? onPointerUp : undefined}
              onPointerCancel={isTop ? onPointerUp : undefined}
              className={cn(
                'relative col-start-1 row-start-1 size-full origin-[50%_85%] overflow-hidden rounded-[38px] border-3 border-white/92 bg-navy shadow-[0_34px_72px_-26px_rgba(16,33,63,0.45)] will-change-transform',
                'after:pointer-events-none after:absolute after:inset-x-0 after:top-[38%] after:bottom-0 after:bg-linear-to-t after:from-navy/86 after:to-transparent',
                isTop
                  ? 'pointer-events-auto cursor-grab data-dragging:cursor-grabbing'
                  : 'pointer-events-none',
              )}
              style={style}
            >
              <img
                src={slide.image}
                alt={slide.title}
                draggable={false}
                className="pointer-events-none absolute inset-0 size-full object-cover select-none"
              />
              <figcaption className="pointer-events-none absolute right-3.5 bottom-4 left-3.5 z-2 rounded-2xl border border-white/28 bg-white/18 px-[15px] py-[11px] text-white backdrop-blur-[10px]">
                <b className="block text-[15px] font-bold tracking-[-0.01em]">
                  {slide.title}
                </b>
                {slide.caption && (
                  <span className="mt-0.5 block text-xs text-white/84">
                    {slide.caption}
                  </span>
                )}
              </figcaption>
            </figure>
          )
        })}
      </div>

      <div className="sr-only" aria-live="polite">
        {`Kartu ${top + 1} dari ${n}: ${slides[top].title}`}
      </div>
    </div>
  )
})
