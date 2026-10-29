import { ArrowRight, Calendar, MapPin } from 'lucide-react'

import type { NewsEvent } from '../../constants/news-events'

const chip =
  'inline-flex items-center gap-1.5 rounded-full border border-white/45 bg-primary-900/55 px-3.5 py-1 text-xs font-medium text-white backdrop-blur-md'

const numberBadge =
  'flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-foreground shadow-sm'

// teks vertikal: pakai margin fisik, my-* ikut writing-mode
const verticalTitle =
  'mx-3 min-w-0 flex-1 truncate text-sm font-bold tracking-tight text-white lg:mx-0 lg:mt-5 lg:mb-5 lg:min-h-0 lg:rotate-180 lg:text-base lg:[writing-mode:vertical-rl]'

export function OpenPanel({ item }: { item: NewsEvent }) {
  return (
    <div className="grid h-full grid-cols-1 lg:grid-cols-12">
      <div className="relative min-h-[240px] overflow-hidden lg:col-span-7 lg:min-h-0">
        <img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 size-full animate-panel-img object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-primary-900/85 via-primary-900/20 to-primary-900/30"
        />
        <div className="relative z-10 flex animate-panel-in flex-wrap items-center gap-2 p-5 sm:p-6">
          <span className="rounded-full bg-white px-3.5 py-1 text-xs font-bold text-primary shadow-sm">
            {item.category}
          </span>
          <span className={chip}>
            <Calendar className="size-3.5" aria-hidden="true" />
            {item.date}
          </span>
          <span className={chip}>
            <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
            <span className="max-w-[18ch] truncate">{item.location}</span>
          </span>
        </div>
      </div>

      <div className="flex animate-panel-in-late flex-col justify-between p-6 sm:p-7 lg:col-span-5">
        <div className="flex items-center justify-between gap-3">
          <span className={numberBadge}>{item.num}</span>
          <span className="text-xs font-semibold text-white/70">
            {item.category} Dynatech
          </span>
        </div>
        <div className="mt-6 space-y-3 lg:mt-auto">
          <h3 className="line-clamp-3 text-xl leading-snug font-bold tracking-tight text-white sm:text-2xl">
            {item.title}
          </h3>
          <p className="line-clamp-3 text-xs leading-relaxed text-white/80 sm:text-sm">
            {item.excerpt}
          </p>
          <a
            href={item.href}
            className="group/link inline-flex items-center gap-2 pt-2 text-xs font-bold text-white underline decoration-white/35 underline-offset-4 transition-colors hover:decoration-white focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none sm:text-sm"
          >
            Baca Selengkapnya
            <ArrowRight
              className="size-4 transition-transform group-hover/link:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </div>
  )
}

export function ClosedPanel({
  item,
  onOpen,
}: {
  item: NewsEvent
  onOpen: () => void
}) {
  return (
    <button
      type="button"
      aria-expanded={false}
      aria-label={`Buka ${item.category}: ${item.shortTitle}`}
      onClick={onOpen}
      onFocus={onOpen}
      className="flex size-full cursor-pointer items-center justify-between rounded-[inherit] px-5 py-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset lg:flex-col lg:py-6"
    >
      <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold text-white">
        {item.category}
      </span>
      <span className={verticalTitle}>{item.shortTitle}</span>
      <span
        className={`${numberBadge} transition-transform duration-300 group-hover:scale-105`}
      >
        {item.num}
      </span>
    </button>
  )
}
