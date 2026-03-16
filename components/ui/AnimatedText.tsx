'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
  delay?: number
  mode?: 'words' | 'chars' | 'lines'
  once?: boolean
}

export default function AnimatedText({
  text,
  className,
  as: Tag = 'div',
  delay = 0,
  mode = 'words',
  once = true,
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once, margin: '-10% 0px' })

  if (mode === 'words') {
    const words = text.split(' ')
    return (
      <Tag
        ref={ref as React.RefObject<HTMLDivElement & HTMLHeadingElement & HTMLParagraphElement>}
        className={cn('flex flex-wrap', className)}
        aria-label={text}
      >
        {words.map((word, i) => (
          <span key={i} className="overflow-hidden inline-block mr-[0.25em] last:mr-0">
            <motion.span
              className="inline-block"
              initial={{ y: '110%', opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: '110%', opacity: 0 }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
                delay: delay + i * 0.05,
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </Tag>
    )
  }

  if (mode === 'chars') {
    const chars = text.split('')
    return (
      <Tag
        ref={ref as React.RefObject<HTMLDivElement & HTMLHeadingElement & HTMLParagraphElement>}
        className={cn('flex flex-wrap', className)}
        aria-label={text}
      >
        {chars.map((char, i) => (
          <span key={i} className="overflow-hidden inline-block">
            <motion.span
              className="inline-block"
              initial={{ y: '110%', opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: '110%', opacity: 0 }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: delay + i * 0.02,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          </span>
        ))}
      </Tag>
    )
  }

  // Lines mode
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="overflow-hidden">
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
          delay,
        }}
      >
        <Tag
          className={className}
          ref={ref as React.RefObject<HTMLDivElement & HTMLHeadingElement & HTMLParagraphElement>}
        >
          {text}
        </Tag>
      </motion.div>
    </div>
  )
}
