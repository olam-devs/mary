'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

interface PackageCategoryFilterProps {
  active: string
  categories: Array<{ value: string; label: string }>
}

export default function PackageCategoryFilter({ active, categories }: PackageCategoryFilterProps) {
  const router = useRouter()

  function setCategory(cat: string) {
    const query = cat === 'all' ? '' : `?category=${cat}`
    router.push(`/packages${query}#packages`, { scroll: false })
  }

  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((cat) => {
        const isActive = active === cat.value
        return (
          <motion.button
            key={cat.value}
            onClick={() => setCategory(cat.value)}
            whileTap={{ scale: 0.96 }}
            className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
              isActive
                ? 'bg-gold-400 text-earth-900'
                : 'border border-earth-200 bg-white text-earth-500 hover:border-gold-400 hover:text-earth-900'
            }`}
          >
            {cat.label}
          </motion.button>
        )
      })}
    </div>
  )
}
