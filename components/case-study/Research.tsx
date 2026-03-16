'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Project } from '@/data'

type Props = { project: Project }

export default function Research({ project }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-10%' })

  return (
    <section ref={ref} className="py-24 lg:py-36 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">
          {/* Left label */}
          <div>
            <motion.div
              className="flex items-center gap-3 lg:sticky lg:top-24"
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="w-6 h-px bg-ink/30" />
              <span className="text-2xs uppercase tracking-widest text-muted">03 — Research</span>
            </motion.div>
          </div>

          {/* Right content */}
          <div>
            <div className="overflow-hidden mb-10">
              <motion.h2
                className="font-serif text-display-sm text-ink"
                initial={{ y: '100%', opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                Research & insights
              </motion.h2>
            </div>

            <motion.p
              className="text-base text-muted leading-relaxed mb-12 max-w-xl"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Deep qualitative and quantitative research to understand the true problem before
              designing solutions.
            </motion.p>

            {/* Insight cards */}
            <div className="space-y-4">
              {project.researchInsights.map((insight, i) => (
                <motion.div
                  key={i}
                  className="group relative border border-border rounded-2xl p-7 hover:border-ink/25 transition-colors overflow-hidden"
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {/* Background on hover */}
                  <motion.div
                    className="absolute inset-0 bg-ink/[0.025] opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-hidden
                  />

                  <div className="relative flex items-start gap-5">
                    {/* Icon */}
                    <span className="text-2xl text-ink/20 flex-shrink-0 mt-0.5 font-serif" aria-hidden>
                      {insight.icon}
                    </span>

                    {/* Content */}
                    <div>
                      <h3 className="font-sans font-semibold text-ink text-base mb-2">
                        {insight.title}
                      </h3>
                      <p className="text-sm text-muted leading-relaxed">{insight.description}</p>
                    </div>

                    {/* Index */}
                    <div className="ml-auto flex-shrink-0 text-2xs font-mono text-faint tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quote / pull-out */}
            <motion.div
              className="mt-12 pl-6 border-l-2 border-ink/20"
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-serif text-xl text-ink/70 italic leading-relaxed">
                &ldquo;The best research reveals not what users do, but why they do it.&rdquo;
              </p>
              <p className="text-xs text-faint mt-3 uppercase tracking-widest">Design principle</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
