'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

interface Ripple {
  id: number
  x: number
  y: number
}

export default function LiquidCursor() {
  const dotRef = useRef<HTMLDivElement>(null)

  // 2 springs total (vs 8 in previous version — 4 springs × 2 axes)
  const mouseX = useMotionValue(-300)
  const mouseY = useMotionValue(-300)
  const ringX = useSpring(mouseX, { damping: 22, stiffness: 320, mass: 0.6 })
  const ringY = useSpring(mouseY, { damping: 22, stiffness: 320, mass: 0.6 })

  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [ripples, setRipples] = useState<Ripple[]>([])
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Only activate on fine-pointer devices (not touchscreens)
    if (!window.matchMedia('(pointer: fine)').matches) return

    setVisible(true)

    // Inject a global style to hide the native cursor everywhere
    const style = document.createElement('style')
    style.id = 'aurora-cursor-hide'
    style.textContent = '*, *::before, *::after { cursor: none !important; }'
    document.head.appendChild(style)

    const onMove = (e: MouseEvent) => {
      // Dot uses direct DOM — absolutely zero React overhead, zero lag
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
      }
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, [role="button"], input, select, textarea, label')) {
        setIsHovering(true)
      }
    }

    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, [role="button"], input, select, textarea, label')) {
        setIsHovering(false)
      }
    }

    const onDown = (e: MouseEvent) => {
      setIsClicking(true)
      const id = performance.now()
      setRipples(prev => [...prev, { id, x: e.clientX, y: e.clientY }])
      setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 700)
    }

    const onUp = () => setIsClicking(false)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    return () => {
      document.getElementById('aurora-cursor-hide')?.remove()
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [mouseX, mouseY])

  if (!visible) return null

  const ringSize = isClicking ? 20 : isHovering ? 60 : 40
  const haloSize = isHovering ? 110 : 72

  return (
    <div className="fixed inset-0 pointer-events-none z-[9990]" aria-hidden="true">

      {/* ── 1. PRECISION DOT ─────────────────────────────────────────────────
          Direct DOM update on every mousemove — no spring, no lag.
          Feels like a laser pointer. */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 7,
          height: 7,
          borderRadius: '50%',
          background: '#ffffff',
          boxShadow:
            '0 0 0 1.5px rgba(56,189,248,0.5), 0 0 10px 2px rgba(56,189,248,0.55)',
          willChange: 'transform',
          zIndex: 9999,
        }}
      />

      {/* ── 2. SPINNING AURORA RING ──────────────────────────────────────────
          Conic gradient masked into a ring so it looks like a coloured border.
          Rotation is driven by a plain CSS animation (no framer jitter on
          size-change re-renders). Position follows the shared spring. */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform',
          zIndex: 9997,
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: isHovering ? 1 : 0.55,
        }}
        transition={{
          width: { type: 'spring', stiffness: 380, damping: 26 },
          height: { type: 'spring', stiffness: 380, damping: 26 },
          opacity: { duration: 0.18 },
        }}
      >
        <div
          className="aurora-ring-spin"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background:
              'conic-gradient(from 0deg, #38bdf8, #818cf8, #e879f9, #fb923c, #facc15, #34d399, #38bdf8)',
            WebkitMask:
              'radial-gradient(farthest-side, transparent calc(100% - 2.5px), black calc(100% - 2.5px))',
            mask: 'radial-gradient(farthest-side, transparent calc(100% - 2.5px), black calc(100% - 2.5px))',
          }}
        />
      </motion.div>

      {/* ── 3. AMBIENT GLOW HALO ─────────────────────────────────────────────
          Soft radial gradient orb behind the ring. Breathes on hover. */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(56,189,248,0.18) 0%, rgba(168,85,247,0.10) 50%, transparent 78%)',
          willChange: 'transform',
          zIndex: 9996,
        }}
        animate={{
          width: haloSize,
          height: haloSize,
          opacity: isClicking ? 0.25 : 0.85,
        }}
        transition={{
          width: { type: 'spring', stiffness: 200, damping: 22 },
          height: { type: 'spring', stiffness: 200, damping: 22 },
          opacity: { duration: 0.15 },
        }}
      />

      {/* ── 4. CLICK RIPPLES ─────────────────────────────────────────────────
          Each click spawns a ring that expands and fades out. */}
      <AnimatePresence>
        {ripples.map(r => (
          <motion.div
            key={r.id}
            style={{
              position: 'fixed',
              top: r.y,
              left: r.x,
              translateX: '-50%',
              translateY: '-50%',
              borderRadius: '50%',
              border: '1.5px solid rgba(56,189,248,0.65)',
              zIndex: 9994,
            }}
            initial={{ width: 8, height: 8, opacity: 0.9 }}
            animate={{ width: 88, height: 88, opacity: 0 }}
            exit={{}}
            transition={{ duration: 0.6, ease: [0.15, 0.85, 0.4, 1] }}
          />
        ))}
      </AnimatePresence>

    </div>
  )
}
