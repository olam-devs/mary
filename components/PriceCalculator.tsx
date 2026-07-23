'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiUsers, FiMinus, FiPlus, FiArrowRight } from 'react-icons/fi'
import type { PricingTier } from '@/lib/types'

type Currency = 'USD' | 'TSh'

interface PriceCalculatorProps {
  tiers: PricingTier[]
  currency?: Currency
  title?: string
}

function fmt(amount: number, currency: Currency): string {
  if (currency === 'TSh') return `TSh ${amount.toLocaleString()}`
  return `$${amount.toLocaleString()}`
}

function tierLabelFor(count: number, sortedTiers: PricingTier[]): string {
  const index = sortedTiers.findIndex((t) => count >= t.minPeople && count <= t.maxPeople)
  if (index === -1) return ''
  if (index === 0) return 'Solo / Small Group Rate'
  if (index === sortedTiers.length - 1) return 'Maximum Group Discount Applied'
  return 'Group Savings Unlocked'
}

export default function PriceCalculator({ tiers, currency = 'USD', title }: PriceCalculatorProps) {
  const sortedTiers = useMemo(() => [...tiers].sort((a, b) => a.minPeople - b.minPeople), [tiers])
  const minGroup = Math.min(...tiers.map((t) => t.minPeople))
  const maxGroup = Math.max(...tiers.map((t) => t.maxPeople))

  const [count, setCount] = useState(minGroup)

  const activeTier = sortedTiers.find((t) => count >= t.minPeople && count <= t.maxPeople)
  const totalPrice = activeTier?.totalPrice ?? 0
  const pricePerPerson = activeTier ? Math.ceil(activeTier.totalPrice / count) : 0
  const tierLabel = tierLabelFor(count, sortedTiers)

  function adjust(delta: number) {
    setCount((c) => Math.min(maxGroup, Math.max(minGroup, c + delta)))
  }

  return (
    <div className="relative overflow-hidden bg-earth-900 p-8 shadow-luxury">
      {title && (
        <h3 className="mb-6 font-serif text-2xl font-bold text-cream-100">{title}</h3>
      )}

      {/* Group size counter */}
      <div className="mb-6 space-y-3">
        <label className="block text-center text-xs font-bold uppercase tracking-widest text-earth-300">
          Number of People
        </label>
        <div className="flex items-center justify-between rounded-full border border-earth-700 bg-earth-800 p-2">
          <button
            onClick={() => adjust(-1)}
            disabled={count <= minGroup}
            aria-label="Decrease group size"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-earth-700 text-cream-100 transition-all hover:bg-gold-400 hover:text-earth-900 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-earth-700 disabled:hover:text-cream-100"
          >
            <FiMinus size={16} />
          </button>
          <AnimatePresence mode="wait">
            <motion.span
              key={count}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="font-serif text-3xl font-bold text-gold-400"
            >
              {count}
            </motion.span>
          </AnimatePresence>
          <button
            onClick={() => adjust(1)}
            disabled={count >= maxGroup}
            aria-label="Increase group size"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-earth-700 text-cream-100 transition-all hover:bg-gold-400 hover:text-earth-900 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-earth-700 disabled:hover:text-cream-100"
          >
            <FiPlus size={16} />
          </button>
        </div>
      </div>

      {/* Tier badge */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tierLabel}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mb-6 rounded-lg border border-earth-700 bg-earth-800/50 px-4 py-3 text-center"
        >
          <p className="text-xs font-bold uppercase italic tracking-tight text-gold-400">{tierLabel}</p>
        </motion.div>
      </AnimatePresence>

      {/* Live price */}
      <div className="space-y-3 border-t border-earth-700 pt-6">
        <div className="flex items-end justify-between">
          <span className="text-sm text-earth-300">Price Per Person</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={pricePerPerson}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="font-serif text-xl font-bold text-cream-100"
            >
              {fmt(pricePerPerson, currency)}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="flex items-end justify-between rounded-xl bg-gold-400/10 p-5">
          <span className="font-semibold text-gold-400">Total Estimated Price</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={totalPrice}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="font-serif text-2xl font-bold text-gold-400"
            >
              {fmt(totalPrice, currency)}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <a
        href="https://wa.me/255793356660"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary mt-6 flex w-full items-center justify-center gap-2"
      >
        Proceed with Group Booking <FiArrowRight size={14} />
      </a>

      {/* Tier reference table */}
      <div className="mt-8 space-y-2 border-t border-earth-700 pt-6">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-earth-400">All Pricing Tiers</p>
        {sortedTiers.map((tier, i) => (
          <div
            key={i}
            className={`flex items-center justify-between px-4 py-2.5 text-xs transition-colors ${
              tier === activeTier ? 'bg-gold-400/15 text-gold-300' : 'text-earth-400'
            }`}
          >
            <span className="flex items-center gap-2">
              <FiUsers size={12} />
              {tier.minPeople === tier.maxPeople ? `${tier.minPeople} person` : `${tier.minPeople}–${tier.maxPeople} people`}
            </span>
            <span>{fmt(tier.totalPrice, currency)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
