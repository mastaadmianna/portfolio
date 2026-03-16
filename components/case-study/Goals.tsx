'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Project } from '@/data'

type Props = { project: Project }

export default function Goals({ project }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-10%' })

  const businessGoals = project.goals.filter((g) => g.type === 'business')
  const userGoals = project.goals.filter((g) => g.type === 'user')

  return (
    <section ref={ref} className="py-24 lg:py-32 border-t border-border bg-ink/[0.02]">
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
              <span className="text-2xs uppercase tracking-widest text-muted">02 — Goals</span>
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
                Goals & success metrics
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              {/* Business goals */}
              <motion.div
                className="bg-ink text-cream rounded-3xl p-8"
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-2xs uppercase tracking-widest text-cream/40">
                    Business Goals
                  </span>
                </div>
                <ul className="space-y-4">
                  {businessGoals.map((goal, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-3 text-sm text-cream/70 leading-relaxed"
                      initial={{ opacity: 0, x: -8 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + i * 0.07, duration: 0.5 }}
                    >
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-cream/30 flex-shrink-0" />
                      {goal.text}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* User goals */}
              <motion.div
                className="border border-border rounded-3xl p-8"
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-2xs uppercase tracking-widest text-muted">User Goals</span>
                </div>
                <ul className="space-y-4">
                  {userGoals.map((goal, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-3 text-sm text-muted leading-relaxed"
                      initial={{ opacity: 0, x: -8 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + i * 0.07, duration: 0.5 }}
                    >
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-muted/40 flex-shrink-0" />
                      {goal.text}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
