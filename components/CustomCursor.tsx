'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    // Only enable on devices with a real pointer (no touch-primary)
    if (window.matchMedia('(pointer: fine)').matches) {
      setIsDesktop(true)
    }
  }, [])

  useEffect(() => {
    if (!isDesktop) return

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      setIsHovering(
        !!target.closest('a, button, [role="button"], input, select, textarea, label, [data-cursor-hover]')
      )
    }
    const onLeave = () => setIsVisible(false)
    const onEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
    }
  }, [isDesktop, isVisible])

  if (!isDesktop) return null

  return (
    <>
      {/* Outer ring — lags behind for a trailing feel */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-gold-400"
        style={{ width: 36, height: 36, marginLeft: -18, marginTop: -18 }}
        animate={{
          x: pos.x,
          y: pos.y,
          scale: isHovering ? 1.6 : 1,
          opacity: isVisible ? (isHovering ? 0.6 : 0.35) : 0,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 22, mass: 0.6 }}
      />
      {/* Inner dot — snaps instantly */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-gold-400"
        style={{ width: 8, height: 8, marginLeft: -4, marginTop: -4 }}
        animate={{
          x: pos.x,
          y: pos.y,
          scale: isHovering ? 0 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 35, mass: 0.3 }}
      />
    </>
  )
}
