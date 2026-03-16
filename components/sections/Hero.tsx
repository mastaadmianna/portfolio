'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import Button from '@/components/ui/Button'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const gradX = useSpring(mouseX, { stiffness: 60, damping: 25 })
  const gradY = useSpring(mouseY, { stiffness: 60, damping: 25 })

  const scrollOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const parallaxY = useTransform(scrollY, [0, 700], [0, -60])

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      mouseX.set((e.clientX - rect.left) / rect.width * 100)
      mouseY.set((e.clientY - rect.top) / rect.height * 100)
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [mouseX, mouseY])

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden"
      aria-label="Hero section"
    >
      {/* Ambient cursor-following gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 60% at ${gradX.get()}% ${gradY.get()}%, rgba(180,170,155,0.18) 0%, transparent 70%)`,
        }}
      />

      {/* Top decorative line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Main content */}
      <motion.div
        className="max-w-7xl mx-auto px-6 lg:px-8 w-full pt-32 pb-16 md:pt-36 md:pb-20"
        style={{ y: parallaxY }}
      >
        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-3 mb-8 md:mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="w-6 h-px bg-ink/30" />
          <span className="text-2xs uppercase tracking-widest text-muted font-sans">
            Product Designer · San Francisco
          </span>
        </motion.div>

        {/* Headline */}
        <h1
          className="font-serif text-ink leading-[1.1] mb-10 md:mb-12"
          style={{ fontSize: 'clamp(1.9rem, 4.2vw, 3.8rem)' }}
        >
          {/* Line 1 */}
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: '105%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            >
              I design scalable, intuitive products
            </motion.span>
          </span>

          {/* Line 2 */}
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: '105%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1], delay: 0.52 }}
            >
              &amp; websites at the intersection of
            </motion.span>
          </span>

          {/* Line 3 — italic words, non-italic "x" separators */}
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: '105%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1], delay: 0.64 }}
            >
              <em>Users</em>
              <span className="not-italic"> x </span>
              <em>Business</em>
              <span className="not-italic"> x </span>
              <em>Engineering</em>
            </motion.span>
          </span>
        </h1>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12">
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.88, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button href="/#work" variant="primary" size="md">
              View Work
            </Button>
            <Button href="/#about" variant="ghost" size="md">
              About Me
            </Button>
          </motion.div>

          <motion.p
            className="max-w-xs text-sm text-muted leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          >
            Senior Product Designer @ Stripe. Previously Airbnb, Google.
            Turning complex problems into clear, elegant experiences.
          </motion.p>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="flex justify-center pb-6"
        style={{ opacity: scrollOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-transparent to-ink/20"
          animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Marquee strip */}
      <div className="border-t border-border py-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="text-2xs uppercase tracking-widest text-faint px-8">
              Product Design · UX Research · Design Systems · Interaction Design · Motion Design ·
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
