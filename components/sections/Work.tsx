'use client'

import { useState, useRef } from 'react'
import {
  motion,
  useInView,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import Link from 'next/link'
import { projects } from '@/data'
import SectionLabel from '@/components/ui/SectionLabel'
import { cn } from '@/lib/utils'

// ─── Light editorial thumbnail per project ─────────────────────────────────
const CARD_W = 400
const CARD_H = 276

function MeridianThumb() {
  return (
    <svg viewBox="0 0 400 276" className="absolute inset-0 w-full h-full" aria-hidden>
      {/* Fine horizontal rule grid */}
      {Array.from({ length: 18 }).map((_, i) => (
        <line key={i} x1="0" y1={16 + i * 16} x2="400" y2={16 + i * 16}
          stroke="#C4CDD8" strokeWidth="0.5" />
      ))}
      {/* Faint large watermark number */}
      <text x="390" y="260" fontFamily="Georgia, serif" fontSize="160" fill="#DCE4EE"
        textAnchor="end" dominantBaseline="auto">01</text>
      {/* Accent top bar */}
      <rect x="32" y="28" width="40" height="1.5" fill="#9AAABB" />
    </svg>
  )
}

function SolarisThumb() {
  return (
    <svg viewBox="0 0 400 276" className="absolute inset-0 w-full h-full" aria-hidden>
      {/* Concentric arcs from bottom-right */}
      {[50, 100, 155, 215, 280, 350].map((r, i) => (
        <circle key={i} cx="400" cy="276" r={r} fill="none" stroke="#D8D0C4"
          strokeWidth="0.7" />
      ))}
      {/* Dot grid top-left */}
      {Array.from({ length: 4 }).map((_, row) =>
        Array.from({ length: 6 }).map((_, col) => (
          <circle key={`${row}-${col}`} cx={32 + col * 20} cy={32 + row * 20}
            r="1.5" fill="#C8C0B2" />
        ))
      )}
      <text x="30" y="255" fontFamily="Georgia, serif" fontSize="150" fill="#E8E2D8"
        textAnchor="start" dominantBaseline="auto">S</text>
    </svg>
  )
}

function HelioThumb() {
  return (
    <svg viewBox="0 0 400 276" className="absolute inset-0 w-full h-full" aria-hidden>
      {/* Flowing arc curves */}
      <path d="M 0 180 Q 200 60 400 180" fill="none" stroke="#BCDAD0" strokeWidth="0.8" />
      <path d="M 0 210 Q 200 90 400 210" fill="none" stroke="#BCDAD0" strokeWidth="0.8" />
      <path d="M 0 240 Q 200 120 400 240" fill="none" stroke="#BCDAD0" strokeWidth="0.8" />
      <path d="M 0 150 Q 200 30 400 150" fill="none" stroke="#BCDAD0" strokeWidth="0.6" />
      {/* Central circle */}
      <circle cx="200" cy="138" r="72" fill="none" stroke="#C4D8D0" strokeWidth="0.8" />
      <circle cx="200" cy="138" r="36" fill="none" stroke="#C4D8D0" strokeWidth="0.6" />
      <text x="370" y="260" fontFamily="Georgia, serif" fontSize="150" fill="#D8EAE4"
        textAnchor="end">H</text>
    </svg>
  )
}

function ApexThumb() {
  return (
    <svg viewBox="0 0 400 276" className="absolute inset-0 w-full h-full" aria-hidden>
      {/* Diagonal stripes */}
      {Array.from({ length: 22 }).map((_, i) => (
        <line key={i}
          x1={i * 36 - 140} y1="0"
          x2={i * 36 + 140} y2="276"
          stroke="#D4C8DC" strokeWidth="0.6" />
      ))}
      {/* Vertical accent */}
      <line x1="32" y1="24" x2="32" y2="96" stroke="#B8A8C8" strokeWidth="1.5" />
      <text x="380" y="260" fontFamily="Georgia, serif" fontSize="155" fill="#E8DCED"
        textAnchor="end">A</text>
    </svg>
  )
}

const THUMBNAILS = [
  { bg: '#EDF0F5', Graphic: MeridianThumb },   // Meridian Banking
  { bg: '#F4F1EB', Graphic: SolarisThumb },    // Solaris Design System
  { bg: '#EBF4F0', Graphic: HelioThumb },      // Helio Health
  { bg: '#F3EDF5', Graphic: ApexThumb },       // Apex Commerce
]

// ─── Work section ──────────────────────────────────────────────────────────

export default function Work() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef as React.RefObject<Element>, { once: true, margin: '-10%' })

  // X: follows mouse, clamped so card never clips container edges
  const rawX = useMotionValue(-CARD_W)
  const springX = useSpring(rawX, { stiffness: 280, damping: 32, mass: 0.6 })
  const cardLeft = useTransform(springX, (x) => x - CARD_W / 2)

  // Y: springs to center of hovered row
  const rawY = useMotionValue(300)
  const springY = useSpring(rawY, { stiffness: 160, damping: 22, mass: 0.8 })
  const cardTop = useTransform(springY, (y) => y - CARD_H / 2)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const half = CARD_W / 2
    rawX.set(Math.max(half, Math.min(e.clientX - rect.left, rect.width - half)))
  }

  const handleRowEnter = (index: number, el: HTMLElement) => {
    setActiveIndex(index)
    if (!containerRef.current) return
    const cRect = containerRef.current.getBoundingClientRect()
    const rRect = el.getBoundingClientRect()
    rawY.set(rRect.top - cRect.top + rRect.height / 2)
  }

  return (
    <section
      id="work"
      className="py-24 lg:py-36 border-t border-border"
      aria-labelledby="work-heading"
    >
      <div
        ref={containerRef}
        className="max-w-7xl mx-auto px-6 lg:px-8 relative"
        onMouseMove={handleMouseMove}
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 lg:mb-24">
          <div>
            <SectionLabel label="Selected Work" />
            <motion.h2
              id="work-heading"
              className="font-serif text-display-sm text-ink mt-4"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Case studies
            </motion.h2>
          </div>
          <motion.p
            className="text-sm text-muted max-w-xs leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Four projects across fintech, design systems, healthcare, and e-commerce that I&apos;m
            proud to have shipped.
          </motion.p>
        </div>

        {/* ── Floating preview card — follows mouse on X, snaps to row on Y ── */}
        <div
          className="hidden lg:block absolute inset-0 pointer-events-none z-20 overflow-hidden"
          aria-hidden
        >
          <AnimatePresence mode="wait">
            {activeIndex !== null && (
              <motion.div
                key={activeIndex}
                className="absolute rounded-2xl overflow-hidden"
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  left: cardLeft,
                  top: cardTop,
                  background: THUMBNAILS[activeIndex]?.bg ?? '#F0EEE8',
                  boxShadow:
                    '0 8px 32px rgba(10,10,10,0.08), 0 2px 8px rgba(10,10,10,0.04), 0 0 0 1px rgba(10,10,10,0.04)',
                }}
                initial={{ opacity: 0, scale: 0.86 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* SVG graphic pattern */}
                {THUMBNAILS[activeIndex] && (() => {
                  const { Graphic } = THUMBNAILS[activeIndex]
                  return <Graphic />
                })()}

                {/* Content overlay */}
                <div className="relative z-10 p-7 h-full flex flex-col justify-between">
                  <span className="text-2xs uppercase tracking-widest text-ink/35">
                    {projects[activeIndex].category}
                  </span>
                  <div>
                    <div className="font-serif text-2xl text-ink/80 leading-tight mb-2">
                      {projects[activeIndex].title}
                    </div>
                    <p className="text-ink/45 text-xs leading-relaxed line-clamp-2">
                      {projects[activeIndex].description}
                    </p>
                    <div className="mt-4 text-ink/30 text-xs flex items-center gap-1.5">
                      <span>View case study</span>
                      <span>→</span>
                    </div>
                  </div>
                </div>

                {/* Subtle bottom vignette */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/[0.04] to-transparent pointer-events-none" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Project rows */}
        <div className="divide-y divide-border">
          {projects.map((project, i) => (
            <ProjectRow
              key={project.slug}
              project={project}
              index={i}
              isActive={activeIndex === i}
              onHover={handleRowEnter}
              onLeave={() => setActiveIndex(null)}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Row ───────────────────────────────────────────────────────────────────

type RowProps = {
  project: (typeof projects)[0]
  index: number
  isActive: boolean
  onHover: (index: number, el: HTMLElement) => void
  onLeave: () => void
  isInView: boolean
}

function ProjectRow({ project, index, isActive, onHover, onLeave, isInView }: RowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/work/${project.slug}`}
        className="group block py-8 md:py-10 relative z-10"
        onMouseEnter={(e) => onHover(index, e.currentTarget)}
        onMouseLeave={onLeave}
        data-cursor="hover"
      >
        <div className="flex items-center gap-6 md:gap-10">
          {/* Number */}
          <span
            className={cn(
              'text-2xs font-mono text-faint transition-colors duration-300 flex-shrink-0 tabular-nums w-7',
              isActive && 'text-muted'
            )}
          >
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Title + description */}
          <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center md:gap-8">
            <div className="flex-1 min-w-0">
              <h3
                className={cn(
                  'font-serif text-2xl md:text-3xl lg:text-4xl text-ink/70 transition-colors duration-300 truncate',
                  isActive && 'text-ink'
                )}
              >
                {project.title}
              </h3>
              <p
                className={cn(
                  'text-sm text-muted mt-1 transition-all duration-500 overflow-hidden leading-relaxed',
                  isActive ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0 md:max-h-16 md:opacity-100'
                )}
              >
                {project.summary}
              </p>
            </div>

            {/* Category */}
            <span
              className={cn(
                'flex-shrink-0 text-2xs uppercase tracking-widest transition-colors duration-300 hidden md:block',
                isActive ? 'text-ink/50' : 'text-faint'
              )}
            >
              {project.category}
            </span>
          </div>

          {/* Arrow */}
          <motion.div
            className="flex-shrink-0"
            animate={{ x: isActive ? 4 : 0, rotate: isActive ? -45 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <svg className="w-5 h-5 text-faint group-hover:text-ink transition-colors"
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M17 7l-10 10M17 7H7M17 7v10" />
            </svg>
          </motion.div>
        </div>

        {/* Mobile card preview */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              className="lg:hidden mt-4 h-36 rounded-xl overflow-hidden relative"
              style={{ background: THUMBNAILS[index]?.bg ?? '#F0EEE8' }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 144 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {THUMBNAILS[index] && (() => { const { Graphic } = THUMBNAILS[index]; return <Graphic /> })()}
              <div className="absolute inset-0 p-4 flex items-end relative z-10">
                <span className="text-xs text-ink/40 uppercase tracking-widest">
                  {project.category}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Link>
    </motion.div>
  )
}
