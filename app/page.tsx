export const revalidate = 0

import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FiArrowRight } from 'react-icons/fi'
import Hero from '@/components/Hero'
import DestinationsCarousel from '@/components/DestinationsCarousel'
import WhyChooseUs from '@/components/WhyChooseUs'
import BlogCard from '@/components/BlogCard'
import PackageCard from '@/components/PackageCard'
import AnimatedSection from '@/components/AnimatedSection'
import MarqueeStrip from '@/components/MarqueeStrip'
import FloatingOrbs from '@/components/FloatingOrbs'
import { getFeaturedBlogPosts, getFeaturedPackages, getHomepageContent } from '@/lib/queries'
import { BRAND } from '@/lib/brand'

export const metadata: Metadata = {
  title: `${BRAND.name} | Tanzania Safari & Travel`,
  description:
    `${BRAND.motto} Explore Tanzania through ${BRAND.name}: safari packages, travel blog, and brand partnerships.`,
}

const DEFAULT_PARTNER_BG = 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1920&q=75'

export default async function HomePage() {
  const [featuredPosts, featuredPackages, home] = await Promise.all([
    getFeaturedBlogPosts(),
    getFeaturedPackages(),
    getHomepageContent(),
  ])

  const partnerBg = home.partnershipBgImage?.imageUrl || DEFAULT_PARTNER_BG

  return (
    <>
      {/* ============================
          HERO
      ============================ */}
      <Hero content={home} />

      {/* ============================
          MARQUEE STRIP
      ============================ */}
      <MarqueeStrip />

      {/* ============================
          DESTINATIONS CAROUSEL
      ============================ */}
      {home.regions?.length ? (
        <DestinationsCarousel heading={home.regionsHeading} body={home.regionsBody} regions={home.regions} />
      ) : null}

      {/* ============================
          WHY CHOOSE US
      ============================ */}
      <WhyChooseUs content={home} />

      {/* ============================
          FEATURED BLOG POSTS
      ============================ */}
      <section className="py-24 lg:py-32 bg-earth-900">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          <AnimatedSection className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
            <div>
              <p className="label-gold mb-3">From the Blog</p>
              <h2 className="section-title-light">
                Stories From<br />
                <span className="text-gold-400 italic">The Field</span>
              </h2>
            </div>
            <Link href="/blog" className="btn-gold-outline text-xs self-start sm:self-auto flex-shrink-0">
              View All Posts <FiArrowRight className="inline ml-1" size={13} />
            </Link>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post, i) => (
              <BlogCard key={post._id} post={post} index={i} />
            ))}
          </div>

          <AnimatedSection delay={0.2} className="mt-20 max-w-3xl mx-auto text-center">
            <blockquote className="font-serif text-cream-100/80 text-xl md:text-2xl italic leading-relaxed border-l-4 border-gold-400 pl-8 text-left">
              "Tanzania is full of secrets and I'm here to share them. I go beyond postcards to bring
              you detailed guides on hidden hotels, local restaurants, and budget-friendly itineraries."
            </blockquote>
            <p className="text-earth-400 text-xs uppercase tracking-widest mt-4 pl-8">{BRAND.name}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* ============================
          FEATURED PACKAGES
      ============================ */}
      <section className="py-24 lg:py-32 bg-cream-100 overflow-hidden">
        <FloatingOrbs />
        <div className="relative z-10 max-w-screen-2xl mx-auto px-6 lg:px-10">
          <AnimatedSection className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
            <div>
              <p className="label-gold mb-3">Curated Experiences</p>
              <h2 className="section-title">
                Travel Packages<br />
                <span className="text-gold-500 italic">Crafted By Mary</span>
              </h2>
            </div>
            <Link href="/packages" className="btn-outline-dark text-xs self-start sm:self-auto flex-shrink-0">
              All Packages <FiArrowRight className="inline ml-1" size={13} />
            </Link>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPackages.map((pkg, i) => (
              <PackageCard key={pkg._id} pkg={pkg} index={i} />
            ))}
          </div>

          <AnimatedSection delay={0.3} className="text-center mt-14">
            <p className="text-earth-600 text-sm mb-6">
              All packages include Mary's personal curation. No generic tours.
            </p>
            <Link href="/contact" className="btn-secondary">
              Request a Custom Trip
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ============================
          REVERSE MARQUEE
      ============================ */}
      <MarqueeStrip reverse bgClass="bg-earth-900" textClass="text-cream-100/40" speed={40} />

      {/* ============================
          PARTNERSHIP CTA
      ============================ */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={partnerBg}
            alt="Partnership with Mary Minza Lucas"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-earth-900/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <AnimatedSection>
            <p className="label-gold mb-6">Brand Partnerships</p>
            <h2 className="section-title-light mb-6">
              {home.partnershipHeading
                ? home.partnershipHeading.split(' ').slice(0, 3).join(' ')
                : "Let's Build Something"}
              <br />
              <span className="text-gold-400 italic">
                {home.partnershipHeading
                  ? home.partnershipHeading.split(' ').slice(3).join(' ')
                  : 'Worth Sharing'}
              </span>
            </h2>
            <div className="divider-gold max-w-24 mx-auto mb-8" />
            <p className="text-cream-100/75 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-12">
              {home.partnershipBody ??
                'I collaborate with hotels, restaurants, and destinations that value authentic storytelling. Cinematic UGC, social media strategy, and immersive experience design, all rooted in real Tanzania.'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/portfolio" className="btn-primary min-w-[180px]">
                View My Portfolio
              </Link>
              <Link href="/contact" className="btn-outline-light min-w-[180px]">
                Start a Conversation
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
