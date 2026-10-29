import { useRef, useState } from 'react'

import { ArrowButton } from '#/components/ui/arrow-button'
import { CardDeckCarousel } from '#/components/ui/card-deck-carousel'
import type { CardDeckCarouselHandle } from '#/components/ui/card-deck-carousel'
import { GridBackdrop } from '#/components/ui/grid-backdrop'
import { cn } from '#/lib/utils'

import { trustSlides, trustWords } from '../constants/trust'

export function TrustSection() {
  const [active, setActive] = useState(0)
  const deckRef = useRef<CardDeckCarouselHandle>(null)

  return (
    <section
      id="trust"
      className="relative isolate overflow-x-clip bg-background px-page pt-[clamp(40px,7vh,88px)] pb-[clamp(56px,9vh,120px)]"
    >
      <GridBackdrop
        line="color-mix(in srgb, var(--foreground) 5.5%, transparent)"
        size={54}
        mask="radial-gradient(ellipse 70% 58% at 50% 0%, #000 68%, transparent 100%)"
        className="-z-1"
      />

      <div className="flex flex-wrap items-start justify-between gap-6">
        <div
          className="grid size-[clamp(132px,15vw,168px)] place-content-center rounded-full bg-background-soft p-4 text-center"
          data-reveal
        >
          <span className="text-[clamp(30px,3vw,40px)] leading-none font-extrabold tracking-[-0.04em]">
            100%
          </span>
          <span className="mt-2 text-xs leading-[1.35] text-text-secondary">
            Terkalibrasi sesuai standar ISO&nbsp;17025
          </span>
        </div>

        <div
          className="grid max-w-[560px] grid-cols-[auto_1fr] gap-[clamp(18px,2.4vw,40px)] rounded-[18px] bg-background-soft p-[clamp(20px,2.4vw,32px)] max-md:grid-cols-1 max-md:gap-2.5"
          data-reveal
        >
          <span className="text-[clamp(30px,3.2vw,44px)] font-extrabold tracking-[-0.04em] text-foreground">
            #01
          </span>
          <div>
            <h2 className="text-[clamp(18px,1.4vw,20px)] leading-[1.35] font-bold tracking-[-0.02em]">
              Dipercaya Industri
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              Ratusan lab QC/QA, pabrik, dan institusi riset mengandalkan
              instrumen serta layanan kalibrasi kami — terbukti, teruji,
              tepercaya.
            </p>
          </div>
        </div>
      </div>

      <div className="relative mt-[clamp(14px,2vh,28px)] grid min-h-[clamp(320px,44vh,480px)] place-items-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 grid content-center gap-[clamp(2px,1vh,10px)] text-[clamp(54px,11.5vw,170px)] leading-[0.92] font-extrabold tracking-[-0.05em] max-md:text-[clamp(40px,14vw,72px)]"
        >
          {trustWords.map((row) => (
            <div
              key={row[0].word}
              className="flex justify-between gap-[6vw] max-md:gap-[2vw]"
            >
              {row.map(({ word, tone }) => (
                <span
                  key={word}
                  data-drift={tone}
                  className={cn(
                    'block',
                    tone === 'ghost'
                      ? 'text-border-strong/80'
                      : 'text-foreground',
                  )}
                >
                  {word}
                </span>
              ))}
            </div>
          ))}
        </div>

        <div className="relative z-2" data-trust-card>
          <CardDeckCarousel
            ref={deckRef}
            slides={trustSlides}
            scatter={10}
            autoplay={5200}
            onChange={setActive}
          />
        </div>
      </div>

      <div className="relative z-3 mt-[clamp(16px,2.5vh,32px)] flex items-center justify-between">
        <ArrowButton direction="prev" onClick={() => deckRef.current?.prev()} />
        <div className="flex gap-2" role="tablist" aria-label="Slide">
          {trustSlides.map((s, i) => (
            <button
              key={s.title}
              type="button"
              aria-current={i === active}
              aria-label={`Slide ${i + 1}`}
              onClick={() => deckRef.current?.next()}
              className="h-[9px] w-[9px] rounded-full bg-border transition-[width,background-color] duration-350 ease-smooth aria-[current=true]:w-[26px] aria-[current=true]:bg-primary"
            />
          ))}
        </div>
        <ArrowButton
          direction="next"
          variant="solid"
          onClick={() => deckRef.current?.next()}
        />
      </div>
    </section>
  )
}
