'use client'

import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FiArrowRight, FiChevronsDown } from 'react-icons/fi'
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/AnimatedSection'
import { BRAND } from '@/lib/brand'
import type { AboutContent, TimelineItem } from '@/lib/types'

const DEFAULT_HERO_IMG = 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=1920&q=80'

type Stat = { value: string; label: string }
type Belief = NonNullable<AboutContent['beliefs']>[number]

export default function AboutPageClient({
  about, stats, timeline, beliefs,
}: {
  about: AboutContent
  stats: Stat[]
  timeline: TimelineItem[]
  beliefs: Belief[]
}) {
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: tlProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  })

  const heroImg = about.heroBgImage?.imageUrl || DEFAULT_HERO_IMG
  const missionImg = about.missionImage?.imageUrl

  return (
    <>
      {/* ─────────────────────────────────────────
          HERO - full-bleed, centered
      ───────────────────────────────────────── */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src={heroImg} alt={BRAND.name} fill priority className="object-cover object-center brightness-[0.55]" sizes="100vw" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-4xl px-6 text-center"
        >
          <span className="mb-4 block text-xs font-bold uppercase tracking-luxury text-gold-400">
            {about.heroEyebrow ?? 'Our Legacy'}
          </span>
          <h1 className="mb-8 font-serif text-6xl font-bold text-cream-100 sm:text-7xl md:text-8xl">
            {about.heroHeadline ?? 'A Pioneering Collective'}
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-cream-100/75 md:text-xl">
            {about.heroSubtext ??
              'Defining the intersection of untamed Tanzanian wilderness and uncompromising, story-driven safari travel.'}
          </p>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-gold-400"
        >
          <FiChevronsDown size={30} />
        </motion.div>
      </section>

      {/* ─────────────────────────────────────────
          OUR STORY (company)
      ───────────────────────────────────────── */}
      <section className="overflow-hidden bg-cream-100 py-24 lg:py-32">
        <div className="mx-auto max-w-screen-xl px-6 lg:px-10">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <AnimatedSection direction="left" className="flex flex-col gap-8 pr-0 lg:pr-8">
              <p className="label-gold">{about.storyLabel ?? 'Our Story'}</p>
              <h2 className="font-serif text-3xl font-bold leading-tight text-earth-900 md:text-4xl">
                {about.missionHeading ?? 'Built On the Ground, Not From a Brochure'}
              </h2>
              <p className="text-base leading-[1.9] text-earth-600">{about.missionBody1}</p>
              <p className="text-base leading-[1.9] text-earth-600">{about.missionBody2}</p>

              {stats.length > 0 && (
                <StaggerContainer
                  className="flex flex-wrap items-center gap-6 border-y border-earth-200 py-6"
                  staggerChildren={0.08}
                >
                  {stats.map((stat, i) => (
                    <StaggerItem key={stat.label} className="flex items-center gap-6">
                      <div className="text-center">
                        <span className="block font-serif text-3xl font-bold text-gold-500">{stat.value}</span>
                        <span className="text-[10px] uppercase tracking-widest text-earth-400">{stat.label}</span>
                      </div>
                      {i < stats.length - 1 && <div className="h-10 w-px bg-earth-200" />}
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              )}
            </AnimatedSection>

            <AnimatedSection direction="right" className="group relative">
              <div className="pointer-events-none absolute -inset-4 border border-gold-400/30 transition-all duration-500 group-hover:inset-0" />
              <div className="relative h-[520px] w-full overflow-hidden">
                {missionImg && (
                  <Image
                    src={missionImg}
                    alt={BRAND.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          MANIFESTO
      ───────────────────────────────────────── */}
      <section className="overflow-hidden bg-earth-900 py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <AnimatedSection>
            <p className="label-gold mb-6">{about.manifestoLabel ?? 'Our Manifesto'}</p>
            <h2 className="mb-14 font-serif text-3xl font-light italic leading-snug text-cream-100 md:text-4xl">
              "{about.manifestoQuote ?? 'Adventure is a right, not a luxury.'}"
            </h2>
          </AnimatedSection>

          <StaggerContainer className="space-y-10 border-l-2 border-gold-400/30 pl-10" staggerChildren={0.1}>
            {beliefs.map((belief, i) => (
              <StaggerItem key={belief.title} direction="up">
                <span className="mb-2 block font-serif text-sm font-bold text-gold-400">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mb-3 font-serif text-2xl font-bold text-cream-100">{belief.title}</h3>
                <p className="text-base leading-relaxed text-earth-300">{belief.description}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimatedSection delay={0.15} className="mt-14 border-t border-earth-700 pt-8">
            <p className="text-sm text-earth-400">
              Every itinerary we run also funds our conservation work, including the National
              Geographic-backed Blue Gold Initiative.{' '}
              <Link href="/conservation" className="text-gold-400 hover:underline">
                See how we give back <FiArrowRight className="inline" size={12} />
              </Link>
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          TIMELINE  (shown only if Sanity data)
      ───────────────────────────────────────── */}
      {timeline.length > 0 && (
        <section className="py-24 lg:py-32 bg-cream-100 overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 lg:px-10">
            <AnimatedSection className="text-center mb-20">
              <p className="label-gold mb-4">Our Journey</p>
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
          CTA - premium image-backed close
      ───────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="relative min-h-[520px] flex items-center">
          <Image src={heroImg} alt="Tanzania" fill className="object-cover object-center" sizes="100vw" />
          <div className="absolute inset-0 bg-earth-900/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-earth-900 via-earth-900/75 to-earth-900/35" />

          <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 lg:px-10 py-24">
            <div className="max-w-2xl">
              <AnimatedSection>
                <p className="label-gold mb-6">Let's connect</p>
                <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-cream-100 leading-[1.05] mb-8">
                  Ready to write your chapter?
                </h2>
                <p className="text-cream-100/75 text-base md:text-lg leading-[1.9] mb-12">
                  Start with a package, browse the blog, or see who's behind Minzah Safaris on our portfolio.
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
                      <Link href="/portfolio" className="btn-gold-outline min-w-[200px] inline-flex items-center justify-center gap-2">
                        Meet the Creator <FiArrowRight size={14} />
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
