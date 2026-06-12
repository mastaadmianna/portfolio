'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { motionVideos } from '@/data'
import SectionLabel from '@/components/ui/SectionLabel'
import VideoCard from '@/components/ui/VideoCard'
import { cn } from '@/lib/utils'

export default function MotionSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef as React.RefObject<Element>, { once: true, margin: '-35% 0px -10% 0px' })

  return (
    <section
      id="motion"
      ref={sectionRef}
      className="py-24 lg:py-36 border-t border-border"
      aria-labelledby="motion-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 lg:mb-20">
          <div>
            <SectionLabel label="Motion & Animation" />
            <motion.h2
              id="motion-heading"
              className="font-serif text-display-sm text-ink mt-4"
              initial={{ opacity: 0, x: 60 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.92, delay: 0.1, ease: [0.42, 0, 0.58, 1] }}
            >
              Motion work
            </motion.h2>
          </div>
          <motion.p
            className="text-sm text-muted max-w-xs leading-relaxed"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.88, delay: 0.2, ease: [0.42, 0, 0.58, 1] }}
          >
            Interaction prototypes, UI animations, and brand motion pieces I&apos;ve created
            to bring products to life.
          </motion.p>
        </div>

        {/* Video grid */}
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {motionVideos.map((video, i) => {
              const isLastItem = i === 5
              const isLastCol = i % 3 === 2
              const isLastRow = i >= 3
              return (
                <motion.div
                  key={video.id}
                  className={cn(
                    // Mobile: border-b between all rows except last
                    !isLastItem && 'border-b border-border',
                    // Desktop: remove border-b from last row, add border-r for non-last cols
                    isLastRow && 'lg:border-b-0',
                    !isLastCol && 'lg:border-r lg:border-border',
                  )}
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.82,
                    delay: 0.1 + i * 0.08,
                    ease: [0.42, 0, 0.58, 1],
                  }}
                >
                  <VideoCard video={video} flush />
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Bottom note */}
        <motion.p
          className="text-xs text-faint text-center mt-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.78, delay: 0.6 }}
        >
          Hover cards to preview · Click to open full video
        </motion.p>
      </div>
    </section>
  )
}
