import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homepageContent',
  title: 'Homepage Content',
  type: 'document',
  fields: [
    // ── Hero ──
    defineField({
      name: 'heroEyebrow',
      title: 'Hero — Location Tag',
      type: 'string',
      description: 'Small text above the name (e.g. "Dar es Salaam, Tanzania")',
      initialValue: 'Dar es Salaam, Tanzania',
    }),
    defineField({
      name: 'heroTagline1',
      title: 'Hero — Tagline Line 1',
      type: 'string',
      initialValue: 'Affordable Adventures. Authentic Stories.',
    }),
    defineField({
      name: 'heroTagline2',
      title: 'Hero — Tagline Line 2',
      type: 'string',
      description: 'Appears before the rotating destination word. E.g. "Hidden [Serengeti] Revealed."',
      initialValue: 'Revealed.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero — Background Image',
      type: 'image',
      description: 'Main homepage hero background. Leave blank to use the default photo.',
      options: { hotspot: true },
    }),

    // ── Stats bar ──
    defineField({
      name: 'stats',
      title: 'Hero — Stats Bar',
      type: 'array',
      description: 'Numbers shown at the bottom of the hero (e.g. 50K+ Followers)',
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

    // ── About preview ──
    defineField({
      name: 'aboutHeading',
      title: 'About Preview — Heading',
      type: 'string',
      initialValue: 'The Explorer Behind The Stories',
    }),
    defineField({
      name: 'aboutQuote',
      title: 'About Preview — Pull Quote',
      type: 'string',
      initialValue: 'Adventure is a right, not a luxury.',
    }),
    defineField({
      name: 'aboutBody1',
      title: 'About Preview — Paragraph 1',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'aboutBody2',
      title: 'About Preview — Paragraph 2',
      type: 'text',
      rows: 3,
    }),

    // ── Destinations strip ──
    defineField({
      name: 'destinations',
      title: 'Destinations Strip',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of destination tags shown in the strip section',
    }),

    // ── Partnership CTA ──
    defineField({
      name: 'partnershipHeading',
      title: 'Partnership CTA — Heading',
      type: 'string',
      initialValue: "Let's Build Something Worth Sharing",
    }),
    defineField({
      name: 'partnershipBody',
      title: 'Partnership CTA — Body',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'partnershipBgImage',
      title: 'Partnership CTA — Background Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Homepage Content' }
    },
  },
})
