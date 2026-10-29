import type { RefObject } from 'react'

import { cn } from '#/lib/utils'

import { followLink } from './desktop-nav'
import { menuImages, menuLinks, officeCities } from './navigation-data'
import { SocialLinks } from './social-links'
import { CLIP } from './use-menu-overlay'

type MobileMenuProps = {
  open: boolean
  onNavigate: () => void
  overlayRef: RefObject<HTMLElement | null>
  panelRef: RefObject<HTMLDivElement | null>
}

// huruf naik bergiliran saat hover; teks asli untuk pembaca layar
function RollingLabel({ label }: { label: string }) {
  return (
    <>
      <span className="sr-only">{label}</span>
      <span
        aria-hidden="true"
        className="relative inline-block overflow-hidden align-middle leading-[1.08]"
      >
        {[...label].map((char, i) => (
          <span
            key={i}
            className="relative inline-block whitespace-pre transition-[translate] duration-500 ease-snap [text-shadow:0_1.2em_currentColor] group-hover/link:-translate-y-[1.2em] group-focus-visible/link:-translate-y-[1.2em]"
            style={{ transitionDelay: `${i * 0.015}s` }}
          >
            {char}
          </span>
        ))}
      </span>
    </>
  )
}

export function MobileMenu({
  open,
  onNavigate,
  overlayRef,
  panelRef,
}: MobileMenuProps) {
  return (
    <nav
      ref={overlayRef}
      aria-hidden={!open}
      style={{ clipPath: CLIP.closedTop }}
      className={cn(
        'fixed inset-0 z-70 overflow-y-auto bg-background text-foreground',
        open ? 'pointer-events-auto' : 'pointer-events-none',
      )}
    >
      <div
        ref={panelRef}
        className="grid min-h-svh grid-rows-[auto_1fr_auto] gap-[clamp(22px,4vh,40px)] px-page pt-[clamp(88px,12vh,120px)] pb-[clamp(28px,5vh,48px)]"
      >
        <div className="grid gap-1 text-text-secondary" data-nav-reveal>
          <b className="text-[13px] font-bold tracking-[0.16em] uppercase">
            PT Dynatech International
          </b>
          <span className="text-[15px]">
            Instrumen pengujian &amp; laboratorium untuk industri Indonesia.
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-[clamp(28px,5vw,72px)]">
          <div className="flex flex-col gap-[clamp(0px,0.4vh,4px)]">
            {menuLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                tabIndex={open ? 0 : -1}
                onClick={() => {
                  followLink(link)
                  onNavigate()
                }}
                data-nav-reveal
                className="group/link inline-block w-max text-[clamp(38px,6vw,84px)] leading-[1.06] font-extrabold tracking-[-0.04em] text-foreground transition-colors duration-400 ease-smooth hover:text-cta focus-visible:text-cta max-md:text-[clamp(38px,12.5vw,68px)]"
              >
                <RollingLabel label={link.label} />
              </a>
            ))}
          </div>
          <div className="flex gap-3.5 max-md:hidden" data-nav-reveal>
            {menuImages.map((src) => (
              <img
                key={src}
                src={src}
                alt=""
                loading="lazy"
                className="aspect-4/5 w-[clamp(120px,15vw,220px)] rounded-[18px] object-cover"
              />
            ))}
          </div>
        </div>

        <div
          className="flex flex-wrap items-end justify-between gap-[18px] border-t border-border pt-5 text-sm text-text-secondary"
          data-nav-reveal
        >
          <SocialLinks />
          <span>{officeCities}</span>
        </div>
      </div>
    </nav>
  )
}
