export const revalidate = 60

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { FiArrowRight, FiCheck } from 'react-icons/fi'
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/AnimatedSection'
import { getAboutContent } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'About Mary Minza Lucas',
  description:
    'Content creator, digital marketing strategist, and Tanzania explorer. Mary Minza Lucas explores hidden gems in Dar es Salaam, Zanzibar, Serengeti, and beyond — making adventure accessible.',
}

const HERO_BG = 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=1920&q=80'
const EXPLORER_IMG = '/mary-about1.jpeg'
const BRAND_IMG = '/mission.jpeg'

export default async function AboutPage() {
  const about = await getAboutContent()

  const stats = about.stats ?? [
    { value: '50K+', label: 'Social Followers' },
    { value: '120+', label: 'Destinations Covered' },
    { value: '30+', label: 'Brand Partnerships' },
    { value: '4+', label: 'Years Creating' },
  ]

  const timeline = about.timeline ?? []

  const beliefs = about.beliefs ?? [
    {
      icon: '🌍',
      title: 'Affordable Adventures',
      description: 'Proving that extraordinary experiences don\'t require extraordinary budgets.',
    },
    {
      icon: '🍽️',
      title: 'Authentic Restaurants',
      description: 'Chasing the real flavors of Tanzania, not the tourist menu.',
    },
    {
      icon: '🏨',
      title: 'Boutique Hotels',
      description: 'Small properties with soul — where the host knows your name.',
    },
  ]

  return (
    <>
      {/* ============================
          HERO
      ============================ */}
      <section className="relative pt-20 min-h-[70vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={HERO_BG}
            alt="Mary Minza Lucas — About"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-earth-900/70" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <AnimatedSection>
            <p className="label-gold mb-6">Content Creator · Digital Marketing Strategist · Tanzania Explorer</p>
            <h1 className="font-serif text-6xl sm:text-7xl lg:text-8xl font-bold text-cream-100 leading-none mb-4">
              Mary Minza
            </h1>
            <h1 className="font-serif text-6xl sm:text-7xl lg:text-8xl font-bold text-gold-400 italic leading-none mb-10">
              Lucas
            </h1>
            <div className="divider-gold max-w-20 mx-auto mb-8" />
            <blockquote className="font-serif text-cream-100/85 text-2xl md:text-3xl italic">
              "{about.quote || 'Adventure is a right, not a luxury.'}"
            </blockquote>
          </AnimatedSection>
        </div>

        {/* Stats */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-earth-900/80 backdrop-blur-sm border-t border-earth-700/40">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-earth-700/50 py-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center px-4 py-2">
                  <div className="font-serif text-gold-400 font-bold text-xl">{stat.value}</div>
                  <div className="text-earth-400 text-[10px] uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          WHO I AM
      ============================ */}
      <section className="py-24 lg:py-32 bg-cream-100">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <AnimatedSection direction="left" className="relative">
              <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0 overflow-hidden shadow-luxury">
                <Image
                  src={about.heroImage?.imageUrl || '/started.jpeg'}
                  alt={about.heroImage?.alt || 'Mary Minza Lucas'}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 80vw, 40vw"
                />
              </div>
              {/* Accent elements */}
              <div className="absolute -left-6 top-12 bottom-12 w-px bg-gold-400" />
              <div className="absolute -bottom-6 -right-4 bg-gold-400 text-earth-900 px-8 py-5 shadow-xl">
                <div className="font-serif text-3xl font-bold">NatGeo</div>
                <div className="text-earth-900/70 text-[10px] uppercase tracking-widest">Externship Alumni</div>
              </div>
            </AnimatedSection>

            {/* Text */}
            <AnimatedSection direction="right">
              <p className="label-gold mb-4">Who I Am</p>
              <h2 className="section-title mb-8">
                The Woman<br />
                <span className="text-gold-500 italic">Behind The Lens</span>
              </h2>

              <div className="space-y-5 text-earth-600 text-base leading-8">
                <p>
                  I'm Mary Minza Lucas — a content creator and social media strategist based in
                  Dar es Salaam, Tanzania. I believe deeply that extraordinary travel experiences
                  shouldn't be reserved only for those with extraordinary budgets.
                </p>
                <p>
                  My work begins where guidebooks end. I explore the hidden restaurants of Kariakoo,
                  the boutique guesthouses in Stone Town no algorithm has found yet, the waterfalls
                  above Moshi that most visitors drive right past. I bring those discoveries to you
                  with honesty, detail, and cinematic storytelling.
                </p>
                <p>
                  Beyond travel content, I work as a digital marketing strategist for hospitality
                  brands — helping hotels, restaurants, and destinations connect with the modern
                  traveler through authentic narrative, not polished stock photos.
                </p>
              </div>

              {/* Highlights */}
              <ul className="mt-8 space-y-3">
                {[
                  'National Geographic Externship — East Africa',
                  'Explored 120+ destinations across Tanzania',
                  'Digital marketing for 30+ hospitality brands',
                  'Solo, group & curated group travel experiences',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-earth-700 text-sm">
                    <div className="w-5 h-5 bg-gold-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FiCheck size={11} className="text-earth-900" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ============================
          CORE BELIEFS
      ============================ */}
      <section className="py-24 bg-earth-900">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          <AnimatedSection className="text-center mb-16">
            <p className="label-gold mb-4">What I Stand For</p>
            <h2 className="section-title-light">
              My Focus<br />
              <span className="text-gold-400 italic">Areas</span>
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerChildren={0.12}>
            {beliefs.map((belief) => (
              <StaggerItem key={belief.title}>
                <div className="bg-earth-800 p-8 hover:bg-earth-700 transition-colors duration-300 group h-full">
                  <div className="text-4xl mb-6">{belief.icon}</div>
                  <h3 className="font-serif text-cream-100 text-xl font-bold mb-4 group-hover:text-gold-400 transition-colors duration-300">
                    {belief.title}
                  </h3>
                  <p className="text-earth-300 text-sm leading-relaxed">
                    {belief.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ============================
          FOR THE EXPLORER
      ============================ */}
      <section className="py-24 lg:py-32 bg-cream-100">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <p className="label-gold mb-4">For the Traveler</p>
              <h2 className="section-title mb-6">
                {about.forExplorer?.heading || 'For the Explorer'}
              </h2>
              <p className="text-earth-600 text-base leading-8 mb-8">
                {about.forExplorer?.body ||
                  "If you're planning a trip to Tanzania and don't know where to start, I'm your guide. I create detailed, honest, budget-aware content that helps real travelers make real decisions — not just dream from their couch. From solo itineraries to group adventures, every post is rooted in personal experience."}
              </p>
              <Link href="/blog" className="btn-secondary">
                Read the Blog <FiArrowRight className="inline ml-2" size={14} />
              </Link>
            </AnimatedSection>
            <AnimatedSection direction="right" className="relative">
              <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0 overflow-hidden shadow-luxury">
                <Image
                  src={about.forExplorer?.image?.imageUrl || EXPLORER_IMG}
                  alt="For the Explorer"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 80vw, 40vw"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ============================
          FOR THE BRAND
      ============================ */}
      <section className="py-24 lg:py-32 bg-sand-100">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left" className="relative order-2 lg:order-1">
              <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0 overflow-hidden shadow-luxury">
                <Image
                  src={about.forBrand?.image?.imageUrl || BRAND_IMG}
                  alt="For the Brand"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 80vw, 40vw"
                />
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right" className="order-1 lg:order-2">
              <p className="label-earth mb-4">For the Business</p>
              <h2 className="section-title mb-6">
                {about.forBrand?.heading || 'For the Brand'}
              </h2>
              <p className="text-earth-600 text-base leading-8 mb-8">
                {about.forBrand?.body ||
                  "I bridge the gap between businesses that need visibility and travelers who need guidance. Through cinematic content creation, strategic social media management, and authentic storytelling, I help hotels, restaurants, and destinations connect with modern, discerning travelers."}
              </p>
              <Link href="/portfolio" className="btn-secondary">
                See My Work <FiArrowRight className="inline ml-2" size={14} />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ============================
          JOURNEY TIMELINE
      ============================ */}
      {timeline.length > 0 && (
        <section className="py-24 lg:py-32 bg-cream-100">
          <div className="max-w-4xl mx-auto px-6 lg:px-10">
            <AnimatedSection className="text-center mb-16">
              <p className="label-gold mb-4">My Story</p>
              <h2 className="section-title">
                The Journey<br />
                <span className="text-gold-500 italic">So Far</span>
              </h2>
            </AnimatedSection>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gold-400/30 md:-translate-x-px" />

              <div className="space-y-10">
                {timeline.map((item, i) => (
                  <AnimatedSection key={i} delay={i * 0.08}>
                    <div className={`relative flex items-start gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                      {/* Dot */}
                      <div className="absolute left-6 md:left-1/2 w-3 h-3 bg-gold-400 rounded-full -translate-x-1 md:-translate-x-1/2 mt-1.5 ring-4 ring-cream-100" />

                      {/* Year block */}
                      <div className={`hidden md:block w-1/2 ${i % 2 === 0 ? 'text-right pr-12' : 'text-left pl-12'}`}>
                        <span className="font-serif text-gold-500 font-bold text-3xl">{item.year}</span>
                      </div>

                      {/* Content */}
                      <div className={`pl-14 md:pl-0 md:w-1/2 ${i % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                        <div className="md:hidden text-gold-500 font-bold text-sm mb-1">{item.year}</div>
                        <h3 className="font-serif text-earth-900 font-bold text-xl mb-2">{item.event}</h3>
                        {item.description && (
                          <p className="text-earth-500 text-sm leading-relaxed">{item.description}</p>
                        )}
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================
          CTA
      ============================ */}
      <section className="py-20 bg-gold-400">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <AnimatedSection>
            <h2 className="font-serif text-earth-900 text-4xl md:text-5xl font-bold mb-6">
              Ready to Explore Together?
            </h2>
            <p className="text-earth-900/70 text-base mb-10 max-w-xl mx-auto">
              Whether you're planning a trip to Tanzania or looking for a creative partner for your brand — let's connect.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/packages" className="btn-secondary min-w-[180px]">
                View Packages
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-earth-900 text-earth-900 hover:bg-earth-900 hover:text-cream-100 font-semibold text-xs uppercase tracking-widest px-8 py-4 transition-all duration-300 min-w-[180px]"
              >
                Get in Touch
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
