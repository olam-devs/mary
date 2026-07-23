import { sanityFetch } from './sanity'
import type { BlogPost, TravelPackage, PortfolioItem, AboutContent, SiteSettings, HomepageContent, ContactPageContent, PortfolioSettings, BlogPageContent, PackagesPageContent, ConservationPageContent } from './types'
import { mockBlogPosts, mockPackages, mockPortfolioItems, mockAboutContent, mockSiteSettings, mockHomepageContent, mockContactPageContent, mockPortfolioSettings, mockConservationPageContent } from './mockData'

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
  itinerary,
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
  // "itinerary" was added after some live packages were created — fall back to
  // the matching mock package's itinerary (if any) so the section isn't just missing.
  const mockMatch = mockPackages.find((p) => p.slug.current === pkg.slug)
  return {
    ...pkg,
    slug: { current: pkg.slug },
    currency: pkg.currency ?? 'USD',
    itinerary: pkg.itinerary?.length ? pkg.itinerary : mockMatch?.itinerary,
    images: (pkg.images || []).map((img: any) => ({
      ...img,
      imageUrl: img?.asset?.url,
    })),
    // Only send tiers marked visible (or with no visible field set - legacy)
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
    heroBgImage ${IMAGE_PROJECTION},
    heroEyebrow,
    heroHeadline,
    heroSubtext,
    storyLabel,
    missionHeading,
    missionBody1,
    missionBody2,
    missionImage ${IMAGE_PROJECTION},
    quote,
    profileImage ${IMAGE_PROJECTION},
    bioText,
    highlights,
    manifestoLabel,
    manifestoQuote,
    beliefs,
    timeline,
    stats
  }`
  const result = await sanityFetch<any>(query)
  if (!result) return mockAboutContent
  return {
    ...result,
    missionHeading: result.missionHeading || mockAboutContent.missionHeading,
    missionBody1: result.missionBody1 || mockAboutContent.missionBody1,
    missionBody2: result.missionBody2 || mockAboutContent.missionBody2,
    manifestoQuote: result.manifestoQuote || mockAboutContent.manifestoQuote,
    beliefs: result.beliefs?.length ? result.beliefs : mockAboutContent.beliefs,
    heroBgImage: result.heroBgImage
      ? { ...result.heroBgImage, imageUrl: result.heroBgImage?.asset?.url }
      : undefined,
    missionImage: result.missionImage?.asset?.url
      ? { ...result.missionImage, imageUrl: result.missionImage.asset.url }
      : mockAboutContent.missionImage,
    profileImage: result.profileImage
      ? { ...result.profileImage, imageUrl: result.profileImage?.asset?.url }
      : mockAboutContent.profileImage,
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
    heroBadge,
    heroHeadline,
    heroTagline1,
    heroImage ${IMAGE_PROJECTION},
    heroWidget,
    stats,
    regionsHeading,
    regionsBody,
    regions[] {
      name,
      description,
      href,
      image ${IMAGE_PROJECTION}
    },
    whyChooseLabel,
    whyChooseHeading,
    whyChooseBody,
    whyChooseImage ${IMAGE_PROJECTION},
    whyChooseBadgeNumber,
    whyChooseBadgeLabel,
    whyChooseFeatures,
    partnershipHeading,
    partnershipBody,
    partnershipBgImage ${IMAGE_PROJECTION}
  }`
  const result = await sanityFetch<any>(query)
  if (!result) return mockHomepageContent

  // Fields added after the live Sanity document was first created won't exist
  // in it yet — fall back to the mock defaults per-field so the page never
  // looks half-built while the client fills in Studio.
  const regions = result.regions?.length ? result.regions : mockHomepageContent.regions
  const whyChooseFeatures = result.whyChooseFeatures?.length
    ? result.whyChooseFeatures
    : mockHomepageContent.whyChooseFeatures
  const whyChooseImage = result.whyChooseImage ?? mockHomepageContent.whyChooseImage
  const heroWidget = result.heroWidget ?? mockHomepageContent.heroWidget

  return {
    ...result,
    regionsBody: result.regionsBody || mockHomepageContent.regionsBody,
    whyChooseBody: result.whyChooseBody || mockHomepageContent.whyChooseBody,
    heroWidget,
    heroImage: result.heroImage ? { ...result.heroImage, imageUrl: result.heroImage?.asset?.url } : undefined,
    whyChooseImage: whyChooseImage?.asset?.url
      ? { ...whyChooseImage, imageUrl: whyChooseImage.asset.url }
      : whyChooseImage,
    regions: regions.map((r: any) => ({
      ...r,
      image: r.image?.asset?.url ? { ...r.image, imageUrl: r.image.asset.url } : r.image,
    })),
    whyChooseFeatures,
    partnershipBgImage: result.partnershipBgImage ? { ...result.partnershipBgImage, imageUrl: result.partnershipBgImage?.asset?.url } : undefined,
  }
}

// ============================================================
// CONTACT PAGE
// ============================================================

export async function getContactPageContent(): Promise<ContactPageContent> {
  const query = `*[_type == "contactPage"][0] {
    heroBgImage ${IMAGE_PROJECTION},
    heroDescription,
    subDescription,
    ctaHeading,
    ctaBody,
    responseTimes
  }`
  const result = await sanityFetch<any>(query)
  if (!result) return mockContactPageContent
  return {
    ...result,
    heroBgImage: result.heroBgImage
      ? { ...result.heroBgImage, imageUrl: result.heroBgImage?.asset?.url }
      : undefined,
  }
}

// ============================================================
// PORTFOLIO SETTINGS
// ============================================================

export async function getPortfolioSettings(): Promise<PortfolioSettings> {
  const query = `*[_type == "portfolioSettings"][0] {
    heroBgImage ${IMAGE_PROJECTION},
    heroDescription,
    services,
    insightsHeading,
    insightsDescription,
    insightsGallery[] {
      platform,
      caption,
      image ${IMAGE_PROJECTION}
    },
    pitchDescription,
    pitchBullets,
    testimonials
  }`
  const result = await sanityFetch<any>(query)
  if (!result) return mockPortfolioSettings
  return {
    ...result,
    heroBgImage: result.heroBgImage
      ? { ...result.heroBgImage, imageUrl: result.heroBgImage?.asset?.url }
      : undefined,
    services: result.services?.length ? result.services : mockPortfolioSettings.services,
    pitchBullets: result.pitchBullets?.length ? result.pitchBullets : mockPortfolioSettings.pitchBullets,
    testimonials: result.testimonials?.length ? result.testimonials : mockPortfolioSettings.testimonials,
    insightsGallery: (result.insightsGallery || []).map((item: any) => ({
      ...item,
      image: item.image ? { ...item.image, imageUrl: item.image?.asset?.url } : undefined,
    })),
  }
}

// ============================================================
// BLOG PAGE CONTENT
// ============================================================

export async function getBlogPageContent(): Promise<BlogPageContent> {
  const query = `*[_type == "blogPage"][0] {
    heroBgImage ${IMAGE_PROJECTION},
    heroTitle,
    heroDescription
  }`
  const result = await sanityFetch<any>(query)
  if (!result) return {}
  return {
    ...result,
    heroBgImage: result.heroBgImage
      ? { ...result.heroBgImage, imageUrl: result.heroBgImage?.asset?.url }
      : undefined,
  }
}

// ============================================================
// PACKAGES PAGE CONTENT
// ============================================================

export async function getPackagesPageContent(): Promise<PackagesPageContent> {
  const query = `*[_type == "packagesPage"][0] {
    heroBgImage ${IMAGE_PROJECTION},
    heroTitle,
    heroTitleItalic,
    heroDescription
  }`
  const result = await sanityFetch<any>(query)
  if (!result) return {}
  return {
    ...result,
    heroBgImage: result.heroBgImage
      ? { ...result.heroBgImage, imageUrl: result.heroBgImage?.asset?.url }
      : undefined,
  }
}

// ============================================================
// CONSERVATION PAGE CONTENT
// ============================================================

export async function getConservationPageContent(): Promise<ConservationPageContent> {
  const query = `*[_type == "conservationPage"][0] {
    heroBgImage ${IMAGE_PROJECTION},
    heroLabel,
    heroHeading,
    heroSubtext,
    historyLabel,
    historyHeading,
    historyBody1,
    historyBody2,
    historyImage ${IMAGE_PROJECTION},
    historyStats,
    natGeoLabel,
    natGeoHeading,
    natGeoBody,
    natGeoImage ${IMAGE_PROJECTION},
    pillarsHeading,
    pillarsBody,
    pillars[] {
      icon,
      title,
      body,
      image ${IMAGE_PROJECTION}
    },
    ctaHeading,
    ctaBody,
    ctaBgImage ${IMAGE_PROJECTION}
  }`
  const result = await sanityFetch<any>(query)
  if (!result) return mockConservationPageContent
  return {
    ...mockConservationPageContent,
    ...result,
    heroBgImage: result.heroBgImage
      ? { ...result.heroBgImage, imageUrl: result.heroBgImage?.asset?.url }
      : mockConservationPageContent.heroBgImage,
    historyImage: result.historyImage
      ? { ...result.historyImage, imageUrl: result.historyImage?.asset?.url }
      : mockConservationPageContent.historyImage,
    natGeoImage: result.natGeoImage
      ? { ...result.natGeoImage, imageUrl: result.natGeoImage?.asset?.url }
      : mockConservationPageContent.natGeoImage,
    ctaBgImage: result.ctaBgImage
      ? { ...result.ctaBgImage, imageUrl: result.ctaBgImage?.asset?.url }
      : mockConservationPageContent.ctaBgImage,
    historyStats: result.historyStats?.length ? result.historyStats : mockConservationPageContent.historyStats,
    pillars: result.pillars?.length
      ? result.pillars.map((p: any) => ({
          ...p,
          image: p.image?.asset?.url ? { ...p.image, imageUrl: p.image.asset.url } : p.image,
        }))
      : mockConservationPageContent.pillars,
  }
}
