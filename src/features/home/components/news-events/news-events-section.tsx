import { useEffect, useRef, useState } from 'react'

import { GlowButton } from '#/components/ui/glow-button'
import { GridBackdrop } from '#/components/ui/grid-backdrop'
import { SectionHeader } from '#/components/ui/section-header'
import { useSectionTab } from '#/hooks/use-section-tab'
import { cn } from '#/lib/utils'

import { newsEvents } from '../../constants/news-events'
import { ClosedPanel, OpenPanel } from './news-event-panel'

// jeda kecil agar kursor yang lewat tidak membuka panel di tengah jalan
const HOVER_DELAY = 140

const GLOW =
  'radial-gradient(circle at 18% 20%, color-mix(in oklch, var(--color-primary-400) 32%, transparent) 0%, transparent 52%), radial-gradient(circle at 84% 78%, color-mix(in oklch, var(--color-primary-300) 16%, transparent) 0%, transparent 48%)'

export function NewsEventsSection() {
  const [active, setActive] = useState(0)
  const hoverTimer = useRef<number | undefined>(undefined)

  useSectionTab('news-events', (tab) => {
    const category = tab === 'events' ? 'Events' : 'Berita'
    const idx = newsEvents.findIndex((x) => x.category === category)
    if (idx >= 0) setActive(idx)
  })

  // gambar panel lain dimuat duluan biar tidak berkedip saat dibuka
  useEffect(() => {
    newsEvents.forEach((item) => {
      new Image().src = item.image
    })
    return () => window.clearTimeout(hoverTimer.current)
  }, [])

  const hoverOpen = (idx: number) => {
    window.clearTimeout(hoverTimer.current)
    hoverTimer.current = window.setTimeout(() => setActive(idx), HOVER_DELAY)
  }

  return (
    <section
      id="news-events"
      className="relative w-full overflow-hidden bg-primary px-page py-16 text-primary-foreground lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: GLOW }}
      />
      <GridBackdrop
        line="color-mix(in srgb, white 5%, transparent)"
        size={56}
      />

      <div className="relative z-10">
        <SectionHeader
          tone="dark"
          badge="Berita & Events"
          title="Acara, Seminar & Berita Terbaru"
          action={
            <GlowButton
              href="#sitefooter"
              label="Lihat Semua"
              variant="outline"
            />
          }
        />

        <div
          className="mt-8 flex flex-col gap-4 lg:mt-10 lg:h-[400px] lg:flex-row"
          data-reveal
          onPointerLeave={() => window.clearTimeout(hoverTimer.current)}
        >
          {newsEvents.map((item, idx) => {
            const open = active === idx
            return (
              <article
                key={item.num}
                onPointerEnter={(e) => {
                  if (e.pointerType === 'mouse') hoverOpen(idx)
                }}
                className={cn(
                  'group relative overflow-hidden rounded-card border transition-[flex-grow,background-color,border-color] duration-700 ease-smooth',
                  open
                    ? 'border-white/30 bg-primary-700/60 shadow-xl backdrop-blur-xl lg:flex-[3.4]'
                    : 'min-h-[76px] border-white/15 bg-primary-500/40 hover:bg-primary-500/55 lg:min-h-0 lg:flex-[0.48]',
                )}
              >
                {open ? (
                  <OpenPanel item={item} />
                ) : (
                  <ClosedPanel item={item} onOpen={() => setActive(idx)} />
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
