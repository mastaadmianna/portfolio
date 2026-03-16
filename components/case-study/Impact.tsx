'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Project } from '@/data'
import { cn } from '@/lib/utils'

type Props = { project: Project }

export default function Impact({ project }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-10%' })

  return (
    <section ref={ref} className="py-24 lg:py-36 border-t border-border bg-ink text-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 mb-16">
          <div>
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="w-6 h-px bg-cream/30" />
              <span className="text-2xs uppercase tracking-widest text-cream/40">08 — Impact</span>
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              className="font-serif text-display-sm text-cream"
              initial={{ y: '100%', opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Impact & results
            </motion.h2>
          </div>
        </div>

        {/* Impact metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {project.impact.map((item, i) => (
            <motion.div
              key={i}
              className="relative border border-cream/10 rounded-3xl p-8 overflow-hidden group hover:border-cream/20 transition-colors"
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.65,
                delay: 0.15 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Background gradient on hover */}
              <motion.div
                className="absolute inset-0 bg-cream/[0.03] opacity-0 group-hover:opacity-100 transition-opacity"
                aria-hidden
              />

              {/* Positive/negative indicator */}
              <div
                className={cn(
                  'text-2xs uppercase tracking-widest mb-4 flex items-center gap-2',
                  item.positive ? 'text-emerald-400/60' : 'text-rose-400/60'
                )}
              >
                <span>{item.positive ? '↑' : '↓'}</span>
                <span>Result</span>
              </div>

              {/* Metric value */}
              <div className="font-serif text-4xl text-cream mb-2">{item.value}</div>

              {/* Metric name */}
              <div className="text-sm text-cream/60 mb-3">{item.metric}</div>

              {/* Change context */}
              <div className="text-2xs text-cream/30">{item.change}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
