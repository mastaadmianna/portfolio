'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import type { Project } from '@/data'
import { projects } from '@/data'

// ── Helpers ──────────────────────────────────────────────────────────────────

// Matches the same container as the header: max-w-7xl mx-auto px-6 lg:px-8
function Container({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`max-w-7xl mx-auto px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}

function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <span className="font-mono text-xs text-faint">{number}</span>
      <span className="w-8 h-px bg-border-strong" />
      <span className="text-2xs uppercase tracking-widest text-faint">{label}</span>
    </div>
  )
}

// Subtle placeholder — replace with <img> or real content
function Placeholder({ className = '', label = 'Add image or screenshot here' }: { className?: string; label?: string }) {
  return (
    <div className={`rounded-xl border border-dashed border-border-strong bg-[#F0EDE8] flex items-center justify-center ${className}`}>
      <span className="text-xs uppercase tracking-widest text-faint text-center px-4">[ {label} ]</span>
    </div>
  )
}

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

// ── Component ─────────────────────────────────────────────────────────────────

type Props = { project: Project }

export default function CaseStudyDetail({ project }: Props) {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const currentIdx = projects.findIndex((p) => p.slug === project.slug)
  const next = projects[(currentIdx + 1) % projects.length]

  return (
    <article className="bg-cream text-ink">

      {/* ── 1. HERO ── */}
      <section
        ref={heroRef}
        className="relative h-[100dvh] flex flex-col overflow-hidden border-b border-border"
      >
        {/* Back nav — same horizontal position as "Alex Chen" in header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
          className="relative z-10 pt-20"
        >
          <Container className="flex items-center justify-between">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 text-muted text-sm hover:text-ink transition-colors duration-300 group"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 12H5M5 12l7-7M5 12l7 7" />
              </svg>
              <span className="border-b border-transparent group-hover:border-ink transition-colors duration-300">
                All work
              </span>
            </Link>
            <span className="font-mono text-xs text-faint tracking-widest uppercase">{project.year}</span>
          </Container>
        </motion.div>

        {/* Title + summary — parallax on scroll */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 flex-1 flex flex-col justify-end"
        >
          <Container>
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.42, 0, 0.58, 1] }}
              className="text-2xs uppercase tracking-widest text-muted block mb-5"
            >
              {project.category}
            </motion.span>

            <div className="overflow-hidden mb-5">
              <motion.h1
                className="font-serif text-display text-ink"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {project.title}
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.42, 0, 0.58, 1] }}
              className="font-serif italic text-lg md:text-xl text-muted max-w-2xl mb-12"
            >
              {project.summary}
            </motion.p>
          </Container>
        </motion.div>

        {/* Meta strip */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.42, 0, 0.58, 1] }}
          className="relative z-10 border-t border-border py-6"
        >
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Role', value: project.role },
                { label: 'Duration', value: project.duration },
                { label: 'Company', value: project.company },
                { label: 'Team', value: project.team },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="text-2xs uppercase tracking-widest text-faint mb-1.5">{label}</div>
                  <div className="text-sm text-ink">{value}</div>
                </div>
              ))}
            </div>
          </Container>
        </motion.div>
      </section>

      {/* ── 2. HERO IMAGE ── */}
      <section className="border-b border-border">
        {/*
          Replace this gradient div with your real hero image:
          <img src="/images/your-project/hero.jpg" alt="Project hero" className="w-full aspect-[21/9] object-cover" />
        */}
        <div
          className="w-full"
          style={{ background: project.heroImage, aspectRatio: '21/9' }}
          aria-hidden
        />
      </section>

      {/* ── 3. OVERVIEW ── */}
      <section className="border-b border-border py-20 md:py-28">
        <Container>
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.42, 0, 0.58, 1] }}
          >
            <SectionLabel number="01" label="Overview" />
            <div className="grid md:grid-cols-2 gap-12 md:gap-20">
              <div>
                <p className="font-serif italic text-2xl md:text-3xl text-ink leading-snug">
                  {project.problem}
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-base text-muted leading-relaxed">{project.problemExpanded}</p>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ── 4. GOALS & CONTEXT ── */}
      <section className="border-b border-border py-20 md:py-28">
        <Container>
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: [0.42, 0, 0.58, 1] }}
          >
            <SectionLabel number="02" label="Goals" />
            <div className="grid md:grid-cols-3 gap-10 md:gap-16">
              <div>
                <div className="text-2xs uppercase tracking-widest text-faint mb-5">Business</div>
                <ul className="space-y-3">
                  {project.goals.filter((g) => g.type === 'business').map((g, i) => (
                    <li key={i} className="flex gap-3 text-sm text-muted leading-relaxed">
                      <span className="text-border-strong shrink-0">—</span>
                      {g.text}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-2xs uppercase tracking-widest text-faint mb-5">User</div>
                <ul className="space-y-3">
                  {project.goals.filter((g) => g.type === 'user').map((g, i) => (
                    <li key={i} className="flex gap-3 text-sm text-muted leading-relaxed">
                      <span className="text-border-strong shrink-0">—</span>
                      {g.text}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-2xs uppercase tracking-widest text-faint mb-5">Key targets</div>
                <ul className="space-y-3">
                  {project.metrics.map((m, i) => (
                    <li key={i} className="text-sm text-muted leading-relaxed">
                      <span className="font-medium text-ink">{m.value}</span>
                      <span className="text-faint"> — </span>
                      {m.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ── 5. PROCESS ── */}
      <section className="border-b border-border py-20 md:py-28">
        <Container>
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: [0.42, 0, 0.58, 1] }}
            className="mb-12"
          >
            <SectionLabel number="03" label="Process" />
            <h2 className="font-serif text-3xl md:text-4xl text-ink">How we got there</h2>
          </motion.div>
          <div className="divide-y divide-border">
            {project.processSteps.map((step, i) => (
              <motion.div
                key={i}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.42, 0, 0.58, 1] }}
                className="py-8 grid md:grid-cols-[220px_1fr] gap-6"
              >
                <div className="text-2xs uppercase tracking-widest text-muted">{step.phase}</div>
                <p className="text-sm text-muted leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 6. RESEARCH ── */}
      <section className="border-b border-border py-20 md:py-28">
        <Container>
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: [0.42, 0, 0.58, 1] }}
            className="mb-12"
          >
            <SectionLabel number="04" label="Research" />
            <h2 className="font-serif text-3xl md:text-4xl text-ink">Key insights</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-px bg-border">
            {project.researchInsights.map((insight, i) => (
              <motion.div
                key={i}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.42, 0, 0.58, 1] }}
                className="bg-cream p-8 md:p-10"
              >
                <div className="text-2xl text-faint mb-5" aria-hidden>{insight.icon}</div>
                <h3 className="font-serif text-xl text-ink mb-3 leading-snug">{insight.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{insight.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 7. DESIGN / FEATURES ── */}
      <section className="border-b border-border py-20 md:py-28">
        <Container>
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: [0.42, 0, 0.58, 1] }}
            className="mb-16"
          >
            <SectionLabel number="05" label="Design" />
            <h2 className="font-serif text-3xl md:text-4xl text-ink">What we built</h2>
          </motion.div>

          {/* Alternating image + text rows */}
          <div className="space-y-20 md:space-y-28">
            {project.features.map((feat, i) => (
              <motion.div
                key={i}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, ease: [0.42, 0, 0.58, 1] }}
                className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${
                  i % 2 === 1 ? 'md:[&>*:first-child]:order-last' : ''
                }`}
              >
                {/* Image placeholder — replace with your screenshot */}
                <Placeholder className="aspect-[4/3]" label="Add screenshot or mockup" />

                {/* Text */}
                <div>
                  <span className="font-mono text-xs text-faint block mb-4">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl text-ink mb-4 leading-tight">
                    {feat.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted leading-relaxed">{feat.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 8. IMPACT ── */}
      <section className="border-b border-border py-20 md:py-28">
        <Container>
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: [0.42, 0, 0.58, 1] }}
            className="mb-14"
          >
            <SectionLabel number="06" label="Impact" />
            <h2 className="font-serif text-3xl md:text-4xl text-ink">Results</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
            {project.impact.map((item, i) => (
              <motion.div
                key={i}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.42, 0, 0.58, 1] }}
                className="bg-cream p-8 md:p-10"
              >
                <div className="font-serif text-4xl md:text-5xl text-ink mb-3 leading-none tracking-tight">
                  {item.value}
                </div>
                <div className="text-sm font-medium text-ink mb-1">{item.metric}</div>
                <div className="text-xs text-faint">{item.change}</div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 9. LEARNINGS ── */}
      <section className="border-b border-border py-20 md:py-28">
        <Container>
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: [0.42, 0, 0.58, 1] }}
            className="mb-12"
          >
            <SectionLabel number="07" label="Reflection" />
            <h2 className="font-serif text-3xl md:text-4xl text-ink">Learnings</h2>
          </motion.div>
          <div className="max-w-3xl space-y-10">
            {project.learnings.map((learning, i) => (
              <motion.div
                key={i}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.42, 0, 0.58, 1] }}
                className="flex gap-8"
              >
                <span className="font-mono text-xs text-faint pt-1 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-base text-muted leading-relaxed">{learning}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 10. NEXT PROJECT ── */}
      <section className="py-20 md:py-28">
        <Container>
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.42, 0, 0.58, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-10 border-t border-border pt-16"
          >
            <div>
              <span className="text-2xs uppercase tracking-widest text-faint block mb-6">
                Next project
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-ink leading-tight">{next.title}</h2>
              <p className="text-sm text-muted mt-4 max-w-sm leading-relaxed">{next.summary}</p>
            </div>
            <Link
              href={`/work/${next.slug}`}
              className="inline-flex items-center gap-3 text-ink group shrink-0 self-start md:self-auto"
            >
              <span className="text-sm border-b border-ink/20 group-hover:border-ink transition-colors duration-300 pb-px">
                View case study
              </span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M17 7l-10 10M17 7H7M17 7v10" />
              </svg>
            </Link>
          </motion.div>
        </Container>
      </section>

    </article>
  )
}
