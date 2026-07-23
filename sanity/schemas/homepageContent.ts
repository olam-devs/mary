import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homepageContent',
  title: 'Homepage Content',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'regions', title: 'Destinations Carousel' },
    { name: 'whyChoose', title: 'Why Choose Us' },
    { name: 'partnership', title: 'Partnership CTA' },
  ],
  fields: [
    // ── Hero ──
    defineField({
      name: 'heroBadge',
      title: 'Hero: Badge Text',
      type: 'string',
      description: 'Small pill above the headline (e.g. "The Ultimate Wilderness Experience")',
      initialValue: 'The Ultimate Wilderness Experience',
      group: 'hero',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero: Headline',
      type: 'string',
      description: 'Big hero headline (e.g. "Experience the Untamed Wild in Absolute Luxury")',
      initialValue: 'Experience the Untamed Wild in Absolute Luxury',
      group: 'hero',
    }),
    defineField({
      name: 'heroTagline1',
      title: 'Hero: Subtext',
      type: 'text',
      rows: 2,
      initialValue: 'Bespoke safari adventures across Tanzania led by world-class guides and conservationists.',
      group: 'hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero: Background Image',
      type: 'image',
      description: 'Main homepage hero background. Leave blank to use the default photo.',
      options: { hotspot: true },
      group: 'hero',
    }),
    defineField({
      name: 'heroWidget',
      title: 'Hero: Quick-Info Widget',
      type: 'object',
      description: 'The glass widget shown over the hero image',
      group: 'hero',
      fields: [
        defineField({ name: 'destinationLabel', type: 'string', title: 'Destination Label', initialValue: 'Destination' }),
        defineField({ name: 'destinationValue', type: 'string', title: 'Destination Value', initialValue: 'Serengeti, Tanzania' }),
        defineField({ name: 'datesLabel', type: 'string', title: 'Dates Label', initialValue: 'Travel Dates' }),
        defineField({ name: 'datesValue', type: 'string', title: 'Dates Value', initialValue: 'Flexible · Year-round' }),
        defineField({ name: 'guestsLabel', type: 'string', title: 'Guests Label', initialValue: 'Guests' }),
        defineField({ name: 'guestsValue', type: 'string', title: 'Guests Value', initialValue: '2 Adults, 1 Suite' }),
        defineField({ name: 'ctaLabel', type: 'string', title: 'Button Label', initialValue: 'Explore Packages' }),
        defineField({ name: 'ctaHref', type: 'string', title: 'Button Link', initialValue: '/packages' }),
      ],
    }),

    // ── Stats bar ──
    defineField({
      name: 'stats',
      title: 'Hero: Stats Bar',
      type: 'array',
      description: 'Numbers shown at the bottom of the hero (e.g. 50K+ Followers)',
      group: 'hero',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'display', type: 'number', title: 'Display Number (e.g. 50)' }),
            defineField({ name: 'suffix', type: 'string', title: 'Suffix (e.g. K+)' }),
            defineField({ name: 'label', type: 'string', title: 'Label (e.g. Followers)' }),
          ],
          preview: {
            select: { display: 'display', suffix: 'suffix', label: 'label' },
            prepare({ display, suffix, label }) {
              return { title: `${display}${suffix} ${label}` }
            },
          },
        },
      ],
    }),

    // ── Destinations carousel ──
    defineField({
      name: 'regionsHeading',
      title: 'Regions: Heading',
      type: 'string',
      initialValue: 'Our Iconic Destinations',
      group: 'regions',
    }),
    defineField({
      name: 'regionsBody',
      title: 'Regions: Body',
      type: 'text',
      rows: 3,
      initialValue: 'We operate in the most breathtaking regions of Tanzania, promising exclusive, private, wild trekking, unrivalled style & comfort, and full immersion in nature and local culture.',
      group: 'regions',
    }),
    defineField({
      name: 'regions',
      title: 'Regions: Carousel Slides',
      type: 'array',
      group: 'regions',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', type: 'string', title: 'Region Name (e.g. Arusha)' }),
            defineField({ name: 'description', type: 'text', rows: 2, title: 'Description' }),
            defineField({ name: 'image', type: 'image', title: 'Background Image', options: { hotspot: true } }),
            defineField({ name: 'href', type: 'string', title: 'Link (e.g. /packages?region=arusha)' }),
          ],
          preview: {
            select: { title: 'name', media: 'image' },
          },
        },
      ],
    }),

    // ── Why Choose Us ──
    defineField({
      name: 'whyChooseLabel',
      title: 'Why Choose Us: Eyebrow',
      type: 'string',
      initialValue: 'Unmatched Excellence',
      group: 'whyChoose',
    }),
    defineField({
      name: 'whyChooseHeading',
      title: 'Why Choose Us: Heading',
      type: 'string',
      initialValue: 'Why Choose Minzah Safaris',
      group: 'whyChoose',
    }),
    defineField({
      name: 'whyChooseBody',
      title: 'Why Choose Us: Body',
      type: 'text',
      rows: 3,
      group: 'whyChoose',
    }),
    defineField({
      name: 'whyChooseImage',
      title: 'Why Choose Us: Image',
      type: 'image',
      options: { hotspot: true },
      group: 'whyChoose',
    }),
    defineField({
      name: 'whyChooseBadgeNumber',
      title: 'Why Choose Us: Badge Number (e.g. 15+)',
      type: 'string',
      initialValue: '15+',
      group: 'whyChoose',
    }),
    defineField({
      name: 'whyChooseBadgeLabel',
      title: 'Why Choose Us: Badge Label',
      type: 'string',
      initialValue: 'Years of Experience',
      group: 'whyChoose',
    }),
    defineField({
      name: 'whyChooseFeatures',
      title: 'Why Choose Us: Feature Cards',
      type: 'array',
      group: 'whyChoose',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              type: 'string',
              title: 'Icon',
              options: {
                list: [
                  { title: 'Guides (people)', value: 'guides' },
                  { title: 'Lodging (bed)', value: 'lodging' },
                  { title: 'Conservation (leaf)', value: 'conservation' },
                  { title: 'Concierge (shield)', value: 'concierge' },
                ],
              },
            }),
            defineField({ name: 'title', type: 'string', title: 'Title' }),
            defineField({ name: 'description', type: 'text', rows: 2, title: 'Description' }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'icon' },
          },
        },
      ],
    }),

    // ── Partnership CTA ──
    defineField({
      name: 'partnershipHeading',
      title: 'Partnership CTA: Heading',
      type: 'string',
      initialValue: "Let's Build Something Worth Sharing",
      group: 'partnership',
    }),
    defineField({
      name: 'partnershipBody',
      title: 'Partnership CTA: Body',
      type: 'text',
      rows: 3,
      group: 'partnership',
    }),
    defineField({
      name: 'partnershipBgImage',
      title: 'Partnership CTA: Background Image',
      type: 'image',
      options: { hotspot: true },
      group: 'partnership',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Homepage Content' }
    },
  },
})
