import { sanityFetch } from './sanity'
import type { BlogPost, TravelPackage, PortfolioItem, AboutContent, SiteSettings, HomepageContent, ContactPageContent, PortfolioSettings } from './types'
import { mockBlogPosts, mockPackages, mockPortfolioItems, mockAboutContent, mockSiteSettings, mockHomepageContent, mockContactPageContent, mockPortfolioSettings } from './mockData'

const IMAGE_PROJECTION = `{
  asset->{url, _id},
  alt,
  hotspot
}`

// ============================================================
// BLOG POSTS
// ============================================================

const BLOG_POST_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  category,
  excerpt,
  mainImage ${IMAGE_PROJECTION},
  publishedAt,
  featured,
  readTime
`

export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  const query = `*[_type == "blogPost" && featured == true] | order(publishedAt desc)[0..2] {
    ${BLOG_POST_FIELDS}
  }`
  const result = await sanityFetch<any[]>(query)
  return normalizeBlogPosts(result) ?? mockBlogPosts.filter((p) => p.featured).slice(0, 3)
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const query = `*[_type == "blogPost"] | order(publishedAt desc) {
    ${BLOG_POST_FIELDS}
  }`
  const result = await sanityFetch<any[]>(query)
  return normalizeBlogPosts(result) ?? mockBlogPosts
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const query = `*[_type == "blogPost" && slug.current == $slug][0] {
    ${BLOG_POST_FIELDS},
    content,
    seo
  }`
  const result = await sanityFetch<any>(query, { slug })
  if (result) return normalizeBlogPost(result)
  return mockBlogPosts.find((p) => p.slug.current === slug) ?? null
}

function normalizeBlogPost(post: any): BlogPost {
  return {
    ...post,
    slug: { current: post.slug },
    mainImage: post.mainImage
      ? { ...post.mainImage, imageUrl: post.mainImage?.asset?.url }
      : undefined,
  }
}

function normalizeBlogPosts(posts: any[] | null): BlogPost[] | null {
  if (!posts) return null
  return posts.map(normalizeBlogPost)
}

// ============================================================
// TRAVEL PACKAGES
// ============================================================

const PACKAGE_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  description,
  highlights,
  images[] ${IMAGE_PROJECTION},
  location,
  duration,
  availabilityMonths,
  currency,
  pricingTiers[] {
    visible,
    minPeople,
    maxPeople,
    totalPrice
  },
  included,
  excluded,
  featured,
  category
`

export async function getFeaturedPackages(): Promise<TravelPackage[]> {
  const query = `*[_type == "travelPackage" && featured == true] | order(_createdAt desc)[0..2] {
    ${PACKAGE_FIELDS}
  }`
  const result = await sanityFetch<any[]>(query)
  return normalizePackages(result) ?? mockPackages.filter((p) => p.featured).slice(0, 3)
}

export async function getAllPackages(): Promise<TravelPackage[]> {
  const query = `*[_type == "travelPackage"] | order(_createdAt desc) {
    ${PACKAGE_FIELDS}
  }`
  const result = await sanityFetch<any[]>(query)
  return normalizePackages(result) ?? mockPackages
}

export async function getPackageBySlug(slug: string): Promise<TravelPackage | null> {
  const query = `*[_type == "travelPackage" && slug.current == $slug][0] {
    ${PACKAGE_FIELDS}
  }`
  const result = await sanityFetch<any>(query, { slug })
  if (result) return normalizePackage(result)
  return mockPackages.find((p) => p.slug.current === slug) ?? null
}

function normalizePackage(pkg: any): TravelPackage {
  return {
    ...pkg,
    slug: { current: pkg.slug },
    currency: pkg.currency ?? 'USD',
    images: (pkg.images || []).map((img: any) => ({
      ...img,
      imageUrl: img?.asset?.url,
    })),
    // Only send tiers marked visible (or with no visible field set — legacy)
    pricingTiers: (pkg.pricingTiers || []).filter(
      (t: any) => t.visible !== false
    ),
  }
}

function normalizePackages(pkgs: any[] | null): TravelPackage[] | null {
  if (!pkgs) return null
  return pkgs.map(normalizePackage)
}

// ============================================================
// PORTFOLIO
// ============================================================

export async function getAllPortfolioItems(): Promise<PortfolioItem[]> {
  const query = `*[_type == "portfolioItem"] | order(coalesce(order, 999), _createdAt desc) {
    _id,
    title,
    description,
    type,
    brand,
    projectImage ${IMAGE_PROJECTION},
    media[] ${IMAGE_PROJECTION},
    videoUrl,
    results,
    link,
    featured,
    order
  }`
  const result = await sanityFetch<any[]>(query)
  if (!result) return mockPortfolioItems
  return result.map((item) => ({
    ...item,
    projectImage: item.projectImage ? { ...item.projectImage, imageUrl: item.projectImage?.asset?.url } : null,
    media: (item.media || []).map((m: any) => ({ ...m, imageUrl: m?.asset?.url })),
  }))
}

// ============================================================
// ABOUT
// ============================================================

export async function getAboutContent(): Promise<AboutContent> {
  const query = `*[_type == "aboutContent"][0] {
    _id,
    heroImage ${IMAGE_PROJECTION},
    quote,
    beliefs,
    forExplorer {
      heading,
      body,
      image ${IMAGE_PROJECTION}
    },
    forBrand {
      heading,
      body,
      image ${IMAGE_PROJECTION}
    },
    timeline,
    stats
  }`
  const result = await sanityFetch<any>(query)
  if (!result) return mockAboutContent
  return {
    ...result,
    heroImage: result.heroImage
      ? { ...result.heroImage, imageUrl: result.heroImage?.asset?.url }
      : undefined,
    forExplorer: result.forExplorer
      ? {
          ...result.forExplorer,
          image: result.forExplorer.image
            ? { ...result.forExplorer.image, imageUrl: result.forExplorer.image?.asset?.url }
            : undefined,
        }
      : undefined,
    forBrand: result.forBrand
      ? {
          ...result.forBrand,
          image: result.forBrand.image
            ? { ...result.forBrand.image, imageUrl: result.forBrand.image?.asset?.url }
            : undefined,
        }
      : undefined,
  }
}

// ============================================================
// SITE SETTINGS
// ============================================================

export async function getSiteSettings(): Promise<SiteSettings> {
  const query = `*[_type == "siteSettings"][0] {
    _id,
    siteTitle,
    tagline,
    email,
    whatsapp,
    instagram,
    twitter,
    youtube,
    tiktok,
    mediaKit { asset->{ url } }
  }`
  const result = await sanityFetch<any>(query)
  return result ?? mockSiteSettings
}

// ============================================================
// HOMEPAGE CONTENT
// ============================================================

export async function getHomepageContent(): Promise<HomepageContent> {
  const query = `*[_type == "homepageContent"][0] {
    heroEyebrow,
    heroTagline1,
    heroTagline2,
    heroImage ${IMAGE_PROJECTION},
    stats,
    aboutHeading,
    aboutQuote,
    aboutBody1,
    aboutBody2,
    destinations,
    partnershipHeading,
    partnershipBody,
    partnershipBgImage ${IMAGE_PROJECTION}
  }`
  const result = await sanityFetch<any>(query)
  if (!result) return mockHomepageContent
  return {
    ...result,
    heroImage: result.heroImage ? { ...result.heroImage, imageUrl: result.heroImage?.asset?.url } : undefined,
    partnershipBgImage: result.partnershipBgImage ? { ...result.partnershipBgImage, imageUrl: result.partnershipBgImage?.asset?.url } : undefined,
  }
}

// ============================================================
// CONTACT PAGE
// ============================================================

export async function getContactPageContent(): Promise<ContactPageContent> {
  const query = `*[_type == "contactPage"][0] {
    heroDescription,
    subDescription,
    ctaHeading,
    ctaBody,
    responseTimes
  }`
  const result = await sanityFetch<any>(query)
  return result ?? mockContactPageContent
}

// ============================================================
// PORTFOLIO SETTINGS
// ============================================================

export async function getPortfolioSettings(): Promise<PortfolioSettings> {
  const query = `*[_type == "portfolioSettings"][0] {
    heroDescription,
    services,
    pitchDescription,
    pitchBullets,
    testimonials
  }`
  const result = await sanityFetch<any>(query)
  return result ?? mockPortfolioSettings
}
