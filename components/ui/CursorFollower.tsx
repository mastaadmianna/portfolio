'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const rawX = useMotionValue(-100)
  const rawY = useMotionValue(-100)

  const smoothX = useSpring(rawX, { stiffness: 300, damping: 28, mass: 0.5 })
  const smoothY = useSpring(rawY, { stiffness: 300, damping: 28, mass: 0.5 })

  const dotX = useSpring(rawX, { stiffness: 800, damping: 35 })
  const dotY = useSpring(rawY, { stiffness: 800, damping: 35 })

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
    if (isTouchDevice) return

    const handleMove = (e: MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleLeave = () => setIsVisible(false)
    const handleEnter = () => setIsVisible(true)

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as Element
      if (
        target.matches('a, button, [data-cursor="hover"], input, textarea, select, label')
      ) {
        setIsHovering(true)
      }
    }

    const handleHoverEnd = (e: MouseEvent) => {
      const target = e.target as Element
      if (
        target.matches('a, button, [data-cursor="hover"], input, textarea, select, label')
      ) {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseleave', handleLeave)
    document.addEventListener('mouseenter', handleEnter)
    document.addEventListener('mouseover', handleHoverStart)
    document.addEventListener('mouseout', handleHoverEnd)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseleave', handleLeave)
      document.removeEventListener('mouseenter', handleEnter)
      document.removeEventListener('mouseover', handleHoverStart)
      document.removeEventListener('mouseout', handleHoverEnd)
    }
  }, [rawX, rawY, isVisible])

  return (
    <>
      {/* Outer ring */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
        }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="w-full h-full rounded-full border border-white"
          style={{ opacity: 0.7 }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-white" />
      </motion.div>
    </>
  )
}
