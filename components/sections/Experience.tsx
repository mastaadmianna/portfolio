'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { experiences } from '@/data'
import SectionLabel from '@/components/ui/SectionLabel'
import { cn } from '@/lib/utils'

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef as React.RefObject<Element>, { once: true, margin: '-10%' })

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24 lg:py-36 border-t border-border bg-ink text-cream"
      aria-labelledby="experience-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 lg:mb-24">
          <div>
            <motion.div
              className="flex items-center gap-3 mb-4"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="w-6 h-px bg-cream/30" />
              <span className="text-2xs uppercase tracking-widest text-cream/40 font-sans">
                Work History
              </span>
            </motion.div>
            <motion.h2
              id="experience-heading"
              className="font-serif text-display-sm text-cream"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Experience
            </motion.h2>
          </div>
          <motion.p
            className="text-sm text-cream/40 max-w-xs leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            6+ years designing products used by hundreds of millions of people at
            world-class companies.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-3 bottom-3 w-px bg-cream/10 hidden md:block" aria-hidden />

          <div className="space-y-0 divide-y divide-cream/10">
            {experiences.map((exp, i) => (
              <ExperienceItem
                key={exp.company}
                exp={exp}
                index={i}
                isExpanded={expandedIndex === i}
                onToggle={() => setExpandedIndex(expandedIndex === i ? null : i)}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

type ItemProps = {
  exp: (typeof experiences)[0]
  index: number
  isExpanded: boolean
  onToggle: () => void
  isInView: boolean
}

function ExperienceItem({ exp, index, isExpanded, onToggle, isInView }: ItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: 0.1 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative"
    >
      {/* Timeline dot */}
      <motion.div
        className="absolute left-3.5 top-8 w-3 h-3 rounded-full border-2 border-cream/20 bg-ink hidden md:block"
        animate={{ borderColor: isExpanded ? 'rgba(245,243,239,0.8)' : 'rgba(245,243,239,0.2)' }}
        transition={{ duration: 0.3 }}
        aria-hidden
      />

      <button
        onClick={onToggle}
        className="w-full text-left py-8 md:pl-12 group"
        aria-expanded={isExpanded}
        data-cursor="hover"
      >
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-start gap-5">
            {/* Logo */}
            <div
              className={cn(
                'w-10 h-10 rounded-xl flex items-center justify-center font-serif text-lg flex-shrink-0',
                'bg-cream/10 text-cream/60 group-hover:bg-cream/15 transition-colors'
              )}
            >
              {exp.logo}
            </div>

            {/* Info */}
            <div>
              <div className="flex flex-wrap items-baseline gap-2 mb-1">
                <span className="font-serif text-xl md:text-2xl text-cream">{exp.company}</span>
                <span className="text-sm text-cream/40">·</span>
                <span className="text-sm text-cream/60">{exp.role}</span>
              </div>
              <div className="text-xs text-cream/30 uppercase tracking-widest">{exp.period}</div>
              <p className="text-sm text-cream/50 mt-2 max-w-lg leading-relaxed">{exp.description}</p>
            </div>
          </div>

          {/* Toggle indicator */}
          <motion.div
            className="flex-shrink-0 mt-1"
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <svg
              className="w-4 h-4 text-cream/30 group-hover:text-cream/60 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
            </svg>
          </motion.div>
        </div>
      </button>

      {/* Expandable details */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="md:pl-12 pb-8">
              <ul className="space-y-3 pl-5 border-l border-cream/10 ml-5">
                {exp.details.map((detail, j) => (
                  <motion.li
                    key={j}
                    className="text-sm text-cream/50 leading-relaxed"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: j * 0.06,
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {detail}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
