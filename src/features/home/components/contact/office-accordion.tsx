import { ArrowUpRight, ChevronDown, Mail, Phone } from 'lucide-react'

import { cn } from '#/lib/utils'

import { directionsUrl, officePhone, salesEmail } from '../../constants/offices'
import type { Office } from '../../constants/offices'

type OfficeAccordionProps = {
  offices: Office[]
  active: number
  onSelect: (index: number) => void
}

const linkClass = 'inline-flex items-center gap-1.5 hover:underline'

export function OfficeAccordion({
  offices,
  active,
  onSelect,
}: OfficeAccordionProps) {
  return (
    <ul className="flex flex-col gap-3 lg:col-span-5" data-reveal>
      {offices.map((office, idx) => {
        const open = idx === active
        const id = `office-${office.id}`
        return (
          <li
            key={office.id}
            className={cn(
              'rounded-lg border bg-background transition-colors duration-300',
              open ? 'border-primary/40' : 'border-border',
            )}
          >
            <h3>
              <button
                type="button"
                id={id}
                aria-expanded={open}
                aria-controls={`${id}-panel`}
                onClick={() => onSelect(idx)}
                className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
              >
                <span className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                  <span
                    className={cn(
                      'text-base font-bold tracking-tight transition-colors sm:text-lg',
                      open
                        ? 'text-primary'
                        : 'text-foreground group-hover:text-primary',
                    )}
                  >
                    {office.city}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground sm:text-sm">
                    {office.role}
                  </span>
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    'size-4 shrink-0 text-primary transition-transform duration-300',
                    open && 'rotate-180',
                  )}
                />
              </button>
            </h3>
            <div
              id={`${id}-panel`}
              role="region"
              aria-labelledby={id}
              className={cn(
                'grid transition-[grid-template-rows] duration-500 ease-smooth',
                open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className="overflow-hidden" inert={!open}>
                <div className="border-t border-border px-5 pt-4 pb-5 sm:px-6">
                  <p className="text-sm font-semibold text-foreground">
                    Alamat
                  </p>
                  <p className="mt-1 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {office.address}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-primary">
                    {office.showPhone && (
                      <a href={officePhone.href} className={linkClass}>
                        <Phone className="size-3.5" aria-hidden="true" />
                        {officePhone.label}
                      </a>
                    )}
                    <a href={`mailto:${salesEmail}`} className={linkClass}>
                      <Mail className="size-3.5" aria-hidden="true" />
                      Email
                    </a>
                    <a
                      href={directionsUrl(office)}
                      target="_blank"
                      rel="noreferrer"
                      className={linkClass}
                    >
                      Buka di Maps
                      <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
