import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'blogPage',
  title: 'Blog Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroBgImage',
      title: 'Hero — Background Image',
      type: 'image',
      description: 'Full-width background image behind the blog hero',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero — Title',
      type: 'string',
      initialValue: 'The Blog',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero — Description',
      type: 'text',
      rows: 3,
      initialValue:
        "Tanzania is full of secrets and I'm here to share them. I go beyond postcards to bring you detailed guides on hidden hotels, local restaurants, and budget-friendly itineraries.",
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Blog Page' }
    },
  },
})
