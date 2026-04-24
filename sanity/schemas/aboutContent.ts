import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutContent',
  title: 'About Page Content',
  type: 'document',
  fields: [
    // ── Hero ──
    defineField({
      name: 'heroBgImage',
      title: 'Hero — Background Image',
      type: 'image',
      description: 'Full-width background image behind the hero text',
      options: { hotspot: true },
    }),
    defineField({
      name: 'quote',
      title: 'Hero — Personal Quote',
      type: 'string',
      initialValue: 'Adventure is a right, not a luxury.',
    }),

    // ── Who I Am section ──
    defineField({
      name: 'profileImage',
      title: '"Who I Am" — Profile Photo',
      description: 'Photo shown in the left column of the "Who I Am" section',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })],
    }),
    defineField({
      name: 'bioText',
      title: '"Who I Am" — Biography Paragraphs',
      description: 'Each item is one paragraph. Add up to 4.',
      type: 'array',
      of: [{ type: 'text' }],
    }),
    defineField({
      name: 'highlights',
      title: '"Who I Am" — Highlight Bullet Points',
      description: 'The checkmark list (achievements, credentials)',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    // ── Core beliefs ──
    defineField({
      name: 'beliefs',
      title: 'Core Beliefs / Focus Areas',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string', title: 'Title' }),
            defineField({ name: 'description', type: 'text', title: 'Description' }),
            defineField({ name: 'icon', type: 'string', title: 'Icon Emoji' }),
          ],
        },
      ],
    }),

    // ── For the Explorer / For the Brand ──
    defineField({
      name: 'forExplorer',
      title: '"For the Explorer" Section',
      type: 'object',
      fields: [
        defineField({ name: 'heading', type: 'string', title: 'Heading' }),
        defineField({ name: 'body', type: 'text', title: 'Body Text' }),
        defineField({ name: 'image', type: 'image', title: 'Image', options: { hotspot: true } }),
      ],
    }),
    defineField({
      name: 'forBrand',
      title: '"For the Brand" Section',
      type: 'object',
      fields: [
        defineField({ name: 'heading', type: 'string', title: 'Heading' }),
        defineField({ name: 'body', type: 'text', title: 'Body Text' }),
        defineField({ name: 'image', type: 'image', title: 'Image', options: { hotspot: true } }),
      ],
    }),

    // ── Timeline ──
    defineField({
      name: 'timeline',
      title: 'Journey Timeline',
      type: 'array',
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

    // ── Stats ──
    defineField({
      name: 'stats',
      title: 'Statistics (hero bar)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', type: 'string', title: 'Value (e.g., "50K+")' }),
            defineField({ name: 'label', type: 'string', title: 'Label (e.g., "Followers")' }),
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
