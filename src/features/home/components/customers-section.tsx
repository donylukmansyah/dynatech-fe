import { Marquee } from '#/components/ui/marquee'
import { SectionHeader } from '#/components/ui/section-header'

import { industryCustomers, researchCustomers } from '../constants/customers'
import type { Customer } from '../constants/customers'

const rows = [
  {
    customers: industryCustomers,
    reverse: false,
    duration: '[--duration:55s]',
  },
  { customers: researchCustomers, reverse: true, duration: '[--duration:50s]' },
]

function LogoTile({ name, logo }: Customer) {
  return (
    <div className="flex h-16 w-36 shrink-0 items-center justify-center rounded-lg border border-border bg-background px-4 transition-[border-color,box-shadow,translate] duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 sm:h-[72px] sm:w-40">
      <img
        src={logo}
        alt={name}
        title={name}
        loading="lazy"
        draggable={false}
        className="max-h-8 w-auto max-w-full object-contain sm:max-h-10"
      />
    </div>
  )
}

export function CustomersSection() {
  return (
    <section
      id="customers"
      aria-labelledby="customers-title"
      className="relative w-full bg-background-soft py-16 text-foreground lg:py-24"
    >
      <SectionHeader
        badge="Customer"
        title="Dipercaya Industri & Riset Indonesia"
        titleId="customers-title"
        className="px-page"
      />

      <div
        className="mt-10 flex flex-col gap-3 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] lg:mt-12"
        data-reveal
      >
        {rows.map((row) => (
          <Marquee
            key={row.customers[0].logo}
            reverse={row.reverse}
            pauseOnHover
            repeat={3}
            className={row.duration}
          >
            {row.customers.map((c) => (
              <LogoTile key={c.logo} {...c} />
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  )
}
