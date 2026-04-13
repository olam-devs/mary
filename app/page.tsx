import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FiArrowRight, FiMapPin } from 'react-icons/fi'
import Hero from '@/components/Hero'
import BlogCard from '@/components/BlogCard'
import PackageCard from '@/components/PackageCard'
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/AnimatedSection'
import MarqueeStrip from '@/components/MarqueeStrip'
import AnimatedCounter from '@/components/AnimatedCounter'
import FloatingOrbs from '@/components/FloatingOrbs'
import { getFeaturedBlogPosts, getFeaturedPackages, getHomepageContent } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Mary Minza Lucas | Tanzania Travel Creator & Digital Marketing Strategist',
  description:
    'Affordable Adventures. Authentic Stories. Hidden Tanzania Revealed. Explore Tanzania through Mary Minza Lucas — travel blog, packages, and brand partnerships.',
}

const DEFAULT_PARTNER_BG = 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1920&q=75'

export default async function HomePage() {
  const [featuredPosts, featuredPackages, home] = await Promise.all([
    getFeaturedBlogPosts(),
    getFeaturedPackages(),
    getHomepageContent(),
  ])

  const destinations = home.destinations?.length
    ? home.destinations
    : [
        'Dar es Salaam', 'Zanzibar', 'Serengeti', 'Moshi', 'Arusha',
        'Kilimanjaro', 'Stone Town', 'Ngorongoro', 'Pemba Island', 'Mikumi',
      ]

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
          FEATURED BLOG POSTS
      ============================ */}
      <section className="py-24 lg:py-32 bg-cream-100">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          <AnimatedSection className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
            <div>
              <p className="label-gold mb-3">From the Blog</p>
              <h2 className="section-title">
                Stories From<br />
                <span className="text-gold-500 italic">The Field</span>
              </h2>
            </div>
            <Link href="/blog" className="btn-outline-dark text-xs self-start sm:self-auto flex-shrink-0">
              View All Posts <FiArrowRight className="inline ml-1" size={13} />
            </Link>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post, i) => (
              <BlogCard key={post._id} post={post} index={i} />
            ))}
          </div>

          <AnimatedSection delay={0.2} className="mt-20 max-w-3xl mx-auto text-center">
            <blockquote className="font-serif text-earth-700 text-xl md:text-2xl italic leading-relaxed border-l-4 border-gold-400 pl-8 text-left">
              "Tanzania is full of secrets and I'm here to share them. I go beyond postcards to bring
              you detailed guides on hidden hotels, local restaurants, and budget-friendly itineraries."
            </blockquote>
            <p className="text-earth-400 text-xs uppercase tracking-widest mt-4 pl-8">— Mary Minza Lucas</p>
          </AnimatedSection>
        </div>
      </section>

      {/* ============================
          FEATURED PACKAGES
      ============================ */}
      <section className="relative py-24 lg:py-32 bg-earth-900 overflow-hidden">
        <FloatingOrbs />
        <div className="relative z-10 max-w-screen-2xl mx-auto px-6 lg:px-10">
          <AnimatedSection className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
            <div>
              <p className="label-gold mb-3">Curated Experiences</p>
              <h2 className="section-title-light">
                Travel Packages<br />
                <span className="text-gold-400 italic">Crafted By Mary</span>
              </h2>
            </div>
            <Link href="/packages" className="btn-gold-outline text-xs self-start sm:self-auto flex-shrink-0">
              All Packages <FiArrowRight className="inline ml-1" size={13} />
            </Link>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPackages.map((pkg, i) => (
              <PackageCard key={pkg._id} pkg={pkg} index={i} />
            ))}
          </div>

          <AnimatedSection delay={0.3} className="text-center mt-14">
            <p className="text-earth-400 text-sm mb-6">
              All packages include Mary's personal curation — no generic tours.
            </p>
            <Link href="/contact" className="btn-primary">
              Request a Custom Trip
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ============================
          ABOUT PREVIEW
      ============================ */}
      <section className="py-24 lg:py-32 bg-cream-100 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <AnimatedSection direction="left" className="relative">
              <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0 overflow-hidden shadow-luxury">
                <Image
                  src="/started.jpeg"
                  alt="Mary Minza Lucas"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 80vw, 40vw"
                />
                <div className="absolute inset-0 ring-1 ring-gold-400/20" />
              </div>
              <div className="absolute bottom-8 -right-4 lg:-right-10 bg-earth-900 text-cream-100 px-8 py-6 shadow-luxury">
                <div className="font-serif text-4xl font-bold text-gold-400">4+</div>
                <div className="text-earth-300 text-xs uppercase tracking-widest">Years Creating</div>
              </div>
              <div className="absolute -left-4 top-16 bottom-16 w-px bg-gold-400" />
            </AnimatedSection>

            {/* Text */}
            <AnimatedSection direction="right">
              <p className="label-gold mb-4">About Mary</p>
              <h2 className="section-title mb-6">
                {home.aboutHeading
                  ? home.aboutHeading.split(' ').slice(0, -2).join(' ')
                  : 'The Explorer'}
                <br />
                <span className="text-gold-500 italic">
                  {home.aboutHeading
                    ? home.aboutHeading.split(' ').slice(-2).join(' ')
                    : 'Behind The Stories'}
                </span>
              </h2>

              <blockquote className="font-serif text-earth-700 text-xl italic border-l-4 border-gold-400 pl-6 mb-8 leading-relaxed">
                "{home.aboutQuote ?? 'Adventure is a right, not a luxury.'}"
              </blockquote>

              <p className="text-earth-600 text-base leading-8 mb-6">
                {home.aboutBody1 ??
                  'Mary Minza Lucas is a content creator and digital marketing strategist based in Dar es Salaam, Tanzania. She believes extraordinary experiences belong to everyone — not just those with luxury budgets.'}
              </p>

              <p className="text-earth-600 text-base leading-8 mb-10">
                {home.aboutBody2 ??
                  'From hidden restaurants in Kariakoo to safari drives in the Serengeti, Mary bridges the gap between travelers who need guidance and brands that need visibility — through authentic storytelling and strategic digital marketing.'}
              </p>

              <StaggerContainer className="grid grid-cols-3 gap-6 mb-10" staggerChildren={0.1}>
                {(home.stats ?? [
                  { display: 50, suffix: 'K+', label: 'Followers' },
                  { display: 120, suffix: '+', label: 'Destinations' },
                  { display: 30, suffix: '+', label: 'Brands' },
                ]).map((stat) => (
                  <StaggerItem key={stat.label} className="text-center border-r border-cream-200 last:border-none">
                    <div className="font-serif text-3xl font-bold text-gold-500">
                      <AnimatedCounter end={stat.display} suffix={stat.suffix} />
                    </div>
                    <div className="text-earth-400 text-xs uppercase tracking-widest mt-1">{stat.label}</div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <Link href="/about" className="btn-secondary">
                Read My Story <FiArrowRight className="inline ml-2" size={14} />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ============================
          DESTINATIONS STRIP
      ============================ */}
      <section className="py-16 bg-sand-200">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          <AnimatedSection className="text-center mb-12">
            <p className="label-earth mb-3">Places I've Covered</p>
            <h3 className="font-serif text-earth-900 text-3xl font-bold">Destinations</h3>
          </AnimatedSection>
          <StaggerContainer className="flex flex-wrap justify-center gap-4" staggerChildren={0.06}>
            {destinations.map((place) => (
              <StaggerItem key={place}>
                <div className="flex items-center gap-1.5 bg-white shadow-card px-5 py-2.5 text-earth-700 text-sm font-medium hover:bg-earth-900 hover:text-cream-100 transition-colors duration-300 cursor-default">
                  <FiMapPin size={12} className="text-gold-400" />
                  {place}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
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
                "I collaborate with hotels, restaurants, and destinations that value authentic storytelling. Cinematic UGC, social media strategy, and immersive experience design — all rooted in real Tanzania."}
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
