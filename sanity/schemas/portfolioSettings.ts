import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'portfolioSettings',
  title: 'Portfolio Page',
  type: 'document',
  fields: [
    // ── Hero description ──
    defineField({
      name: 'heroDescription',
      title: 'Hero — Description (Bold)',
      type: 'text',
      rows: 3,
      description: 'The bold paragraph shown in the hero section and in the pitch section.',
      initialValue:
        'I am passionate about collaborating with brands that value authenticity and discovery. By blending cinematic storytelling with strategic digital marketing, I help hotels, restaurants, and destinations increase visibility and connect with modern travelers.',
    }),

    // ── Services ──
    defineField({
      name: 'services',
      title: 'Services & Deliverables',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'icon', type: 'string', title: 'Icon (emoji, e.g. 🎬)' }),
            defineField({ name: 'title', type: 'string', title: 'Service Title' }),
            defineField({ name: 'desc', type: 'text', title: 'Description', rows: 3 }),
            defineField({
              name: 'features',
              title: 'Features List',
              type: 'array',
              of: [{ type: 'string' }],
            }),
          ],
          preview: {
            select: { title: 'title', icon: 'icon' },
            prepare({ title, icon }) {
              return { title: `${icon || ''} ${title}` }
            },
          },
        },
      ],
    }),

    // ── Pitch section ──
    defineField({
      name: 'pitchDescription',
      title: 'Pitch Section — Extra Detail',
      type: 'text',
      rows: 4,
      description: 'Additional paragraph in the "Let\'s Create Something" section',
      initialValue:
        'By blending cinematic storytelling with strategic digital marketing, I help hotels, restaurants, and destinations increase visibility and connect with modern travelers who are looking for genuine, memorable experiences.',
    }),
    defineField({
      name: 'pitchBullets',
      title: 'Pitch Section — Bullet Points',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bullet points shown in the pitch/media kit section',
    }),

    // ── Testimonials ──
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'quote', type: 'text', title: 'Quote', rows: 3 }),
            defineField({ name: 'author', type: 'string', title: 'Author / Role' }),
            defineField({ name: 'brand', type: 'string', title: 'Brand / Company' }),
          ],
          preview: {
            select: { author: 'author', brand: 'brand' },
            prepare({ author, brand }) {
              return { title: `${author} — ${brand}` }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Portfolio Page' }
    },
  },
})
