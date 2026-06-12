'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  label: string
  className?: string
  delay?: number
}

export default function SectionLabel({ label, className, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-35% 0px -10% 0px' })

  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      <div className="flex items-center gap-3">
        <motion.span
          className="w-6 h-px bg-ink/30"
          aria-hidden
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          style={{ originX: 0 }}
          transition={{ duration: 0.65, ease: [0.42, 0, 0.58, 1], delay }}
        />
        <motion.span
          className="text-2xs uppercase tracking-widest text-muted font-sans font-medium"
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.7, ease: [0.42, 0, 0.58, 1], delay: delay + 0.08 }}
        >
          {label}
        </motion.span>
      </div>
    </div>
  )
}
