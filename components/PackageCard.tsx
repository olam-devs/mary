'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiMapPin, FiClock, FiUsers, FiArrowRight } from 'react-icons/fi'
import type { TravelPackage } from '@/lib/types'

interface PackageCardProps {
  pkg: TravelPackage
  index?: number
}

const FALLBACK = 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=75'

function getLowestPrice(tiers: TravelPackage['pricingTiers']): number {
  if (!tiers || tiers.length === 0) return 0
  const maxTier = [...tiers].sort((a, b) => b.maxPeople - a.maxPeople)[0]
  return Math.floor(maxTier.totalPrice / maxTier.maxPeople)
}

function formatPrice(amount: number, currency: string): string {
  if (currency === 'TSh') return `TSh ${amount.toLocaleString()}`
  return `$${amount.toLocaleString()}`
}

const categoryBadge: Record<string, string> = {
  safari: 'bg-forest-600 text-cream-100',
  beach: 'bg-sky-700 text-cream-100',
  cultural: 'bg-earth-700 text-cream-100',
  adventure: 'bg-gold-500 text-earth-900',
  city: 'bg-sand-300 text-earth-900',
}

export default function PackageCard({ pkg, index = 0 }: PackageCardProps) {
  const imageUrl =
    pkg.images?.[0]?.imageUrl || pkg.images?.[0]?.asset?.url || FALLBACK
  const lowestPrice = getLowestPrice(pkg.pricingTiers)
  const currency = pkg.currency ?? 'USD'
  const badgeClass = pkg.category ? categoryBadge[pkg.category] || 'bg-earth-700 text-cream-100' : 'bg-earth-700 text-cream-100'

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group bg-white shadow-card hover:shadow-card-hover transition-all duration-500 flex flex-col"
    >
      <Link href={`/packages/${pkg.slug.current}`} className="flex flex-col flex-1">
        {/* Image */}
        <div className="relative overflow-hidden aspect-[4/3]">
          <Image
            src={imageUrl}
            alt={pkg.images?.[0]?.alt || pkg.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-earth-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Category Badge */}
          {pkg.category && (
            <div className="absolute top-4 left-4">
              <span className={`text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 ${badgeClass}`}>
                {pkg.category}
              </span>
            </div>
          )}

          {/* Featured badge */}
          {pkg.featured && (
            <div className="absolute top-4 right-4">
              <span className="bg-gold-400 text-earth-900 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5">
                Featured
              </span>
            </div>
          )}

          {/* Availability dots */}
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {pkg.availabilityMonths && pkg.availabilityMonths.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {['J','F','M','A','M','J','J','A','S','O','N','D'].map((m, i) => {
                  const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
                  const isAvailable = pkg.availabilityMonths?.includes(months[i])
                  return (
                    <div
                      key={m}
                      className={`w-5 h-5 flex items-center justify-center text-[9px] font-bold ${
                        isAvailable ? 'bg-gold-400 text-earth-900' : 'bg-earth-900/60 text-earth-400'
                      }`}
                      title={months[i]}
                    >
                      {m}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col flex-1">
          {/* Location */}
          <div className="flex items-center gap-1.5 text-earth-400 text-xs mb-3">
            <FiMapPin size={11} />
            <span>{pkg.location}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-earth-900 font-bold text-xl leading-tight mb-3 group-hover:text-gold-500 transition-colors duration-300">
            {pkg.title}
          </h3>

          {/* Description */}
          <p className="text-earth-500 text-sm leading-relaxed line-clamp-2 mb-5 flex-1">
            {pkg.description}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-earth-400 mb-5">
            {pkg.duration && (
              <span className="flex items-center gap-1">
                <FiClock size={11} /> {pkg.duration}
              </span>
            )}
            {pkg.pricingTiers && (
              <span className="flex items-center gap-1">
                <FiUsers size={11} /> Up to {Math.max(...pkg.pricingTiers.map((t) => t.maxPeople))} people
              </span>
            )}
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-cream-200">
            <div>
              <span className="text-earth-400 text-xs">From</span>
              <div className="flex items-baseline gap-1 flex-wrap">
                <span className="font-serif text-xl font-bold text-gold-500">
                  {formatPrice(lowestPrice, currency)}
                </span>
                <span className="text-earth-400 text-xs">/person</span>
              </div>
            </div>
            <span className="inline-flex items-center gap-2 bg-earth-900 group-hover:bg-gold-400 text-cream-100 group-hover:text-earth-900 text-[11px] font-semibold uppercase tracking-widest px-5 py-2.5 transition-all duration-300">
              View <FiArrowRight size={12} />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
