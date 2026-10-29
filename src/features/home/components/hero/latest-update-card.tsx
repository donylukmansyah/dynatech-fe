import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'

import { latestUpdates } from '../../constants/hero'

const ROTATE_MS = 4800

export function LatestUpdateCard() {
  const [active, setActive] = useState(0)
  const next = () => setActive((i) => (i + 1) % latestUpdates.length)
  const item = latestUpdates[active]

  useEffect(() => {
    const id = window.setInterval(next, ROTATE_MS)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div
      className="mr-[clamp(0px,7vw,108px)] flex items-center max-md:mr-0"
      data-hero-reveal
    >
      <button
        type="button"
        aria-label="Ganti info terbaru"
        onClick={next}
        className="relative grid size-[30px] place-items-center rounded-full border border-white/28 bg-white/16 backdrop-blur-sm transition-transform duration-300 ease-smooth hover:scale-110 max-md:hidden"
      >
        <span className="size-[9px] rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]" />
      </button>
      <i
        aria-hidden="true"
        className="h-px w-[clamp(18px,2.6vw,36px)] bg-white/38 max-md:hidden"
      />

      <div className="flex w-[min(356px,82vw)] items-center gap-3.5 rounded-[20px] border border-white/24 bg-navy/46 py-2.5 pr-3.5 pl-2.5 text-white shadow-[0_18px_40px_rgba(8,18,38,0.28)] backdrop-blur-[16px]">
        <img
          key={item.image}
          src={item.image}
          alt={item.title}
          className="size-[78px] flex-none animate-fade-scale rounded-[14px] object-cover"
        />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-bold tracking-[0.06em] text-white/76 uppercase">
              {item.kicker}
            </span>
            <div className="flex items-center gap-1" role="tablist">
              {latestUpdates.map((u, i) => (
                <button
                  key={u.title}
                  type="button"
                  aria-label={u.kicker}
                  aria-current={i === active}
                  onClick={() => setActive(i)}
                  className="h-[5px] w-[5px] rounded-full bg-white/35 transition-[width,background-color] duration-300 ease-smooth aria-[current=true]:w-3.5 aria-[current=true]:bg-cta"
                />
              ))}
            </div>
          </div>
          <a
            href={item.href}
            className="line-clamp-2 text-[13px] leading-tight font-semibold"
          >
            {item.title}
          </a>
          <a
            href={item.href}
            className="mt-0.5 inline-flex items-center gap-[5px] text-[11.5px] font-medium text-white/88 underline underline-offset-3 hover:text-white"
          >
            {item.cta}
            <ArrowRight
              className="size-[13px]"
              strokeWidth={2}
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </div>
  )
}
