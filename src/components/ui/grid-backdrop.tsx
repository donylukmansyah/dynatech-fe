import { cn } from '#/lib/utils'

type GridBackdropProps = {
  // warna garis grid, sudah termasuk transparansinya
  line: string
  size: number
  mask?: string
  className?: string
}

export function GridBackdrop({
  line,
  size,
  mask,
  className,
}: GridBackdropProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0', className)}
      style={{
        backgroundSize: `${size}px ${size}px`,
        backgroundImage: `linear-gradient(to right, ${line} 1px, transparent 1px), linear-gradient(to bottom, ${line} 1px, transparent 1px)`,
        maskImage: mask,
      }}
    />
  )
}
