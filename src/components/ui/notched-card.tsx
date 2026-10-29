import { ArrowUpRight } from 'lucide-react'

import { cn } from '#/lib/utils'

type NotchedCardProps = {
  href: string
  title: string
  description?: string
  image: string
  imageAlt?: string
  badge?: string
  tags?: string[]
  // warna latar di bawah kartu, untuk mengisi lekukan sudut
  surface?: string
  className?: string
}

// lekukan cekung sudut kanan bawah: blok + 2 fillet
const DISC = 64
const BLOCK = 80
const FILLET = 28

export function NotchedCard({
  href,
  title,
  description,
  image,
  imageAlt = '',
  badge,
  tags = [],
  surface = 'var(--background)',
  className,
}: NotchedCardProps) {
  return (
    <a
      href={href}
      className={cn(
        'group flex flex-col rounded-card outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background',
        className,
      )}
    >
      <div className="relative">
        <div className="relative aspect-4/3 overflow-hidden rounded-card bg-muted">
          <img
            src={image}
            alt={imageAlt}
            loading="lazy"
            className="absolute inset-0 size-full object-cover transition-[scale] duration-500 group-hover:scale-[1.04]"
          />
          {badge && (
            <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center pt-4">
              <span className="rounded-full border border-white/40 bg-black/35 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                {badge}
              </span>
            </div>
          )}
        </div>

        <div
          aria-hidden="true"
          className="absolute right-0 bottom-0"
          style={{
            width: BLOCK,
            height: BLOCK,
            borderTopLeftRadius: BLOCK - DISC / 2,
            background: surface,
          }}
        />
        {[
          { bottom: BLOCK, right: 0 },
          { bottom: 0, right: BLOCK },
        ].map((pos) => (
          <div
            key={`${pos.bottom}-${pos.right}`}
            aria-hidden="true"
            className="absolute"
            style={{
              ...pos,
              width: FILLET,
              height: FILLET,
              background: `radial-gradient(circle at top left, transparent ${FILLET - 0.5}px, ${surface} ${FILLET}px)`,
            }}
          />
        ))}

        <span
          aria-hidden="true"
          className="absolute right-0 bottom-0 flex items-center justify-center rounded-full bg-primary text-primary-foreground transition-[background-color,color,scale] duration-300 group-hover:scale-105 group-hover:bg-cta group-hover:text-cta-foreground"
          style={{ width: DISC, height: DISC }}
        >
          <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>

      <h3 className="mt-5 line-clamp-2 text-lg leading-snug font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary sm:text-xl">
        {title}
      </h3>
      {description && (
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
      {tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md bg-secondary px-2.5 py-1 text-[10px] font-semibold tracking-wider text-secondary-foreground uppercase"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </a>
  )
}
