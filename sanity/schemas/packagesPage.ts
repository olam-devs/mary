import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'packagesPage',
  title: 'Packages Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroBgImage',
      title: 'Hero — Background Image',
      type: 'image',
      description: 'Full-width background image behind the packages hero',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero — Title Line 1',
      type: 'string',
      initialValue: 'Travel',
    }),
    defineField({
      name: 'heroTitleItalic',
      title: 'Hero — Title Line 2 (italic gold)',
      type: 'string',
      initialValue: 'Packages',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero — Description',
      type: 'text',
      rows: 3,
      initialValue:
        'Every package is personally designed and tested by Mary. No filler days, no generic itineraries — just handpicked experiences with transparent pricing for every group size.',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Packages Page' }
    },
  },
})
