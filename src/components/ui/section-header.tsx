import type { ReactNode } from 'react'

import { cn } from '#/lib/utils'

type SectionHeaderProps = {
  badge: string
  title: ReactNode
  titleId?: string
  action?: ReactNode
  tone?: 'light' | 'dark'
  className?: string
}

// pola header section: pill + judul di kiri, aksi di kanan
export function SectionHeader({
  badge,
  title,
  titleId,
  action,
  tone = 'light',
  className,
}: SectionHeaderProps) {
  const dark = tone === 'dark'

  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-between gap-6',
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-3.5">
        <span
          className={cn(
            'rounded-full border px-4 py-1.5 text-xs font-semibold tracking-tight backdrop-blur-sm',
            dark
              ? 'border-white/25 bg-white/10 text-white'
              : 'border-foreground/25 bg-white/60 text-foreground',
          )}
        >
          {badge}
        </span>
        <h2
          id={titleId}
          className={cn(
            'text-3xl leading-[1.08] font-bold tracking-tight sm:text-4xl lg:text-[40px]',
            dark ? 'text-white' : 'text-foreground',
          )}
          data-reveal
        >
          {title}
        </h2>
      </div>
      {action}
    </div>
  )
}
