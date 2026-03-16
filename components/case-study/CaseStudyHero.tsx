'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import type { Project } from '@/data'
import { cn } from '@/lib/utils'

type Props = { project: Project }

export default function CaseStudyHero({ project }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 160])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Hero background */}
      <div className="absolute inset-0" style={{ background: project.heroImage }} />

      {/* Noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />

      {/* Back button */}
      <div className="relative z-10 pt-24 px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors text-sm"
            data-cursor="hover"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 12H5M5 12l7-7M5 12l7 7" />
            </svg>
            All work
          </Link>
        </motion.div>
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 flex-1 flex flex-col justify-end px-6 lg:px-8 pb-16 md:pb-24 max-w-7xl mx-auto w-full"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        {/* Category */}
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="w-6 h-px bg-white/30" />
          <span className="text-2xs uppercase tracking-widest text-white/40">{project.category}</span>
        </motion.div>

        {/* Title */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            className="font-serif text-display text-white"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {project.title}
          </motion.h1>
        </div>

        {/* Summary */}
        <motion.p
          className="font-serif text-xl md:text-2xl text-white/60 max-w-2xl mb-12 italic"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {project.summary}
        </motion.p>

        {/* Meta grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          {[
            { label: 'Role', value: project.role },
            { label: 'Duration', value: project.duration },
            { label: 'Company', value: project.company },
            { label: 'Team', value: project.team },
          ].map(({ label, value }) => (
            <div key={label}>
              <div className="text-2xs uppercase tracking-widest text-white/30 mb-1">{label}</div>
              <div className="text-sm text-white/70">{value}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 right-8 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-transparent to-white/20"
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
