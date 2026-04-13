import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutContent',
  title: 'About Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      initialValue: 'Mary Minza Lucas',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      initialValue: 'Content Creator · Digital Marketing Strategist · Tanzania Explorer',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero / Profile Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      title: 'Biography (Rich Text)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'quote',
      title: 'Personal Quote',
      type: 'string',
      initialValue: 'Adventure is a right, not a luxury.',
    }),
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
    defineField({
      name: 'stats',
      title: 'Statistics',
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
