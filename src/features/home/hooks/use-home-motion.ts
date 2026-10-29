import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { startSmoothScroll, stopSmoothScroll } from '#/lib/smooth-scroll'

gsap.registerPlugin(ScrollTrigger)

const scrubThrough = (trigger: string) => ({
  trigger,
  start: 'top bottom',
  end: 'bottom top',
  scrub: true,
})

// Lenis + scene GSAP homepage; semua dibersihkan saat unmount
export function useHomeMotion() {
  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const lenis = startSmoothScroll()
      const tick = (time: number) => lenis.raf(time * 1000)
      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)

      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .from('[data-hero-word]', {
          yPercent: 112,
          duration: 1.1,
          stagger: 0.08,
        })
        .from(
          '[data-hero-reveal]',
          { y: 26, opacity: 0, duration: 0.9, stagger: 0.09 },
          0.3,
        )

      gsap.to('[data-hero-img] img', {
        yPercent: 14,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // kata ghost/ink di trust melayang berlawanan arah
      gsap
        .timeline({ scrollTrigger: scrubThrough('#trust') })
        .fromTo(
          '[data-drift="ghost"]',
          { xPercent: -6 },
          { xPercent: 10, ease: 'none' },
          0,
        )
        .fromTo(
          '[data-drift="ink"]',
          { xPercent: 6 },
          { xPercent: -8, ease: 'none' },
          0,
        )

      gsap.fromTo(
        '[data-trust-card]',
        { yPercent: 6 },
        { yPercent: -6, ease: 'none', scrollTrigger: scrubThrough('#trust') },
      )

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) =>
        gsap.from(el, {
          y: 34,
          opacity: 0,
          duration: 0.9,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 86%', once: true },
        }),
      )

      ScrollTrigger.refresh()

      return () => {
        gsap.ticker.remove(tick)
        gsap.ticker.lagSmoothing(500, 33)
        stopSmoothScroll()
      }
    })

    return () => mm.revert()
  }, [])
}
