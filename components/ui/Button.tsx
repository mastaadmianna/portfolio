'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import Link from 'next/link'

type ButtonProps = {
  children: React.ReactNode
  variant?: 'primary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  onClick?: () => void
  className?: string
  external?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className,
  external,
  type = 'button',
}: ButtonProps) {
  const baseClasses = cn(
    'relative inline-flex items-center justify-center font-sans font-medium tracking-tight overflow-hidden transition-colors select-none',
    size === 'sm' && 'text-xs px-4 py-2 rounded-full gap-1.5',
    size === 'md' && 'text-sm px-6 py-3 rounded-full gap-2',
    size === 'lg' && 'text-base px-8 py-4 rounded-full gap-2.5',
    variant === 'primary' && 'bg-ink text-cream hover:bg-ink/90',
    variant === 'ghost' && 'bg-transparent text-ink hover:bg-ink/5',
    variant === 'outline' &&
      'bg-transparent border border-ink/20 text-ink hover:border-ink/60 hover:bg-ink/5',
    className
  )

  const content = (
    <motion.span
      className="flex items-center gap-inherit w-full justify-center"
      whileHover={{ x: 0 }}
    >
      {/* Background fill on hover */}
      {variant === 'outline' && (
        <motion.span
          className="absolute inset-0 bg-ink rounded-full origin-left"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: 'left' }}
          aria-hidden
        />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.span>
  )

  if (href) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className="inline-flex"
      >
        <Link
          href={href}
          className={baseClasses}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {content}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={baseClasses}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {content}
    </motion.button>
  )
}
