import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

import { prefersReducedMotion } from '#/hooks/use-reduced-motion'
import { lockScroll, unlockScroll } from '#/lib/smooth-scroll'

export const CLIP = {
  closedTop: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
  open: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
  closedBottom: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
}

// overlay dibuka/ditutup dengan wipe clip-path + reveal isi
export function useMenuOverlay() {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const burgerRef = useRef<HTMLButtonElement>(null)
  const timeline = useRef<gsap.core.Timeline | null>(null)
  const busy = useRef(false)

  const play = (build: (tl: gsap.core.Timeline) => void, done?: () => void) => {
    timeline.current?.kill()
    const tl = gsap.timeline({
      onStart: () => (busy.current = true),
      onComplete: () => {
        busy.current = false
        done?.()
      },
    })
    timeline.current = tl
    build(tl)
  }

  const animateOpen = () => {
    const overlay = overlayRef.current
    const panel = panelRef.current
    if (!overlay || !panel) return
    const items = panel.querySelectorAll('[data-nav-reveal]')
    gsap.set(overlay, { clipPath: CLIP.closedTop })
    gsap.set(panel, { scale: 1, opacity: 1 })
    if (prefersReducedMotion()) {
      gsap.set(overlay, { clipPath: CLIP.open })
      gsap.set(items, { opacity: 1, y: 0 })
      return
    }
    gsap.set(items, { opacity: 0, y: 26 })
    play((tl) =>
      tl
        .to(overlay, {
          clipPath: CLIP.open,
          duration: 0.9,
          ease: 'power4.inOut',
        })
        .to(
          items,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.06,
            ease: 'power3.out',
          },
          '-=0.35',
        ),
    )
  }

  const animateClose = () => {
    const overlay = overlayRef.current
    const panel = panelRef.current
    if (!overlay || !panel) return
    if (prefersReducedMotion()) {
      gsap.set(overlay, { clipPath: CLIP.closedBottom })
      return
    }
    play(
      (tl) =>
        tl
          .to(panel, {
            scale: 0.96,
            opacity: 0.5,
            duration: 0.5,
            ease: 'power2.in',
          })
          .to(
            overlay,
            {
              clipPath: CLIP.closedBottom,
              duration: 0.8,
              ease: 'power4.inOut',
            },
            '<',
          ),
      () => gsap.set(overlay, { clipPath: CLIP.closedTop }),
    )
  }

  const toggle = () => {
    if (busy.current) return
    if (open) animateClose()
    else animateOpen()
    setOpen(!open)
  }

  const close = () => {
    if (busy.current || !open) return
    animateClose()
    setOpen(false)
  }

  // scroll-lock + focus trap + Escape selama menu terbuka
  useEffect(() => {
    if (!open) return
    lockScroll()
    const previous = document.activeElement as HTMLElement | null
    requestAnimationFrame(() => burgerRef.current?.focus())

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
        return
      }
      if (e.key !== 'Tab' || !rootRef.current) return
      const focusables = [
        ...rootRef.current.querySelectorAll<HTMLElement>('a[href], button'),
      ]
      const first = focusables.at(0)
      const last = focusables.at(-1)
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last?.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      unlockScroll()
      previous?.focus()
    }
  }, [open])

  return { open, toggle, close, rootRef, overlayRef, panelRef, burgerRef }
}
