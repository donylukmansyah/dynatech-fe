import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUp, MapPin, Phone } from 'lucide-react'

import { GlowButton } from '#/components/ui/glow-button'
import { GridBackdrop } from '#/components/ui/grid-backdrop'
import { useInView } from '#/hooks/use-in-view'
import { useMagnetic } from '#/hooks/use-magnetic'
import { cn } from '#/lib/utils'

import { certLogos, contact, footerColumns } from './footer-data'

gsap.registerPlugin(ScrollTrigger)

const AURORA =
  'radial-gradient(circle at 50% 50%, color-mix(in oklch, var(--primary) 34%, transparent) 0%, color-mix(in oklch, var(--cta) 16%, transparent) 42%, transparent 70%)'

export function SiteFooter() {
  // footer fixed di bawah main; tak perlu dipaint selama tertutup
  const [wrapperRef, inView] = useInView<HTMLDivElement>('100% 0px')
  const giantRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const phoneRef = useMagnetic<HTMLAnchorElement>()
  const topRef = useMagnetic<HTMLButtonElement>()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantRef.current,
        { y: '10vh', scale: 0.8, opacity: 0 },
        {
          y: '0vh',
          scale: 1,
          opacity: 1,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top 80%',
            end: 'bottom bottom',
            scrub: 1,
          },
        },
      )
      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top 40%',
            end: 'bottom bottom',
            scrub: 1,
          },
        },
      )
    })
    return () => ctx.revert()
  }, [wrapperRef])

  return (
    <div
      id="sitefooter"
      ref={wrapperRef}
      className="relative h-screen w-full [clip-path:polygon(0%_0,100%_0%,100%_100%,0_100%)]"
    >
      <footer
        className={cn(
          'fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-primary text-white',
          !inView && 'invisible',
        )}
      >
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute top-1/2 left-1/2 z-0 h-[60vh] w-[80vw] -translate-1/2 animate-breathe rounded-[50%] blur-[80px]',
            !inView && '[animation-play-state:paused]',
          )}
          style={{ background: AURORA }}
        />
        <GridBackdrop
          line="color-mix(in oklch, white 4%, transparent)"
          size={60}
          mask="linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)"
          className="z-0"
        />

        <div
          ref={giantRef}
          aria-hidden="true"
          className="text-outline-giant pointer-events-none absolute -bottom-[4vh] left-1/2 z-0 -translate-x-1/2 whitespace-nowrap select-none"
        >
          DYNATECH
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-6 border-b border-white/10 px-6 pt-8 pb-6 md:px-12">
          <div className="flex flex-wrap items-center gap-5">
            <img
              src="/brand/logo-dynatech.png"
              alt="PT Dynatech International"
              className="h-8 w-auto brightness-0 invert"
            />
            <span
              aria-hidden="true"
              className="hidden h-5 w-px bg-white/20 sm:block"
            />
            <p className="max-w-md text-xs leading-relaxed text-white/65 sm:text-sm">
              Distributor instrumen pengujian, analitis, dan laboratorium
              terakreditasi KAN untuk industri Indonesia.
            </p>
          </div>
          <div className="hidden items-center gap-3.5 lg:flex">
            {certLogos.map((c) => (
              <img
                key={c.src}
                src={c.src}
                alt={c.alt}
                title={c.alt}
                className="h-6 w-auto object-contain opacity-80 brightness-0 invert transition-opacity hover:opacity-100"
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-6 md:px-12">
          <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div ref={headingRef} className="lg:col-span-7">
              <h2 className="text-glow text-4xl leading-[1.02] font-black tracking-tight sm:text-6xl lg:text-7xl">
                Siap uji presisi?
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
                Diskusikan spesifikasi instrumen, demonstrasi unit, atau jadwal
                kalibrasi bersama spesialis aplikasi kami.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <GlowButton href={contact.quoteHref} label="Minta Penawaran" />
                <a
                  ref={phoneRef}
                  href={contact.phone.href}
                  className="glass-pill group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold text-white"
                >
                  <Phone className="size-3.5 text-primary-300 transition-colors group-hover:text-white" />
                  <span>{contact.phone.label}</span>
                </a>
              </div>
            </div>

            <div
              ref={linksRef}
              className="grid grid-cols-2 gap-8 lg:col-span-5 lg:border-l lg:border-white/10 lg:pl-12"
            >
              {footerColumns.map((col) => (
                <nav key={col.title} aria-label={col.title}>
                  <h3 className="text-xs font-bold tracking-[0.16em] text-white/45 uppercase">
                    {col.title}
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm font-medium text-white/80">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="inline-block transition-colors hover:text-cta"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-6 pb-8 md:flex-row md:px-12">
          <div className="order-2 text-[11px] font-medium tracking-wider text-white/55 uppercase md:order-1 md:text-xs">
            © {new Date().getFullYear()} PT Dynatech International. All rights
            reserved.
          </div>
          <div className="glass-pill order-1 flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-white/80 md:order-2">
            <MapPin className="size-3.5 text-cta" />
            <span>{contact.cities}</span>
          </div>
          <button
            ref={topRef}
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Kembali ke atas"
            className="glass-pill group order-3 flex size-10 items-center justify-center rounded-full text-white/75 hover:text-white"
          >
            <ArrowUp className="size-4 transition-transform duration-300 group-hover:-translate-y-1" />
          </button>
        </div>
      </footer>
    </div>
  )
}
