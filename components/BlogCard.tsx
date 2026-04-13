'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiClock, FiArrowRight } from 'react-icons/fi'
import type { BlogPost } from '@/lib/types'
import { categoryLabels } from '@/lib/types'

interface BlogCardProps {
  post: BlogPost
  variant?: 'default' | 'featured' | 'horizontal'
  index?: number
}

const categoryColors: Record<string, string> = {
  'solo-travel': 'bg-forest-600 text-cream-100',
  'group-travel': 'bg-earth-700 text-cream-100',
  'itineraries': 'bg-gold-500 text-earth-900',
  'hotels-restaurants': 'bg-sand-300 text-earth-900',
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=75'

export default function BlogCard({ post, variant = 'default', index = 0 }: BlogCardProps) {
  const imageUrl = post.mainImage?.imageUrl || post.mainImage?.asset?.url || FALLBACK_IMAGE
  const categoryLabel = categoryLabels[post.category] || post.category
  const categoryColor = categoryColors[post.category] || 'bg-earth-700 text-cream-100'

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  if (variant === 'featured') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="group relative overflow-hidden bg-earth-900 shadow-luxury"
        style={{ minHeight: 480 }}
      >
        <Link href={`/blog/${post.slug.current}`} className="block h-full">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={imageUrl}
              alt={post.mainImage?.alt || post.title}
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 img-card-gradient" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-8">
            <div className={`self-start text-[10px] font-semibold uppercase tracking-widest px-3 py-1 mb-4 ${categoryColor}`}>
              {categoryLabel}
            </div>
            <h3 className="font-serif text-cream-100 text-2xl lg:text-3xl font-bold leading-tight mb-3 group-hover:text-gold-400 transition-colors duration-300">
              {post.title}
            </h3>
            {post.excerpt && (
              <p className="text-cream-100/70 text-sm leading-relaxed line-clamp-2 mb-4">
                {post.excerpt}
              </p>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-cream-100/50 text-xs">
                <span>{formattedDate}</span>
                {post.readTime && (
                  <span className="flex items-center gap-1">
                    <FiClock size={12} /> {post.readTime} min read
                  </span>
                )}
              </div>
              <span className="text-gold-400 text-sm flex items-center gap-1 font-medium group-hover:gap-2 transition-all duration-300">
                Read <FiArrowRight size={14} />
              </span>
            </div>
          </div>
        </Link>
      </motion.article>
    )
  }

  if (variant === 'horizontal') {
    return (
      <motion.article
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.08, duration: 0.6 }}
        className="group flex gap-5 bg-white shadow-card hover:shadow-card-hover transition-all duration-500"
      >
        <Link href={`/blog/${post.slug.current}`} className="flex gap-5 w-full">
          <div className="relative flex-shrink-0 w-40 sm:w-48 overflow-hidden">
            <Image
              src={imageUrl}
              alt={post.mainImage?.alt || post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="200px"
            />
          </div>
          <div className="flex flex-col justify-center py-5 pr-5">
            <div className={`self-start text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 mb-3 ${categoryColor}`}>
              {categoryLabel}
            </div>
            <h3 className="font-serif text-earth-900 font-bold text-lg leading-tight mb-2 group-hover:text-gold-500 transition-colors duration-300 line-clamp-2">
              {post.title}
            </h3>
            <div className="flex items-center gap-3 text-earth-400 text-xs">
              <span>{formattedDate}</span>
              {post.readTime && (
                <span className="flex items-center gap-1">
                  <FiClock size={11} /> {post.readTime} min
                </span>
              )}
            </div>
          </div>
        </Link>
      </motion.article>
    )
  }

  // Default card
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group bg-white shadow-card hover:shadow-card-hover transition-all duration-500 flex flex-col"
    >
      <Link href={`/blog/${post.slug.current}`} className="flex flex-col flex-1">
        {/* Image */}
        <div className="relative overflow-hidden aspect-[16/10]">
          <Image
            src={imageUrl}
            alt={post.mainImage?.alt || post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-4 left-4">
            <span className={`text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 ${categoryColor}`}>
              {categoryLabel}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="font-serif text-earth-900 font-bold text-xl leading-tight mb-3 group-hover:text-gold-500 transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-earth-500 text-sm leading-relaxed line-clamp-3 mb-5 flex-1">
              {post.excerpt}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-cream-200 mt-auto">
            <div className="flex items-center gap-3 text-earth-400 text-xs">
              <span>{formattedDate}</span>
              {post.readTime && (
                <span className="flex items-center gap-1">
                  <FiClock size={11} /> {post.readTime} min read
                </span>
              )}
            </div>
            <span className="text-gold-500 text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all duration-300 uppercase tracking-wide">
              Read <FiArrowRight size={12} />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
