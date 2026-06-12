'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import Button from '@/components/ui/Button'

// ─── Marquee logo items ───────────────────────────────────────────────────────

const MARQUEE_ITEMS = [
  {
    label: 'Vibe coding',
    icon: (
      // Claude — official Anthropic asterisk mark (CC-BY brand)
      <svg width="20" height="20" viewBox="0 0 46 46" fill="none" aria-label="Claude">
        <path d="M31.06 2.68L22.97 16.82 14.88 2.68C16.83 1.6 19.08 1 21.47 1h3c2.39 0 4.64.6 6.59 1.68zM1 21.47v3c0 2.41.61 4.67 1.69 6.63L16.8 23 2.69 14.87A13.91 13.91 0 001 21.47zm43.3-6.6L30.24 22.97l14.06 8.11A13.92 13.92 0 0045 24.47v-3c0-2.39-.6-4.64-1.7-6.6zM14.94 43.3L23 29.24l8.06 14.06A13.92 13.92 0 0124.53 45h-3a13.9 13.9 0 01-6.59-1.7z" fill="#CC785C"/>
      </svg>
    ),
  },
  {
    label: 'Figma',
    icon: (
      // Figma — official 5-node mark
      <svg width="13" height="20" viewBox="0 0 24 24" fill="none" aria-label="Figma">
        <path d="M5 5.5A3.5 3.5 0 018.5 2H12v7H8.5A3.5 3.5 0 015 5.5z" fill="#F24E1E"/>
        <path d="M12 2h3.5a3.5 3.5 0 110 7H12V2z" fill="#FF7262"/>
        <path d="M12 12.5a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z" fill="#1ABCFE"/>
        <path d="M5 12.5A3.5 3.5 0 018.5 9H12v7H8.5A3.5 3.5 0 015 12.5z" fill="#A259FF"/>
        <path d="M5 19.5A3.5 3.5 0 018.5 16H12v3.5a3.5 3.5 0 11-7 0z" fill="#0ACF83"/>
      </svg>
    ),
  },
  {
    label: 'AI workflows',
    icon: (
      // OpenAI — official pinwheel mark
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#10A37F" aria-label="ChatGPT">
        <path d="M22.282 9.821a5.985 5.985 0 00-.516-4.91 6.046 6.046 0 00-6.51-2.9A6.065 6.065 0 004.981 4.18a5.985 5.985 0 00-3.998 2.9 6.046 6.046 0 00.743 7.097 5.98 5.98 0 00.51 4.911 6.051 6.051 0 006.515 2.9A5.985 5.985 0 0013.26 24a6.056 6.056 0 005.772-4.206 5.99 5.99 0 003.997-2.9 6.056 6.056 0 00-.747-7.073zM13.26 22.43c-1.17.049-2.317-.395-3.187-1.234l.621-.036 4.228-2.442a.694.694 0 00.351-.6v-5.966l1.787 1.032c.019.01.033.029.038.05v4.887a4.494 4.494 0 01-3.838 4.309zm-8.99-4.046a4.468 4.468 0 01-.535-3.014l.42.25 4.228 2.442a.695.695 0 00.699 0l5.163-2.981v2.065a.068.068 0 01-.026.056L9.918 19.59a4.494 4.494 0 01-5.648-1.206zm-1.182-10.006A4.464 4.464 0 015.43 6.452l-.012 4.583v4.808c0 .245.13.474.345.601l5.138 2.967-1.788 1.032a.069.069 0 01-.065.004L4.946 17.69a4.494 4.494 0 01-1.857-7.313zM19.54 13.102l-5.138-2.968 1.787-1.031a.069.069 0 01.065-.004l4.102 2.368a4.494 4.494 0 01-.702 8.1v-5.418a.68.68 0 00-.114-.047zm1.757-3.016l-.421-.244-4.227-2.441a.695.695 0 00-.7 0L11 10.382V8.316a.068.068 0 01.027-.056l4.102-2.368a4.494 4.494 0 016.168 4.194zm-11.073 3.87l-1.787-1.031a.068.068 0 01-.038-.05V8.01c0-.245.131-.475.346-.601l5.138-2.968 1.788 1.032a.069.069 0 01.065.003l-4.102 2.368a.695.695 0 00-.347.6l-.063 5.555z"/>
      </svg>
    ),
  },
  {
    label: 'Figma make',
    icon: (
      // Figma Make — uses Figma brand mark
      <svg width="13" height="20" viewBox="0 0 24 24" fill="none" aria-label="Figma Make">
        <path d="M5 5.5A3.5 3.5 0 018.5 2H12v7H8.5A3.5 3.5 0 015 5.5z" fill="#F24E1E"/>
        <path d="M12 2h3.5a3.5 3.5 0 110 7H12V2z" fill="#FF7262"/>
        <path d="M12 12.5a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z" fill="#1ABCFE"/>
        <path d="M5 12.5A3.5 3.5 0 018.5 9H12v7H8.5A3.5 3.5 0 015 12.5z" fill="#A259FF"/>
        <path d="M5 19.5A3.5 3.5 0 018.5 16H12v3.5a3.5 3.5 0 11-7 0z" fill="#0ACF83"/>
      </svg>
    ),
  },
  {
    label: 'Micro animations',
    icon: (
      // LottieFiles — official logo mark on teal background
      <svg width="22" height="22" viewBox="0 0 64 64" aria-label="LottieFiles">
        <rect width="64" height="64" rx="14" fill="#00C1A2"/>
        <path d="M20 44c0-13.255 10.745-24 24-24" stroke="white" strokeWidth="5" strokeLinecap="round" fill="none"/>
        <path d="M20 32c0-6.627 5.373-12 12-12" stroke="white" strokeWidth="5" strokeLinecap="round" fill="none"/>
        <circle cx="44" cy="44" r="4" fill="white"/>
      </svg>
    ),
  },
  {
    label: 'Motion graphics',
    icon: (
      // Adobe After Effects — official dark badge
      <svg width="22" height="22" viewBox="0 0 50 50" aria-label="After Effects">
        <rect width="50" height="50" rx="10" fill="#00005B"/>
        <text x="4" y="38" fontFamily="'Arial Black','Arial',sans-serif" fontSize="30"
          fontWeight="900" fill="#9999FF">Ae</text>
      </svg>
    ),
  },
  {
    label: 'Video editing',
    icon: (
      // Adobe Premiere Pro — official dark badge
      <svg width="22" height="22" viewBox="0 0 50 50" aria-label="Premiere Pro">
        <rect width="50" height="50" rx="10" fill="#00005B"/>
        <text x="3" y="38" fontFamily="'Arial Black','Arial',sans-serif" fontSize="30"
          fontWeight="900" fill="#E477F0">Pr</text>
      </svg>
    ),
  },
  {
    label: 'SVGs',
    icon: (
      // Adobe Illustrator — official dark badge
      <svg width="22" height="22" viewBox="0 0 50 50" aria-label="Illustrator">
        <rect width="50" height="50" rx="10" fill="#310000"/>
        <text x="4" y="38" fontFamily="'Arial Black','Arial',sans-serif" fontSize="30"
          fontWeight="900" fill="#FF9A00">Ai</text>
      </svg>
    ),
  },
]

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
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
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
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.88, ease: [0.22, 1, 0.36, 1] }}
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
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
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
        <div className="flex animate-marquee whitespace-nowrap items-center">
          {[0, 1].map((set) => (
            <span key={set} className="flex items-center">
              {MARQUEE_ITEMS.map((item, i) => (
                <span key={`${set}-${i}`} className="inline-flex items-center gap-2 px-8">
                  {item.icon}
                  <span className="text-2xs uppercase tracking-widest text-muted/70 font-sans">
                    {item.label}
                  </span>
                  <span className="text-faint/50 text-xs ml-6">·</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
