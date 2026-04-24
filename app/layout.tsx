import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

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
    default: 'Mary Minza Lucas | Travel Creator & Digital Marketing Strategist',
    template: '%s · Mary Minza Lucas',
  },
  description:
    'Affordable Adventures. Authentic Stories. Hidden Tanzania Revealed. Mary Minza Lucas is a travel content creator and digital marketing strategist based in Dar es Salaam.',
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
    siteName: 'Mary Minza Lucas',
    title: 'Mary Minza Lucas | Travel Creator & Digital Marketing Strategist',
    description:
      'Affordable Adventures. Authentic Stories. Hidden Tanzania Revealed.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Mary Minza Lucas — Tanzania Travel',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mary Minza Lucas | Tanzania Travel Creator',
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
