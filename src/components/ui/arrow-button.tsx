import { ArrowLeft, ArrowRight } from 'lucide-react'

import { cn } from '#/lib/utils'

type ArrowButtonProps = {
  direction: 'prev' | 'next'
  onClick: () => void
  variant?: 'outline' | 'solid'
  label?: string
}

export function ArrowButton({
  direction,
  onClick,
  variant = 'outline',
  label = direction === 'prev' ? 'Sebelumnya' : 'Berikutnya',
}: ArrowButtonProps) {
  const Icon = direction === 'prev' ? ArrowLeft : ArrowRight

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        'grid size-10 place-items-center rounded-full border transition-[background-color,color,border-color,translate] duration-300 ease-smooth hover:-translate-y-px',
        variant === 'solid'
          ? 'border-primary bg-primary text-primary-foreground hover:border-cta hover:bg-cta hover:text-cta-foreground'
          : 'border-border bg-background text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground',
      )}
    >
      <Icon className="size-4" strokeWidth={1.9} aria-hidden="true" />
    </button>
  )
}
