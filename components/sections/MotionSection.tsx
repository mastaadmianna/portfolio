'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { motionVideos } from '@/data'
import SectionLabel from '@/components/ui/SectionLabel'
import VideoCard from '@/components/ui/VideoCard'

export default function MotionSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef as React.RefObject<Element>, { once: true, margin: '-8%' })

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
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Motion work
            </motion.h2>
          </div>
          <motion.p
            className="text-sm text-muted max-w-xs leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Interaction prototypes, UI animations, and brand motion pieces I&apos;ve created
            to bring products to life.
          </motion.p>
        </div>

        {/* Video grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {motionVideos.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.65,
                delay: 0.05 + i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <VideoCard video={video} />
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          className="text-xs text-faint text-center mt-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Hover cards to preview · Click to open full video
        </motion.p>
      </div>
    </section>
  )
}
