'use client'

import { motion } from 'framer-motion'

export default function AnimatedBubbles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Large Bubbles */}
      <motion.div
        className="absolute w-64 h-64 bg-gradient-to-br from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl"
        style={{ top: '10%', left: '5%' }}
        animate={{
          y: [0, -50, 0],
          x: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-80 h-80 bg-gradient-to-br from-purple-200/25 to-pink-200/25 rounded-full blur-3xl"
        style={{ top: '30%', right: '10%' }}
        animate={{
          y: [0, 60, 0],
          x: [0, -40, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="absolute w-72 h-72 bg-gradient-to-br from-indigo-200/30 to-blue-300/30 rounded-full blur-3xl"
        style={{ bottom: '15%', left: '20%' }}
        animate={{
          y: [0, -40, 0],
          x: [0, 50, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      {/* Medium Bubbles */}
      <motion.div
        className="absolute w-48 h-48 bg-gradient-to-br from-cyan-200/35 to-blue-200/35 rounded-full blur-2xl"
        style={{ top: '50%', left: '50%' }}
        animate={{
          y: [0, 45, 0],
          x: [0, -30, 0],
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        className="absolute w-56 h-56 bg-gradient-to-br from-purple-200/30 to-indigo-200/30 rounded-full blur-2xl"
        style={{ top: '70%', right: '25%' }}
        animate={{
          y: [0, -55, 0],
          x: [0, 25, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 17,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />

      {/* Small Bubbles */}
      <motion.div
        className="absolute w-32 h-32 bg-gradient-to-br from-pink-200/40 to-purple-200/40 rounded-full blur-xl"
        style={{ top: '20%', right: '30%' }}
        animate={{
          y: [0, -35, 0],
          x: [0, 20, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.5,
        }}
      />

      <motion.div
        className="absolute w-40 h-40 bg-gradient-to-br from-blue-200/35 to-indigo-200/35 rounded-full blur-xl"
        style={{ bottom: '25%', right: '15%' }}
        animate={{
          y: [0, 40, 0],
          x: [0, -25, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
      />

      <motion.div
        className="absolute w-36 h-36 bg-gradient-to-br from-cyan-200/40 to-blue-200/40 rounded-full blur-xl"
        style={{ top: '60%', left: '15%' }}
        animate={{
          y: [0, -30, 0],
          x: [0, 35, 0],
          scale: [1, 1.18, 1],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.8,
        }}
      />

      {/* Extra Small Decorative Bubbles */}
      <motion.div
        className="absolute w-24 h-24 bg-gradient-to-br from-indigo-200/45 to-purple-200/45 rounded-full blur-lg"
        style={{ top: '40%', left: '10%' }}
        animate={{
          y: [0, -20, 0],
          x: [0, 15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      <motion.div
        className="absolute w-28 h-28 bg-gradient-to-br from-pink-200/35 to-purple-300/35 rounded-full blur-lg"
        style={{ bottom: '35%', left: '40%' }}
        animate={{
          y: [0, 25, 0],
          x: [0, -20, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.2,
        }}
      />
    </div>
  )
}
