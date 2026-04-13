'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { FiArrowDown } from 'react-icons/fi'
import TypewriterText from './TypewriterText'
import FloatingOrbs from './FloatingOrbs'
import type { HomepageContent } from '@/lib/types'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.4,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
  },
}

interface HeroProps {
  content: HomepageContent
}

export default function Hero({ content }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])

  const heroImageSrc = content.heroImage?.imageUrl || '/home1.jpeg'
  const stats = content.stats ?? [
    { display: 50, suffix: 'K+', label: 'Followers' },
    { display: 120, suffix: '+', label: 'Destinations' },
    { display: 30, suffix: '+', label: 'Brand Partners' },
  ]

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[700px] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Parallax Background Image ── */}
      <motion.div
        className="absolute inset-0 z-0 scale-110"
        style={{ y: imageY }}
      >
        <Image
          src={heroImageSrc}
          alt="Tanzania — Hidden Gems by Mary Minza Lucas"
          fill
          priority
          className="object-cover object-center"
          quality={90}
          sizes="100vw"
        />
        {/* Gradient overlay — left fade so image stays vivid on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-earth-900/90 via-earth-900/50 to-earth-900/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-earth-900/30 via-transparent to-earth-900/60" />
      </motion.div>

      {/* ── Floating Orbs ── */}
      <FloatingOrbs />

      {/* ── Main Content ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10"
      >
        {/* Eyebrow */}
        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
          <motion.div
            variants={lineVariants}
            style={{ originX: 0 }}
            className="h-px w-12 bg-gold-400"
          />
          <span className="text-gold-400 uppercase tracking-luxury text-xs font-semibold">
            {content.heroEyebrow ?? 'Dar es Salaam, Tanzania'}
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-cream-100 leading-none mb-2"
        >
          Mary Minza
        </motion.h1>
        <motion.h1
          variants={itemVariants}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gold-400 leading-none mb-10 italic"
        >
          Lucas
        </motion.h1>

        {/* Taglines */}
        <motion.p
          variants={itemVariants}
          className="text-cream-100/85 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-xl mb-3"
        >
          {content.heroTagline1 ?? 'Affordable Adventures. Authentic Stories.'}
        </motion.p>
        <motion.p
          variants={itemVariants}
          className="text-cream-100/85 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-xl mb-14"
        >
          Hidden <TypewriterText /> {content.heroTagline2 ?? 'Revealed.'}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-start gap-4"
        >
          <Link href="/blog" className="btn-primary min-w-[180px]">
            Explore Blog
          </Link>
          <Link href="/packages" className="btn-outline-light min-w-[180px]">
            View Packages
          </Link>
          <Link href="/contact" className="btn-gold-outline min-w-[180px]">
            Work With Me
          </Link>
        </motion.div>
      </motion.div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-28 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-cream-100/50"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll to Explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <FiArrowDown size={18} />
        </motion.div>
      </motion.div>

      {/* ── Stats strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-0 left-0 right-0 z-10"
      >
        <div className="bg-earth-900/60 backdrop-blur-md border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className={`grid grid-cols-${stats.length} divide-x divide-white/10 py-5`}>
              {stats.map((stat) => (
                <div key={stat.label} className="text-center px-4">
                  <div className="font-serif text-gold-400 font-bold text-xl">
                    {stat.display}{stat.suffix}
                  </div>
                  <div className="text-cream-100/50 text-[10px] uppercase tracking-widest mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
