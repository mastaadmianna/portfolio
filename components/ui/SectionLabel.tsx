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
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-10% 0px' })

  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      >
        <span className="w-6 h-px bg-ink/30" aria-hidden />
        <span className="text-2xs uppercase tracking-widest text-muted font-sans font-medium">
          {label}
        </span>
      </motion.div>
    </div>
  )
}
