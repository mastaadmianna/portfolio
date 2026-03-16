'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'

const navItems = [
  { label: 'Work', href: '/#work' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Motion', href: '/#motion' },
  { label: 'About', href: '/#about' },
  { label: 'Testimonials', href: '/#testimonials' },
]

export default function Header() {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const lastScrollY = useRef(0)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (current) => {
    const diff = current - lastScrollY.current

    if (current < 80) {
      setHidden(false)
      setScrolled(false)
    } else {
      setScrolled(true)
      if (diff > 4) {
        setHidden(true)
        setMenuOpen(false)
      } else if (diff < -4) {
        setHidden(false)
      }
    }

    lastScrollY.current = current
  })

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-colors duration-300',
          scrolled
            ? 'bg-cream/80 backdrop-blur-md border-b border-border'
            : 'bg-transparent'
        )}
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-xl text-ink hover:opacity-70 transition-opacity"
            data-cursor="hover"
          >
            Alex Chen
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Primary navigation">
            {navItems.map((item) => (
              <NavItem key={item.label} href={item.href} label={item.label} />
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button href="/#contact" variant="primary" size="sm">
              Contact
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 relative"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
            data-cursor="hover"
          >
            <motion.span
              className="w-5 h-px bg-ink block"
              animate={menuOpen ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="w-5 h-px bg-ink block"
              animate={menuOpen ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-cream flex flex-col"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex-1 flex flex-col justify-center px-8 gap-2 pt-16">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.05 + i * 0.06,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={item.href}
                    className="text-4xl font-serif text-ink/80 hover:text-ink transition-colors block py-3 border-b border-border"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-8"
              >
                <Button href="/#contact" variant="primary" size="lg" onClick={() => setMenuOpen(false)}>
                  Get in touch
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function NavItem({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="relative px-4 py-2 text-sm text-muted hover:text-ink transition-colors duration-200 font-sans group"
      data-cursor="hover"
    >
      {label}
      <span className="absolute bottom-1 left-4 right-4 h-px bg-ink scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] origin-left" />
    </Link>
  )
}
