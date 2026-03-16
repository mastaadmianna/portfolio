'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Project } from '@/data'

type Props = { project: Project }

export default function DesignDecisions({ project }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-10%' })

  return (
    <section ref={ref} className="py-24 lg:py-36 border-t border-border bg-ink/[0.02]">
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
              <span className="text-2xs uppercase tracking-widest text-muted">06 — Decisions</span>
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
                Design decisions
              </motion.h2>
            </div>

            <div className="space-y-6">
              {project.decisions.map((decision, i) => (
                <motion.div
                  key={i}
                  className="border border-border rounded-3xl overflow-hidden"
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.65,
                    delay: 0.2 + i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {/* Problem / Solution split */}
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Problem */}
                    <div className="p-7 bg-ink/[0.03] border-b md:border-b-0 md:border-r border-border">
                      <div className="text-2xs uppercase tracking-widest text-faint mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-rose-400/60" />
                        Problem
                      </div>
                      <p className="text-sm text-muted leading-relaxed">{decision.problem}</p>
                    </div>

                    {/* Solution */}
                    <div className="p-7">
                      <div className="text-2xs uppercase tracking-widest text-faint mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400/60" />
                        Solution
                      </div>
                      <p className="text-sm text-ink font-medium leading-relaxed">{decision.solution}</p>
                    </div>
                  </div>

                  {/* Rationale */}
                  <div className="px-7 py-5 border-t border-border">
                    <div className="text-2xs uppercase tracking-widest text-faint mb-2">Rationale</div>
                    <p className="text-xs text-muted leading-relaxed italic">{decision.rationale}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
