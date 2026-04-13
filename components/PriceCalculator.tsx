'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiUsers, FiDollarSign, FiCheck } from 'react-icons/fi'
import type { PricingTier } from '@/lib/types'

type Currency = 'USD' | 'TSh'

interface PriceCalculatorProps {
  tiers: PricingTier[]
  currency?: Currency
  title?: string
}

function fmt(amount: number, currency: Currency): string {
  if (currency === 'TSh') {
    return `TSh ${amount.toLocaleString()}`
  }
  return `$${amount.toLocaleString()}`
}

interface CalculationResult {
  tier: PricingTier
  totalPrice: number
  pricePerPerson: number
}

export default function PriceCalculator({ tiers, currency = 'USD', title }: PriceCalculatorProps) {
  const [peopleCount, setPeopleCount] = useState<number | ''>('')
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  function calculatePrice() {
    const count = Number(peopleCount)
    if (!count || count < 1) {
      setError('Please enter a valid number of people (minimum 1).')
      setResult(null)
      return
    }

    const matchedTier = tiers.find(
      (t) => count >= t.minPeople && count <= t.maxPeople
    )

    if (!matchedTier) {
      const maxGroup = Math.max(...tiers.map((t) => t.maxPeople))
      const minGroup = Math.min(...tiers.map((t) => t.minPeople))
      if (count > maxGroup) {
        setError(`Maximum group size is ${maxGroup} people. Contact us for larger groups.`)
      } else if (count < minGroup) {
        setError(`Minimum group size is ${minGroup} person.`)
      } else {
        setError('No pricing tier available for this group size.')
      }
      setResult(null)
      return
    }

    setError(null)
    setResult({
      tier: matchedTier,
      totalPrice: matchedTier.totalPrice,
      pricePerPerson: Math.ceil(matchedTier.totalPrice / count),
    })
  }

  const sortedTiers = [...tiers].sort((a, b) => a.minPeople - b.minPeople)
  const maxPeople = Math.max(...tiers.map((t) => t.maxPeople))

  return (
    <div className="bg-cream-100 border border-sand-300 p-8">
      {title && (
        <h3 className="font-serif text-earth-900 text-2xl font-bold mb-6">{title}</h3>
      )}

      {/* Pricing tiers overview */}
      <div className="mb-8">
        <p className="label-earth mb-4">Pricing Tiers</p>
        <div className="space-y-2">
          {sortedTiers.map((tier, i) => {
            const perPerson = Math.ceil(tier.totalPrice / tier.maxPeople)
            return (
              <div
                key={i}
                className="flex items-center justify-between bg-white px-5 py-3 border border-cream-200"
              >
                <div className="flex items-center gap-2 text-earth-700 text-sm">
                  <FiUsers size={14} className="text-gold-400" />
                  <span>
                    {tier.minPeople === tier.maxPeople
                      ? `${tier.minPeople} person`
                      : `${tier.minPeople}–${tier.maxPeople} people`}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-serif text-gold-500 font-bold">{fmt(tier.totalPrice, currency)}</span>
                  <span className="text-earth-400 text-xs ml-2">(~{fmt(perPerson, currency)}/person)</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Calculator */}
      <div className="divider-gold mb-8" />

      <p className="label-earth mb-4">Calculate Your Price</p>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <FiUsers size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-400" />
          <input
            type="number"
            min={1}
            max={maxPeople}
            value={peopleCount}
            onChange={(e) => {
              setPeopleCount(e.target.value === '' ? '' : Number(e.target.value))
              setResult(null)
              setError(null)
            }}
            onKeyDown={(e) => e.key === 'Enter' && calculatePrice()}
            placeholder={`How many people? (1–${maxPeople})`}
            className="w-full border border-sand-300 bg-white text-earth-900 pl-11 pr-5 py-4 text-sm placeholder:text-earth-400 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-colors duration-200"
          />
        </div>
        <button
          onClick={calculatePrice}
          className="btn-primary px-8 py-4 flex-shrink-0"
        >
          Check Price
        </button>
      </div>

      {/* Error */}
      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 px-5 py-3 text-sm mb-4"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result */}
      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }}
            className="bg-earth-900 text-cream-100 p-6 mt-2"
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="w-6 h-6 bg-gold-400 rounded-full flex items-center justify-center flex-shrink-0">
                <FiCheck size={13} className="text-earth-900" />
              </div>
              <p className="text-cream-100/80 text-sm">
                For a group of <strong className="text-cream-100">{peopleCount} people</strong>:
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="bg-earth-800 p-4 text-center">
                <FiDollarSign size={18} className="text-gold-400 mx-auto mb-1" />
                <div className="font-serif text-2xl font-bold text-gold-400">
                  {fmt(result.pricePerPerson, currency)}
                </div>
                <div className="text-earth-400 text-xs uppercase tracking-widest mt-1">Per Person</div>
              </div>
              <div className="bg-earth-800 p-4 text-center">
                <div className="text-earth-400 text-xs uppercase tracking-widest mb-1">Total Package</div>
                <div className="font-serif text-2xl font-bold text-cream-100">
                  {fmt(result.totalPrice, currency)}
                </div>
                <div className="text-earth-400 text-xs mt-1">{currency}</div>
              </div>
            </div>

            <div className="bg-earth-800/50 px-4 py-3 text-xs text-earth-400 flex items-center gap-2">
              <FiUsers size={12} />
              Tier applies for{' '}
              {result.tier.minPeople === result.tier.maxPeople
                ? `${result.tier.minPeople} person`
                : `${result.tier.minPeople}–${result.tier.maxPeople} people`}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
