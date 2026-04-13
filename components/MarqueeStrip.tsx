'use client'
import { motion } from 'framer-motion'

const destinations = [
  'Zanzibar',
  'Serengeti',
  'Kilimanjaro',
  'Ngorongoro',
  'Dar es Salaam',
  'Pemba Island',
  'Stone Town',
  'Mikumi',
  'Ruaha',
  'Arusha',
  'Lake Manyara',
  'Selous',
  'Tarangire',
  'Bagamoyo',
  'Mafia Island',
]

const Gem = () => (
  <span className="text-cream-100/40 text-xs select-none">✦</span>
)

interface Props {
  reverse?: boolean
  bgClass?: string
  textClass?: string
  speed?: number
}

export default function MarqueeStrip({
  reverse = false,
  bgClass = 'bg-gold-400',
  textClass = 'text-cream-100',
  speed = 30,
}: Props) {
  const doubled = [...destinations, ...destinations]

  return (
    <div className={`overflow-hidden py-3.5 ${bgClass}`}>
      <motion.div
        className="flex gap-6 whitespace-nowrap w-max"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((place, i) => (
          <span
            key={i}
            className={`inline-flex items-center gap-6 text-[11px] font-bold uppercase tracking-[0.2em] ${textClass}`}
          >
            {place}
            <Gem />
          </span>
        ))}
      </motion.div>
    </div>
  )
}
