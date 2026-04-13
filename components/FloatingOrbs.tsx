'use client'
import { motion } from 'framer-motion'

const orbs = [
  {
    size: 380,
    top: '5%',
    left: '-8%',
    color: 'rgba(212,84,126,0.10)',
    duration: 9,
    delay: 0,
    dx: 22,
    dy: -28,
  },
  {
    size: 280,
    top: '50%',
    right: '-6%',
    color: 'rgba(107,48,85,0.14)',
    duration: 12,
    delay: 1.5,
    dx: -18,
    dy: 22,
  },
  {
    size: 200,
    top: '28%',
    left: '58%',
    color: 'rgba(212,84,126,0.07)',
    duration: 14,
    delay: 3,
    dx: 12,
    dy: -16,
  },
  {
    size: 140,
    bottom: '18%',
    left: '22%',
    color: 'rgba(160,78,142,0.10)',
    duration: 8,
    delay: 2,
    dx: -14,
    dy: 20,
  },
]

export default function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>
      {orbs.map((orb, i) => {
        const { size, color, duration, delay, dx, dy, ...pos } = orb
        return (
          <motion.div
            key={i}
            className="absolute rounded-full blur-[80px]"
            style={{ width: size, height: size, background: color, ...pos }}
            animate={{ x: [0, dx, 0], y: [0, dy, 0], scale: [1, 1.12, 1] }}
            transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        )
      })}
    </div>
  )
}
