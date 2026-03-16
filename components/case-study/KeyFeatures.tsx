'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import type { Project } from '@/data'
import { cn } from '@/lib/utils'

type Props = { project: Project }

export default function KeyFeatures({ project }: Props) {
  const [activeFeature, setActiveFeature] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-8%' })

  return (
    <section ref={ref} className="py-24 lg:py-36 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24 mb-16">
          <div>
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="w-6 h-px bg-ink/30" />
              <span className="text-2xs uppercase tracking-widest text-muted">05 — Features</span>
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              className="font-serif text-display-sm text-ink"
              initial={{ y: '100%', opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Key features
            </motion.h2>
          </div>
        </div>

        {/* Feature tabs + content */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 lg:gap-16 items-start">
          {/* Feature list */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {project.features.map((feature, i) => (
              <button
                key={i}
                onClick={() => setActiveFeature(i)}
                className={cn(
                  'w-full text-left px-5 py-4 rounded-2xl transition-all duration-300 flex items-center justify-between gap-4 group',
                  i === activeFeature
                    ? 'bg-ink text-cream'
                    : 'hover:bg-ink/5 text-muted hover:text-ink'
                )}
                data-cursor="hover"
              >
                <div className="flex items-center gap-4">
                  <span
                    className={cn(
                      'text-2xs font-mono tabular-nums',
                      i === activeFeature ? 'text-cream/40' : 'text-faint'
                    )}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm font-medium">{feature.title}</span>
                </div>
                <motion.div
                  animate={{ x: i === activeFeature ? 4 : 0, rotate: i === activeFeature ? -45 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <svg
                    className={cn('w-4 h-4', i === activeFeature ? 'text-cream/40' : 'text-faint')}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 7l-10 10M17 7H7M17 7v10" />
                  </svg>
                </motion.div>
              </button>
            ))}
          </motion.div>

          {/* Feature detail */}
          <motion.div
            className="lg:sticky lg:top-24"
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Feature preview */}
                <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-stone-100 to-stone-200 overflow-hidden mb-8 flex items-center justify-center relative">
                  <div className="text-center text-stone-400">
                    <div className="text-4xl mb-3 font-serif">{String(activeFeature + 1).padStart(2, '0')}</div>
                    <div className="text-sm">{project.features[activeFeature].title}</div>
                    <div className="text-xs mt-1">Feature mockup / screenshot</div>
                  </div>
                  {/* Decorative grid */}
                  <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)',
                      backgroundSize: '40px 40px',
                    }}
                    aria-hidden
                  />
                </div>

                {/* Feature text */}
                <div>
                  <h3 className="font-serif text-2xl text-ink mb-3">
                    {project.features[activeFeature].title}
                  </h3>
                  <p className="text-base text-muted leading-relaxed">
                    {project.features[activeFeature].description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
