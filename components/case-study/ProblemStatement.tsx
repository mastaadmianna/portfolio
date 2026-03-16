'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Project } from '@/data'

type Props = { project: Project }

export default function ProblemStatement({ project }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-10%' })

  return (
    <section ref={ref} className="py-24 lg:py-36 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">
          {/* Left label */}
          <div>
            <motion.div
              className="flex items-center gap-3 mb-3 lg:sticky lg:top-24"
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="w-6 h-px bg-ink/30" />
              <span className="text-2xs uppercase tracking-widest text-muted">01 — Problem</span>
            </motion.div>
          </div>

          {/* Right content */}
          <div>
            {/* Short problem statement — large typography */}
            <div className="overflow-hidden mb-10">
              <motion.h2
                className="font-serif text-display-sm text-ink leading-[1.15]"
                initial={{ y: '100%', opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                {project.problem}
              </motion.h2>
            </div>

            {/* Divider */}
            <motion.div
              className="w-12 h-px bg-ink/20 mb-10"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'left' }}
            />

            {/* Full problem description */}
            <motion.p
              className="text-base md:text-lg text-muted leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {project.problemExpanded}
            </motion.p>

            {/* Key metrics highlight */}
            <motion.div
              className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {project.metrics.map((metric, i) => (
                <div
                  key={i}
                  className="bg-ink/[0.03] border border-border rounded-2xl p-5 hover:border-ink/20 transition-colors"
                >
                  <div className="font-serif text-3xl text-ink mb-1">{metric.value}</div>
                  <div className="text-sm text-muted">{metric.label}</div>
                  <div className="text-2xs uppercase tracking-widest text-faint mt-2">
                    {metric.description}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
