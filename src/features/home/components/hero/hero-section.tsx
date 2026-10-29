import { AnimatedTooltip } from '#/components/ui/animated-tooltip'
import { cn } from '#/lib/utils'

import { heroPrincipals, principalBadges } from '../../constants/hero'
import { stockImages } from '../../constants/images'
import { LatestUpdateCard } from './latest-update-card'

// gelap di atas & bawah agar teks terbaca, tint biru di sisi
const SCRIM = [
  'linear-gradient(180deg, rgba(12,27,54,0.72) 0%, rgba(16,33,63,0.28) 24%, rgba(16,33,63,0.12) 40%, rgba(16,33,63,0.58) 82%, rgba(12,27,54,0.92) 100%)',
  'linear-gradient(90deg, rgba(37,97,199,0.45), rgba(16,33,63,0.1) 55%, rgba(37,97,199,0.28))',
].join(', ')

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative isolate mx-auto mt-(--gutter) flex min-h-[max(680px,calc(100svh-2*var(--gutter)))] w-frame flex-col overflow-clip rounded-card bg-surface-dark px-page pt-[clamp(128px,15svh,176px)] pb-[clamp(28px,4vh,48px)] text-white"
    >
      <div className="absolute inset-0 -z-2" data-hero-img>
        <img
          src={stockImages.hero}
          alt="Teknisi mengoperasikan mikroskop presisi di laboratorium"
          fetchPriority="high"
          className="size-full object-cover object-[center_35%]"
        />
        <div className="absolute inset-0 -z-1" style={{ background: SCRIM }} />
      </div>

      <h1 className="mt-[clamp(8px,2vh,24px)] mb-[clamp(14px,2.5vh,28px)] flex items-center justify-between gap-[2vw] text-[clamp(54px,12.6vw,186px)] leading-[0.88] font-extrabold tracking-[-0.055em] uppercase max-md:flex-col max-md:items-start max-md:justify-center max-md:gap-0 max-md:leading-[0.9]">
        <span className="block" data-hero-word>
          Uji
        </span>
        <span
          className="block text-right max-md:text-left max-md:text-primary-300"
          data-hero-word
        >
          Presisi
        </span>
      </h1>

      <div
        className="mb-auto flex w-full justify-between gap-4 text-[12.5px] font-medium text-white/84 max-md:text-[11px]"
        data-hero-reveal
      >
        {heroPrincipals.map(([brand, line], i) => (
          <span
            key={brand}
            className={cn(
              'block leading-tight',
              i === heroPrincipals.length - 1 && 'text-right',
            )}
          >
            {brand}
            <br />
            {line}
          </span>
        ))}
      </div>

      <div className="mt-[clamp(32px,5vh,64px)] flex flex-wrap items-end justify-between gap-7">
        <p
          className="text-[clamp(28px,3.8vw,54px)] leading-[0.98] font-semibold tracking-[-0.04em] text-white/94 uppercase"
          data-hero-reveal
        >
          Ukur tepat,
          <br />
          uji yakin
        </p>

        <div className="flex flex-col items-end gap-[clamp(16px,2.6vh,28px)] max-md:w-full max-md:items-stretch">
          <LatestUpdateCard />
          <div
            className="relative z-3 grid w-[min(310px,82vw)] grid-cols-[1fr_auto] items-center gap-4 rounded-[22px] border border-white/22 bg-navy/56 py-3 pr-3 pl-5 shadow-[0_18px_40px_rgba(8,18,38,0.28)] backdrop-blur-[16px]"
            data-hero-reveal
          >
            <div className="flex flex-col gap-2">
              <div className="text-[38px] leading-none font-semibold tracking-[-0.04em]">
                40+
              </div>
              <AnimatedTooltip items={principalBadges} />
              <div className="text-xs font-medium text-white/84">
                Merek prinsipal &amp; lab KAN
              </div>
            </div>
            <img
              src={stockImages.stat}
              alt="Sampel di laboratorium"
              className="size-[108px] rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
