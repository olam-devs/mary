'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiCompass } from 'react-icons/fi'
import type { HomepageContent } from '@/lib/types'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

interface HeroProps {
  content: HomepageContent
}

export default function Hero({ content }: HeroProps) {
  const heroImageSrc = content.heroImage?.imageUrl || '/home1.jpeg'
  const widget = content.heroWidget ?? {}

  return (
    <section className="relative w-full px-4 pt-24 pb-6 sm:px-6 md:px-10 lg:px-16">
      <div className="relative flex min-h-[560px] sm:min-h-[640px] flex-col items-center justify-center overflow-hidden rounded-2xl p-6 sm:p-10 text-center">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImageSrc}
            alt="Minzah Safaris — Tanzania wilderness"
            fill
            priority
            className="object-cover object-center"
            quality={90}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-earth-900/20 via-earth-900/50 to-earth-900/90" />
        </div>

        {/* Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-3xl flex flex-col items-center gap-6"
        >
          <motion.span
            variants={itemVariants}
            className="inline-flex items-center gap-2 self-center rounded-full border border-gold-400/30 bg-gold-400/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold-300 backdrop-blur-md"
          >
            <FiCompass size={13} />
            {content.heroBadge ?? 'The Ultimate Wilderness Experience'}
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="font-serif text-4xl font-extrabold leading-tight tracking-tight text-cream-100 sm:text-5xl md:text-6xl"
          >
            {content.heroHeadline ?? 'Experience the Untamed Wild in Absolute Luxury'}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mx-auto max-w-2xl text-base font-medium text-cream-100/90 sm:text-lg md:text-xl"
          >
            {content.heroTagline1 ??
              'Bespoke safari adventures across Tanzania led by world-class guides and conservationists.'}
          </motion.p>

          {/* Quick-info widget */}
          <motion.div
            variants={itemVariants}
            className="mt-6 w-full max-w-4xl rounded-2xl border border-cream-100/20 bg-black/20 p-2 shadow-luxury backdrop-blur-xl md:p-3"
          >
            <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
              <div className="flex flex-col items-start rounded-xl border-r border-cream-100/10 px-4 py-2 text-left last:border-none md:last:border-r">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold-300">
                  {widget.destinationLabel ?? 'Destination'}
                </span>
                <span className="font-semibold text-cream-100">
                  {widget.destinationValue ?? 'Serengeti, Tanzania'}
                </span>
              </div>
              <div className="flex flex-col items-start rounded-xl border-r border-cream-100/10 px-4 py-2 text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold-300">
                  {widget.datesLabel ?? 'Travel Dates'}
                </span>
                <span className="font-semibold text-cream-100">
                  {widget.datesValue ?? 'Flexible · Year-round'}
                </span>
              </div>
              <div className="flex flex-col items-start rounded-xl border-r border-cream-100/10 px-4 py-2 text-left md:border-r-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold-300">
                  {widget.guestsLabel ?? 'Guests'}
                </span>
                <span className="font-semibold text-cream-100">
                  {widget.guestsValue ?? '2 Adults, 1 Suite'}
                </span>
              </div>
              <Link
                href={widget.ctaHref ?? '/packages'}
                className="flex h-full items-center justify-center gap-2 rounded-xl bg-gold-400 py-4 font-bold text-earth-900 transition-all hover:bg-gold-300"
              >
                <FiCompass size={17} />
                {widget.ctaLabel ?? 'Explore Packages'}
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
