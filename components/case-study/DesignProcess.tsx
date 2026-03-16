'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import type { Project } from '@/data'
import { cn } from '@/lib/utils'

type Props = { project: Project }

export default function DesignProcess({ project }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef as React.RefObject<Element>, { once: true, margin: '-8%' })

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-36 border-t border-border bg-ink text-cream overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 mb-16 lg:mb-24">
          <div>
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="w-6 h-px bg-cream/30" />
              <span className="text-2xs uppercase tracking-widest text-cream/40">04 — Process</span>
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              className="font-serif text-display-sm text-cream"
              initial={{ y: '100%', opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Design process
            </motion.h2>
          </div>
        </div>

        {/* Process steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute left-[calc(25%+1rem)] top-4 bottom-4 w-px bg-cream/10" aria-hidden />

          <div className="space-y-0 divide-y divide-cream/10">
            {project.processSteps.map((step, i) => (
              <ProcessStep key={i} step={step} index={i} isInView={isInView} total={project.processSteps.length} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

type StepProps = {
  step: { phase: string; description: string; image?: string }
  index: number
  isInView: boolean
  total: number
}

function ProcessStep({ step, index, isInView, total }: StepProps) {
  const ref = useRef<HTMLDivElement>(null)
  const stepInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-10%' })

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 lg:gap-16 py-10 lg:py-14"
      initial={{ opacity: 0, y: 24 }}
      animate={stepInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        delay: 0.05 * index,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Phase label */}
      <div className="flex items-start gap-4">
        <div className="font-serif text-4xl text-cream/10 tabular-nums flex-shrink-0 w-8">
          {String(index + 1).padStart(2, '0')}
        </div>
        <div>
          <h3 className="font-sans font-medium text-cream/60 text-sm">{step.phase}</h3>
          <div className="mt-2 w-3 h-px bg-cream/20" />
        </div>
      </div>

      {/* Description */}
      <p className="text-base text-cream/50 leading-relaxed">{step.description}</p>
    </motion.div>
  )
}
