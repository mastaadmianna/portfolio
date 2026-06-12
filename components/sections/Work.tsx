'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { projects } from '@/data'

// ─── SVG Thumbnails ──────────────────────────────────────────────────────────

function MeridianThumb() {
  return (
    <svg viewBox="0 0 600 480" className="absolute inset-0 w-full h-full" aria-hidden>
      {Array.from({ length: 24 }).map((_, i) => (
        <line key={i} x1="0" y1={20 + i * 20} x2="600" y2={20 + i * 20}
          stroke="#C4CDD8" strokeWidth="0.5" />
      ))}
      <text x="580" y="440" fontFamily="Georgia, serif" fontSize="260" fill="#DCE4EE"
        textAnchor="end" dominantBaseline="auto">01</text>
      <rect x="48" y="44" width="64" height="2" fill="#9AAABB" />
      <rect x="48" y="52" width="32" height="1" fill="#B8C4D0" />
    </svg>
  )
}

function SolarisThumb() {
  return (
    <svg viewBox="0 0 600 480" className="absolute inset-0 w-full h-full" aria-hidden>
      {[80, 160, 250, 350, 460, 580].map((r, i) => (
        <circle key={i} cx="600" cy="480" r={r} fill="none" stroke="#D8D0C4" strokeWidth="0.8" />
      ))}
      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 8 }).map((_, col) => (
          <circle key={`${row}-${col}`} cx={48 + col * 24} cy={48 + row * 24} r="2" fill="#C8C0B2" />
        ))
      )}
      <text x="44" y="440" fontFamily="Georgia, serif" fontSize="240" fill="#E8E2D8"
        textAnchor="start" dominantBaseline="auto">S</text>
    </svg>
  )
}

function HelioThumb() {
  return (
    <svg viewBox="0 0 600 480" className="absolute inset-0 w-full h-full" aria-hidden>
      <path d="M 0 300 Q 300 100 600 300" fill="none" stroke="#BCDAD0" strokeWidth="0.9" />
      <path d="M 0 340 Q 300 140 600 340" fill="none" stroke="#BCDAD0" strokeWidth="0.9" />
      <path d="M 0 380 Q 300 180 600 380" fill="none" stroke="#BCDAD0" strokeWidth="0.9" />
      <path d="M 0 260 Q 300 60 600 260" fill="none" stroke="#BCDAD0" strokeWidth="0.6" />
      <path d="M 0 220 Q 300 20 600 220" fill="none" stroke="#C4D8D0" strokeWidth="0.5" />
      <circle cx="300" cy="230" r="110" fill="none" stroke="#C4D8D0" strokeWidth="0.9" />
      <circle cx="300" cy="230" r="55" fill="none" stroke="#C4D8D0" strokeWidth="0.7" />
      <text x="560" y="455" fontFamily="Georgia, serif" fontSize="240" fill="#D8EAE4" textAnchor="end">H</text>
    </svg>
  )
}

function ApexThumb() {
  return (
    <svg viewBox="0 0 600 480" className="absolute inset-0 w-full h-full" aria-hidden>
      {Array.from({ length: 28 }).map((_, i) => (
        <line key={i} x1={i * 44 - 200} y1="0" x2={i * 44 + 200} y2="480"
          stroke="#D4C8DC" strokeWidth="0.7" />
      ))}
      <line x1="48" y1="36" x2="48" y2="148" stroke="#B8A8C8" strokeWidth="2" />
      <text x="570" y="455" fontFamily="Georgia, serif" fontSize="250" fill="#E8DCED" textAnchor="end">A</text>
    </svg>
  )
}

const THUMBNAILS = [
  { bg: '#EDF0F5', Graphic: MeridianThumb },
  { bg: '#F4F1EB', Graphic: SolarisThumb },
  { bg: '#EBF4F0', Graphic: HelioThumb },
  { bg: '#F3EDF5', Graphic: ApexThumb },
]

// ─── Character scramble ───────────────────────────────────────────────────────

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function ScrambleText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState(text)
  const prevRef = useRef(text)

  useEffect(() => {
    if (prevRef.current === text) return
    prevRef.current = text
    let frame = 0
    const totalFrames = 22
    const id = setInterval(() => {
      setDisplayed(
        text.split('').map((char, i) => {
          if (char === ' ') return ' '
          const resolveAt = Math.floor((i / text.length) * totalFrames)
          if (frame >= resolveAt) return char
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
        }).join('')
      )
      frame++
      if (frame > totalFrames) { clearInterval(id); setDisplayed(text) }
    }, 32)
    return () => clearInterval(id)
  }, [text])

  return <>{displayed}</>
}

// ─── Lenis accessor ───────────────────────────────────────────────────────────

type LenisInstance = { stop(): void; start(): void }
const getLenis = (): LenisInstance | null => (window as any).__lenis ?? null

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Work() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const cooldownRef = useRef(false)
  const indexRef = useRef(0)
  const lockedRef = useRef(false)

  useEffect(() => { indexRef.current = activeIndex }, [activeIndex])

  // Stop Lenis the moment the page scrolls to this section.
  // Lenis fires a real 'scroll' event on every rAF tick, so this catches it
  // even during a fast swipe — preventing the page from scrolling past.
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const atSection = Math.abs(window.scrollY - el.offsetTop) <= 6

      if (atSection && !lockedRef.current) {
        lockedRef.current = true
        getLenis()?.stop()
      } else if (!atSection && lockedRef.current) {
        lockedRef.current = false
        // Do NOT start Lenis here — the wheel handler controls release
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Wheel handler — runs while Lenis is stopped (we own the scroll)
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (!lockedRef.current) return
      if (Math.abs(e.deltaY) < 30) return // ignore trackpad momentum

      // Always block Lenis from seeing the event while we're locked
      e.stopPropagation()
      e.preventDefault()

      const goingDown = e.deltaY > 0
      const atStart = indexRef.current === 0
      const atEnd = indexRef.current === projects.length - 1

      if (goingDown && atEnd) {
        // Release at bottom — Lenis scrolls to next section
        lockedRef.current = false
        getLenis()?.start()
        return
      }
      if (!goingDown && atStart) {
        // Release at top — Lenis scrolls back to Hero
        lockedRef.current = false
        getLenis()?.start()
        return
      }

      if (cooldownRef.current) return
      cooldownRef.current = true
      setTimeout(() => { cooldownRef.current = false }, 880)

      if (goingDown) {
        setDirection(1)
        setActiveIndex(prev => Math.min(prev + 1, projects.length - 1))
      } else {
        setDirection(-1)
        setActiveIndex(prev => Math.max(prev - 1, 0))
      }
    }

    // capture:true so we fire before any bubble-phase listener (including Lenis)
    document.addEventListener('wheel', onWheel, { passive: false, capture: true })
    return () => document.removeEventListener('wheel', onWheel, { capture: true })
  }, [])

  // Touch support
  useEffect(() => {
    let startY = 0
    const onTouchStart = (e: TouchEvent) => { startY = e.touches[0].clientY }
    const onTouchMove = (e: TouchEvent) => {
      if (!lockedRef.current) return
      const delta = startY - e.touches[0].clientY
      if (Math.abs(delta) < 40) return
      e.stopPropagation()
      e.preventDefault()
      const goingDown = delta > 0
      const atStart = indexRef.current === 0
      const atEnd = indexRef.current === projects.length - 1
      if (goingDown && atEnd) { lockedRef.current = false; getLenis()?.start(); return }
      if (!goingDown && atStart) { lockedRef.current = false; getLenis()?.start(); return }
      if (cooldownRef.current) return
      cooldownRef.current = true
      startY = e.touches[0].clientY
      setTimeout(() => { cooldownRef.current = false }, 880)
      if (goingDown) { setDirection(1); setActiveIndex(p => Math.min(p + 1, projects.length - 1)) }
      else { setDirection(-1); setActiveIndex(p => Math.max(p - 1, 0)) }
    }
    document.addEventListener('touchstart', onTouchStart, { passive: true })
    document.addEventListener('touchmove', onTouchMove, { passive: false, capture: true })
    return () => {
      document.removeEventListener('touchstart', onTouchStart)
      document.removeEventListener('touchmove', onTouchMove, { capture: true })
    }
  }, [])

  const project = projects[activeIndex]
  const thumb = THUMBNAILS[activeIndex]

  const imageVariants = {
    enter: (dir: number) => ({ y: dir > 0 ? '100%' : '-100%' }),
    center: { y: '0%' },
    exit: (dir: number) => ({ y: dir > 0 ? '-100%' : '100%' }),
  }
  const infoVariants = {
    enter: (dir: number) => ({ opacity: 0, y: dir > 0 ? 20 : -20 }),
    center: { opacity: 1, y: 0 },
    exit: (dir: number) => ({ opacity: 0, y: dir > 0 ? -20 : 20 }),
  }

  return (
    <section
      id="work"
      ref={sectionRef}
      className="h-[100dvh] border-t border-border flex flex-col md:flex-row overflow-hidden bg-cream"
      aria-labelledby="work-heading"
    >
      {/* ── Mobile layout ── */}
      <div className="md:hidden flex flex-col h-full">
        <div className="px-6 pt-8 pb-4" style={{ flex: '0 0 auto' }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] tracking-widest text-muted uppercase">Case Studies</span>
            <span className="text-xs text-ink font-mono tabular-nums font-medium">
              {activeIndex + 1} of {projects.length}
            </span>
          </div>
          <div className="w-full h-px bg-border mb-5" />
          <span className="text-[10px] uppercase tracking-widest text-muted block mb-2">
            {project.category}
          </span>
          <h2 id="work-heading" className="font-serif text-2xl text-ink leading-[1.1] mb-3">
            <ScrambleText text={project.title} />
          </h2>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.p key={activeIndex} custom={direction} variants={infoVariants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.4, ease: [0.42, 0, 0.58, 1] }}
              className="text-muted text-xs leading-relaxed mb-4 line-clamp-2">
              {project.description}
            </motion.p>
          </AnimatePresence>
          <Link href={`/work/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-ink text-xs tracking-wide group w-fit">
            <span className="border-b border-ink/20 group-hover:border-ink transition-colors duration-300">
              View case study
            </span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 7l-10 10M17 7H7M17 7v10" />
            </svg>
          </Link>
        </div>

        <div className="relative flex-1 mx-6 mb-4 rounded-xl overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={activeIndex} className="absolute inset-0" style={{ background: thumb.bg }}
              custom={direction} variants={imageVariants} initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.65, ease: [0.42, 0, 0.58, 1] }}>
              <thumb.Graphic />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between px-6 pb-8">
          <div className="flex items-center gap-3">
            {projects.map((_, i) => (
              <div key={i} className={`w-[2px] rounded-full transition-all duration-500 ${
                i === activeIndex ? 'h-10 bg-ink' : 'h-5 bg-ink/20'
              }`} />
            ))}
          </div>
          <AnimatePresence>
            {activeIndex < projects.length - 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex items-center gap-1.5 text-muted">
                <span className="text-[9px] tracking-widest uppercase">Scroll</span>
                <motion.div animate={{ y: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Desktop layout ── */}

      {/* Left: sliding image */}
      <div className="hidden md:block relative border-r border-border overflow-hidden" style={{ width: '58%' }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div key={activeIndex} className="absolute inset-0 p-8 lg:p-12"
            style={{ background: thumb.bg }} custom={direction}
            variants={imageVariants} initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.72, ease: [0.42, 0, 0.58, 1] }}>
            <div className="w-full h-full rounded-2xl overflow-hidden relative">
              <thumb.Graphic />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right: info panel */}
      <div className="hidden md:flex flex-col justify-between flex-1 p-8 lg:p-12">

        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs tracking-widest text-muted uppercase">Case Studies</span>
            <AnimatePresence mode="wait">
              <motion.span key={activeIndex}
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3, ease: [0.42, 0, 0.58, 1] }}
                className="text-sm text-ink font-mono tabular-nums font-medium tracking-wide">
                {activeIndex + 1} of {projects.length}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="w-full h-px bg-border" />
        </div>

        <div className="flex gap-6 flex-1">
          <div className="flex-1 flex flex-col justify-center py-10">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.span key={`cat-${activeIndex}`} custom={direction}
                variants={infoVariants} initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.35, ease: [0.42, 0, 0.58, 1] }}
                className="text-xs uppercase tracking-widest text-muted mb-6 block">
                {project.category}
              </motion.span>
            </AnimatePresence>

            <h2 id="work-heading"
              className="font-serif text-4xl lg:text-5xl xl:text-6xl text-ink leading-[1.05] mb-7">
              <ScrambleText text={project.title} />
            </h2>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.p key={`desc-${activeIndex}`} custom={direction}
                variants={infoVariants} initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.4, delay: 0.05, ease: [0.42, 0, 0.58, 1] }}
                className="text-muted text-sm lg:text-base leading-relaxed mb-10 max-w-sm">
                {project.description}
              </motion.p>
            </AnimatePresence>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div key={`cta-${activeIndex}`} custom={direction}
                variants={infoVariants} initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.4, delay: 0.1, ease: [0.42, 0, 0.58, 1] }}>
                <Link href={`/work/${project.slug}`}
                  className="inline-flex items-center gap-2 text-ink text-sm tracking-wide group w-fit">
                  <span className="border-b border-ink/20 group-hover:border-ink transition-colors duration-300 pb-px">
                    View case study
                  </span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M17 7l-10 10M17 7H7M17 7v10" />
                  </svg>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Vertical progress indicator */}
          <div className="flex flex-col items-center justify-center gap-4 self-center py-4">
            {projects.map((_, i) => (
              <div key={i} className={`w-[2px] rounded-full transition-all duration-500 ${
                i === activeIndex ? 'h-14 bg-ink' : 'h-6 bg-ink/20'
              }`} />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end">
          <AnimatePresence mode="wait">
            {activeIndex < projects.length - 1 ? (
              <motion.div key="scroll-cue"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2 text-muted">
                <span className="text-[10px] tracking-widest uppercase">Scroll</span>
                <motion.div animate={{ y: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </motion.div>
            ) : (
              <motion.span key="continue"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-[10px] tracking-widest uppercase text-muted">
                Continue scrolling
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
