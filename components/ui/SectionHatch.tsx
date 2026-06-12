'use client'

import { useEffect, useRef } from 'react'

const GRID_SPACING = 72
const LINE_HALF = 18

export default function SectionHatch({ color = 'rgba(255,255,255,0.15)' }: { color?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const angleRef = useRef(45)
  const lastScrollY = useRef(0)
  const rafRef = useRef<number | null>(null)
  const dirtyRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    function resize() {
      if (!canvas) return
      const parent = canvas.parentElement
      if (!parent) return
      canvas.width = parent.offsetWidth
      canvas.height = parent.offsetHeight
      draw()
    }

    function draw() {
      if (!canvas || !ctx) return
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      const angle = (angleRef.current * Math.PI) / 180
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)

      ctx.strokeStyle = color
      ctx.lineWidth = 1
      ctx.lineCap = 'round'

      const offsetX = GRID_SPACING / 2
      const offsetY = GRID_SPACING / 2

      for (let y = offsetY; y < h + GRID_SPACING; y += GRID_SPACING) {
        for (let x = offsetX; x < w + GRID_SPACING; x += GRID_SPACING) {
          ctx.beginPath()
          ctx.moveTo(x - cos * LINE_HALF, y - sin * LINE_HALF)
          ctx.lineTo(x + cos * LINE_HALF, y + sin * LINE_HALF)
          ctx.stroke()
        }
      }
    }

    function onScroll() {
      const currentY = window.scrollY
      const delta = currentY - lastScrollY.current
      lastScrollY.current = currentY
      angleRef.current += delta * 0.16
      dirtyRef.current = true
      scheduleFrame()
    }

    let lastTouchY = 0
    function onTouchStart(e: TouchEvent) {
      lastTouchY = e.touches[0].clientY
    }
    function onTouchMove(e: TouchEvent) {
      const currentTouchY = e.touches[0].clientY
      const delta = lastTouchY - currentTouchY
      lastTouchY = currentTouchY
      angleRef.current += delta * 0.16
      dirtyRef.current = true
      scheduleFrame()
    }

    function scheduleFrame() {
      if (rafRef.current !== null) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null
        if (dirtyRef.current) {
          draw()
          dirtyRef.current = false
        }
      })
    }

    lastScrollY.current = window.scrollY
    resize()

    const ro = new ResizeObserver(resize)
    if (canvas.parentElement) ro.observe(canvas.parentElement)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })

    return () => {
      ro.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [color])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  )
}
