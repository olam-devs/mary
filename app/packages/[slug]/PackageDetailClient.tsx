'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiMapPin,
  FiClock,
  FiCheck,
  FiX,
  FiCalendar,
  FiArrowLeft,
  FiMessageCircle,
} from 'react-icons/fi'
import PriceCalculator from '@/components/PriceCalculator'
import AnimatedSection from '@/components/AnimatedSection'
import type { TravelPackage } from '@/lib/types'

const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const MONTHS_FULL = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]

export default function PackageDetailClient({ pkg }: { pkg: TravelPackage }) {
  const [activeImage, setActiveImage] = useState(0)

  const images = pkg.images || []
  const mainImgSrc = images[activeImage]?.imageUrl || images[activeImage]?.asset?.url || ''

  return (
    <>
      {/* ============================
          HERO / GALLERY
      ============================ */}
      <section className="pt-20 bg-earth-900">
        <div className="max-w-screen-2xl mx-auto">
          {/* Main image */}
          <div className="relative aspect-video lg:aspect-[21/8] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                {mainImgSrc && (
                  <Image
                    src={mainImgSrc}
                    alt={images[activeImage]?.alt || pkg.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-earth-900/80 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Location badge */}
            <div className="absolute top-6 left-6 bg-earth-900/80 backdrop-blur-sm text-cream-100 px-4 py-2 flex items-center gap-2 text-sm">
              <FiMapPin size={13} className="text-gold-400" />
              {pkg.location}
            </div>

            {/* Category */}
            {pkg.category && (
              <div className="absolute top-6 right-6 bg-gold-400 text-earth-900 px-4 py-2 text-[10px] font-bold uppercase tracking-widest">
                {pkg.category}
              </div>
            )}

            {/* Bottom text overlay */}
            <div className="absolute bottom-8 left-8">
              <Link
                href="/packages"
                className="inline-flex items-center gap-2 text-cream-100/60 hover:text-gold-400 text-xs uppercase tracking-widest mb-3 transition-colors"
              >
                <FiArrowLeft size={13} /> All Packages
              </Link>
              <h1 className="font-serif text-cream-100 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                {pkg.title}
              </h1>
            </div>
          </div>

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="flex gap-2 p-4 bg-earth-800 overflow-x-auto">
              {images.map((img, i) => {
                const thumbSrc = img.imageUrl || img.asset?.url || ''
                return (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative flex-shrink-0 w-24 h-16 overflow-hidden transition-all duration-300 ${
                      activeImage === i ? 'ring-2 ring-gold-400 opacity-100' : 'opacity-50 hover:opacity-80'
                    }`}
                  >
                    {thumbSrc && (
                      <Image
                        src={thumbSrc}
                        alt={img.alt || `Photo ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    )}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* ============================
          MAIN CONTENT
      ============================ */}
      <section className="py-20 bg-cream-100">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

            {/* LEFT: Details */}
            <div className="lg:col-span-2 space-y-12">
              {/* Meta bar */}
              <div className="flex flex-wrap gap-6 pb-8 border-b border-cream-200">
                {pkg.duration && (
                  <div className="flex items-center gap-2 text-earth-600 text-sm">
                    <FiClock size={14} className="text-gold-400" />
                    {pkg.duration}
                  </div>
                )}
                {pkg.pricingTiers && (
                  <div className="flex items-center gap-2 text-earth-600 text-sm">
                    <span className="text-gold-400">👥</span>
                    Up to {Math.max(...pkg.pricingTiers.map((t) => t.maxPeople))} people
                  </div>
                )}
                {pkg.availabilityMonths && (
                  <div className="flex items-center gap-2 text-earth-600 text-sm">
                    <FiCalendar size={14} className="text-gold-400" />
                    {pkg.availabilityMonths.length} months available
                  </div>
                )}
              </div>

              {/* Description */}
              <AnimatedSection>
                <h2 className="font-serif text-earth-900 text-2xl font-bold mb-4">Overview</h2>
                <p className="text-earth-600 leading-8 text-base">{pkg.description}</p>
              </AnimatedSection>

              {/* Highlights */}
              {pkg.highlights && pkg.highlights.length > 0 && (
                <AnimatedSection delay={0.1}>
                  <h2 className="font-serif text-earth-900 text-2xl font-bold mb-6">Package Highlights</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {pkg.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-3 bg-white px-5 py-4 shadow-card">
                        <div className="w-5 h-5 bg-gold-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <FiCheck size={11} className="text-earth-900" />
                        </div>
                        <span className="text-earth-700 text-sm">{h}</span>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              )}

              {/* Included / Excluded */}
              {(pkg.included || pkg.excluded) && (
                <AnimatedSection delay={0.15}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {pkg.included && (
                      <div>
                        <h3 className="font-serif text-earth-900 text-xl font-bold mb-4">
                          ✓ What's Included
                        </h3>
                        <ul className="space-y-2">
                          {pkg.included.map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-earth-600 text-sm">
                              <FiCheck size={13} className="text-forest-600 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {pkg.excluded && (
                      <div>
                        <h3 className="font-serif text-earth-900 text-xl font-bold mb-4">
                          ✗ Not Included
                        </h3>
                        <ul className="space-y-2">
                          {pkg.excluded.map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-earth-500 text-sm">
                              <FiX size={13} className="text-red-400 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </AnimatedSection>
              )}

              {/* Availability Calendar */}
              {pkg.availabilityMonths && pkg.availabilityMonths.length > 0 && (
                <AnimatedSection delay={0.2}>
                  <h2 className="font-serif text-earth-900 text-2xl font-bold mb-6">Best Time to Visit</h2>
                  <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
                    {MONTHS_SHORT.map((m, i) => {
                      const available = pkg.availabilityMonths?.includes(MONTHS_FULL[i])
                      return (
                        <div
                          key={m}
                          title={MONTHS_FULL[i]}
                          className={`flex flex-col items-center py-3 text-[11px] font-bold transition-colors ${
                            available ? 'bg-gold-400 text-earth-900' : 'bg-cream-200 text-earth-300'
                          }`}
                        >
                          {m}
                        </div>
                      )
                    })}
                  </div>
                  <div className="flex items-center gap-6 mt-3 text-xs text-earth-400">
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-gold-400 inline-block" /> Available
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-cream-200 inline-block" /> Not available
                    </span>
                  </div>
                </AnimatedSection>
              )}
            </div>

            {/* RIGHT: Price Calculator + Booking */}
            <div className="space-y-6">
              <div className="lg:sticky lg:top-28 space-y-6">
                <AnimatedSection direction="right">
                  <PriceCalculator tiers={pkg.pricingTiers} currency={pkg.currency ?? 'USD'} title="Price Calculator" />
                </AnimatedSection>

                <AnimatedSection direction="right" delay={0.1}>
                  <div className="bg-earth-900 p-6 space-y-4">
                    <h3 className="font-serif text-cream-100 font-bold text-lg">Ready to Book?</h3>
                    <p className="text-earth-400 text-xs leading-relaxed">
                      Bookings are personal — Mary confirms every trip directly. Reach out to check
                      availability and secure your dates.
                    </p>
                    <a
                      href="https://wa.me/255712345678"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full flex items-center justify-center gap-2"
                    >
                      <FiMessageCircle size={15} /> Book via WhatsApp
                    </a>
                    <Link
                      href="/contact"
                      className="btn-gold-outline w-full flex items-center justify-center gap-2"
                    >
                      Send an Inquiry
                    </Link>
                    <p className="text-earth-600 text-[11px] text-center">
                      No booking fee · Personalised service · Response within 24h
                    </p>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
