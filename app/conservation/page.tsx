export const revalidate = 0

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { FiArrowRight, FiCompass } from 'react-icons/fi'
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/AnimatedSection'
import { getConservationPageContent } from '@/lib/queries'
import { BRAND } from '@/lib/brand'

export const metadata: Metadata = {
  title: 'Conservation & Impact',
  description:
    'How Minzah Safaris gives back: a National Geographic storytelling externship, the Blue Gold Initiative, and conservation-first safari travel across Tanzania.',
}

export default async function ConservationPage() {
  const c = await getConservationPageContent()

  return (
    <>
      {/* ============================
          HERO
      ============================ */}
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          {c.heroBgImage?.imageUrl && (
            <Image src={c.heroBgImage.imageUrl} alt={c.heroHeading ?? 'Conservation'} fill priority className="object-cover object-center" sizes="100vw" />
          )}
          <div className="absolute inset-0 bg-earth-900/72" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <AnimatedSection>
            <p className="label-gold mb-4">{c.heroLabel ?? 'Our Commitment'}</p>
            <h1 className="mb-6 font-serif text-5xl font-bold leading-tight text-cream-100 sm:text-6xl md:text-7xl">
              {c.heroHeading ?? 'Our Journey & Commitment to the Wild'}
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-cream-100/80 md:text-lg">
              {c.heroSubtext}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ============================
          HISTORY / COMMITMENT
      ============================ */}
      <section className="overflow-hidden bg-cream-100 py-24 lg:py-32">
        <div className="mx-auto max-w-screen-xl px-6 lg:px-10">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <AnimatedSection direction="left" className="space-y-6">
              <p className="label-gold">{c.historyLabel ?? 'Where It Started'}</p>
              <h2 className="font-serif text-3xl font-bold leading-tight text-earth-900 md:text-4xl">
                {c.historyHeading ?? 'From Storyteller to Steward'}
              </h2>
              <p className="text-base leading-[1.9] text-earth-600">{c.historyBody1}</p>
              <p className="text-base leading-[1.9] text-earth-600">{c.historyBody2}</p>

              {c.historyStats && c.historyStats.length > 0 && (
                <div className="flex flex-wrap gap-8 border-t border-earth-200 pt-6">
                  {c.historyStats.map((stat) => (
                    <div key={stat.label}>
                      <div className="font-serif text-2xl font-bold text-gold-500">{stat.value}</div>
                      <div className="text-[11px] uppercase tracking-widest text-earth-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </AnimatedSection>

            <AnimatedSection direction="right" className="relative">
              <div className="relative aspect-square overflow-hidden rounded-3xl shadow-luxury">
                {c.historyImage?.imageUrl && (
                  <Image
                    src={c.historyImage.imageUrl}
                    alt="Field work"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 45vw, 90vw"
                  />
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ============================
          NATIONAL GEOGRAPHIC SPOTLIGHT
      ============================ */}
      <section className="overflow-hidden bg-earth-900 py-24 lg:py-32">
        <div className="mx-auto max-w-screen-xl px-6 lg:px-10">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <AnimatedSection direction="left" className="relative order-2 lg:order-1">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                {c.natGeoImage?.imageUrl && (
                  <Image
                    src={c.natGeoImage.imageUrl}
                    alt={c.natGeoHeading ?? 'Blue Gold Initiative'}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 45vw, 90vw"
                  />
                )}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" className="order-1 space-y-6 lg:order-2">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-400/15 text-gold-400">
                <FiCompass size={26} />
              </span>
              <p className="label-gold">{c.natGeoLabel ?? 'National Geographic Externship'}</p>
              <h2 className="font-serif text-3xl font-bold leading-tight text-cream-100 md:text-4xl">
                {c.natGeoHeading ?? 'The Blue Gold Initiative'}
              </h2>
              <p className="text-base leading-[1.9] text-earth-300">{c.natGeoBody}</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ============================
          PILLARS
      ============================ */}
      <section className="bg-cream-100 py-24 lg:py-32">
        <div className="mx-auto max-w-screen-xl px-6 lg:px-10">
          <AnimatedSection className="mx-auto mb-16 max-w-2xl text-center">
            <p className="label-gold mb-4">How We Give Back</p>
            <h2 className="section-title mb-6">{c.pillarsHeading ?? 'Conservation & Community'}</h2>
            <p className="text-base leading-relaxed text-earth-600">{c.pillarsBody}</p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 gap-8 md:grid-cols-3" staggerChildren={0.1}>
            {(c.pillars ?? []).map((pillar) => (
              <StaggerItem key={pillar.title}>
                <div className="h-full overflow-hidden rounded-2xl border border-earth-200 bg-white shadow-card">
                  <div className="relative aspect-video">
                    {pillar.image?.imageUrl && (
                      <Image src={pillar.image.imageUrl} alt={pillar.title ?? ''} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                    )}
                  </div>
                  <div className="p-6">
                    <div className="mb-3 text-3xl">{pillar.icon}</div>
                    <h4 className="mb-2 font-serif text-lg font-bold text-earth-900">{pillar.title}</h4>
                    <p className="text-sm leading-relaxed text-earth-500">{pillar.body}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ============================
          CTA
      ============================ */}
      <section className="relative overflow-hidden">
        <div className="relative flex min-h-[420px] items-center">
          {c.ctaBgImage?.imageUrl && (
            <Image src={c.ctaBgImage.imageUrl} alt={BRAND.name} fill className="object-cover object-center" sizes="100vw" />
          )}
          <div className="absolute inset-0 bg-earth-900/75" />
          <div className="relative z-10 mx-auto max-w-3xl px-6 py-20 text-center">
            <AnimatedSection>
              <h2 className="mb-6 font-serif text-4xl font-bold leading-tight text-cream-100 md:text-5xl">
                {c.ctaHeading ?? 'Travel That Gives Back'}
              </h2>
              <p className="mb-10 text-base leading-relaxed text-cream-100/80 md:text-lg">{c.ctaBody}</p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/packages" className="btn-primary inline-flex items-center gap-2">
                  Plan Your Trip <FiArrowRight size={14} />
                </Link>
                <Link href="/about" className="btn-outline-light">
                  Read Our Story
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
