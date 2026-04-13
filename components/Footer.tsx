'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiInstagram, FiTwitter, FiYoutube, FiMail, FiArrowRight } from 'react-icons/fi'
import { useState } from 'react'

const footerLinks = {
  explore: [
    { href: '/about', label: 'About Mary' },
    { href: '/blog', label: 'Travel Blog' },
    { href: '/packages', label: 'Travel Packages' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/contact', label: 'Contact' },
  ],
  categories: [
    { href: '/blog?category=solo-travel', label: 'Solo Travel' },
    { href: '/blog?category=group-travel', label: 'Group Travel' },
    { href: '/blog?category=itineraries', label: 'Itineraries' },
    { href: '/blog?category=hotels-restaurants', label: 'Hotels & Restaurants' },
  ],
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.includes('@')) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer className="bg-earth-900 text-cream-100">
      {/* Partnership CTA Strip */}
      <div className="bg-gold-400">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-serif text-earth-900 text-lg font-bold">
            Ready to tell your brand story?
          </p>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 bg-earth-900 hover:bg-earth-800 text-cream-100 text-xs font-semibold uppercase tracking-widest px-6 py-3 transition-colors duration-300"
          >
            View Partnership Work <FiArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gold-400 flex items-center justify-center">
                <span className="font-serif text-earth-900 font-bold text-sm">MML</span>
              </div>
              <div>
                <div className="font-serif text-cream-100 font-bold text-base">Mary Minza Lucas</div>
                <div className="text-earth-400 text-[10px] tracking-luxury uppercase">Tanzania · Est. 2019</div>
              </div>
            </div>
            <p className="text-earth-300 text-sm leading-relaxed mb-6">
              Affordable Adventures. Authentic Stories. Hidden Tanzania Revealed.
            </p>
            <p className="text-earth-500 text-xs italic font-serif">
              "Adventure is a right, not a luxury."
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-8">
              {[
                { icon: FiInstagram, href: 'https://instagram.com/maryminzalucas', label: 'Instagram' },
                { icon: FiTwitter, href: 'https://twitter.com/maryminzalucas', label: 'Twitter' },
                { icon: FiYoutube, href: 'https://youtube.com/@maryminzalucas', label: 'YouTube' },
                { icon: FiMail, href: 'mailto:hello@maryminzalucas.com', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="w-9 h-9 border border-earth-700 hover:border-gold-400 hover:text-gold-400 flex items-center justify-center transition-all duration-300 text-earth-400"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="label-gold mb-6">Explore</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-earth-300 hover:text-gold-400 text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-4 h-px bg-earth-600 group-hover:bg-gold-400 transition-colors duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog Categories */}
          <div>
            <h4 className="label-gold mb-6">Blog Categories</h4>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-earth-300 hover:text-gold-400 text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-4 h-px bg-earth-600 group-hover:bg-gold-400 transition-colors duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <h4 className="label-gold mb-4">Contact</h4>
              <a
                href="mailto:hello@maryminzalucas.com"
                className="text-earth-300 hover:text-gold-400 text-sm transition-colors duration-200 block mb-2"
              >
                hello@maryminzalucas.com
              </a>
              <a
                href="https://wa.me/255712345678"
                target="_blank"
                rel="noopener noreferrer"
                className="text-earth-300 hover:text-gold-400 text-sm transition-colors duration-200"
              >
                WhatsApp: +255 712 345 678
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="label-gold mb-6">Stay Inspired</h4>
            <p className="text-earth-300 text-sm leading-relaxed mb-6">
              Hidden gems, honest travel guides, and brand partnership updates — straight to your inbox.
            </p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-forest-600/30 border border-forest-600 px-5 py-4"
              >
                <p className="text-cream-100 text-sm font-medium">You're in! </p>
                <p className="text-earth-300 text-xs mt-1">Hidden Tanzania incoming soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full bg-earth-800 border border-earth-700 text-cream-100 px-4 py-3 text-sm placeholder:text-earth-500 focus:outline-none focus:border-gold-400 transition-colors duration-200"
                />
                <button
                  type="submit"
                  className="w-full bg-gold-400 hover:bg-gold-500 text-earth-900 font-semibold text-xs uppercase tracking-widest py-3 transition-colors duration-300"
                >
                  Subscribe
                </button>
              </form>
            )}

            <p className="text-earth-600 text-xs mt-4 leading-relaxed">
              No spam. Unsubscribe anytime. Your privacy matters.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-earth-800">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-earth-500 text-xs">
            © {new Date().getFullYear()} Mary Minza Lucas. All rights reserved.
          </p>
          <p className="text-earth-600 text-xs">
            Dar es Salaam, Tanzania 🇹🇿
          </p>
        </div>
      </div>
    </footer>
  )
}
