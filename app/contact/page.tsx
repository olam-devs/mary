import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  FiMail,
  FiInstagram,
  FiTwitter,
  FiYoutube,
  FiMapPin,
  FiMessageCircle,
} from 'react-icons/fi'
import ContactForm from '@/components/ContactForm'
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/AnimatedSection'
import { getContactPageContent, getSiteSettings } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Contact Mary Minza Lucas — Bookings & Partnerships',
  description:
    'Get in touch with Mary Minza Lucas for travel package bookings, brand partnerships, social media management, or any Tanzania travel questions.',
}

const HERO_BG = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=75'

export default async function ContactPage() {
  const [content, settings] = await Promise.all([
    getContactPageContent(),
    getSiteSettings(),
  ])

  const whatsappNumber = settings.whatsapp ?? '255712345678'
  const email = settings.email ?? 'hello@maryminzalucas.com'
  const instagram = settings.instagram ?? 'https://instagram.com/maryminzalucas'
  const twitter = settings.twitter ?? 'https://twitter.com/maryminzalucas'
  const youtube = settings.youtube ?? 'https://youtube.com/@maryminzalucas'

  const responseTimes = content.responseTimes ?? [
    { category: 'Travel Packages', time: 'Within 24h', description: 'Response for booking inquiries' },
    { category: 'Brand Partnerships', time: '2 Business Days', description: 'Response for collaboration requests' },
    { category: 'General Questions', time: 'Always', description: 'Every message is read personally' },
  ]

  return (
    <>
      {/* ============================
          HERO
      ============================ */}
      <section className="relative pt-20 min-h-[50vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={HERO_BG}
            alt="Contact Mary Minza Lucas"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-earth-900/78" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <AnimatedSection>
            <p className="label-gold mb-4">Let's Connect</p>
            <h1 className="font-serif text-6xl sm:text-7xl font-bold text-cream-100 leading-none mb-4">
              Get in
            </h1>
            <h1 className="font-serif text-6xl sm:text-7xl font-bold text-gold-400 italic leading-none mb-8">
              Touch
            </h1>
            <p className="text-cream-100 text-base md:text-lg max-w-xl mx-auto leading-relaxed font-semibold">
              {content.heroDescription ??
                "Whether you're planning a trip, exploring a partnership, or simply want to say hello — Mary personally reads every message."}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ============================
          MAIN CONTENT
      ============================ */}
      <section className="py-24 bg-cream-100">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* LEFT: Info */}
            <AnimatedSection direction="left" className="space-y-10">
              <div>
                <p className="label-gold mb-4">How to Reach Mary</p>
                <h2 className="section-title mb-6 text-3xl md:text-4xl">
                  Always Happy<br />
                  <span className="text-gold-500 italic">to Hear From You</span>
                </h2>
                <p className="text-earth-600 leading-8">
                  {content.subDescription ??
                    'All messages are read personally. For travel bookings, expect a response within 24 hours. For brand partnerships, Mary reviews all inquiries within 2 business days.'}
                </p>
              </div>

              {/* Contact Methods */}
              <StaggerContainer className="space-y-4" staggerChildren={0.1}>
                {[
                  {
                    icon: FiMessageCircle,
                    label: 'WhatsApp (Fastest Response)',
                    value: `+${whatsappNumber}`,
                    href: `https://wa.me/${whatsappNumber}`,
                    highlight: true,
                  },
                  {
                    icon: FiMail,
                    label: 'Email',
                    value: email,
                    href: `mailto:${email}`,
                  },
                  {
                    icon: FiMapPin,
                    label: 'Based in',
                    value: 'Dar es Salaam, Tanzania 🇹🇿',
                    href: undefined,
                  },
                ].map(({ icon: Icon, label, value, href, highlight }) => (
                  <StaggerItem key={label}>
                    <div className={`flex items-center gap-5 px-6 py-5 transition-colors duration-300 ${
                      highlight ? 'bg-earth-900 hover:bg-earth-800' : 'bg-white shadow-card hover:shadow-card-hover'
                    }`}>
                      <div className={`w-10 h-10 flex items-center justify-center flex-shrink-0 ${
                        highlight ? 'bg-gold-400' : 'bg-cream-200'
                      }`}>
                        <Icon size={18} className={highlight ? 'text-earth-900' : 'text-earth-600'} />
                      </div>
                      <div>
                        <p className={`text-[10px] uppercase tracking-widest mb-0.5 ${highlight ? 'text-gold-400' : 'text-earth-400'}`}>
                          {label}
                        </p>
                        {href ? (
                          <a
                            href={href}
                            target={href.startsWith('http') ? '_blank' : undefined}
                            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className={`text-sm font-medium hover:underline ${highlight ? 'text-cream-100' : 'text-earth-700'}`}
                          >
                            {value}
                          </a>
                        ) : (
                          <p className={`text-sm font-medium ${highlight ? 'text-cream-100' : 'text-earth-700'}`}>
                            {value}
                          </p>
                        )}
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              {/* Social Media */}
              <div>
                <p className="label-earth mb-5">Follow the Journey</p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { icon: FiInstagram, href: instagram, label: 'Instagram', handle: '@maryminzalucas' },
                    { icon: FiTwitter, href: twitter, label: 'Twitter', handle: '@maryminzalucas' },
                    { icon: FiYoutube, href: youtube, label: 'YouTube', handle: 'MaryMinzaLucas' },
                  ].map(({ icon: Icon, href, label, handle }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-white shadow-card hover:shadow-card-hover px-5 py-3 group transition-all duration-300"
                    >
                      <Icon size={16} className="text-earth-400 group-hover:text-gold-500 transition-colors" />
                      <div>
                        <div className="text-[10px] text-earth-400 uppercase tracking-wide">{label}</div>
                        <div className="text-earth-700 text-sm font-medium group-hover:text-gold-500 transition-colors">{handle}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick CTA */}
              <div className="bg-gold-400 p-8">
                <h3 className="font-serif text-earth-900 text-xl font-bold mb-2">
                  {content.ctaHeading ?? 'Planning a Trip?'}
                </h3>
                <p className="text-earth-900/70 text-sm leading-relaxed mb-5">
                  {content.ctaBody ??
                    "Skip the form — browse curated packages and use the price calculator to get instant pricing for your group."}
                </p>
                <Link href="/packages" className="btn-secondary text-xs">
                  Browse Travel Packages →
                </Link>
              </div>
            </AnimatedSection>

            {/* RIGHT: Form */}
            <AnimatedSection direction="right">
              <div className="bg-white shadow-luxury p-10">
                <h2 className="font-serif text-earth-900 text-2xl font-bold mb-2">Send a Message</h2>
                <p className="text-earth-400 text-sm mb-8">
                  Fill out the form below and Mary will personally get back to you.
                </p>
                <ContactForm />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ============================
          RESPONSE TIMES
      ============================ */}
      <section className="py-16 bg-earth-900">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-8" staggerChildren={0.1}>
            {responseTimes.map((item) => (
              <StaggerItem key={item.category}>
                <div className="text-center">
                  <p className="text-gold-400 text-xs uppercase tracking-widest mb-2">{item.category}</p>
                  <p className="font-serif text-cream-100 text-2xl font-bold mb-1">{item.time}</p>
                  <p className="text-earth-400 text-xs">{item.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  )
}
