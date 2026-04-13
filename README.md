# Mary Minza Lucas — Official Website

> **Affordable Adventures. Authentic Stories. Hidden Tanzania Revealed.**

A production-ready Next.js website for **Mary Minza Lucas** — travel content creator and digital marketing strategist based in Dar es Salaam, Tanzania.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS 3 |
| Animations | Framer Motion |
| CMS | Sanity.io v3 (headless) |
| Language | TypeScript |
| Images | Unsplash (CDN) + Sanity CDN |

---

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Sanity project credentials.

### 3. Run Development Server

```bash
npm run dev
```

Site will be available at `http://localhost:3000`

---

## Sanity CMS Setup

### Create a Sanity Project

1. Go to [sanity.io](https://www.sanity.io/) and create a free account
2. Create a new project (choose "Blank" template)
3. Note your **Project ID** and **Dataset** name

### Configure Environment Variables

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=your_token
```

### Access Sanity Studio

With the dev server running, go to:
```
http://localhost:3000/studio
```

### Content Schemas Available

| Schema | Description |
|--------|-------------|
| `blogPost` | Blog articles with category, rich text, SEO |
| `travelPackage` | Packages with pricing tiers calculator |
| `portfolioItem` | UGC, brand work, campaigns |
| `aboutContent` | All About page sections |
| `siteSettings` | Global settings, social links, media kit |

---

## Website Pages

| Route | Page |
|-------|------|
| `/` | Home — Hero, featured posts & packages |
| `/about` | About Mary — story, beliefs, timeline |
| `/blog` | Blog — filterable by category, searchable |
| `/blog/[slug]` | Individual blog post |
| `/packages` | All travel packages |
| `/packages/[slug]` | Package detail with price calculator |
| `/portfolio` | Partnership work & services |
| `/contact` | Contact form + WhatsApp |
| `/studio` | Sanity Studio (CMS) |

---

## Key Features

### Price Calculator (Packages)
- Each package has multiple pricing tiers by group size
- User inputs group size → instant price reveal
- Shows total price + per-person cost
- Framer Motion animated result

### Blog System
- Category filtering (Solo Travel, Group Travel, Itineraries, Hotels & Restaurants)
- Search functionality
- Featured posts
- SEO-optimized dynamic routes
- Rich text (Portable Text) rendering

### Design System
- **Colors**: Gold (#C9A96E), Earth (#1C1009), Forest (#2C4A3E), Cream (#FAF8F5)
- **Fonts**: Playfair Display (headings) + Inter (body)
- **Animations**: Framer Motion scroll-triggered reveals
- **Mobile-first**: Responsive at all breakpoints

---

## Production Deployment

### Deploy to Vercel (Recommended)

```bash
npx vercel
```

Set environment variables in your Vercel project dashboard.

### Add CORS Origin in Sanity

In your Sanity project settings → API → CORS Origins, add your production domain.

---

## Customization

All content is driven by Sanity CMS. To customize:

1. **Blog posts** → Add in Sanity Studio under "Blog Posts"
2. **Packages** → Add in Sanity Studio under "Travel Packages"
3. **Portfolio** → Add in Sanity Studio under "Portfolio Items"
4. **About page** → Edit "About Content" singleton
5. **Social links / Media Kit** → Edit "Site Settings" singleton

---

## License

Private — Mary Minza Lucas. All rights reserved.
