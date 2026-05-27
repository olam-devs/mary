'use client'

import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/AnimatedSection'
import BrandLogo from '@/components/BrandLogo'
import { BRAND } from '@/lib/brand'

const DEFAULT_HERO_IMG = 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=1920&q=80'
const EXPLORER_IMG = '/mary-about1.jpeg'
const BRAND_IMG = '/mission.jpeg'

type Stat  = { value: string; label: string }
type Belief = { icon: string; title: string; description: string }
type TimelineItem = { year: string; event: string; description?: string }

type AboutData = {
  heroBgImage?: { imageUrl: string }
  profileImage?: { imageUrl: string; alt?: string }
  quote?: string
  bioText?: string[]
  highlights?: string[]
  forExplorer?: { heading?: string; body?: string; image?: { imageUrl: string } }
  forBrand?: { heading?: string; body?: string; image?: { imageUrl: string } }
}

export default function AboutPageClient({
  about, stats, timeline, beliefs,
}: {
  about: AboutData
  stats: Stat[]
  timeline: TimelineItem[]
  beliefs: Belief[]
}) {
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: tlProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  })

  const bioText = about.bioText?.length ? about.bioText : [
    "I'm Mary Minza Lucas, a content creator and social media strategist based in Dar es Salaam, Tanzania. I believe deeply that extraordinary travel experiences shouldn't be reserved only for those with extraordinary budgets.",
    'My work begins where guidebooks end. I explore the hidden restaurants of Kariakoo, the boutique guesthouses in Stone Town no algorithm has found yet, the waterfalls above Moshi that most visitors drive right past.',
    'Beyond travel content, I work as a digital marketing strategist for hospitality brands, helping hotels, restaurants, and destinations connect with the modern traveler through authentic narrative, not polished stock photos.',
  ]

  const heroImg = about.heroBgImage?.imageUrl || DEFAULT_HERO_IMG
  const profileImg = about.profileImage?.imageUrl || '/started.jpeg'

  return (
    <>
      {/* ─────────────────────────────────────────
          HERO - Split Panel  [UNCHANGED]
      ───────────────────────────────────────── */}
      <section className="relative min-h-screen flex overflow-hidden">
        <div className="relative z-10 w-full lg:w-[44%] bg-earth-900 flex flex-col justify-center px-8 md:px-12 lg:px-16 pt-28 pb-16 lg:pt-32 lg:pb-20">
          <div className="lg:hidden absolute inset-0 z-0">
            <Image src={heroImg} alt="Mary Minza Lucas" fill priority className="object-cover object-center" sizes="100vw" />
            <div className="absolute inset-0 bg-earth-900/82" />
          </div>
          {[...Array(5)].map((_, i) => (
            <motion.div key={i} className="absolute w-1 h-1 bg-gold-400 rounded-full pointer-events-none"
              style={{ left: `${8 + i * 17}%`, top: `${30 + (i % 3) * 16}%` }}
              animate={{ y: [0, -14, 0], opacity: [0.25, 0.65, 0.25] }}
              transition={{ duration: 2.6 + i * 0.5, repeat: Infinity, delay: i * 0.4 }} />
          ))}
          <motion.p initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="label-gold mb-10 relative z-10">
            Content Creator · Dar es Salaam, Tanzania
          </motion.p>
          <motion.div
            className="flex items-center gap-5 mb-10 relative z-10"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <BrandLogo size={52} variant="mark" />
            <div>
              <h1 className="font-serif text-6xl sm:text-7xl xl:text-8xl font-bold text-cream-100 leading-none">
                {BRAND.nameLine1}
              </h1>
              <h1 className="font-serif text-6xl sm:text-7xl xl:text-8xl font-bold text-gold-400 italic leading-none mt-1">
                {BRAND.nameLine2}
              </h1>
              <p className="text-earth-400 text-xs uppercase tracking-widest mt-3">About</p>
            </div>
          </motion.div>
          <motion.div className="h-px bg-gold-400 w-16 mb-8 relative z-10 origin-left"
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, delay: 0.95 }} />
          <motion.blockquote initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.15 }}
            className="font-serif text-cream-100/75 text-lg md:text-xl italic mb-14 max-w-sm relative z-10">
            "{about.quote || 'Adventure is a right, not a luxury.'}"
          </motion.blockquote>
          <StaggerContainer className="grid grid-cols-2 gap-x-8 gap-y-6 relative z-10" staggerChildren={0.1} delayChildren={1.35}>
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="border-l-2 border-gold-400/40 pl-4">
                  <div className="font-serif text-gold-400 font-bold text-2xl">{stat.value}</div>
                  <div className="text-earth-400 text-[10px] uppercase tracking-widest mt-1">{stat.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[56%]">
          <Image src={heroImg} alt="Mary Minza Lucas" fill priority className="object-cover object-center" sizes="56vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-earth-900/55 via-earth-900/10 to-transparent" />
        </div>
      </section>

      {/* ─────────────────────────────────────────
          1 · ABOUT - premium editorial layout
      ───────────────────────────────────────── */}
      <section className="bg-cream-100 py-24 lg:py-32 overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
            <div className="lg:col-span-8">
              <AnimatedSection className="h-full">
                <div className="bg-white border border-earth-200 shadow-card p-10 lg:p-12 h-full flex flex-col justify-center">
                  <p className="label-gold mb-5">About</p>
                  <h2 className="font-serif text-5xl sm:text-6xl font-bold text-earth-900 leading-[1.05] text-balance">
                    The Woman <span className="text-gold-500 italic">Behind the Lens</span>
                  </h2>
                  <p className="text-earth-600 text-base leading-[1.9] mt-6 max-w-3xl">
                    I’m Mary Minza Lucas, a content creator and digital strategist uncovering the parts of Tanzania that guidebooks often miss.
                    I document every experience to give travelers the honest, “right” information they actually need.
                  </p>
                  <p className="text-earth-600 text-base leading-[1.9] mt-5 max-w-3xl">
                    I test routes, track real costs, and plan logistics so you don’t have to guess.
                    And for hotels and resorts, I pair cinematic documentation with digital marketing strategy to replace stock photos with real stories that drive bookings.
                  </p>
                  <p className="text-earth-600 text-base leading-[1.9] mt-5 max-w-3xl">
                    You get practical, budget-aware recommendations that still feel elevated, honest hotel and restaurant reviews with the details you actually care about, and cinematic short-form content designed for attention and trust.
                  </p>
                </div>
              </AnimatedSection>
            </div>

            <div className="lg:col-span-4">
              <AnimatedSection direction="right" className="h-full">
                <div className="bg-earth-900 shadow-luxury overflow-hidden h-full lg:sticky lg:top-28">
                  <div className="relative h-full min-h-[520px]">
                    <Image
                      src={profileImg}
                      alt={about.profileImage?.alt || 'Mary Minza Lucas'}
                      fill
                      className="object-cover object-top"
                      sizes="(min-width: 1024px) 34vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-earth-900/85 via-earth-900/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-7">
                      <p className="font-serif text-cream-100 text-xl italic leading-relaxed">
                        "{about.quote || 'Adventure is a right, not a luxury.'}"
                      </p>
                      <div className="h-px bg-gold-400/40 w-16 mt-6" />
                      <p className="text-earth-300 text-xs uppercase tracking-widest mt-4">
                        Dar es Salaam · Tanzania
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          2 · BELIEFS  -  refined value cards
      ───────────────────────────────────────── */}
      <section className="bg-earth-900 py-24 lg:py-32 overflow-hidden relative">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <AnimatedSection className="text-center mb-14">
            <p className="label-gold mb-5">What I believe</p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-cream-100 leading-tight">
              Travel should feel <span className="text-gold-400 italic">human</span>.
            </h2>
            <p className="text-earth-300 text-base leading-[1.9] mt-6 max-w-2xl mx-auto">
              I build content around trust. The kind that helps you choose the right place, the right plan, and the right experience.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8" staggerChildren={0.1}>
            {beliefs.map((belief) => (
              <StaggerItem key={belief.title} className="h-full" direction="up">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="h-full bg-earth-800 border border-earth-700 p-8 shadow-luxury"
                >
                  <div className="flex items-start justify-between gap-6 mb-6">
                    <div className="w-11 h-11 bg-gold-400/15 border border-gold-400/25 flex items-center justify-center">
                      <span className="text-2xl">{belief.icon}</span>
                    </div>
                    <div className="h-px bg-gold-400/25 flex-1 mt-5" />
                  </div>
                  <h3 className="font-serif text-cream-100 text-2xl font-bold mb-3">
                    {belief.title}
                  </h3>
                  <p className="text-earth-300 text-sm leading-relaxed">
                    {belief.description}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          3 · WORK WITH ME - two-track offering
      ───────────────────────────────────────── */}
      <section className="bg-cream-100 py-24 lg:py-32 overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <AnimatedSection className="text-center mb-14">
            <p className="label-gold mb-5">Work with me</p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-earth-900 leading-tight">
              Two ways to partner.
            </h2>
            <p className="text-earth-600 text-base leading-[1.9] mt-6 max-w-2xl mx-auto">
              Whether you’re planning a Tanzania trip or you’re a hospitality brand that needs storytelling that converts, I’ve got you.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* Traveler card */}
            <AnimatedSection direction="left">
              <div className="bg-white border border-earth-200 shadow-card overflow-hidden h-full">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={about.forExplorer?.image?.imageUrl || EXPLORER_IMG}
                    alt="For the Traveler"
                    fill
                    className="object-cover object-center"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-earth-900/70 via-earth-900/10 to-transparent" />
                  <div className="absolute left-6 bottom-6">
                    <p className="label-gold mb-3">For the traveler</p>
                    <h3 className="font-serif text-3xl sm:text-4xl font-bold text-cream-100 leading-tight">
                      {about.forExplorer?.heading || 'For the Explorer'}
                    </h3>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-earth-600 text-base leading-[1.9] mb-8">
                    {about.forExplorer?.body ||
                      "If you're planning a trip to Tanzania and don't know where to start, I'm your guide. Detailed, honest, budget-aware content that helps real travelers make real decisions."}
                  </p>
                  <motion.div whileHover={{ x: 6 }} transition={{ duration: 0.2 }}>
                    <Link href="/blog" className="btn-primary inline-flex items-center gap-2">
                      Explore the Blog <FiArrowRight size={14} />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </AnimatedSection>

            {/* Brand card */}
            <AnimatedSection direction="right">
              <div className="bg-earth-900 border border-earth-800 shadow-luxury overflow-hidden h-full relative">
                <div className="pointer-events-none absolute inset-0">
                  <Image
                    src={about.forBrand?.image?.imageUrl || BRAND_IMG}
                    alt="For the Business"
                    fill
                    className="object-cover object-center opacity-20"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-earth-900 via-earth-900/92 to-earth-900" />
                </div>
                <div className="relative p-8 lg:p-10">
                  <p className="label-gold mb-5">For the brand</p>
                  <h3 className="font-serif text-4xl font-bold text-cream-100 leading-tight mb-5">
                    {about.forBrand?.heading
                      ? about.forBrand.heading
                      : <>Let’s build <span className="text-gold-400 italic">something real</span>.</>}
                  </h3>
                  <p className="text-earth-300 text-base leading-[1.9] mb-8">
                    {about.forBrand?.body ||
                      'I bridge the gap between businesses that need visibility and travelers who need guidance. Through cinematic content creation, strategic social media management, and authentic storytelling, I help hotels, restaurants, and destinations connect with modern, discerning travelers.'}
                  </p>

                  <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10" staggerChildren={0.06}>
                    {[
                      'Cinematic UGC & short-form video',
                      'Social media strategy & management',
                      'Blog content & destination guides',
                      'Brand campaigns & experience design',
                    ].map((item) => (
                      <StaggerItem key={item} direction="up">
                        <div className="flex items-center gap-3 bg-earth-800/60 border border-earth-700 px-4 py-3 text-earth-200 text-sm">
                          <span className="text-gold-400 flex-shrink-0">→</span>
                          <span>{item}</span>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>

                  <motion.div whileHover={{ x: 6 }} transition={{ duration: 0.2 }}>
                    <Link href="/portfolio" className="btn-gold-outline inline-flex items-center gap-2">
                      See My Work <FiArrowRight size={14} />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          4 · TIMELINE  (shown only if Sanity data)
      ───────────────────────────────────────── */}
      {timeline.length > 0 && (
        <section className="py-24 lg:py-32 bg-cream-100 overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 lg:px-10">
            <AnimatedSection className="text-center mb-20">
              <p className="label-gold mb-4">My Story</p>
              <h2 className="font-serif text-5xl md:text-6xl font-bold text-earth-900 leading-tight">
                The Journey<br /><span className="text-gold-500 italic">So Far</span>
              </h2>
            </AnimatedSection>

            <div ref={timelineRef} className="relative">
              <motion.div
                className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gold-400/30 md:-translate-x-px origin-top"
                style={{ scaleY: tlProgress }}
              />
              <div className="space-y-12">
                {timeline.map((item, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
                    <div className={`relative flex items-start gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                      <motion.div className="absolute left-6 md:left-1/2 w-3 h-3 bg-gold-400 rounded-full -translate-x-1 md:-translate-x-1/2 mt-2 ring-4 ring-cream-100"
                        initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 400, delay: 0.25 }} />
                      <div className={`hidden md:block w-1/2 ${i % 2 === 0 ? 'text-right pr-12' : 'text-left pl-12'}`}>
                        <span className="font-serif text-gold-500 font-bold text-4xl">{item.year}</span>
                      </div>
                      <div className={`pl-14 md:pl-0 md:w-1/2 ${i % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                        <div className="md:hidden text-gold-500 font-bold text-sm mb-2">{item.year}</div>
                        <div className="bg-white shadow-card p-6">
                          <h3 className="font-serif text-earth-900 font-bold text-xl mb-2">{item.event}</h3>
                          {item.description && <p className="text-earth-500 text-sm leading-relaxed">{item.description}</p>}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────
          5 · CTA - premium image-backed close
      ───────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="relative min-h-[520px] flex items-center">
          <Image src={heroImg} alt="Tanzania" fill className="object-cover object-center" sizes="100vw" />
          <div className="absolute inset-0 bg-earth-900/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-earth-900 via-earth-900/75 to-earth-900/35" />

          <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 lg:px-10 py-24">
            <div className="max-w-2xl">
              <AnimatedSection>
                <p className="label-gold mb-6">Let’s connect</p>
                <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-cream-100 leading-[1.05] mb-8">
                  Ready to explore together?
                </h2>
                <p className="text-cream-100/75 text-base md:text-lg leading-[1.9] mb-12">
                  Start with a package, browse the blog, or reach out for brand partnerships and campaigns.
                </p>
                <StaggerContainer className="flex flex-col sm:flex-row items-center gap-4" staggerChildren={0.1} delayChildren={0.2}>
                  <StaggerItem>
                    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                      <Link href="/packages" className="btn-primary min-w-[200px] inline-flex items-center justify-center gap-2">
                        View Packages <FiArrowRight size={14} />
                      </Link>
                    </motion.div>
                  </StaggerItem>
                  <StaggerItem>
                    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                      <Link href="/contact" className="btn-gold-outline min-w-[200px] inline-flex items-center justify-center gap-2">
                        Get in Touch <FiArrowRight size={14} />
                      </Link>
                    </motion.div>
                  </StaggerItem>
                </StaggerContainer>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
