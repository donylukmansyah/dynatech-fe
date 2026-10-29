import { useState } from 'react'

import { GlowButton } from '#/components/ui/glow-button'
import { SectionHeader } from '#/components/ui/section-header'

import { offices, salesEmail } from '../../constants/offices'
import { useOfficeMap } from '../../hooks/use-office-map'
import { OfficeAccordion } from './office-accordion'

export function ContactSection() {
  const [active, setActive] = useState(0)
  const mapRef = useOfficeMap({ offices, active, onSelect: setActive })

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative w-full bg-background-soft px-page py-16 text-foreground lg:py-24"
    >
      <SectionHeader
        badge="Cabang"
        title="Kantor & Lab Terdekat"
        titleId="contact-title"
        action={
          <GlowButton href={`mailto:${salesEmail}`} label="Minta Penawaran" />
        }
      />

      <div className="mt-10 grid grid-cols-1 gap-6 lg:mt-12 lg:grid-cols-12 lg:gap-10">
        <OfficeAccordion
          offices={offices}
          active={active}
          onSelect={setActive}
        />
        <div
          ref={mapRef}
          role="region"
          aria-label={`Peta kantor Dynatech ${offices[active].city}`}
          className="order-first h-[320px] w-full overflow-hidden rounded-lg border border-border bg-background-muted sm:h-[420px] lg:order-none lg:col-span-7 lg:h-auto lg:min-h-[440px]"
          data-reveal
        />
      </div>
    </section>
  )
}
