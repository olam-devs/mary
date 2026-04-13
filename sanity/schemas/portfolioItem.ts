import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'portfolioItem',
  title: 'Portfolio Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Portfolio Type',
      type: 'string',
      options: {
        list: [
          { title: 'User Generated Content (UGC)', value: 'UGC' },
          { title: 'Brand Feature & Review', value: 'Brand' },
          { title: 'Social Media Management', value: 'Social' },
          { title: 'Experience Design / Curated Trips', value: 'Travel' },
          { title: 'Campaign', value: 'Campaign' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'brand',
      title: 'Brand / Client Name',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'projectImage',
      title: 'Project Card Image',
      description: 'Main image shown on the right side of this project in the portfolio list.',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })],
    }),
    defineField({
      name: 'media',
      title: 'Media Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })],
        },
      ],
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube or Vimeo link',
    }),
    defineField({
      name: 'results',
      title: 'Results / Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'string', title: 'Label (e.g., "Views")' }),
            defineField({ name: 'value', type: 'string', title: 'Value (e.g., "250K+")' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'link',
      title: 'External Link',
      type: 'url',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      brand: 'brand',
      media: 'media.0',
    },
    prepare({ title, type, brand, media }) {
      return {
        title,
        subtitle: `${type} · ${brand || 'No brand'}`,
        media,
      }
    },
  },
})
