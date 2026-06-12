'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const socials = [
  { label: 'Twitter', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Dribbble', href: '#' },
  { label: 'GitHub', href: '#' },
  { label: 'Read.cv', href: '#' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      id="contact"
      className="border-t border-border bg-cream"
    >
      {/* CTA Band */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-2xs uppercase tracking-widest text-muted mb-6 flex items-center gap-3">
              <span className="w-6 h-px bg-ink/30" />
              Get in touch
            </p>
            <motion.h2
              className="font-serif text-display-sm text-ink leading-[1.1]"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-30% 0px -10% 0px' }}
              transition={{ duration: 0.92, ease: [0.42, 0, 0.58, 1] }}
            >
              Let&apos;s build something
              <br />
              <span className="italic">remarkable</span> together.
            </motion.h2>
          </div>

          <div className="flex flex-col justify-end gap-8">
            <motion.a
              href="mailto:alex@alexchen.design"
              className="group inline-flex items-center gap-3 text-2xl font-serif text-ink hover:opacity-60 transition-opacity"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-30% 0px -10% 0px' }}
              transition={{ duration: 0.88, delay: 0.15, ease: [0.42, 0, 0.58, 1] }}
              data-cursor="hover"
            >
              alex@alexchen.design
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 17L17 7M17 7H7M17 7v10"
                />
              </svg>
            </motion.a>

            <motion.a
              href="/resume.pdf"
              download
              className="group inline-flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-30% 0px -10% 0px' }}
              transition={{ duration: 0.88, delay: 0.28, ease: [0.42, 0, 0.58, 1] }}
              data-cursor="hover"
            >
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-y-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download Resume
            </motion.a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-faint">
            © {year} Alex Chen. All rights reserved.
          </p>

          <nav className="flex items-center gap-6" aria-label="Social links">
            {socials.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-30% 0px -10% 0px' }}
                transition={{ duration: 0.65, delay: 0.1 + i * 0.06, ease: [0.42, 0, 0.58, 1] }}
                whileHover={{ y: -2 }}
              >
                <Link
                  href={s.href}
                  className="text-xs text-faint hover:text-ink transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                >
                  {s.label}
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
