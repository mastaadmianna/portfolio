'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { personalPhotos } from '@/data'
import SectionLabel from '@/components/ui/SectionLabel'
import { cn } from '@/lib/utils'

export default function About() {
  const [activePhoto, setActivePhoto] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef as React.RefObject<Element>, { once: true, margin: '-8%' })

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 lg:py-36 border-t border-border"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main about block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Text content */}
          <div>
            <SectionLabel label="About Me" />

            <motion.h2
              id="about-heading"
              className="font-serif text-display-sm text-ink mt-4 mb-8"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Design is
              <br />
              <em>clarity</em> made visible.
            </motion.h2>

            <div className="space-y-5">
              {[
                "I'm Alex Chen, a product designer with 6+ years of experience turning complex systems into clear, human experiences. I currently lead design for Stripe's merchant dashboard, working at the intersection of data, trust, and scale.",
                "My design philosophy: every decision should make something clearer. I'm not interested in decoration. I'm interested in reducing cognitive load, earning trust through consistency, and creating moments of delight that feel inevitable rather than surprising.",
                "Before Stripe, I designed host tools at Airbnb and payment experiences at Google Pay—both experiences that reinforced my belief that the best UX is the one users never have to think about.",
                "Outside of work, I'm deeply curious about type design, Japanese ceramics, and the philosophy of simplicity. I believe the same principles apply to a well-thrown pot and a well-designed checkout flow.",
              ].map((text, i) => (
                <motion.p
                  key={i}
                  className="text-base text-muted leading-relaxed"
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.65,
                    delay: 0.2 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {text}
                </motion.p>
              ))}
            </div>

            {/* Skills */}
            <motion.div
              className="mt-10 flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              {[
                'Product Strategy',
                'Interaction Design',
                'Design Systems',
                'User Research',
                'Prototyping',
                'Motion Design',
                'Accessibility',
                'Figma',
              ].map((skill) => (
                <span
                  key={skill}
                  className="text-xs text-muted border border-border px-3 py-1.5 rounded-full hover:border-ink/30 hover:text-ink transition-colors"
                >
                  {skill}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: Portrait */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Portrait placeholder */}
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-gradient-to-br from-stone-200 to-stone-300">
              {/* Placeholder portrait */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-stone-300 mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-12 h-12 text-stone-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                    </svg>
                  </div>
                  <p className="text-xs text-stone-400">Add your photo here</p>
                </div>
              </div>

              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 to-transparent" />
            </div>

            {/* Floating stat badges */}
            <motion.div
              className="absolute -left-5 top-1/4 bg-cream border border-border rounded-2xl px-4 py-3 shadow-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="font-serif text-2xl text-ink">6+</div>
              <div className="text-2xs text-muted uppercase tracking-widest">Years</div>
            </motion.div>

            <motion.div
              className="absolute -right-5 bottom-1/4 bg-cream border border-border rounded-2xl px-4 py-3 shadow-sm"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="font-serif text-2xl text-ink">50+</div>
              <div className="text-2xs text-muted uppercase tracking-widest">Projects</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Personal photos carousel */}
        <motion.div
          className="mt-24 lg:mt-32"
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-2xs uppercase tracking-widest text-muted mb-2 flex items-center gap-3">
                <span className="w-6 h-px bg-ink/30" />
                Beyond the work
              </p>
              <p className="text-sm text-faint">
                A few snapshots from outside the studio.
              </p>
            </div>

            {/* Photo comment */}
            <div className="hidden md:block max-w-xs">
              <p className="text-xs text-faint leading-relaxed italic border-l border-border pl-4">
                {/* Comment as requested: Is including personal life photos in a portfolio beneficial for product designers? */}
                {/* YES — personal photos humanize the designer behind the work. They signal culture fit,
                    create talking points in interviews, and build authentic connection with potential
                    collaborators. For product designers specifically, it demonstrates the empathy and
                    real-world context that informs great user research. */}
                Including personal photos signals culture fit, builds authentic connection, and shows the
                human behind the work—valuable for product designers who sell empathy.
              </p>
            </div>
          </div>

          {/* Photo strip */}
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
            {personalPhotos.map((photo, i) => (
              <motion.div
                key={photo.id}
                className={cn(
                  'relative flex-shrink-0 w-64 h-40 md:w-72 md:h-48 rounded-2xl overflow-hidden cursor-pointer snap-start',
                  `bg-gradient-to-br ${photo.color}`
                )}
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setActivePhoto(i)}
                data-cursor="hover"
              >
                <div className="absolute inset-0 flex items-end p-4">
                  <span className={cn('text-xs font-sans', photo.textColor)}>{photo.caption}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
