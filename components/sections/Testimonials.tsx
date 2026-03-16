'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { testimonials } from '@/data'
import SectionLabel from '@/components/ui/SectionLabel'
import { cn } from '@/lib/utils'

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef as React.RefObject<Element>, { once: true, margin: '-8%' })

  const prev = () => setActiveIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1))
  const next = () => setActiveIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1))

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-24 lg:py-36 border-t border-border overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <SectionLabel label="Testimonials" />
            <motion.h2
              id="testimonials-heading"
              className="font-serif text-display-sm text-ink mt-4"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Kind words
            </motion.h2>
          </div>

          {/* Navigation arrows */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-ink/30 hover:bg-ink/5 transition-colors"
              aria-label="Previous testimonial"
              data-cursor="hover"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-xs text-faint tabular-nums">
              {String(activeIndex + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
            </span>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-ink/30 hover:bg-ink/5 transition-colors"
              aria-label="Next testimonial"
              data-cursor="hover"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        </div>

        {/* Active testimonial — large format */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Large quote mark */}
              <div className="font-serif text-[8rem] leading-none text-ink/5 absolute -top-8 -left-4 select-none" aria-hidden>
                &ldquo;
              </div>

              {/* Quote */}
              <blockquote className="relative">
                <p className="font-serif text-xl md:text-2xl lg:text-3xl text-ink leading-[1.5] max-w-4xl mb-10">
                  &ldquo;{testimonials[activeIndex].quote}&rdquo;
                </p>

                <footer className="flex items-center gap-4">
                  {/* Avatar */}
                  <div
                    className={cn(
                      'w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium text-white flex-shrink-0',
                      testimonials[activeIndex].avatarColor
                    )}
                    aria-hidden
                  >
                    {testimonials[activeIndex].avatar}
                  </div>

                  {/* Name and role */}
                  <div>
                    <div className="font-sans font-medium text-ink text-sm">
                      {testimonials[activeIndex].name}
                    </div>
                    <div className="text-xs text-muted">
                      {testimonials[activeIndex].role} · {testimonials[activeIndex].company}
                    </div>
                  </div>
                </footer>
              </blockquote>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Dots */}
        <div className="flex items-center gap-2 mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                'transition-all duration-300 rounded-full',
                i === activeIndex ? 'w-6 h-1.5 bg-ink' : 'w-1.5 h-1.5 bg-border hover:bg-muted'
              )}
              aria-label={`Go to testimonial ${i + 1}`}
              data-cursor="hover"
            />
          ))}
        </div>

        {/* All testimonials strip (desktop) */}
        <div className="hidden lg:grid grid-cols-5 gap-4 mt-16 pt-10 border-t border-border">
          {testimonials.map((t, i) => (
            <motion.button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                'text-left p-4 rounded-xl border transition-all duration-300',
                i === activeIndex
                  ? 'border-ink/20 bg-ink/5'
                  : 'border-transparent hover:border-border'
              )}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              data-cursor="hover"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div
                  className={cn(
                    'w-7 h-7 rounded-full flex items-center justify-center text-2xs font-medium text-white',
                    t.avatarColor
                  )}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-xs font-medium text-ink">{t.name}</div>
                  <div className="text-2xs text-faint">{t.company}</div>
                </div>
              </div>
              <p className="text-2xs text-muted leading-relaxed line-clamp-3">&ldquo;{t.quote}&rdquo;</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
