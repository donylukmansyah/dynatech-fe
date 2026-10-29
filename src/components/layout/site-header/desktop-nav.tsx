import { ChevronDown, Command, Search } from 'lucide-react'

import { selectSectionTab } from '#/hooks/use-section-tab'
import { cn } from '#/lib/utils'

import {
  leftLinks,
  productBranches,
  productsLink,
  rightLinks,
} from './navigation-data'
import type { NavLink } from './navigation-data'

// garis oranye tumbuh dari kiri saat hover
const underline =
  'relative py-1.5 whitespace-nowrap after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-cta after:transition-transform after:duration-400 after:ease-smooth hover:after:scale-x-100'

export const followLink = (link: NavLink) => {
  if (link.tab) selectSectionTab(link.tab.section, link.tab.value)
}

function UnderlineLink({
  link,
  className,
}: {
  link: NavLink
  className?: string
}) {
  return (
    <a
      href={link.href}
      onClick={() => followLink(link)}
      className={cn(underline, className)}
    >
      {link.label}
    </a>
  )
}

function ProductsDropdown() {
  return (
    <div className="group/dd relative inline-flex items-center">
      <a
        href={productsLink.href}
        onClick={() => followLink(productsLink)}
        className={cn(underline, 'inline-flex items-center gap-1')}
      >
        <span>{productsLink.label}</span>
        <ChevronDown
          aria-hidden="true"
          className="size-3.5 transition-transform duration-300 ease-smooth group-focus-within/dd:rotate-180 group-hover/dd:rotate-180"
        />
      </a>
      <div
        role="menu"
        className="invisible absolute top-[calc(100%+10px)] left-0 z-60 flex min-w-[230px] translate-y-1.5 flex-col gap-0.5 rounded-xl border border-white/16 bg-primary p-2 text-white opacity-0 shadow-[0_22px_48px_-12px_rgba(6,19,56,0.45)] transition-[opacity,translate,visibility] duration-250 ease-smooth before:absolute before:inset-x-0 before:-top-3 before:h-3 group-focus-within/dd:visible group-focus-within/dd:translate-y-0 group-focus-within/dd:opacity-100 group-hover/dd:visible group-hover/dd:translate-y-0 group-hover/dd:opacity-100"
      >
        {productBranches.map((b) => (
          <a
            key={b.label}
            href={b.href}
            role="menuitem"
            onClick={() => followLink(b)}
            className="rounded-lg px-3.5 py-2.5 text-[13.5px] font-medium text-white/92 transition-colors duration-200 hover:bg-white/12 hover:text-cta"
          >
            {b.label}
          </a>
        ))}
      </div>
    </div>
  )
}

const groupClass =
  'flex items-center gap-[clamp(16px,2vw,32px)] text-sm font-medium max-nav:hidden'

export function DesktopNavLeft() {
  return (
    <nav className={groupClass} aria-label="Menu kiri">
      <UnderlineLink link={leftLinks[0]} />
      <ProductsDropdown />
      <UnderlineLink link={leftLinks[1]} />
    </nav>
  )
}

export function DesktopNavRight({ solid }: { solid: boolean }) {
  return (
    <nav className={cn(groupClass, 'justify-end')} aria-label="Menu kanan">
      {rightLinks.map((link) => (
        <UnderlineLink key={link.label} link={link} />
      ))}
      <button
        type="button"
        aria-label="Cari di Dynatech"
        className={cn(
          'inline-flex h-[34px] items-center gap-1.5 rounded-lg border pr-2.5 pl-[11px] text-xs font-medium transition-[background-color,border-color] duration-250 ease-smooth',
          solid
            ? 'border-border hover:bg-background-soft'
            : 'border-white/30 bg-white/8 hover:border-white/48 hover:bg-white/16',
        )}
      >
        <Search className="size-3.5" aria-hidden="true" />
        <span>Cari</span>
        <kbd
          aria-hidden="true"
          className={cn(
            'ml-[3px] inline-flex items-center gap-0.5 rounded-[5px] px-1.5 py-0.5 font-sans text-[10px] leading-none font-semibold',
            solid ? 'bg-background-soft text-text-secondary' : 'bg-white/16',
          )}
        >
          <Command className="size-2.5" />
          <span>K</span>
        </kbd>
      </button>
    </nav>
  )
}
