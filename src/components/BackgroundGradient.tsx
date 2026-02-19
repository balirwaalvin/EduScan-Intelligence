'use client'

import { motion } from 'framer-motion'

export default function BackgroundGradient() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden bg-slate-50">
      {/* Base Gradient Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 opacity-80" />

      {/* Aurora Layer 1 - Primary */}
      <motion.div
        initial={{ scale: 1, rotate: 0, x: 0, y: 0 }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 180, 270, 360],
          x: [0, 100, -100, 0],
          y: [0, -100, 100, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-gradient-to-r from-primary-300/30 to-indigo-300/30 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 will-change-transform"
      />

      {/* Aurora Layer 2 - Accent */}
      <motion.div
        initial={{ scale: 1, rotate: 0, x: 0, y: 0 }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 180, 270, 360],
          x: [0, 100, -100, 0],
          y: [0, -100, 100, 0],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        className="absolute top-[20%] -right-[10%] w-[60vw] h-[60vw] bg-gradient-to-l from-accent-300/30 to-purple-300/30 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 will-change-transform"
      />

      {/* Aurora Layer 3 - Purple Bottom */}
      <motion.div
        initial={{ scale: 1, rotate: 0, x: 0, y: 0 }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 180, 270, 360],
          x: [0, 100, -100, 0],
          y: [0, -100, 100, 0],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        className="absolute -bottom-[20%] left-[20%] w-[80vw] h-[80vw] bg-gradient-to-t from-purple-300/30 to-blue-300/30 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 will-change-transform"
      />

      {/* Center Subtle Pulse */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] bg-gradient-radial from-slate-100/50 to-transparent rounded-full filter blur-[60px]"
      />
    </div>
  )
}
