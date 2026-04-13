export interface SanityImage {
  asset: {
    _ref?: string
    url?: string
  }
  alt?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

export interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  category: 'solo-travel' | 'group-travel' | 'itineraries' | 'hotels-restaurants'
  excerpt?: string
  content?: any[]
  mainImage?: SanityImage & { imageUrl?: string }
  publishedAt: string
  featured?: boolean
  readTime?: number
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}

export interface PricingTier {
  minPeople: number
  maxPeople: number
  totalPrice: number
  visible?: boolean
}

export interface TravelPackage {
  _id: string
  title: string
  slug: { current: string }
  description: string
  highlights?: string[]
  images: Array<SanityImage & { imageUrl?: string }>
  location: string
  duration?: string
  availabilityMonths?: string[]
  currency?: 'USD' | 'TSh'
  pricingTiers: PricingTier[]
  included?: string[]
  excluded?: string[]
  featured?: boolean
  category?: string
}

export interface PortfolioItem {
  _id: string
  title: string
  description?: string
  type: 'UGC' | 'Brand' | 'Social' | 'Travel' | 'Campaign'
  brand?: string
  projectImage?: SanityImage & { imageUrl?: string }
  media: Array<SanityImage & { imageUrl?: string }>
  videoUrl?: string
  results?: Array<{ label: string; value: string }>
  link?: string
  featured?: boolean
  order?: number
}

export interface TimelineItem {
  year: string
  event: string
  description?: string
}

export interface AboutContent {
  _id: string
  heroTitle?: string
  heroSubtitle?: string
  heroImage?: SanityImage & { imageUrl?: string }
  bio?: any[]
  quote?: string
  beliefs?: Array<{ title: string; description?: string; icon?: string }>
  forExplorer?: { heading?: string; body?: string; image?: SanityImage & { imageUrl?: string } }
  forBrand?: { heading?: string; body?: string; image?: SanityImage & { imageUrl?: string } }
  timeline?: TimelineItem[]
  stats?: Array<{ value: string; label: string }>
}

export interface SiteSettings {
  _id: string
  siteTitle?: string
  tagline?: string
  email?: string
  whatsapp?: string
  instagram?: string
  twitter?: string
  youtube?: string
  tiktok?: string
  mediaKit?: { asset: { url: string } }
}

export interface HomepageContent {
  heroEyebrow?: string
  heroTagline1?: string
  heroTagline2?: string
  heroImage?: SanityImage & { imageUrl?: string }
  stats?: Array<{ display: number; suffix: string; label: string }>
  aboutHeading?: string
  aboutQuote?: string
  aboutBody1?: string
  aboutBody2?: string
  destinations?: string[]
  partnershipHeading?: string
  partnershipBody?: string
  partnershipBgImage?: SanityImage & { imageUrl?: string }
}

export interface ContactPageContent {
  heroDescription?: string
  subDescription?: string
  ctaHeading?: string
  ctaBody?: string
  responseTimes?: Array<{ category: string; time: string; description: string }>
}

export interface PortfolioSettings {
  heroDescription?: string
  services?: Array<{
    icon: string
    title: string
    desc: string
    features: string[]
  }>
  pitchDescription?: string
  pitchBullets?: string[]
  testimonials?: Array<{ quote: string; author: string; brand: string }>
}

export type BlogCategory =
  | 'all'
  | 'solo-travel'
  | 'group-travel'
  | 'itineraries'
  | 'hotels-restaurants'

export const categoryLabels: Record<string, string> = {
  'all': 'All Posts',
  'solo-travel': 'Solo Travel',
  'group-travel': 'Group Travel',
  'itineraries': 'Itineraries',
  'hotels-restaurants': 'Hotels & Restaurants',
}
