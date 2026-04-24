export const revalidate = 60

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'
import PackageCard from '@/components/PackageCard'
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/AnimatedSection'
import { getAllPackages } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Travel Packages — Curated Tanzania Experiences',
  description:
    'Curated travel packages designed by Mary Minza Lucas — Serengeti safari, Zanzibar getaways, Dar es Salaam city tours, and more. Transparent pricing for every group size.',
}

const HERO_BG = 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&q=80'

export default async function PackagesPage() {
  const packages = await getAllPackages()

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'safari', label: 'Safari' },
    { value: 'beach', label: 'Beach & Islands' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'city', label: 'City Tours' },
  ]

  return (
    <>
      {/* ============================
          HERO
      ============================ */}
      <section className="relative pt-20 min-h-[65vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={HERO_BG}
            alt="Tanzania Travel Packages"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-earth-900/72" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <AnimatedSection>
            <p className="label-gold mb-4">Mary's Curated Experiences</p>
            <h1 className="font-serif text-6xl sm:text-7xl font-bold text-cream-100 leading-none mb-4">
              Travel
            </h1>
            <h1 className="font-serif text-6xl sm:text-7xl font-bold text-gold-400 italic leading-none mb-8">
              Packages
            </h1>
            <p className="text-cream-100/75 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
              Every package is personally designed and tested by Mary. No filler days, no generic
              itineraries — just handpicked experiences with transparent pricing for every group size.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#packages" className="btn-primary">
                Explore Packages <FiArrowRight className="inline ml-1" size={13} />
              </a>
              <Link href="/contact" className="btn-outline-light">
                Custom Trip Request
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ============================
          HOW IT WORKS
      ============================ */}
      <section className="py-16 bg-sand-100">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-8" staggerChildren={0.12}>
            {[
              {
                step: '01',
                title: 'Choose Your Experience',
                desc: 'Browse packages by type, duration, and budget. Use the price calculator to see exact costs for your group.',
              },
              {
                step: '02',
                title: 'Contact Mary Directly',
                desc: 'Every booking is personal. Reach out via WhatsApp or the contact form and Mary will confirm availability.',
              },
              {
                step: '03',
                title: 'Travel with Confidence',
                desc: 'Your itinerary is finalized, all logistics handled. Show up and experience Tanzania the way it was meant to be.',
              },
            ].map((item) => (
              <StaggerItem key={item.step}>
                <div className="flex gap-5 items-start p-6 bg-white shadow-card">
                  <div className="font-serif text-gold-400 text-3xl font-bold flex-shrink-0">{item.step}</div>
                  <div>
                    <h3 className="font-serif text-earth-900 font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-earth-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ============================
          PACKAGES GRID
      ============================ */}
      <section id="packages" className="py-24 bg-cream-100">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          <AnimatedSection className="mb-14">
            <p className="label-gold mb-3">All Packages</p>
            <h2 className="section-title">
              Choose Your<br />
              <span className="text-gold-500 italic">Adventure</span>
            </h2>
          </AnimatedSection>

          {packages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg, i) => (
                <PackageCard key={pkg._id} pkg={pkg} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-earth-400">
              <p className="font-serif text-2xl mb-4">Packages coming soon</p>
              <p className="text-sm mb-8">Contact Mary directly for current availability.</p>
              <Link href="/contact" className="btn-secondary">Get in Touch</Link>
            </div>
          )}
        </div>
      </section>

      {/* ============================
          PRICING INFO
      ============================ */}
      <section className="py-16 bg-earth-900">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <AnimatedSection className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label-gold mb-4">How Pricing Works</p>
              <h2 className="section-title-light mb-6 text-3xl md:text-4xl">
                Transparent Pricing,<br />No Surprises
              </h2>
              <p className="text-earth-300 leading-relaxed mb-4">
                Each package has multiple pricing tiers based on group size. The larger your group,
                the lower the per-person cost. Use the price calculator on any package page to
                instantly see the exact price for your group.
              </p>
              <p className="text-earth-400 text-sm leading-relaxed">
                All prices are in USD. Payment plans available — ask Mary directly.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { icon: '🧭', title: 'Solo Travelers', desc: 'Private packages designed for independent explorers.' },
                { icon: '👫', title: 'Couples & Small Groups', desc: 'Intimate experiences for 2–4 travelers.' },
                { icon: '👥', title: 'Large Groups', desc: 'Best value per person — perfect for friends & families.' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 bg-earth-800 px-5 py-4">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h4 className="text-cream-100 font-semibold text-sm mb-1">{item.title}</h4>
                    <p className="text-earth-400 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ============================
          CUSTOM TRIP CTA
      ============================ */}
      <section className="py-20 bg-gold-400">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="font-serif text-earth-900 text-4xl md:text-5xl font-bold mb-4">
              Don't See Your Dream Trip?
            </h2>
            <p className="text-earth-900/70 text-base mb-10">
              Every itinerary I create is fully customizable. Tell me your dates, budget, and
              interests — I'll design something just for you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-secondary">
                Request a Custom Trip
              </Link>
              <a
                href="https://wa.me/255712345678"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border-2 border-earth-900 text-earth-900 hover:bg-earth-900 hover:text-cream-100 font-semibold text-xs uppercase tracking-widest px-8 py-4 transition-all duration-300"
              >
                WhatsApp Mary
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
