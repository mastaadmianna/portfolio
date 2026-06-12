'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { MotionVideo } from '@/data'

// ─── Light editorial SVG thumbnails ────────────────────────────────────────

function DashboardThumb() {
  return (
    <svg viewBox="0 0 400 225" className="absolute inset-0 w-full h-full" aria-hidden>
      {/* Fine horizontal grid */}
      {Array.from({ length: 14 }).map((_, i) => (
        <line key={i} x1="0" y1={16 + i * 16} x2="400" y2={16 + i * 16}
          stroke="#C8D4DE" strokeWidth="0.5" />
      ))}
      {/* Simulated bar chart */}
      {[32, 56, 44, 68, 52, 76, 60].map((h, i) => (
        <rect key={i} x={44 + i * 28} y={160 - h} width="16" height={h}
          fill="#D4DDE8" rx="2" />
      ))}
      {/* Watermark number */}
      <text x="385" y="215" fontFamily="Georgia, serif" fontSize="120" fill="#DCE6EE"
        textAnchor="end" dominantBaseline="auto">01</text>
      {/* Top accent */}
      <rect x="32" y="24" width="36" height="1.5" fill="#9AAABB" />
    </svg>
  )
}

function OnboardingThumb() {
  return (
    <svg viewBox="0 0 400 225" className="absolute inset-0 w-full h-full" aria-hidden>
      {/* Concentric rings from center */}
      {[30, 60, 92, 128, 168, 212].map((r, i) => (
        <circle key={i} cx="200" cy="113" r={r} fill="none" stroke="#D8CEBC"
          strokeWidth="0.7" />
      ))}
      {/* Small center dot */}
      <circle cx="200" cy="113" r="4" fill="#C8BC9E" />
      {/* Watermark letter */}
      <text x="30" y="210" fontFamily="Georgia, serif" fontSize="130" fill="#EAE4D4"
        textAnchor="start" dominantBaseline="auto">O</text>
    </svg>
  )
}

function MicroThumb() {
  return (
    <svg viewBox="0 0 400 225" className="absolute inset-0 w-full h-full" aria-hidden>
      {/* Dot grid */}
      {Array.from({ length: 8 }).map((_, row) =>
        Array.from({ length: 14 }).map((_, col) => (
          <circle key={`${row}-${col}`} cx={28 + col * 26} cy={20 + row * 26}
            r="1.8" fill="#B8CCBA" />
        ))
      )}
      {/* Larger accent circle */}
      <circle cx="200" cy="113" r="44" fill="none" stroke="#B0C4B2" strokeWidth="1.2" />
      <circle cx="200" cy="113" r="22" fill="none" stroke="#B0C4B2" strokeWidth="0.8" />
      {/* Watermark */}
      <text x="370" y="210" fontFamily="Georgia, serif" fontSize="130" fill="#D8EAD8"
        textAnchor="end" dominantBaseline="auto">M</text>
    </svg>
  )
}

function BrandThumb() {
  return (
    <svg viewBox="0 0 400 225" className="absolute inset-0 w-full h-full" aria-hidden>
      {/* Diagonal stripes */}
      {Array.from({ length: 18 }).map((_, i) => (
        <line key={i}
          x1={i * 44 - 120} y1="0"
          x2={i * 44 + 120} y2="225"
          stroke="#D8C8C4" strokeWidth="0.6" />
      ))}
      {/* Vertical rule */}
      <line x1="32" y1="20" x2="32" y2="80" stroke="#C4A8A2" strokeWidth="1.5" />
      {/* Big serif B */}
      <text x="370" y="210" fontFamily="Georgia, serif" fontSize="150" fill="#EDE4E0"
        textAnchor="end" dominantBaseline="auto">B</text>
    </svg>
  )
}

function DataVizThumb() {
  return (
    <svg viewBox="0 0 400 225" className="absolute inset-0 w-full h-full" aria-hidden>
      {/* Line chart path */}
      <polyline points="32,170 88,130 144,148 200,96 256,112 312,72 368,88"
        fill="none" stroke="#C4C0D8" strokeWidth="1.2" />
      <polyline points="32,188 88,160 144,172 200,130 256,142 312,108 368,118"
        fill="none" stroke="#C4C0D8" strokeWidth="0.7" />
      {/* Data points */}
      {[[88,130],[200,96],[312,72]].map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill="#B8B4CC" />
      ))}
      {/* Y-axis ticks */}
      {[60, 90, 120, 150, 180].map((y, i) => (
        <line key={i} x1="28" y1={y} x2="36" y2={y} stroke="#C4C0D8" strokeWidth="1" />
      ))}
      <text x="370" y="210" fontFamily="Georgia, serif" fontSize="130" fill="#DCDAF0"
        textAnchor="end" dominantBaseline="auto">D</text>
    </svg>
  )
}

function MobileThumb() {
  return (
    <svg viewBox="0 0 400 225" className="absolute inset-0 w-full h-full" aria-hidden>
      {/* Phone outline */}
      <rect x="152" y="18" width="96" height="168" rx="14" fill="none" stroke="#B8CCD8"
        strokeWidth="1.5" />
      {/* Screen area */}
      <rect x="162" y="36" width="76" height="132" rx="4" fill="none" stroke="#C4D4DE"
        strokeWidth="0.8" />
      {/* Home indicator */}
      <rect x="188" y="174" width="24" height="3" rx="1.5" fill="#B8CCD8" />
      {/* Status bar dots */}
      <circle cx="192" cy="26" r="2" fill="#B8CCD8" />
      {/* Fine horizontal rules flanking phone */}
      {Array.from({ length: 10 }).map((_, i) => (
        <line key={i} x1="0" y1={28 + i * 18} x2="140" y2={28 + i * 18}
          stroke="#C8D8E4" strokeWidth="0.4" />
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <line key={i} x1="260" y1={28 + i * 18} x2="400" y2={28 + i * 18}
          stroke="#C8D8E4" strokeWidth="0.4" />
      ))}
      <text x="30" y="210" fontFamily="Georgia, serif" fontSize="80" fill="#D8E8F0"
        textAnchor="start" dominantBaseline="auto">Nav</text>
    </svg>
  )
}

const THUMBNAILS: Record<string, { bg: string; Graphic: () => JSX.Element }> = {
  'motion-01': { bg: '#EDF1F5', Graphic: DashboardThumb },
  'motion-02': { bg: '#F5F1E8', Graphic: OnboardingThumb },
  'motion-03': { bg: '#EDF5EE', Graphic: MicroThumb },
  'motion-04': { bg: '#F5EEEC', Graphic: BrandThumb },
  'motion-05': { bg: '#EEEDF5', Graphic: DataVizThumb },
  'motion-06': { bg: '#ECF3F7', Graphic: MobileThumb },
}

// ─── Component ──────────────────────────────────────────────────────────────

type Props = {
  video: MotionVideo
  flush?: boolean
}

export default function VideoCard({ video, flush = false }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const thumb = THUMBNAILS[video.id] ?? { bg: '#F0EEE8', Graphic: DashboardThumb }

  return (
    <>
      <motion.div
        className="group relative aspect-video overflow-hidden cursor-pointer"
        style={{ borderRadius: flush ? 0 : '1rem' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsOpen(true)}
        whileHover={flush ? {} : { y: -4, boxShadow: '0 12px 32px rgba(10,10,10,0.12), 0 2px 8px rgba(10,10,10,0.06)' }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        data-cursor="hover"
      >
        {/* Fully opaque background — blocks canvas hatch */}
        <div className="absolute inset-0" style={{ background: thumb.bg, opacity: 1 }} />

        {/* SVG pattern graphic */}
        <thumb.Graphic />

        {/* Play button — dark tones for light background */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0.7 }}
          animate={{ opacity: isHovered ? 1 : 0.7 }}
        >
          <motion.div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(10,10,10,0.07)',
              border: '1px solid rgba(10,10,10,0.10)',
              backdropFilter: 'blur(4px)',
            }}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <svg
              className="w-5 h-5 ml-0.5"
              style={{ color: 'rgba(10,10,10,0.55)' }}
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Duration badge */}
        <div className="absolute top-3 right-3 text-2xs font-mono bg-white/60 backdrop-blur-sm px-2 py-0.5 rounded-full"
          style={{ color: 'rgba(10,10,10,0.45)' }}>
          {video.duration}
        </div>

        {/* Category label (always visible, hides on hover) */}
        <motion.div
          className="absolute top-3 left-3 text-2xs uppercase tracking-widest"
          style={{ color: 'rgba(10,10,10,0.35)' }}
          animate={{ opacity: isHovered ? 0 : 1 }}
        >
          {video.category}
        </motion.div>

        {/* Info overlay on hover — dark gradient from bottom, fully readable */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end p-5"
          style={{
            background: 'linear-gradient(to top, rgba(10,10,10,0.72) 0%, rgba(10,10,10,0.18) 55%, transparent 100%)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-2xs uppercase tracking-widest text-white/50 mb-1">
            {video.category}
          </div>
          <div className="text-white font-serif text-lg leading-tight">{video.title}</div>
          <p className="text-white/60 text-xs mt-1 line-clamp-2">{video.description}</p>
        </motion.div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-ink/90 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal */}
            <motion.div
              className="relative w-full max-w-4xl"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors text-sm flex items-center gap-2"
                data-cursor="hover"
              >
                <span>Close</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Video placeholder */}
              <div className="aspect-video rounded-2xl overflow-hidden relative"
                style={{ background: thumb.bg }}>
                <thumb.Graphic />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
                  <div className="text-2xs uppercase tracking-widest"
                    style={{ color: 'rgba(10,10,10,0.35)' }}>
                    {video.title}
                  </div>
                  <p className="text-xs max-w-xs text-center"
                    style={{ color: 'rgba(10,10,10,0.25)' }}>
                    Replace with an actual video embed
                  </p>
                </div>
              </div>

              {/* Video info */}
              <div className="mt-4 flex items-start justify-between">
                <div>
                  <div className="text-white font-serif text-xl">{video.title}</div>
                  <div className="text-white/40 text-sm mt-1">{video.description}</div>
                </div>
                <div className="text-white/30 text-xs uppercase tracking-widest mt-1">
                  {video.category}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
