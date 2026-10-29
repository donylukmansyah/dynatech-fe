import { useState } from 'react'
import { Search } from 'lucide-react'

import { ArrowButton } from '#/components/ui/arrow-button'
import { GlowButton } from '#/components/ui/glow-button'
import { SectionHeader } from '#/components/ui/section-header'
import { cn } from '#/lib/utils'

import { catalogBranches } from '../../constants/catalog'
import { useCatalogBrowser } from '../../hooks/use-catalog-browser'
import { CatalogCard } from './catalog-card'

export function ProductsSection() {
  const catalog = useCatalogBrowser()
  const [hoveredId, setHoveredId] = useState('prod-cmm')

  return (
    <section
      id="facilities"
      className="relative w-full bg-background px-page py-16 text-foreground lg:py-24"
    >
      <SectionHeader
        badge="Products"
        title="Jelajahi Lini Instrumen Kami"
        action={
          <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
            <label className="relative flex flex-1 items-center sm:w-[290px] lg:w-[340px]">
              <input
                type="search"
                value={catalog.query}
                onChange={(e) => catalog.search(e.target.value)}
                placeholder="Cari produk, manufaktur, atau market..."
                aria-label="Cari katalog produk"
                className="h-11 w-full rounded-full border border-border bg-white/90 pr-10 pl-5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
              <Search
                className="pointer-events-none absolute right-4 size-4 text-muted-foreground"
                aria-hidden="true"
              />
            </label>
            <GlowButton href="#sitefooter" label="Lihat Semua" />
          </div>
        }
      />

      <div
        className="mt-6 flex flex-wrap items-center gap-2"
        role="tablist"
        aria-label="Filter katalog produk"
      >
        {catalogBranches.map((tab) => {
          const current = catalog.activeBranch === tab.key
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={current}
              onClick={() => catalog.selectBranch(tab.key)}
              className={cn(
                'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200',
                current
                  ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                  : 'border-foreground/15 bg-white/70 text-foreground hover:border-primary/40 hover:bg-white',
              )}
            >
              <span>{tab.label}</span>
              <span
                className={cn(
                  'rounded-full px-2 py-0.5 text-[10px] font-bold',
                  current
                    ? 'bg-white/20 text-white'
                    : 'bg-foreground/8 text-muted-foreground',
                )}
              >
                {tab.count}
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {catalog.items.map((item) => (
          <CatalogCard
            key={item.id}
            item={item}
            active={hoveredId === item.id}
            onActivate={() => setHoveredId(item.id)}
          />
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <ArrowButton direction="prev" onClick={catalog.prev} />
          <ArrowButton direction="next" onClick={catalog.next} />
        </div>
        <p className="max-w-[46ch] text-left text-xs leading-relaxed text-muted-foreground sm:text-right sm:text-sm">
          Struktur katalog diselaraskan dengan kategori WooCommerce WordPress:{' '}
          {catalogBranches.slice(0, 3).map((b, i) => (
            <span key={b.key}>
              {i > 0 && (i === 2 ? ', dan ' : ', ')}
              <strong className="font-semibold text-foreground">
                {b.label}
              </strong>
            </span>
          ))}
          .
        </p>
      </div>
    </section>
  )
}
