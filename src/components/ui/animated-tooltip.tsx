import { useState } from 'react'
import type { MouseEvent } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { cn } from '#/lib/utils'

export type TooltipItem = {
  id: number
  name: string
  designation: string
  image: string
}

export const AnimatedTooltip = ({
  items,
  className,
  avatarClassName,
}: {
  items: TooltipItem[]
  className?: string
  avatarClassName?: string
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const springConfig = { stiffness: 100, damping: 5 }
  const x = useMotionValue(0)
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig,
  )
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig,
  )

  const handleMouseMove = (event: MouseEvent<HTMLImageElement>) => {
    const halfWidth = event.currentTarget.offsetWidth / 2
    x.set(event.nativeEvent.offsetX - halfWidth)
  }

  return (
    <div className={cn('flex items-center', className)}>
      {items.map((item) => (
        <div
          className="group relative -mr-2.5 last:mr-0"
          key={item.id}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence mode="popLayout">
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: 'spring',
                    stiffness: 260,
                    damping: 10,
                  },
                }}
                exit={{ opacity: 0, y: 16, scale: 0.6 }}
                style={{
                  translateX,
                  rotate,
                  whiteSpace: 'nowrap',
                }}
                className="pointer-events-none absolute -top-14 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-md bg-foreground px-3 py-1.5 text-xs shadow-xl"
              >
                <div className=" via-primary absolute inset-x-6 -bottom-px z-30 h-px w-[40%] bg-gradient-to-r from-transparent to-transparent" />
                <div className="via-cta absolute left-6 -bottom-px z-30 h-px w-[55%] bg-gradient-to-r from-transparent to-transparent" />
                <div className="relative z-30 text-xs font-bold text-background">
                  {item.name}
                </div>
                <div className="text-[10px] text-background/75">
                  {item.designation}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <img
            onMouseMove={handleMouseMove}
            height={64}
            width={64}
            src={item.image}
            alt={item.name}
            className={cn(
              'relative !m-0 h-8 w-8 rounded-full border-2 border-foreground/40 bg-white p-1 object-contain transition duration-300 group-hover:z-30 group-hover:scale-110',
              avatarClassName,
            )}
          />
        </div>
      ))}
    </div>
  )
}
