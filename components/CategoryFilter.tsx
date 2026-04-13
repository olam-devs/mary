'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import type { BlogCategory } from '@/lib/types'
import { categoryLabels } from '@/lib/types'

const categories: BlogCategory[] = [
  'all',
  'solo-travel',
  'group-travel',
  'itineraries',
  'hotels-restaurants',
]

interface CategoryFilterProps {
  active: BlogCategory
}

export default function CategoryFilter({ active }: CategoryFilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function setCategory(cat: BlogCategory) {
    const params = new URLSearchParams(searchParams.toString())
    if (cat === 'all') {
      params.delete('category')
    } else {
      params.set('category', cat)
    }
    // Reset page on filter change
    params.delete('page')
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {categories.map((cat) => {
        const isActive = active === cat
        return (
          <motion.button
            key={cat}
            onClick={() => setCategory(cat)}
            whileTap={{ scale: 0.96 }}
            className={`relative text-xs font-semibold uppercase tracking-widest px-5 py-2.5 transition-all duration-300 ${
              isActive
                ? 'bg-earth-900 text-cream-100'
                : 'bg-white text-earth-500 hover:text-earth-900 border border-cream-200 hover:border-earth-400'
            }`}
          >
            {categoryLabels[cat]}
            {isActive && (
              <motion.div
                layoutId="category-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-400"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )}
          </motion.button>
        )
      })}
    </div>
  )
}
