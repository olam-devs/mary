import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { BRAND } from '@/lib/brand'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://maryminzalucas.com'),
  title: {
    default: `${BRAND.name} | Tanzania Safari & Travel`,
    template: `%s · ${BRAND.name}`,
  },
  description:
    `${BRAND.motto} Hidden Tanzania Revealed. Safari packages, travel guides, and brand partnerships by ${BRAND.legalName}.`,
  keywords: [
    'Tanzania travel',
    'Dar es Salaam',
    'Zanzibar',
    'travel blog',
    'Africa adventures',
    'travel packages',
    'content creator Tanzania',
    'digital marketing',
    'safari Tanzania',
  ],
  authors: [{ name: 'Mary Minza Lucas' }],
  creator: 'Mary Minza Lucas',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: BRAND.name,
    title: `${BRAND.name} | Tanzania Safari & Travel`,
    description:
      'Affordable Adventures. Authentic Stories. Hidden Tanzania Revealed.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Mary Minza Lucas: Tanzania Travel',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND.name} | Tanzania Safaris`,
    description: 'Affordable Adventures. Authentic Stories. Hidden Tanzania Revealed.',
    creator: '@maryminzalucas',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-cream-100 text-earth-900 font-sans antialiased overflow-x-hidden">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
