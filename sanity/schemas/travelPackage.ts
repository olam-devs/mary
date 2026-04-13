import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'travelPackage',
  title: 'Travel Package',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Package Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'highlights',
      title: 'Package Highlights',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Key features (e.g., "Safari game drive", "Beachfront accommodation")',
    }),
    defineField({
      name: 'images',
      title: 'Package Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })],
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g., "Serengeti National Park, Tanzania"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., "3 Days / 2 Nights"',
    }),
    defineField({
      name: 'availabilityMonths',
      title: 'Available Months',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December',
        ],
        layout: 'grid',
      },
    }),
    defineField({
      name: 'currency',
      title: 'Price Currency',
      type: 'string',
      description: 'Currency used for all pricing tiers in this package.',
      options: {
        list: [
          { title: 'USD — US Dollar ($)', value: 'USD' },
          { title: 'TSh — Tanzanian Shilling', value: 'TSh' },
        ],
        layout: 'radio',
      },
      initialValue: 'USD',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pricingTiers',
      title: 'Pricing Tiers',
      type: 'array',
      description: 'Add tiers for different group sizes. Toggle "Show on website" to control which tiers are public — hidden tiers stay in Sanity for reference only.',
      of: [
        {
          type: 'object',
          name: 'pricingTier',
          title: 'Pricing Tier',
          fields: [
            defineField({
              name: 'visible',
              title: 'Show on website',
              type: 'boolean',
              description: 'ON = visible to visitors. OFF = stays in Sanity only (for internal reference).',
              initialValue: true,
            }),
            defineField({
              name: 'minPeople',
              title: 'Minimum People',
              type: 'number',
              validation: (Rule) => Rule.required().min(1),
            }),
            defineField({
              name: 'maxPeople',
              title: 'Maximum People',
              type: 'number',
              validation: (Rule) => Rule.required().min(1),
            }),
            defineField({
              name: 'totalPrice',
              title: 'Total Price',
              type: 'number',
              description: 'Total package cost for the entire group (in the currency selected above)',
              validation: (Rule) => Rule.required().min(0),
            }),
          ],
          preview: {
            select: {
              min: 'minPeople',
              max: 'maxPeople',
              price: 'totalPrice',
              visible: 'visible',
            },
            prepare({ min, max, price, visible }) {
              return {
                title: `${min}–${max} people · ${price?.toLocaleString()}`,
                subtitle: visible === false ? '🔒 Hidden from website' : '✅ Visible on website',
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'included',
      title: "What's Included",
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'excluded',
      title: "What's Not Included",
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Package',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Safari', value: 'safari' },
          { title: 'Beach & Zanzibar', value: 'beach' },
          { title: 'Cultural', value: 'cultural' },
          { title: 'Adventure', value: 'adventure' },
          { title: 'City Tour', value: 'city' },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      location: 'location',
      media: 'images.0',
    },
    prepare({ title, location, media }) {
      return { title, subtitle: location, media }
    },
  },
})
