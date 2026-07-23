import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutContent',
  title: 'About Page Content',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'mission', title: 'Our Story (Company)' },
    { name: 'bio', title: 'Creator Bio (shown on Portfolio)' },
    { name: 'manifesto', title: 'Manifesto' },
    { name: 'timeline', title: 'Timeline' },
  ],
  fields: [
    // ── Hero ──
    defineField({
      name: 'heroBgImage',
      title: 'Hero: Background Image',
      type: 'image',
      description: 'Full-width background image behind the hero text',
      options: { hotspot: true },
      group: 'hero',
    }),
    defineField({
      name: 'heroEyebrow',
      title: 'Hero: Eyebrow',
      type: 'string',
      initialValue: 'Our Legacy',
      group: 'hero',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero: Headline',
      type: 'string',
      initialValue: 'A Pioneering Collective',
      group: 'hero',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero: Subtext',
      type: 'text',
      rows: 2,
      initialValue: 'Defining the intersection of untamed Tanzanian wilderness and uncompromising, story-driven safari travel.',
      group: 'hero',
    }),

    // ── Our Story (company voice, shown on About) ──
    defineField({
      name: 'storyLabel',
      title: '"Our Story": Eyebrow',
      type: 'string',
      initialValue: 'Our Story',
      group: 'mission',
    }),
    defineField({
      name: 'missionHeading',
      title: '"Our Story": Heading',
      type: 'string',
      initialValue: 'Built On the Ground, Not From a Brochure',
      group: 'mission',
    }),
    defineField({
      name: 'missionBody1',
      title: '"Our Story": Paragraph 1',
      type: 'text',
      rows: 4,
      group: 'mission',
    }),
    defineField({
      name: 'missionBody2',
      title: '"Our Story": Paragraph 2',
      type: 'text',
      rows: 4,
      group: 'mission',
    }),
    defineField({
      name: 'missionImage',
      title: '"Our Story": Image',
      type: 'image',
      options: { hotspot: true },
      group: 'mission',
    }),
    defineField({
      name: 'stats',
      title: '"Our Story": Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', type: 'string', title: 'Value (e.g., "15+")' }),
            defineField({ name: 'label', type: 'string', title: 'Label (e.g., "Years Experience")' }),
          ],
        },
      ],
      group: 'mission',
    }),

    // ── Creator bio (personal — rendered on the Portfolio page, not About) ──
    defineField({
      name: 'quote',
      title: 'Personal Quote',
      type: 'string',
      initialValue: 'Adventure is a right, not a luxury.',
      group: 'bio',
    }),
    defineField({
      name: 'profileImage',
      title: 'Creator Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })],
      group: 'bio',
    }),
    defineField({
      name: 'bioText',
      title: 'Creator Bio: Paragraphs',
      description: 'Each item is one paragraph. Add up to 4.',
      type: 'array',
      of: [{ type: 'text' }],
      group: 'bio',
    }),
    defineField({
      name: 'highlights',
      title: 'Creator Bio: Highlight Bullet Points',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'bio',
    }),

    // ── Manifesto ──
    defineField({
      name: 'manifestoLabel',
      title: 'Manifesto: Eyebrow',
      type: 'string',
      initialValue: 'Our Manifesto',
      group: 'manifesto',
    }),
    defineField({
      name: 'manifestoQuote',
      title: 'Manifesto: Pull Quote',
      type: 'text',
      rows: 2,
      group: 'manifesto',
    }),
    defineField({
      name: 'beliefs',
      title: 'Manifesto: Principles',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string', title: 'Title' }),
            defineField({ name: 'description', type: 'text', title: 'Description' }),
            defineField({ name: 'icon', type: 'string', title: 'Icon Emoji (optional)' }),
          ],
        },
      ],
      group: 'manifesto',
    }),

    // ── Timeline ──
    defineField({
      name: 'timeline',
      title: 'Journey Timeline',
      type: 'array',
      group: 'timeline',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'year', type: 'string', title: 'Year / Period' }),
            defineField({ name: 'event', type: 'string', title: 'Event Title' }),
            defineField({ name: 'description', type: 'text', title: 'Description' }),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'About Page Content' }
    },
  },
})
