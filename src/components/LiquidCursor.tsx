'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function LiquidCursor() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring configurations for different layers to create the "drag" effect
  const springConfig1 = { damping: 25, stiffness: 700 }
  const springConfig2 = { damping: 35, stiffness: 500 }
  const springConfig3 = { damping: 45, stiffness: 300 }
  const springConfig4 = { damping: 55, stiffness: 200 }

  const x1 = useSpring(mouseX, springConfig1)
  const y1 = useSpring(mouseY, springConfig1)

  const x2 = useSpring(mouseX, springConfig2)
  const y2 = useSpring(mouseY, springConfig2)

  const x3 = useSpring(mouseX, springConfig3)
  const y3 = useSpring(mouseY, springConfig3)

  const x4 = useSpring(mouseX, springConfig4)
  const y4 = useSpring(mouseY, springConfig4)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  // Helper for duplicate styles
  const blobStyle = "absolute top-0 left-0 w-24 h-24 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-60 mix-blend-screen"

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* SVG Filter for the Gooey Effect */}
      <svg className="hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* The Liquid/Gooey Container */}
      <div
        style={{ filter: 'url(#goo)' }}
        className="w-full h-full relative"
      >
        {/* Layer 1: Core (Brightest) */}
        <motion.div
          style={{ x: x1, y: y1 }}
          className={`${blobStyle} bg-primary-400 w-16 h-16`}
        />

        {/* Layer 2: Fast Follower */}
        <motion.div
          style={{ x: x2, y: y2 }}
          className={`${blobStyle} bg-accent-400 w-20 h-20 opacity-50`}
        />

        {/* Layer 3: Slow Follower */}
        <motion.div
          style={{ x: x3, y: y3 }}
          className={`${blobStyle} bg-purple-400 w-24 h-24 opacity-40`}
        />

        {/* Layer 4: Drag Tail (Largest) */}
        <motion.div
          style={{ x: x4, y: y4 }}
          className={`${blobStyle} bg-indigo-400 w-28 h-28 opacity-30`}
        />
      </div>
    </div>
  )
}
