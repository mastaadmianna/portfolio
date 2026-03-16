'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { projects } from '@/data'
import type { Project } from '@/data'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'

type Props = { project: Project }

export default function Learnings({ project }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-10%' })

  const otherProjects = projects.filter((p) => p.slug !== project.slug).slice(0, 2)

  return (
    <section ref={ref} className="py-24 lg:py-36 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24 mb-20">
          {/* Left label */}
          <div>
            <motion.div
              className="flex items-center gap-3 lg:sticky lg:top-24"
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="w-6 h-px bg-ink/30" />
              <span className="text-2xs uppercase tracking-widest text-muted">09 — Learnings</span>
            </motion.div>
          </div>

          {/* Right content */}
          <div>
            <div className="overflow-hidden mb-10">
              <motion.h2
                className="font-serif text-display-sm text-ink"
                initial={{ y: '100%', opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                Learnings
              </motion.h2>
            </div>

            <div className="space-y-6">
              {project.learnings.map((learning, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <span className="text-2xs font-mono text-faint tabular-nums flex-shrink-0 mt-1.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-base text-muted leading-relaxed border-l border-border pl-6">
                    {learning}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Next projects */}
        <motion.div
          className="border-t border-border pt-16"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-between mb-8">
            <p className="text-2xs uppercase tracking-widest text-muted flex items-center gap-3">
              <span className="w-6 h-px bg-ink/30" />
              More work
            </p>
            <Button href="/#work" variant="ghost" size="sm">
              View all
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {otherProjects.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.6 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={`/work/${p.slug}`}
                  className="group block aspect-video rounded-2xl overflow-hidden relative"
                  data-cursor="hover"
                >
                  <div className="absolute inset-0" style={{ background: p.thumbnail }} />
                  <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-300" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <div className="text-2xs uppercase tracking-widest text-white/40">{p.category}</div>
                    <div>
                      <div className="font-serif text-xl text-white">{p.title}</div>
                      <div className="flex items-center gap-2 mt-2 text-white/40 text-sm">
                        <span>View case study</span>
                        <motion.span
                          animate={{ x: 0 }}
                          whileHover={{ x: 4 }}
                          className="group-hover:translate-x-1 transition-transform"
                        >
                          →
                        </motion.span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
