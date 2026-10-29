import { Fragment, useState } from 'react'
import { Search } from 'lucide-react'

import { useStickyHeader } from '#/hooks/use-sticky-header'
import { cn } from '#/lib/utils'

import { DesktopNavLeft, DesktopNavRight } from './desktop-nav'
import { MobileMenu } from './mobile-menu'
import { certLogos } from './navigation-data'
import { useMenuOverlay } from './use-menu-overlay'

const headMotion = {
  shown: '[transition:color_0.45s_var(--ease-smooth),translate_0.5s_ease-out]',
  hidden:
    '-translate-y-full [transition:color_0.45s_var(--ease-smooth),translate_0.25s_ease-in]',
  instant:
    '-translate-y-full [transition:color_0.45s_var(--ease-smooth),translate_0s]',
}

export function SiteHeader() {
  const menu = useMenuOverlay()
  const mode = useStickyHeader({ paused: menu.open })
  const state = menu.open ? 'visible' : mode
  const solid = mode !== 'transparent'
  // di atas hero: putih + bayangan teks; solid atau menu terbuka: tinta
  const inked = solid || menu.open

  return (
    <div
      ref={menu.rootRef}
      id="sitenav"
      data-header-state={state}
      className={cn(
        'pointer-events-none inset-x-0 top-0 z-80',
        state === 'transparent' ? 'absolute' : 'fixed',
        solid && !menu.open ? 'pt-0' : 'pt-[calc(var(--gutter)+8px)]',
      )}
    >
      <div
        className={cn(
          'relative z-71 mx-auto *:pointer-events-auto motion-reduce:transition-none',
          state === 'hidden'
            ? headMotion.hidden
            : state === 'hidden-initial'
              ? headMotion.instant
              : headMotion.shown,
          solid
            ? 'w-full border-t-3 border-b border-t-primary border-b-border'
            : 'w-frame',
          solid &&
            !menu.open &&
            'bg-background shadow-[0_8px_28px_rgba(16,33,63,0.06)]',
          inked
            ? 'text-foreground'
            : 'text-white [text-shadow:0_1px_10px_rgba(12,27,54,0.45)]',
        )}
      >
        <div
          className={cn(
            'flex items-center justify-between gap-4 px-page pt-2 pb-[7px] text-xs max-nav:hidden',
            solid && 'mx-auto max-w-(--maxw)',
          )}
        >
          <div
            className="flex items-center gap-3.5"
            aria-label="Sertifikasi dan akreditasi"
          >
            {certLogos.map((c) => (
              <img
                key={c.src}
                src={c.src}
                alt={c.alt}
                title={c.alt}
                className={cn(
                  'h-[22px] w-auto object-contain transition-[filter,opacity] duration-450 ease-smooth last:h-[17px] hover:opacity-100',
                  inked
                    ? 'opacity-92'
                    : 'opacity-90 brightness-0 invert drop-shadow-[0_1px_6px_rgba(12,27,54,0.35)]',
                )}
              />
            ))}
          </div>
          <LanguageSwitch />
        </div>

        <div
          className={cn(
            'grid grid-cols-[1fr_auto_1fr] items-center gap-5 border-t border-current/20 px-page pt-[11px] pb-[14px] max-nav:grid-cols-[auto_auto] max-nav:justify-between max-nav:border-t-0 max-nav:pt-1',
            solid && 'mx-auto max-w-(--maxw)',
          )}
        >
          <DesktopNavLeft />
          <a
            href="#main"
            aria-label="Dynatech, beranda"
            className="inline-flex items-center justify-self-center max-nav:justify-self-start"
          >
            <img
              src="/brand/logo-dynatech.png"
              alt="Dynatech"
              className={cn(
                'h-[34px] w-auto transition-[filter] duration-450 ease-smooth',
                !inked &&
                  'brightness-0 invert drop-shadow-[0_1px_10px_rgba(12,27,54,0.45)]',
              )}
            />
          </a>
          <DesktopNavRight solid={solid} />

          <div className="hidden items-center gap-1 justify-self-end max-nav:flex">
            <button
              type="button"
              aria-label="Cari di Dynatech"
              className="grid size-[42px] place-items-center"
            >
              <Search className="size-[19px]" aria-hidden="true" />
            </button>
            <button
              ref={menu.burgerRef}
              type="button"
              aria-label={menu.open ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={menu.open}
              onClick={menu.toggle}
              className="grid h-11 w-12 place-content-center gap-1.5 px-[11px]"
            >
              {[
                menu.open && 'translate-y-2 rotate-45',
                menu.open && 'scale-x-0 opacity-0',
                menu.open && '-translate-y-2 -rotate-45',
              ].map((openClass, i) => (
                <span
                  key={i}
                  className={cn(
                    'block h-0.5 w-[26px] rounded-xs bg-current transition-[translate,rotate,scale,opacity] duration-500 ease-smooth',
                    openClass,
                  )}
                />
              ))}
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        open={menu.open}
        onNavigate={menu.close}
        overlayRef={menu.overlayRef}
        panelRef={menu.panelRef}
      />
    </div>
  )
}

const languages = ['id', 'en'] as const

function LanguageSwitch() {
  // pilihan bahasa belum tersambung ke routing i18n
  const [lang, setLang] = useState<(typeof languages)[number]>('id')

  return (
    <div className="flex items-center gap-2 font-medium">
      {languages.map((code, i) => (
        <Fragment key={code}>
          {i > 0 && (
            <i aria-hidden="true" className="h-3 w-px bg-current opacity-40" />
          )}
          <button
            type="button"
            aria-current={lang === code}
            onClick={() => setLang(code)}
            className="uppercase opacity-58 aria-[current=true]:opacity-100"
          >
            {code}
          </button>
        </Fragment>
      ))}
    </div>
  )
}
