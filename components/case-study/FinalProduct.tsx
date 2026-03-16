'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import type { Project } from '@/data'
import { cn } from '@/lib/utils'

type Props = { project: Project }

export default function FinalProduct({ project }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-8%' })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const mockupY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section ref={ref} className="py-24 lg:py-36 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 mb-16">
          <div>
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="w-6 h-px bg-ink/30" />
              <span className="text-2xs uppercase tracking-widest text-muted">07 — Final Product</span>
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              className="font-serif text-display-sm text-ink"
              initial={{ y: '100%', opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              The final product
            </motion.h2>
          </div>
        </div>

        {/* Large hero mockup */}
        <motion.div
          className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden mb-6"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: mockupY }}
        >
          <div className="absolute inset-0" style={{ background: project.heroImage }} />
          {/* Screen content placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white/20">
              <div className="font-serif text-6xl mb-4">{project.title}</div>
              <div className="text-sm">Product screens / prototype embed</div>
              <div className="text-xs mt-1 max-w-sm mx-auto">
                Replace with actual product screenshots, Figma embeds, or video prototypes
              </div>
            </div>
            {/* Decorative mock UI elements */}
            <div className="absolute inset-12 border border-white/5 rounded-2xl" aria-hidden />
            <div className="absolute inset-16 border border-white/5 rounded-xl" aria-hidden />
          </div>
        </motion.div>

        {/* Three smaller mockups */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((n, i) => (
            <motion.div
              key={n}
              className="aspect-[4/3] rounded-2xl overflow-hidden relative"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.65,
                delay: 0.3 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="absolute inset-0" style={{ background: project.thumbnail, opacity: 0.7 + i * 0.1 }} />
              <div className="absolute inset-0 flex items-center justify-center text-white/20 text-sm">
                Screen {n}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
