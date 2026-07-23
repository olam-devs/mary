'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import AnimatedSection from './AnimatedSection'
import type { HomepageContent } from '@/lib/types'

interface DestinationsCarouselProps {
  heading?: string
  body?: string
  regions: NonNullable<HomepageContent['regions']>
}

const AUTOPLAY_MS = 7000

export default function DestinationsCarousel({ heading, body, regions }: DestinationsCarouselProps) {
  const [active, setActive] = useState(0)

  const goTo = useCallback(
    (index: number) => {
      setActive(((index % regions.length) + regions.length) % regions.length)
    },
    [regions.length]
  )

  useEffect(() => {
    if (regions.length <= 1) return
    const id = setInterval(() => setActive((i) => (i + 1) % regions.length), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [regions.length, active])

  if (!regions?.length) return null

  const current = regions[active]

  return (
    <>
      {/* Heading + regional nav */}
      <section className="w-full border-y border-earth-700 bg-earth-900 px-6 py-20 md:px-10 lg:px-40">
        <AnimatedSection className="mx-auto flex max-w-4xl flex-col gap-6 text-center">
          <h2 className="font-serif text-4xl font-extrabold uppercase leading-tight tracking-wide text-cream-100 md:text-5xl">
            {heading ?? 'Our Iconic Destinations'}
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-cream-100/70">
            {body}
          </p>
        </AnimatedSection>

        <div className="mx-auto mt-12 flex max-w-5xl flex-wrap items-center justify-center gap-4 border-t border-cream-100/10 pt-8 md:gap-8">
          {regions.map((region, i) => (
            <button
              key={region.name}
              onClick={() => goTo(i)}
              className={`cursor-pointer py-2 text-xs font-bold uppercase tracking-widest transition-colors ${
                i === active ? 'text-gold-400' : 'text-cream-100/50 hover:text-gold-300'
              }`}
            >
              {region.name}
            </button>
          ))}
        </div>
      </section>

      {/* Full-bleed carousel */}
      <section className="relative h-[85vh] min-h-[560px] w-full overflow-hidden bg-earth-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.name}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 h-full w-full"
          >
            {current.image?.imageUrl && (
              <Image
                src={current.image.imageUrl}
                alt={current.name}
                fill
                className="object-cover object-center"
                sizes="100vw"
              />
            )}
            <div className="absolute inset-0 bg-earth-900/45" />

            <div className="relative z-10 flex h-full w-full flex-col items-center justify-center p-8 text-center">
              <h2 className="select-none font-serif text-5xl uppercase tracking-[0.2em] text-cream-100/90 sm:text-7xl md:text-8xl">
                {current.name}
              </h2>
              <div className="mt-10 flex max-w-2xl flex-col items-center gap-8">
                <p className="text-lg font-medium leading-relaxed text-cream-100/90 md:text-xl">
                  {current.description}
                </p>
                <Link
                  href={current.href || '/packages'}
                  className="border border-cream-100/20 bg-cream-100/10 px-8 py-4 text-sm font-bold uppercase tracking-widest text-cream-100 backdrop-blur-md transition-all duration-300 hover:bg-cream-100 hover:text-earth-900"
                >
                  Explore {current.name} →
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Prev / Next */}
        <div className="absolute inset-y-0 left-0 z-30 flex items-center pl-4 sm:pl-6">
          <button
            onClick={() => goTo(active - 1)}
            aria-label="Previous destination"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-cream-100/20 bg-cream-100/5 text-cream-100 backdrop-blur-sm transition-all hover:border-gold-400 hover:bg-gold-400 hover:text-earth-900 sm:h-14 sm:w-14"
          >
            <FiArrowLeft size={20} />
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 z-30 flex items-center pr-4 sm:pr-6">
          <button
            onClick={() => goTo(active + 1)}
            aria-label="Next destination"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-cream-100/20 bg-cream-100/5 text-cream-100 backdrop-blur-sm transition-all hover:border-gold-400 hover:bg-gold-400 hover:text-earth-900 sm:h-14 sm:w-14"
          >
            <FiArrowRight size={20} />
          </button>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-3 sm:bottom-10">
          {regions.map((region, i) => (
            <button
              key={region.name}
              onClick={() => goTo(i)}
              aria-label={`Go to ${region.name}`}
              className={`h-1 cursor-pointer rounded-full transition-all ${
                i === active ? 'w-12 bg-cream-100' : 'w-6 bg-cream-100/40'
              }`}
            />
          ))}
        </div>
      </section>
    </>
  )
}
