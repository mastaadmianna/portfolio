'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { personalPhotos } from '@/data'
import SectionLabel from '@/components/ui/SectionLabel'

// ─── Photo config ─────────────────────────────────────────────────────────────

const CARD_W = 200
const CARD_H = 260
const CARD_GAP = 16
const TILTS = [-9, -4.5, -0.5, 4, 8.5]
const PHOTO_BG = [
  'linear-gradient(145deg, #F2E6CE 0%, #E8D4A8 100%)',
  'linear-gradient(145deg, #C8D8EC 0%, #A8C4DF 100%)',
  'linear-gradient(145deg, #E0DDD6 0%, #CEC9C0 100%)',
  'linear-gradient(145deg, #C6DDE8 0%, #A4CCDF 100%)',
  'linear-gradient(145deg, #EDE0C6 0%, #E0CCA6 100%)',
]

// ─── Stack (inView-triggered fan-out) ────────────────────────────────────────

function PhotoStack({ photos }: { photos: typeof personalPhotos }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-35% 0px -10% 0px' })

  const total = photos.length
  const spread = CARD_W + CARD_GAP
  const centerOffset = (total - 1) / 2

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        height: CARD_H + 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {photos.map((photo, i) => {
        const targetX = (i - centerOffset) * spread
        return (
          <motion.div
            key={photo.id}
            initial={{ x: 0, rotate: TILTS[i] ?? 0, y: i % 2 === 0 ? 0 : 8 }}
            animate={isInView
              ? { x: targetX, rotate: 0, y: 0 }
              : { x: 0, rotate: TILTS[i] ?? 0, y: i % 2 === 0 ? 0 : 8 }
            }
            transition={{
              duration: 0.92,
              delay: i * 0.06,
              ease: [0.42, 0, 0.58, 1],
            }}
            whileHover={{ scale: 1.04, zIndex: 20, transition: { duration: 0.25 } }}
            style={{
              position: 'absolute',
              width: CARD_W,
              height: CARD_H,
              borderRadius: 14,
              overflow: 'hidden',
              background: PHOTO_BG[i % PHOTO_BG.length],
              zIndex: i,
              boxShadow: '0 8px 28px rgba(10,10,10,0.11), 0 2px 6px rgba(10,10,10,0.07)',
              cursor: 'pointer',
            }}
            data-cursor="hover"
          >
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(10,10,10,0.22) 0%, transparent 55%)',
            }} />
            <p style={{
              position: 'absolute', bottom: 12, left: 14, right: 14,
              fontSize: 10, lineHeight: 1.4,
              color: 'rgba(10,10,10,0.55)',
              fontFamily: 'var(--font-sans)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}>
              {photo.caption}
            </p>
          </motion.div>
        )
      })}
    </div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef as React.RefObject<Element>, { once: true, margin: '-35% 0px -10% 0px' })

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
              initial={{ opacity: 0, x: 60 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.92, delay: 0.1, ease: [0.42, 0, 0.58, 1] }}
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
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.82,
                    delay: 0.2 + i * 0.1,
                    ease: [0.42, 0, 0.58, 1],
                  }}
                >
                  {text}
                </motion.p>
              ))}
            </div>

            {/* Skills */}
            <motion.div
              className="mt-10 flex flex-wrap gap-2"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.82, delay: 0.6, ease: [0.42, 0, 0.58, 1] }}
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
            initial={{ opacity: 0, x: 40, scale: 0.97 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 1.0, delay: 0.25, ease: [0.42, 0, 0.58, 1] }}
          >
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-gradient-to-br from-stone-200 to-stone-300">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-stone-300 mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-12 h-12 text-stone-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                    </svg>
                  </div>
                  <p className="text-xs text-stone-400">Add your photo here</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 to-transparent" />
            </div>

            <motion.div
              className="absolute -left-5 top-1/4 bg-cream border border-border rounded-2xl px-4 py-3 shadow-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.78, delay: 0.6, ease: [0.42, 0, 0.58, 1] }}
            >
              <div className="font-serif text-2xl text-ink">6+</div>
              <div className="text-2xs text-muted uppercase tracking-widest">Years</div>
            </motion.div>

            <motion.div
              className="absolute -right-5 bottom-1/4 bg-cream border border-border rounded-2xl px-4 py-3 shadow-sm"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.78, delay: 0.7, ease: [0.42, 0, 0.58, 1] }}
            >
              <div className="font-serif text-2xl text-ink">50+</div>
              <div className="text-2xs text-muted uppercase tracking-widest">Projects</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Beyond the Work ── */}
      <div className="mt-16 lg:mt-20">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-start justify-between mb-8">
          <div>
            <p className="text-2xs uppercase tracking-widest text-muted mb-2 flex items-center gap-3">
              <span className="w-6 h-px bg-ink/30" />
              Beyond the work
            </p>
            <p className="text-sm text-faint">
              A few snapshots from outside the studio.
            </p>
          </div>
          <div className="hidden md:block max-w-xs">
            <p className="text-xs text-faint leading-relaxed italic border-l border-border pl-4">
              Including personal photos signals culture fit, builds authentic connection, and shows the
              human behind the work—valuable for product designers who sell empathy.
            </p>
          </div>
        </div>

        {/* Fan-out photo stack */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <PhotoStack photos={personalPhotos} />
        </div>
      </div>
    </section>
  )
}
