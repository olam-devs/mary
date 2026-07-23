'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  FiMapPin,
  FiClock,
  FiCheck,
  FiX,
  FiCalendar,
  FiArrowLeft,
  FiMessageCircle,
  FiGrid,
  FiUsers,
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
  const [galleryOpen, setGalleryOpen] = useState(false)
  const images = pkg.images || []
  const extraCount = Math.max(0, images.length - 5)

  return (
    <>
      {/* ============================
          BREADCRUMB + TITLE
      ============================ */}
      <section className="bg-cream-100 pt-28 pb-8">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 text-earth-400 hover:text-gold-500 text-xs uppercase tracking-widest mb-6 transition-colors"
          >
            <FiArrowLeft size={13} /> All Packages
          </Link>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              {pkg.category && (
                <span className="label-gold mb-3 block">{pkg.category}</span>
              )}
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-earth-900 leading-tight">
                {pkg.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 mt-4 text-earth-500 text-sm">
                <span className="flex items-center gap-1.5">
                  <FiClock size={14} className="text-gold-500" /> {pkg.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <FiMapPin size={14} className="text-gold-500" /> {pkg.location}
                </span>
                {pkg.pricingTiers?.length > 0 && (
                  <span className="flex items-center gap-1.5">
                    <FiUsers size={14} className="text-gold-500" /> Max{' '}
                    {Math.max(...pkg.pricingTiers.map((t) => t.maxPeople))} guests
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          BENTO GALLERY
      ============================ */}
      {images.length > 0 && (
        <section className="bg-cream-100 pb-16">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
            <div className="grid h-[320px] grid-cols-2 gap-3 sm:h-[420px] md:h-[500px] md:grid-cols-4 md:grid-rows-2">
              {images.slice(0, 5).map((img, i) => {
                const src = img.imageUrl || img.asset?.url || ''
                const isLast = i === 4 && extraCount > 0
                return (
                  <button
                    key={i}
                    onClick={() => setGalleryOpen(true)}
                    className={`group relative overflow-hidden rounded-xl ${
                      i === 0 ? 'col-span-2 row-span-2 md:col-span-2 md:row-span-2' : ''
                    }`}
                  >
                    {src && (
                      <Image
                        src={src}
                        alt={img.alt || `${pkg.title} photo ${i + 1}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    )}
                    {isLast && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-earth-900/60 font-bold text-cream-100 backdrop-blur-sm">
                        <FiGrid size={22} />
                        <span>+{extraCount} Photos</span>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Simple lightbox */}
      {galleryOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-earth-900/95 p-6"
          onClick={() => setGalleryOpen(false)}
        >
          <button
            onClick={() => setGalleryOpen(false)}
            className="absolute right-6 top-6 text-cream-100 hover:text-gold-400"
            aria-label="Close gallery"
          >
            <FiX size={28} />
          </button>
          <div className="flex max-w-5xl flex-wrap justify-center gap-3 overflow-y-auto">
            {images.map((img, i) => {
              const src = img.imageUrl || img.asset?.url || ''
              return src ? (
                <div key={i} className="relative h-56 w-80 overflow-hidden rounded-lg">
                  <Image src={src} alt={img.alt || `Photo ${i + 1}`} fill className="object-cover" sizes="320px" />
                </div>
              ) : null
            })}
          </div>
        </div>
      )}

      {/* ============================
          MAIN CONTENT
      ============================ */}
      <section className="py-8 bg-cream-100">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

            {/* LEFT: Details */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <AnimatedSection>
                <h2 className="font-serif text-earth-900 text-2xl font-bold mb-4">Overview</h2>
                <p className="text-earth-600 leading-8 text-base">{pkg.description}</p>
              </AnimatedSection>

              {/* Day-by-day itinerary */}
              {pkg.itinerary && pkg.itinerary.length > 0 && (
                <AnimatedSection delay={0.05}>
                  <h2 className="font-serif text-earth-900 text-2xl font-bold mb-8">Day-by-Day Journey</h2>
                  <div className="relative space-y-8 border-l-2 border-gold-400/25 pl-8">
                    {pkg.itinerary.map((day, i) => (
                      <div key={i} className="relative">
                        <div className="absolute -left-[35px] top-1 h-3.5 w-3.5 rounded-full border-4 border-cream-100 bg-gold-400" />
                        <span className="mb-1 block text-xs font-bold uppercase tracking-widest text-gold-500">
                          {day.dayLabel}
                        </span>
                        <h4 className="mb-2 font-serif text-xl font-bold text-earth-900">{day.title}</h4>
                        {day.description && (
                          <p className="mb-3 text-earth-600 text-sm leading-relaxed">{day.description}</p>
                        )}
                        <div className="flex flex-wrap gap-4">
                          {day.meals && (
                            <span className="text-xs font-semibold text-earth-500">🍽️ {day.meals}</span>
                          )}
                          {day.stay && day.stay !== '—' && (
                            <span className="text-xs font-semibold text-earth-500">🏕️ {day.stay}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              )}

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
                  <PriceCalculator tiers={pkg.pricingTiers} currency={pkg.currency ?? 'USD'} title="Group Expedition Planner" />
                </AnimatedSection>

                <AnimatedSection direction="right" delay={0.1}>
                  <div className="bg-earth-900 p-6 space-y-4">
                    <h3 className="font-serif text-cream-100 font-bold text-lg">Ready to Book?</h3>
                    <p className="text-earth-400 text-xs leading-relaxed">
                      Bookings are personal. Mary confirms every trip directly. Reach out to check
                      availability and secure your dates.
                    </p>
                    <a
                      href="https://wa.me/255793356660"
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
