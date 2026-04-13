'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const places = [
  'Tanzania',
  'Zanzibar',
  'Serengeti',
  'Kilimanjaro',
  'Ngorongoro',
]

export default function TypewriterText() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % places.length)
    }, 2800)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="relative inline-block">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-gold-400 italic"
        >
          {places[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
