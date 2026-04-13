'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/packages', label: 'Packages' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Close mobile on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 bg-earth-900 shadow-luxury"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-[72px] lg:h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gold-400 flex items-center justify-center flex-shrink-0">
                <span className="font-serif text-earth-900 font-bold text-sm leading-none">MML</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-serif text-cream-100 font-bold text-base tracking-wide leading-tight group-hover:text-gold-400 transition-colors duration-300">
                  Mary Minza Lucas
                </div>
                <div className="text-earth-400 text-[10px] tracking-luxury uppercase">Travel Creator</div>
              </div>
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-[11px] font-semibold uppercase tracking-wider transition-colors duration-300 ${
                      active ? 'text-gold-400' : 'text-cream-100/80 hover:text-cream-100'
                    }`}
                  >
                    {link.label}
                    {active && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-4 right-4 h-px bg-gold-400"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-4">
              <Link
                href="/contact"
                className="hidden lg:inline-flex items-center justify-center bg-gold-400 hover:bg-gold-500 text-earth-900 font-semibold text-[11px] tracking-widest uppercase px-6 py-2.5 transition-all duration-300"
              >
                Work With Me
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden text-cream-100 hover:text-gold-400 transition-colors duration-200 p-1"
                aria-label="Toggle navigation menu"
              >
                {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-earth-900 flex flex-col"
          >
            {/* Top bar spacer */}
            <div className="h-[72px] flex-shrink-0" />

            <div className="flex-1 overflow-y-auto px-8 py-12 flex flex-col">
              <nav className="flex flex-col gap-2 flex-1">
                {navLinks.map((link, i) => {
                  const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07, duration: 0.4 }}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center justify-between py-4 border-b border-earth-700 group transition-colors duration-200 ${
                          active ? 'text-gold-400' : 'text-cream-100 hover:text-gold-400'
                        }`}
                      >
                        <span className="font-serif text-3xl font-bold">{link.label}</span>
                        {active && <div className="w-2 h-2 bg-gold-400 rounded-full" />}
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-12 space-y-4"
              >
                <Link
                  href="/contact"
                  className="block w-full text-center bg-gold-400 hover:bg-gold-500 text-earth-900 font-semibold text-sm tracking-widest uppercase px-8 py-4 transition-all duration-300"
                >
                  Work With Me
                </Link>
                <Link
                  href="/packages"
                  className="block w-full text-center border border-cream-100/30 text-cream-100 hover:border-gold-400 hover:text-gold-400 font-semibold text-sm tracking-widest uppercase px-8 py-4 transition-all duration-300"
                >
                  View Packages
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-10 text-earth-500 text-xs tracking-widest uppercase"
              >
                Tanzania Travel Creator · Est. 2019
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
