export const revalidate = 0

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { FiClock, FiArrowLeft, FiArrowRight, FiCalendar } from 'react-icons/fi'
import { PortableText } from '@portabletext/react'
import AnimatedSection from '@/components/AnimatedSection'
import BlogCard from '@/components/BlogCard'
import ReadingProgress from '@/components/ReadingProgress'
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/queries'
import { categoryLabels } from '@/lib/types'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) return { title: 'Post Not Found' }

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.mainImage?.imageUrl
        ? [{ url: post.mainImage.imageUrl, width: 1200, height: 630, alt: post.title }]
        : [],
    },
  }
}

export async function generateStaticParams() {
  try {
    const posts = await getAllBlogPosts()
    return (posts ?? []).map((p) => ({ slug: p.slug.current }))
  } catch {
    // Fall back to mock slugs if Sanity is unreachable at build time
    const { mockBlogPosts } = await import('@/lib/mockData')
    return mockBlogPosts.map((p) => ({ slug: p.slug.current }))
  }
}

const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      const src = value?.asset?.url || value?.imageUrl
      if (!src) return null
      return (
        <figure className="my-10">
          <div className="relative aspect-video overflow-hidden shadow-card">
            <Image src={src} alt={value.alt || ''} fill className="object-cover" sizes="(max-width: 768px) 100vw, 800px" />
          </div>
          {value.caption && (
            <figcaption className="text-center text-earth-400 text-xs mt-3 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
  block: {
    h2: ({ children }: any) => (
      <h2 className="font-serif text-earth-900 text-3xl font-bold mt-12 mb-5 leading-tight">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="font-serif text-earth-800 text-2xl font-bold mt-8 mb-4 leading-tight">{children}</h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-gold-400 pl-6 my-8 italic text-earth-600 text-lg font-serif leading-relaxed">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => (
      <p className="text-earth-700 leading-8 text-lg mb-6">{children}</p>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gold-500 underline hover:text-gold-600"
      >
        {children}
      </a>
    ),
    strong: ({ children }: any) => <strong className="font-semibold text-earth-900">{children}</strong>,
  },
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) notFound()

  const allPosts = await getAllBlogPosts()
  const relatedPosts = allPosts
    .filter((p) => p._id !== post._id && p.category === post.category)
    .slice(0, 3)

  const categoryLabel = categoryLabels[post.category] || post.category
  const imageUrl = post.mainImage?.imageUrl || post.mainImage?.asset?.url

  return (
    <>
      <ReadingProgress />

      {/* ============================
          HERO
      ============================ */}
      <section className="relative pt-20 min-h-[70vh] flex flex-col items-end justify-end overflow-hidden">
        {imageUrl && (
          <div className="absolute inset-0 z-0">
            <Image
              src={imageUrl}
              alt={post.mainImage?.alt || post.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-earth-900/95 via-earth-900/50 to-earth-900/20" />
          </div>
        )}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 lg:px-10 pb-16">
          <AnimatedSection>
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-cream-100/60 hover:text-gold-400 text-xs uppercase tracking-widest mb-8 transition-colors"
            >
              <FiArrowLeft size={13} /> Back to Blog
            </Link>

            {/* Category */}
            <div className="mb-4">
              <span className="bg-gold-400 text-earth-900 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5">
                {categoryLabel}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-cream-100 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-5 text-cream-100/60 text-sm">
              <span className="flex items-center gap-1.5">
                <FiCalendar size={13} />
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              {post.readTime && (
                <span className="flex items-center gap-1.5">
                  <FiClock size={13} /> {post.readTime} min read
                </span>
              )}
              <span className="flex items-center gap-1.5">By Mary Minza Lucas</span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ============================
          ARTICLE CONTENT
      ============================ */}
      <article className="bg-cream-100 py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          {/* Excerpt / intro */}
          {post.excerpt && (
            <AnimatedSection>
              <p className="font-serif text-earth-700 text-xl md:text-2xl leading-relaxed italic mb-12 pb-12 border-b border-cream-200">
                {post.excerpt}
              </p>
            </AnimatedSection>
          )}

          {/* Rich text content */}
          {post.content ? (
            <AnimatedSection>
              <div className="prose-travel">
                <PortableText value={post.content} components={portableTextComponents} />
              </div>
            </AnimatedSection>
          ) : (
            <AnimatedSection>
              <div className="text-center py-12 text-earth-400">
                <p className="italic">Full article coming soon.</p>
              </div>
            </AnimatedSection>
          )}

          {/* Tags / category */}
          <div className="mt-16 pt-8 border-t border-cream-200 flex flex-wrap items-center gap-3">
            <span className="text-earth-400 text-xs uppercase tracking-widest">Filed under:</span>
            <Link
              href={`/blog?category=${post.category}`}
              className="bg-cream-200 hover:bg-gold-400 hover:text-earth-900 text-earth-600 text-xs font-medium px-4 py-2 transition-colors duration-200 uppercase tracking-wide"
            >
              {categoryLabel}
            </Link>
          </div>

          {/* Author card */}
          <div className="mt-12 bg-earth-900 p-8 flex flex-col sm:flex-row items-center gap-6">
            <div className="w-20 h-20 bg-gold-400 flex-shrink-0 flex items-center justify-center">
              <span className="font-serif text-earth-900 font-bold text-xl">MML</span>
            </div>
            <div>
              <p className="text-gold-400 text-xs uppercase tracking-widest mb-1">Written by</p>
              <h4 className="font-serif text-cream-100 font-bold text-xl mb-2">Mary Minza Lucas</h4>
              <p className="text-earth-300 text-sm leading-relaxed">
                Travel content creator and digital marketing strategist based in Dar es Salaam.
                Exploring hidden Tanzania so you don't have to start from scratch.
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-12 flex items-center justify-between">
            <Link href="/blog" className="btn-outline-dark text-xs">
              <FiArrowLeft size={13} /> All Posts
            </Link>
            <Link href="/packages" className="btn-primary text-xs">
              View Packages <FiArrowRight size={13} />
            </Link>
          </div>
        </div>
      </article>

      {/* ============================
          RELATED POSTS
      ============================ */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-sand-100">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
            <AnimatedSection className="mb-12">
              <p className="label-earth mb-3">More Like This</p>
              <h2 className="font-serif text-earth-900 text-3xl font-bold">Related Posts</h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((p, i) => (
                <BlogCard key={p._id} post={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
