export const revalidate = 0

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { FiArrowRight, FiExternalLink, FiDownload } from 'react-icons/fi'
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/AnimatedSection'
import { getAllPortfolioItems, getSiteSettings, getPortfolioSettings, getAboutContent } from '@/lib/queries'
import { BRAND } from '@/lib/brand'

export const metadata: Metadata = {
  title: 'Portfolio: Brand Partnerships & Creative Work',
  description:
    'Mary Minza Lucas partners with hotels, restaurants, and destinations to create authentic UGC, manage social media, and tell immersive travel stories. View the portfolio.',
}

const DEFAULT_HERO_BG = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80'

const typeColors: Record<string, string> = {
  UGC: 'bg-gold-400 text-earth-900',
  Brand: 'bg-earth-700 text-cream-100',
  Social: 'bg-forest-600 text-cream-100',
  Travel: 'bg-sand-300 text-earth-900',
  Campaign: 'bg-sky-700 text-cream-100',
}

const typeLabels: Record<string, string> = {
  UGC: 'User Generated Content',
  Brand: 'Brand Feature & Review',
  Social: 'Social Media Management',
  Travel: 'Experience Design',
  Campaign: 'Campaign',
}

export default async function PortfolioPage() {
  const [items, settings, portfolioData, about] = await Promise.all([
    getAllPortfolioItems(),
    getSiteSettings(),
    getPortfolioSettings(),
    getAboutContent(),
  ])

  const mediaKitUrl = settings.mediaKit?.asset?.url
  const heroDescription = portfolioData.heroDescription
  const services = portfolioData.services ?? []
  const insightsHeading = portfolioData.insightsHeading
  const insightsDescription = portfolioData.insightsDescription
  const insightsGallery = portfolioData.insightsGallery ?? []
  const pitchDescription = portfolioData.pitchDescription
  const pitchBullets = portfolioData.pitchBullets ?? []
  const testimonials = portfolioData.testimonials ?? []
  const bioText = about.bioText ?? []

  return (
    <>
      {/* ============================
          HERO
      ============================ */}
      <section className="relative pt-20 min-h-[65vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={portfolioData.heroBgImage?.imageUrl || DEFAULT_HERO_BG}
            alt={`Partnership with ${BRAND.name}`}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-earth-900/78" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <AnimatedSection>
            <p className="label-gold mb-4">Digital Marketing Strategist & Travel Storyteller</p>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-cream-100 leading-tight mb-4">
              Partnership with
            </h1>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-gold-400 italic leading-tight mb-10">
              {BRAND.name}
            </h1>
            <div className="divider-gold max-w-20 mx-auto mb-8" />
            <p className="text-cream-100 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10 font-semibold">
              {heroDescription ??
                'I am passionate about collaborating with brands that value authenticity and discovery. By blending cinematic storytelling with strategic digital marketing, I help hotels, restaurants, and destinations increase visibility and connect with modern travelers.'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {mediaKitUrl && (
                <a
                  href={mediaKitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="btn-primary"
                >
                  <FiDownload size={15} /> Download Media Kit
                </a>
              )}
              <Link href="/contact" className="btn-outline-light">
                Start a Partnership
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ============================
          MEET THE CREATOR
      ============================ */}
      {bioText.length > 0 && (
        <section className="overflow-hidden bg-cream-100 py-24 lg:py-32">
          <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
              <div className="lg:col-span-4 order-2 lg:order-1">
                <AnimatedSection direction="left" className="h-full">
                  <div className="bg-earth-900 shadow-luxury overflow-hidden h-full">
                    <div className="relative h-full min-h-[420px]">
                      {about.profileImage?.imageUrl && (
                        <Image
                          src={about.profileImage.imageUrl}
                          alt={about.profileImage?.alt || BRAND.legalName}
                          fill
                          className="object-cover object-top"
                          sizes="(min-width: 1024px) 34vw, 100vw"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-earth-900/85 via-earth-900/10 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-7">
                        <p className="font-serif text-cream-100 text-xl italic leading-relaxed">
                          "{about.quote ?? 'Adventure is a right, not a luxury.'}"
                        </p>
                        <div className="h-px bg-gold-400/40 w-16 mt-6" />
                        <p className="text-earth-300 text-xs uppercase tracking-widest mt-4">
                          {BRAND.legalName}
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>

              <div className="lg:col-span-8 order-1 lg:order-2">
                <AnimatedSection direction="right" className="h-full">
                  <div className="bg-white border border-earth-200 shadow-card p-10 lg:p-12 h-full flex flex-col justify-center">
                    <p className="label-gold mb-5">Meet the Creator</p>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-earth-900 leading-tight mb-6">
                      The Person <span className="text-gold-500 italic">Behind Minzah Safaris</span>
                    </h2>
                    {bioText.map((para, i) => (
                      <p key={i} className="text-earth-600 text-base leading-[1.9] mt-4 first:mt-0">
                        {para}
                      </p>
                    ))}

                    {about.highlights && about.highlights.length > 0 && (
                      <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {about.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2 text-earth-700 text-sm">
                            <span className="text-gold-500 mt-0.5 flex-shrink-0">→</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}

                    <Link href="/about" className="btn-outline-dark inline-flex items-center gap-2 mt-8 self-start">
                      About Minzah Safaris <FiArrowRight size={14} />
                    </Link>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================
          SERVICES
      ============================ */}
      <section className="py-24 bg-cream-100">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          <AnimatedSection className="text-center mb-16">
            <p className="label-gold mb-4">What I Offer</p>
            <h2 className="section-title">
              Services &<br />
              <span className="text-gold-500 italic">Deliverables</span>
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8" staggerChildren={0.1}>
            {services.map((service) => (
              <StaggerItem key={service.title}>
                <div className="bg-white shadow-card hover:shadow-card-hover transition-shadow duration-500 p-8 h-full">
                  <div className="text-4xl mb-5">{service.icon}</div>
                  <h3 className="font-serif text-earth-900 text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-earth-500 text-sm leading-relaxed mb-6">{service.desc}</p>
                  <ul className="space-y-2">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-earth-600 text-sm">
                        <span className="w-1.5 h-1.5 bg-gold-400 rounded-full flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ============================
          FEATURED LODGES
      ============================ */}
      {items.filter((i) => i.featured).length > 0 && (
        <section className="py-24 bg-earth-900">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
            <AnimatedSection className="text-center mb-16">
              <p className="label-gold mb-4">Trusted By</p>
              <h2 className="section-title-light">
                Featured<br />
                <span className="text-gold-400 italic">Lodges & Partners</span>
              </h2>
              <p className="text-earth-300 text-base leading-relaxed max-w-2xl mx-auto mt-6">
                A collection of lodges and hospitality brands whose digital presence and booking
                volume have been transformed through this partnership ecosystem.
              </p>
            </AnimatedSection>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerChildren={0.08}>
              {items.filter((i) => i.featured).slice(0, 6).map((item) => {
                const imageUrl =
                  item.projectImage?.imageUrl ||
                  item.projectImage?.asset?.url ||
                  item.media?.[0]?.imageUrl ||
                  item.media?.[0]?.asset?.url
                const statLine = item.results?.slice(0, 2).map((r) => `${r.value} ${r.label}`).join(' · ')

                return (
                  <StaggerItem key={item._id}>
                    <div className="group overflow-hidden rounded-xl">
                      <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-xl">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-earth-800" />
                        )}
                        {item.brand && (
                          <span className="absolute right-4 top-4 rounded bg-earth-900/70 px-3 py-1 text-xs text-cream-100 backdrop-blur-md">
                            {item.brand}
                          </span>
                        )}
                      </div>
                      <h4 className="mb-1 font-serif text-lg font-bold text-cream-100">{item.title}</h4>
                      {statLine && <p className="text-sm text-earth-300">{statLine}</p>}
                    </div>
                  </StaggerItem>
                )
              })}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* ============================
          INSIGHTS / SOCIAL PROOF
      ============================ */}
      {insightsGallery.length > 0 && (
        <section className="py-24 bg-sand-100">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
            <AnimatedSection className="text-center mb-16">
              <p className="label-earth mb-4">Social Proof</p>
              <h2 className="section-title">
                {insightsHeading || 'Performance'}<br />
                <span className="text-gold-500 italic">Insights</span>
              </h2>
              {insightsDescription && (
                <p className="text-earth-600 text-base leading-relaxed max-w-2xl mx-auto mt-6">
                  {insightsDescription}
                </p>
              )}
            </AnimatedSection>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" staggerChildren={0.08}>
              {insightsGallery.map((item, i) => {
                const imageUrl = item.image?.imageUrl || item.image?.asset?.url
                const alt = item.caption || `${item.platform || 'Social'} insights screenshot ${i + 1}`
                if (!imageUrl) return null

                return (
                  <StaggerItem key={`${item.caption ?? 'insight'}-${i}`}>
                    <div className="bg-white shadow-card overflow-hidden">
                      <div className="relative aspect-[4/3] bg-cream-100">
                        <Image
                          src={imageUrl}
                          alt={alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 33vw"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between gap-4">
                          <p className="text-earth-900 font-semibold text-sm">
                            {item.caption || 'Insights'}
                          </p>
                          {item.platform && (
                            <span className="text-[10px] uppercase tracking-widest text-earth-400">
                              {item.platform}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                )
              })}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* ============================
          PORTFOLIO GRID
      ============================ */}
      <section className="py-24 bg-sand-100">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          <AnimatedSection className="mb-16">
            <p className="label-earth mb-4">Selected Work</p>
            <h2 className="section-title">
              Recent<br />
              <span className="text-gold-500 italic">Projects</span>
            </h2>
          </AnimatedSection>

          <div className="space-y-12">
            {items.map((item, i) => {
              const imageUrl =
                item.projectImage?.imageUrl ||
                item.projectImage?.asset?.url ||
                item.media?.[0]?.imageUrl ||
                item.media?.[0]?.asset?.url
              const imageAlt = item.projectImage?.alt || item.media?.[0]?.alt || item.title
              const badgeClass = typeColors[item.type] || 'bg-earth-700 text-cream-100'
              const typeLabel = typeLabels[item.type] || item.type

              return (
                <AnimatedSection key={item._id} delay={0.05 * (i % 4)}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 shadow-luxury overflow-hidden bg-white">

                    {/* Content - always LEFT */}
                    <div className="p-10 lg:p-14 flex flex-col justify-center">
                      <span className={`self-start text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 mb-4 ${badgeClass}`}>
                        {typeLabel}
                      </span>
                      <h3 className="font-serif text-earth-900 text-2xl lg:text-3xl font-bold mb-3">
                        {item.title}
                      </h3>
                      {item.brand && (
                        <p className="text-gold-500 text-sm font-medium mb-4">{item.brand}</p>
                      )}
                      {item.description && (
                        <p className="text-earth-500 text-sm leading-relaxed mb-6">
                          {item.description}
                        </p>
                      )}

                      {/* Results */}
                      {item.results && item.results.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                          {item.results.map((result) => (
                            <div key={result.label} className="bg-cream-100 px-4 py-3 text-center">
                              <div className="font-serif text-gold-500 font-bold text-xl">{result.value}</div>
                              <div className="text-earth-400 text-[10px] uppercase tracking-wide mt-0.5">{result.label}</div>
                            </div>
                          ))}
                        </div>
                      )}

                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-gold-500 text-sm font-medium hover:underline"
                        >
                          View Project <FiExternalLink size={13} />
                        </a>
                      )}
                    </div>

                    {/* Image - always RIGHT */}
                    <div className="relative aspect-video lg:aspect-auto min-h-[320px] overflow-hidden bg-earth-100">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={imageAlt}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-cream-200 text-earth-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-xs uppercase tracking-widest opacity-50">Add image in Sanity Studio</p>
                        </div>
                      )}
                    </div>

                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============================
          PITCH + MEDIA KIT
      ============================ */}
      <section className="py-24 bg-earth-900">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <p className="label-gold mb-6">Working Together</p>
              <h2 className="section-title-light mb-6 text-3xl md:text-4xl">
                Let's Create Something<br />
                <span className="text-gold-400 italic">Worth Talking About</span>
              </h2>
              <p className="text-cream-100 font-semibold leading-relaxed mb-8">
                {pitchDescription ??
                  'I am passionate about collaborating with brands that value authenticity and discovery. By blending cinematic storytelling with strategic digital marketing, I help hotels, restaurants, and destinations increase visibility and connect with modern travelers who are looking for genuine, memorable experiences.'}
              </p>
              <div className="space-y-3 mb-10">
                {(pitchBullets.length > 0 ? pitchBullets : [
                  'Audience: 50K+ travel-intent followers across platforms',
                  'Speciality: Tanzania, East Africa, boutique hospitality',
                  'Deliverables: UGC, blog content, social strategy, campaigns',
                  'Response time: within 24 business hours',
                ]).map((item) => (
                  <div key={item} className="flex items-start gap-3 text-earth-300 text-sm">
                    <span className="text-gold-400 mt-0.5 flex-shrink-0">→</span>
                    {item}
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" className="space-y-4">
              {mediaKitUrl && (
                <a
                  href={mediaKitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="btn-primary w-full flex items-center justify-center gap-2 py-5"
                >
                  <FiDownload size={16} /> Download Media Kit (PDF)
                </a>
              )}
              <Link
                href="/contact"
                className="btn-gold-outline w-full flex items-center justify-center gap-2 py-5"
              >
                Send a Partnership Inquiry <FiArrowRight size={14} />
              </Link>
              {settings.whatsapp && (
                <a
                  href={`https://wa.me/${settings.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-earth-800 hover:bg-earth-700 text-cream-100 text-xs font-semibold uppercase tracking-widest transition-colors duration-300"
                >
                  💬 WhatsApp: +{settings.whatsapp}
                </a>
              )}
              <p className="text-earth-600 text-xs text-center leading-relaxed">
                Available for collaborations across Tanzania, East Africa, and select global projects.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ============================
          TESTIMONIALS (placeholder)
      ============================ */}
      <section className="py-20 bg-cream-100">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <AnimatedSection className="text-center mb-12">
            <p className="label-gold mb-3">What Brands Say</p>
            <h2 className="font-serif text-earth-900 text-3xl font-bold">Kind Words</h2>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerChildren={0.12}>
            {testimonials.map((t, i) => (
              <StaggerItem key={i}>
                <div className="bg-white shadow-card p-8 relative">
                  <div className="text-gold-400 font-serif text-5xl leading-none mb-4 absolute top-6 left-7 opacity-20">"</div>
                  <p className="text-earth-600 text-sm leading-relaxed italic mb-6 pt-4">{t.quote}</p>
                  <div className="border-t border-cream-200 pt-4">
                    <p className="text-earth-900 font-semibold text-sm">{t.author}</p>
                    <p className="text-earth-400 text-xs">{t.brand}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  )
}
