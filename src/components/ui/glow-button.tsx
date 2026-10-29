import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'

import { useMagnetic } from '#/hooks/use-magnetic'
import { cn } from '#/lib/utils'

type GlowButtonProps = {
  label: string
  href: string
  // outline untuk aksi sekunder; oranye khusus CTA utama
  variant?: 'cta' | 'outline'
  icon?: ReactNode
  className?: string
}

export function GlowButton({
  label,
  href,
  variant = 'cta',
  icon,
  className,
}: GlowButtonProps) {
  const ref = useMagnetic<HTMLAnchorElement>()

  return (
    <a
      ref={ref}
      href={href}
      className={cn(
        'glow-btn group',
        variant === 'outline' && 'glow-btn--outline',
        className,
      )}
    >
      <span className="flex items-center justify-center gap-2">
        {label}
        {icon ?? (
          <ArrowUpRight
            size={15}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        )}
      </span>
    </a>
  )
}
