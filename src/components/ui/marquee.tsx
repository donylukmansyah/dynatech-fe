import type { ReactNode } from 'react'

import { cn } from '#/lib/utils'

type MarqueeProps = {
  children: ReactNode
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  // salinan konten agar loop tidak terlihat putus
  repeat?: number
}

export function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = false,
  repeat = 2,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        'group/marquee flex gap-(--gap) overflow-hidden [--duration:40s] [--gap:1rem]',
        className,
      )}
    >
      {Array.from({ length: repeat }, (_, i) => (
        <div
          key={i}
          aria-hidden={i > 0 || undefined}
          className={cn(
            'flex shrink-0 animate-marquee justify-around gap-(--gap) motion-reduce:animate-none',
            reverse && '[animation-direction:reverse]',
            pauseOnHover && 'group-hover/marquee:[animation-play-state:paused]',
          )}
        >
          {children}
        </div>
      ))}
    </div>
  )
}
