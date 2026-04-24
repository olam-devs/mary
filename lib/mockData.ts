import type { BlogPost, TravelPackage, PortfolioItem, AboutContent, SiteSettings, HomepageContent, ContactPageContent, PortfolioSettings } from './types'

// Curated Unsplash images — Tanzania / Africa travel aesthetic
const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1920&q=85',
  safari1: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&q=80',
  safari2: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=1200&q=80',
  zanzibar1: 'https://images.unsplash.com/photo-1586861203927-800a5acdce4d?w=1200&q=80',
  zanzibar2: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80',
  kilimanjaro: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=80',
  dares: 'https://images.unsplash.com/photo-1604999333679-a86c04a2d8ef?w=1200&q=80',
  stonetown: 'https://images.unsplash.com/photo-1585123334904-845d60e97b29?w=1200&q=80',
  hotel1: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
  hotel2: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80',
  restaurant: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
  blogger: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=800&q=80',
  travel1: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80',
  travel2: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=1200&q=80',
  travel3: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=1200&q=80',
  cultural: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=1200&q=80',
  waterfall: 'https://images.unsplash.com/photo-1489493585363-d69421e0edd3?w=1200&q=80',
  arusha: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1200&q=80',
  beach: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
  food: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80',
}

// ============================================================
// MOCK BLOG POSTS
// ============================================================

export const mockBlogPosts: BlogPost[] = [
  {
    _id: 'blog-1',
    title: 'Hidden Restaurants in Dar es Salaam You Must Visit',
    slug: { current: 'hidden-restaurants-dar-es-salaam' },
    category: 'hotels-restaurants',
    excerpt: 'Beyond the tourist trail lies a vibrant food scene that most visitors never discover. I spent a month eating my way through Dar es Salaam so you don\'t have to start from scratch.',
    mainImage: { asset: { url: IMAGES.restaurant }, alt: 'Dar es Salaam local restaurant', imageUrl: IMAGES.restaurant } as any,
    publishedAt: '2024-11-15T00:00:00.000Z',
    featured: true,
    readTime: 8,
  },
  {
    _id: 'blog-2',
    title: 'Budget Safari: How I Did Serengeti for Under $800',
    slug: { current: 'budget-serengeti-safari-guide' },
    category: 'itineraries',
    excerpt: 'Safari doesn\'t have to mean luxury lodges with sky-high price tags. Here\'s my complete guide to experiencing the Serengeti on a real budget without compromising the magic.',
    mainImage: { asset: { url: IMAGES.safari1 }, alt: 'Serengeti Safari Tanzania', imageUrl: IMAGES.safari1 } as any,
    publishedAt: '2024-10-22T00:00:00.000Z',
    featured: true,
    readTime: 12,
  },
  {
    _id: 'blog-3',
    title: 'Solo Female Travel in Tanzania: What I Wish I Knew',
    slug: { current: 'solo-female-travel-tanzania' },
    category: 'solo-travel',
    excerpt: 'Safety, culture, transport, and the moments that took my breath away. This is the honest guide I wish existed when I first arrived in Tanzania alone.',
    mainImage: { asset: { url: IMAGES.travel3 }, alt: 'Solo female traveler Tanzania', imageUrl: IMAGES.travel3 } as any,
    publishedAt: '2024-09-30T00:00:00.000Z',
    featured: true,
    readTime: 10,
  },
  {
    _id: 'blog-4',
    title: 'The Perfect 7-Day Tanzanian Itinerary',
    slug: { current: 'perfect-7-day-tanzania-itinerary' },
    category: 'itineraries',
    excerpt: 'One week, three regions, zero wasted hours. This itinerary covers Dar es Salaam, Zanzibar, and a quick Kilimanjaro town stop — balanced for first-timers and return visitors.',
    mainImage: { asset: { url: IMAGES.zanzibar1 }, alt: 'Tanzania 7-day itinerary', imageUrl: IMAGES.zanzibar1 } as any,
    publishedAt: '2024-09-05T00:00:00.000Z',
    readTime: 15,
  },
  {
    _id: 'blog-5',
    title: 'Best Boutique Hotels in Zanzibar Under $150/Night',
    slug: { current: 'best-boutique-hotels-zanzibar' },
    category: 'hotels-restaurants',
    excerpt: 'Forget the over-hyped resort chains. These hidden boutique gems offer authentic Swahili architecture, warm hospitality, and stunning ocean views — without the inflated price tag.',
    mainImage: { asset: { url: IMAGES.hotel1 }, alt: 'Boutique hotel Zanzibar', imageUrl: IMAGES.hotel1 } as any,
    publishedAt: '2024-08-18T00:00:00.000Z',
    readTime: 9,
  },
  {
    _id: 'blog-6',
    title: 'Moshi to Arusha: A Road Tripper\'s Complete Guide',
    slug: { current: 'moshi-to-arusha-road-trip' },
    category: 'group-travel',
    excerpt: 'The road between Moshi and Arusha is one of the most scenic in East Africa — if you know where to stop. Here\'s everything from the best roadside nyama choma to Maasai market days.',
    mainImage: { asset: { url: IMAGES.kilimanjaro }, alt: 'Kilimanjaro area Tanzania', imageUrl: IMAGES.kilimanjaro } as any,
    publishedAt: '2024-07-25T00:00:00.000Z',
    readTime: 11,
  },
]

// ============================================================
// MOCK TRAVEL PACKAGES
// ============================================================

export const mockPackages: TravelPackage[] = [
  {
    _id: 'pkg-1',
    title: 'Serengeti Wildlife Safari',
    slug: { current: 'serengeti-wildlife-safari' },
    description: 'Experience the world-famous Great Migration and witness Tanzania\'s incredible wildlife in their natural habitat. Three days of immersive safari, expert-guided game drives, and luxury tented camps under a sky full of stars.',
    highlights: ['Two full game drives daily', 'Expert Swahili-English guide', 'All meals included', 'Tented camp accommodation', 'Park fees included', 'Airport transfers'],
    images: [
      { asset: { url: IMAGES.safari1 }, alt: 'Serengeti safari', imageUrl: IMAGES.safari1 } as any,
      { asset: { url: IMAGES.safari2 }, alt: 'Wildlife Tanzania', imageUrl: IMAGES.safari2 } as any,
      { asset: { url: IMAGES.cultural }, alt: 'Masai culture', imageUrl: IMAGES.cultural } as any,
    ],
    location: 'Serengeti National Park, Tanzania',
    duration: '3 Days / 2 Nights',
    availabilityMonths: ['January', 'February', 'June', 'July', 'August', 'September', 'October'],
    pricingTiers: [
      { minPeople: 1, maxPeople: 2, totalPrice: 1200 },
      { minPeople: 3, maxPeople: 4, totalPrice: 1600 },
      { minPeople: 5, maxPeople: 8, totalPrice: 2200 },
    ],
    included: ['Accommodation', 'All meals', 'Game drives', 'Park fees', 'Airport transfers'],
    excluded: ['International flights', 'Travel insurance', 'Personal expenses', 'Tips'],
    featured: true,
    category: 'safari',
  },
  {
    _id: 'pkg-2',
    title: 'Zanzibar Island Escape',
    slug: { current: 'zanzibar-island-escape' },
    description: 'Lose yourself in the turquoise waters and white sands of Zanzibar. This package combines Stone Town\'s UNESCO heritage with pristine beach days, spice tours, and sunset dhow cruises.',
    highlights: ['Stone Town walking tour', 'Spice farm visit', 'Sunset dhow cruise', 'Snorkelling at Mnemba Atoll', 'Beach resort accommodation', 'Swahili cooking class'],
    images: [
      { asset: { url: IMAGES.zanzibar1 }, alt: 'Zanzibar beach', imageUrl: IMAGES.zanzibar1 } as any,
      { asset: { url: IMAGES.zanzibar2 }, alt: 'Zanzibar ocean', imageUrl: IMAGES.zanzibar2 } as any,
      { asset: { url: IMAGES.stonetown }, alt: 'Stone Town Zanzibar', imageUrl: IMAGES.stonetown } as any,
    ],
    location: 'Zanzibar Island, Tanzania',
    duration: '4 Days / 3 Nights',
    availabilityMonths: ['January', 'February', 'March', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    pricingTiers: [
      { minPeople: 1, maxPeople: 2, totalPrice: 900 },
      { minPeople: 3, maxPeople: 4, totalPrice: 1400 },
      { minPeople: 5, maxPeople: 8, totalPrice: 1900 },
      { minPeople: 9, maxPeople: 12, totalPrice: 2600 },
    ],
    included: ['Boutique accommodation', 'Breakfast daily', 'All tours listed', 'Airport transfers'],
    excluded: ['Flights to Zanzibar', 'Lunch & dinner', 'Travel insurance'],
    featured: true,
    category: 'beach',
  },
  {
    _id: 'pkg-3',
    title: 'Dar es Salaam City & Coast',
    slug: { current: 'dar-es-salaam-city-coast' },
    description: 'The underrated capital has more soul than any guidebook captures. Two days in Dar\'s buzzing streets — local food markets, coastal villages, boutique hotels, and hidden beaches that only locals know.',
    highlights: ['Local food market tour', 'Bongoyo Island boat trip', 'Kariakoo bazaar experience', 'Sunset at Slipway', 'Boutique hotel stay', 'Private city guide'],
    images: [
      { asset: { url: IMAGES.dares }, alt: 'Dar es Salaam cityscape', imageUrl: IMAGES.dares } as any,
      { asset: { url: IMAGES.food }, alt: 'Local Tanzanian food', imageUrl: IMAGES.food } as any,
      { asset: { url: IMAGES.beach }, alt: 'Dar es Salaam beach', imageUrl: IMAGES.beach } as any,
    ],
    location: 'Dar es Salaam, Tanzania',
    duration: '2 Days / 1 Night',
    availabilityMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    pricingTiers: [
      { minPeople: 1, maxPeople: 2, totalPrice: 350 },
      { minPeople: 3, maxPeople: 4, totalPrice: 550 },
      { minPeople: 5, maxPeople: 8, totalPrice: 750 },
    ],
    included: ['Boutique hotel (1 night)', 'Breakfast', 'All guided tours', 'Local transport'],
    excluded: ['Flights', 'Lunch & dinner', 'Personal shopping'],
    featured: true,
    category: 'city',
  },
  {
    _id: 'pkg-4',
    title: 'Kilimanjaro Foothills & Waterfalls',
    slug: { current: 'kilimanjaro-foothills-waterfalls' },
    description: 'Not every Kili experience requires summiting the peak. This immersive route through the foothills covers Chagga villages, hidden waterfalls, coffee farm tours, and views that will stop you mid-sentence.',
    highlights: ['Materuni waterfalls hike', 'Coffee farm tour & tasting', 'Chagga village walk', 'Kilimanjaro views', 'Moshi town exploration', 'Local homestay option'],
    images: [
      { asset: { url: IMAGES.waterfall }, alt: 'Materuni waterfalls', imageUrl: IMAGES.waterfall } as any,
      { asset: { url: IMAGES.kilimanjaro }, alt: 'Kilimanjaro foothills', imageUrl: IMAGES.kilimanjaro } as any,
      { asset: { url: IMAGES.arusha }, alt: 'Moshi town area', imageUrl: IMAGES.arusha } as any,
    ],
    location: 'Moshi & Kilimanjaro Region, Tanzania',
    duration: '2 Days / 1 Night',
    availabilityMonths: ['January', 'February', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    pricingTiers: [
      { minPeople: 1, maxPeople: 2, totalPrice: 280 },
      { minPeople: 3, maxPeople: 4, totalPrice: 440 },
      { minPeople: 5, maxPeople: 8, totalPrice: 680 },
    ],
    included: ['Accommodation', 'All meals', 'Guided hikes', 'Coffee tasting', 'Village entry fees'],
    excluded: ['Flights/bus to Moshi', 'Travel insurance', 'Personal gear'],
    featured: false,
    category: 'adventure',
  },
  {
    _id: 'pkg-5',
    title: 'Stone Town Heritage & Culture',
    slug: { current: 'stone-town-heritage-culture' },
    description: 'A full day immersion into Zanzibar\'s UNESCO World Heritage Stone Town — a labyrinth of Arab, Indian, and African history. Private walking tours, spice markets, House of Wonders, and colonial architecture at golden hour.',
    highlights: ['UNESCO Stone Town walking tour', 'Spice markets & bazaars', 'Palace Museum visit', 'Sunset rooftop dinner', 'Traditional dhow photo tour', 'Expert local guide'],
    images: [
      { asset: { url: IMAGES.stonetown }, alt: 'Stone Town Zanzibar', imageUrl: IMAGES.stonetown } as any,
      { asset: { url: IMAGES.cultural }, alt: 'Zanzibar culture', imageUrl: IMAGES.cultural } as any,
      { asset: { url: IMAGES.food }, alt: 'Zanzibar food market', imageUrl: IMAGES.food } as any,
    ],
    location: 'Stone Town, Zanzibar',
    duration: '1 Day (Full Day)',
    availabilityMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    pricingTiers: [
      { minPeople: 1, maxPeople: 2, totalPrice: 180 },
      { minPeople: 3, maxPeople: 4, totalPrice: 280 },
      { minPeople: 5, maxPeople: 8, totalPrice: 400 },
      { minPeople: 9, maxPeople: 15, totalPrice: 600 },
    ],
    included: ['Expert guide', 'Museum entries', 'Sunset dinner', 'All transport within Stone Town'],
    excluded: ['Accommodation', 'Flights', 'Personal shopping'],
    featured: false,
    category: 'cultural',
  },
]

// ============================================================
// MOCK PORTFOLIO ITEMS
// ============================================================

export const mockPortfolioItems: PortfolioItem[] = [
  {
    _id: 'port-1',
    title: 'Zanzibar Pearl Resort — Full UGC Campaign',
    type: 'UGC',
    brand: 'Zanzibar Pearl Resort',
    description: 'A week-long content residency creating authentic visual stories for an award-winning boutique resort. Delivered 45+ photos and 12 reels that increased their Instagram engagement by 340%.',
    media: [
      { asset: { url: IMAGES.hotel1 }, alt: 'Zanzibar Pearl Resort', imageUrl: IMAGES.hotel1 } as any,
      { asset: { url: IMAGES.beach }, alt: 'Resort beach', imageUrl: IMAGES.beach } as any,
    ],
    results: [
      { label: 'Photos Delivered', value: '45+' },
      { label: 'Reels Created', value: '12' },
      { label: 'Engagement Increase', value: '340%' },
    ],
    featured: true,
    order: 1,
  },
  {
    _id: 'port-2',
    title: 'Karibu Tanzania Tourism Board',
    type: 'Brand',
    brand: 'Tanzania Tourism Board',
    description: 'Official brand partnership creating destination marketing content for the Tanzanian Tourism Board\'s "Discover Tanzania" campaign, reaching international audiences across East Africa.',
    media: [
      { asset: { url: IMAGES.safari1 }, alt: 'Tanzania safari content', imageUrl: IMAGES.safari1 } as any,
      { asset: { url: IMAGES.zanzibar1 }, alt: 'Zanzibar content', imageUrl: IMAGES.zanzibar1 } as any,
    ],
    results: [
      { label: 'Reach', value: '2.1M+' },
      { label: 'Countries Reached', value: '18' },
      { label: 'Content Pieces', value: '30' },
    ],
    featured: true,
    order: 2,
  },
  {
    _id: 'port-3',
    title: 'Social Media Strategy — Bahari Beach Hotel',
    type: 'Social',
    brand: 'Bahari Beach Hotel',
    description: 'Three-month social media management contract, developing content calendar, shooting monthly content days, and community management. Grew their following from 2,400 to 18,000 in 90 days.',
    media: [
      { asset: { url: IMAGES.hotel2 }, alt: 'Bahari Beach Hotel content', imageUrl: IMAGES.hotel2 } as any,
    ],
    results: [
      { label: 'Follower Growth', value: '18K' },
      { label: 'Growth Period', value: '90 days' },
      { label: 'Posts Created', value: '87' },
    ],
    featured: true,
    order: 3,
  },
  {
    _id: 'port-4',
    title: 'National Geographic — East Africa Externship',
    type: 'Campaign',
    brand: 'National Geographic',
    description: 'A storytelling externship documenting lesser-known communities in East Africa for National Geographic\'s digital platforms. Focused on authentic human stories behind Tanzania\'s tourism landscape.',
    media: [
      { asset: { url: IMAGES.cultural }, alt: 'National Geographic Tanzania', imageUrl: IMAGES.cultural } as any,
    ],
    results: [
      { label: 'Stories Published', value: '8' },
      { label: 'Digital Readers', value: '500K+' },
    ],
    featured: false,
    order: 4,
  },
  {
    _id: 'port-5',
    title: 'Kilimanjaro Group Trek — Experience Design',
    type: 'Travel',
    brand: 'Independent Project',
    description: 'Curated and led a group travel experience for 12 content creators from across Africa, combining the Kilimanjaro foothills with cultural community visits and a final Zanzibar retreat.',
    media: [
      { asset: { url: IMAGES.waterfall }, alt: 'Group trek Tanzania', imageUrl: IMAGES.waterfall } as any,
      { asset: { url: IMAGES.kilimanjaro }, alt: 'Kilimanjaro foothills', imageUrl: IMAGES.kilimanjaro } as any,
    ],
    results: [
      { label: 'Participants', value: '12' },
      { label: 'Days', value: '7' },
      { label: 'Content Generated', value: '200+' },
    ],
    featured: false,
    order: 5,
  },
]

// ============================================================
// MOCK ABOUT CONTENT
// ============================================================

export const mockAboutContent: AboutContent = {
  _id: 'aboutContent',
  profileImage: { asset: { url: IMAGES.blogger }, alt: 'Mary Minza Lucas', imageUrl: IMAGES.blogger } as any,
  quote: 'Adventure is a right, not a luxury.',
  bioText: [
    "I'm Mary Minza Lucas — a content creator and social media strategist based in Dar es Salaam, Tanzania. I believe deeply that extraordinary travel experiences shouldn't be reserved only for those with extraordinary budgets.",
    "My work begins where guidebooks end. I explore the hidden restaurants of Kariakoo, the boutique guesthouses in Stone Town no algorithm has found yet, the waterfalls above Moshi that most visitors drive right past.",
    "Beyond travel content, I work as a digital marketing strategist for hospitality brands — helping hotels, restaurants, and destinations connect with the modern traveler through authentic narrative, not polished stock photos.",
  ],
  highlights: [
    'National Geographic Externship — East Africa',
    'Explored 120+ destinations across Tanzania',
    'Digital marketing for 30+ hospitality brands',
    'Solo, group & curated group travel experiences',
  ],
  beliefs: [
    {
      title: 'Affordable Adventures',
      description: 'Proving that extraordinary experiences don\'t require extraordinary budgets. Every hidden gem I find, I share.',
      icon: '🌍',
    },
    {
      title: 'Authentic Restaurants',
      description: 'From roadside nyama choma to secret rooftop spots — I chase the real flavors of Tanzania, not the tourist menu.',
      icon: '🍽️',
    },
    {
      title: 'Boutique Hotels',
      description: 'Small properties with soul. The kind of places where the host knows your name and the walls tell stories.',
      icon: '🏨',
    },
  ],
  forExplorer: {
    heading: 'For the Explorer',
    body: 'If you\'re planning a trip to Tanzania and don\'t know where to start, I\'m your guide. I create detailed, honest, budget-aware content that helps real travelers make real decisions — not just dream from their couch. From solo itineraries to group adventures, every post is rooted in personal experience.',
    image: { asset: { url: IMAGES.travel1 }, alt: 'Tanzania explorer', imageUrl: IMAGES.travel1 } as any,
  },
  forBrand: {
    heading: 'For the Brand',
    body: 'I bridge the gap between businesses that need visibility and travelers who need guidance. Through cinematic content creation, strategic social media management, and authentic storytelling, I help hotels, restaurants, and destinations connect with modern, discerning travelers. If your brand values authenticity over polish, let\'s talk.',
    image: { asset: { url: IMAGES.hotel1 }, alt: 'Brand partnership', imageUrl: IMAGES.hotel1 } as any,
  },
  timeline: [
    {
      year: '2019',
      event: 'The First Step',
      description: 'Started documenting Dar es Salaam\'s hidden food scene on Instagram — completely unplanned. The response changed everything.',
    },
    {
      year: '2020',
      event: 'Solo Across Tanzania',
      description: 'Traveled solo through Moshi, Arusha, and Zanzibar during the quietest travel year in history. Found the beauty in empty places.',
    },
    {
      year: '2021',
      event: 'First Brand Partnership',
      description: 'Collaborated with a boutique Zanzibar resort, producing their first professional UGC campaign. The beginning of a new chapter.',
    },
    {
      year: '2022',
      event: 'National Geographic Externship',
      description: 'Joined a global storytelling project documenting East African communities — the most transformative creative experience of my career.',
    },
    {
      year: '2023',
      event: 'Digital Strategy Agency',
      description: 'Launched a full-service social media management arm, working with 5+ hospitality clients simultaneously across Tanzania.',
    },
    {
      year: '2024',
      event: 'Mary Minza Lucas — Fully Launched',
      description: 'Unified the blog, packages, and portfolio under one brand. Helping travelers explore Tanzania and helping brands tell their story.',
    },
  ],
  stats: [
    { value: '50K+', label: 'Social Followers' },
    { value: '120+', label: 'Destinations Covered' },
    { value: '30+', label: 'Brand Partnerships' },
    { value: '4', label: 'Years Creating' },
  ],
}

// ============================================================
// MOCK HOMEPAGE CONTENT
// ============================================================

export const mockHomepageContent: HomepageContent = {
  heroEyebrow: 'Dar es Salaam, Tanzania',
  heroTagline1: 'Affordable Adventures. Authentic Stories.',
  heroTagline2: 'Revealed.',
  stats: [
    { display: 50, suffix: 'K+', label: 'Followers' },
    { display: 120, suffix: '+', label: 'Destinations' },
    { display: 30, suffix: '+', label: 'Brand Partners' },
  ],
  aboutHeading: 'The Explorer Behind The Stories',
  aboutQuote: 'Adventure is a right, not a luxury.',
  aboutBody1:
    'Mary Minza Lucas is a content creator and digital marketing strategist based in Dar es Salaam, Tanzania. She believes extraordinary experiences belong to everyone — not just those with luxury budgets.',
  aboutBody2:
    'From hidden restaurants in Kariakoo to safari drives in the Serengeti, Mary bridges the gap between travelers who need guidance and brands that need visibility — through authentic storytelling and strategic digital marketing.',
  destinations: [
    'Dar es Salaam', 'Zanzibar', 'Serengeti', 'Moshi', 'Arusha',
    'Kilimanjaro', 'Stone Town', 'Ngorongoro', 'Pemba Island', 'Mikumi',
  ],
  partnershipHeading: "Let's Build Something Worth Sharing",
  partnershipBody:
    "I collaborate with hotels, restaurants, and destinations that value authentic storytelling. Cinematic UGC, social media strategy, and immersive experience design — all rooted in real Tanzania.",
}

// ============================================================
// MOCK CONTACT PAGE CONTENT
// ============================================================

export const mockContactPageContent: ContactPageContent = {
  heroDescription:
    "Whether you're planning a trip, exploring a partnership, or simply want to say hello — Mary personally reads every message.",
  subDescription:
    'All messages are read personally. For travel bookings, expect a response within 24 hours. For brand partnerships, Mary reviews all inquiries within 2 business days.',
  ctaHeading: 'Planning a Trip?',
  ctaBody:
    "Skip the form — browse curated packages and use the price calculator to get instant pricing for your group.",
  responseTimes: [
    { category: 'Travel Packages', time: 'Within 24h', description: 'Response for booking inquiries' },
    { category: 'Brand Partnerships', time: '2 Business Days', description: 'Response for collaboration requests' },
    { category: 'General Questions', time: 'Always', description: 'Every message is read personally' },
  ],
}

// ============================================================
// MOCK PORTFOLIO SETTINGS
// ============================================================

export const mockPortfolioSettings: PortfolioSettings = {
  heroDescription:
    'I am passionate about collaborating with brands that value authenticity and discovery. By blending cinematic storytelling with strategic digital marketing, I help hotels, restaurants, and destinations increase visibility and connect with modern travelers.',
  services: [
    {
      icon: '🎬',
      title: 'User Generated Content (UGC)',
      desc: 'Cinematic photos and reels that feel authentic — because they are. Created during real visits, not staged shoots. Perfect for hotels, restaurants, and tourism brands.',
      features: ['Reels & short-form video', 'Photography packages', 'Story content', 'Product in context'],
    },
    {
      icon: '⭐',
      title: 'Brand Features & Reviews',
      desc: 'Honest, detailed coverage of your property or experience published across my platforms — reaching an audience of engaged, travel-intent followers.',
      features: ['Long-form blog reviews', 'Social media posts', 'Multi-platform reach', 'SEO-optimized content'],
    },
    {
      icon: '📱',
      title: 'Social Media Management',
      desc: "Full-service social media strategy and execution — from content creation to community management. Transform your brand's online presence in 90 days.",
      features: ['Monthly content calendars', 'Photography & videography', 'Caption writing', 'Analytics reporting'],
    },
    {
      icon: '✈️',
      title: 'Experience Design',
      desc: 'Curated group travel experiences that generate organic content, grow communities, and create lasting brand impressions. From concept to landing.',
      features: ['Influencer group trips', 'Press & media trips', 'Brand immersion retreats', 'Full logistics management'],
    },
  ],
  pitchDescription:
    "By blending cinematic storytelling with strategic digital marketing, I help hotels, restaurants, and destinations increase visibility and connect with modern travelers who are looking for genuine, memorable experiences.",
  pitchBullets: [
    'Audience: 50K+ travel-intent followers across platforms',
    'Speciality: Tanzania, East Africa, boutique hospitality',
    'Deliverables: UGC, blog content, social strategy, campaigns',
    'Response time: within 24 business hours',
  ],
  testimonials: [
    {
      quote: "Mary's content elevated our brand in ways we couldn't have anticipated. Authentic, beautiful, and genuinely engaging — our bookings increased within the same month.",
      author: 'General Manager',
      brand: 'Zanzibar Boutique Resort',
    },
    {
      quote: "Working with Mary on our social media strategy transformed our presence. She understands hospitality deeply and creates content that actually converts.",
      author: 'Marketing Director',
      brand: 'Dar es Salaam Hotel',
    },
  ],
}

// ============================================================
// MOCK SITE SETTINGS
// ============================================================

export const mockSiteSettings: SiteSettings = {
  _id: 'siteSettings',
  siteTitle: 'Mary Minza Lucas',
  tagline: 'Affordable Adventures. Authentic Stories. Hidden Tanzania Revealed.',
  email: 'hello@maryminzalucas.com',
  whatsapp: '255712345678',
  instagram: 'https://instagram.com/maryminzalucas',
  twitter: 'https://twitter.com/maryminzalucas',
  youtube: 'https://youtube.com/@maryminzalucas',
  tiktok: 'https://tiktok.com/@maryminzalucas',
}
