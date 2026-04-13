import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroDescription',
      title: 'Hero — Description',
      type: 'text',
      rows: 3,
      description: 'Bold text shown below the "Get in Touch" heading',
      initialValue:
        "Whether you're planning a trip, exploring a partnership, or simply want to say hello — Mary personally reads every message.",
    }),
    defineField({
      name: 'subDescription',
      title: 'Contact Info — Sub Description',
      type: 'text',
      rows: 3,
      description: 'Smaller text below the heading on the left column',
      initialValue:
        'All messages are read personally. For travel bookings, expect a response within 24 hours. For brand partnerships, Mary reviews all inquiries within 2 business days.',
    }),
    defineField({
      name: 'ctaHeading',
      title: 'Quick CTA Box — Heading',
      type: 'string',
      initialValue: 'Planning a Trip?',
    }),
    defineField({
      name: 'ctaBody',
      title: 'Quick CTA Box — Body',
      type: 'text',
      rows: 2,
      initialValue:
        "Skip the form — browse curated packages and use the price calculator to get instant pricing for your group.",
    }),
    defineField({
      name: 'responseTimes',
      title: 'Response Times',
      type: 'array',
      description: 'The three boxes shown at the bottom of the contact page',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'category', type: 'string', title: 'Category (e.g. Travel Packages)' }),
            defineField({ name: 'time', type: 'string', title: 'Response Time (e.g. Within 24h)' }),
            defineField({ name: 'description', type: 'string', title: 'Short Description' }),
          ],
          preview: {
            select: { category: 'category', time: 'time' },
            prepare({ category, time }) {
              return { title: `${category}: ${time}` }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Contact Page' }
    },
  },
})
