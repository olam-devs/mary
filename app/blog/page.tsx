export const revalidate = 0

import type { Metadata } from 'next'
import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FiSearch } from 'react-icons/fi'
import BlogCard from '@/components/BlogCard'
import CategoryFilter from '@/components/CategoryFilter'
import AnimatedSection from '@/components/AnimatedSection'
import { getAllBlogPosts } from '@/lib/queries'
import type { BlogCategory } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Travel Blog — Hidden Tanzania & East Africa Stories',
  description:
    'Detailed travel guides, budget itineraries, and authentic stories from Tanzania. Solo travel, group adventures, boutique hotels, and local restaurants — all covered by Mary Minza Lucas.',
}

const HERO_BG = 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=1920&q=75'

interface BlogPageProps {
  searchParams: Promise<{ category?: string; q?: string }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category, q } = await searchParams
  const activeCategory = (category || 'all') as BlogCategory

  const allPosts = await getAllBlogPosts()

  // Filter by category
  let filtered = activeCategory === 'all'
    ? allPosts
    : allPosts.filter((p) => p.category === activeCategory)

  // Filter by search query
  if (q) {
    const lower = q.toLowerCase()
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(lower) ||
        p.excerpt?.toLowerCase().includes(lower)
    )
  }

  const featured = allPosts.filter((p) => p.featured).slice(0, 1)[0]

  return (
    <>
      {/* ============================
          HERO
      ============================ */}
      <section className="relative pt-20 min-h-[55vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={HERO_BG}
            alt="Tanzania Travel Blog"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-earth-900/75" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <AnimatedSection>
            <p className="label-gold mb-4">Mary Minza Lucas</p>
            <h1 className="font-serif text-6xl sm:text-7xl font-bold text-cream-100 mb-4">
              The Blog
            </h1>
            <div className="divider-gold max-w-20 mx-auto mb-8" />
            <p className="text-cream-100/75 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Tanzania is full of secrets and I'm here to share them. I go beyond postcards to bring
              you detailed guides on hidden hotels, local restaurants, and budget-friendly itineraries.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ============================
          FEATURED POST (large card)
      ============================ */}
      {featured && activeCategory === 'all' && !q && (
        <section className="py-16 bg-sand-100">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
            <AnimatedSection>
              <p className="label-earth mb-6">Editor's Pick</p>
              <Link href={`/blog/${featured.slug.current}`} className="block group">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 shadow-luxury overflow-hidden">
                  <div className="relative aspect-video lg:aspect-auto lg:min-h-[400px] overflow-hidden">
                    <Image
                      src={featured.mainImage?.imageUrl || featured.mainImage?.asset?.url || ''}
                      alt={featured.mainImage?.alt || featured.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <div className="bg-earth-900 p-10 lg:p-14 flex flex-col justify-center">
                    <span className="label-gold mb-4 block">Featured Story</span>
                    <h2 className="font-serif text-cream-100 text-3xl lg:text-4xl font-bold leading-tight mb-4 group-hover:text-gold-400 transition-colors duration-300">
                      {featured.title}
                    </h2>
                    {featured.excerpt && (
                      <p className="text-earth-300 leading-relaxed mb-6 line-clamp-3">
                        {featured.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-earth-500 text-xs mb-8">
                      <span>
                        {new Date(featured.publishedAt).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      {featured.readTime && <span>{featured.readTime} min read</span>}
                    </div>
                    <span className="btn-primary self-start">Read Story</span>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* ============================
          FILTER + POSTS
      ============================ */}
      <section className="py-20 bg-cream-100">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          {/* Filter bar */}
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between mb-14">
            <Suspense fallback={<div className="h-10 w-64 skeleton" />}>
              <CategoryFilter active={activeCategory} />
            </Suspense>

            {/* Search */}
            <form method="GET" action="/blog" className="relative">
              <FiSearch
                size={15}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-400"
              />
              <input
                type="text"
                name="q"
                defaultValue={q || ''}
                placeholder="Search posts..."
                className="w-64 border border-cream-200 bg-white text-earth-900 pl-10 pr-4 py-2.5 text-sm placeholder:text-earth-400 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-colors duration-200"
              />
              {category && <input type="hidden" name="category" value={category} />}
            </form>
          </div>

          {/* Results count */}
          <p className="text-earth-400 text-xs uppercase tracking-widest mb-8">
            {filtered.length} {filtered.length === 1 ? 'post' : 'posts'} found
            {q && ` for "${q}"`}
          </p>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((post, i) => (
                <BlogCard key={post._id} post={post} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="font-serif text-earth-400 text-2xl mb-4">No posts found</p>
              <p className="text-earth-400 text-sm mb-8">
                Try a different category or search term.
              </p>
              <Link href="/blog" className="btn-outline-dark">
                Clear Filters
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
