import { ArrowUpRight, Layers } from 'lucide-react'

import { cn } from '#/lib/utils'

import type { CatalogItem } from '../../constants/catalog'

type CatalogCardProps = {
  item: CatalogItem
  active: boolean
  onActivate: () => void
}

// detail kaca muncul saat aktif atau hover; sisanya tetap gambar
export function CatalogCard({ item, active, onActivate }: CatalogCardProps) {
  return (
    <a
      href={item.href}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      className="group relative flex aspect-3/4 flex-col justify-between overflow-hidden rounded-[26px] bg-primary p-4 text-white shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <img
        src={item.image}
        alt={item.category}
        loading="lazy"
        className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b from-black/30 via-black/10 to-black/75"
      />

      <div className="relative z-10 flex items-center justify-between gap-2">
        <span
          className={cn(
            'flex size-9 items-center justify-center rounded-full border border-white/30 bg-white/20 backdrop-blur-md transition-opacity duration-300',
            active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
          )}
        >
          <Layers className="size-4" aria-hidden="true" />
        </span>
        <span className="ml-auto rounded-full border border-white/60 bg-black/20 px-3.5 py-1 text-xs font-medium backdrop-blur-md">
          {item.category}
        </span>
      </div>

      <div className="relative z-10 mt-auto">
        <div
          className={cn(
            'rounded-[20px] border transition-all duration-300',
            active
              ? 'border-white/30 bg-white/20 p-4 shadow-lg backdrop-blur-xl'
              : 'border-transparent p-2 group-hover:border-white/30 group-hover:bg-white/20 group-hover:p-4 group-hover:shadow-lg group-hover:backdrop-blur-xl',
          )}
        >
          <span
            className={cn(
              'mb-2 inline-block rounded-full border border-white/50 bg-white/15 px-2.5 py-0.5 text-[11px] font-medium transition-all duration-300',
              active
                ? 'translate-y-0 opacity-100'
                : 'translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100',
            )}
          >
            {item.subBadge}
          </span>
          <div className="flex items-end justify-between gap-3">
            <h3 className="line-clamp-2 text-base leading-snug font-medium tracking-tight lg:text-[17px]">
              {item.title}
            </h3>
            <span
              className={cn(
                'flex size-8 shrink-0 items-center justify-center rounded-full bg-primary transition-all duration-300 group-hover:bg-cta group-hover:text-cta-foreground',
                active
                  ? 'scale-100 opacity-100'
                  : 'scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100',
              )}
            >
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>
    </a>
  )
}
