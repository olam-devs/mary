import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'conservationPage',
  title: 'Conservation Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'history', title: 'Our Commitment' },
    { name: 'natgeo', title: 'National Geographic' },
    { name: 'pillars', title: 'Conservation Pillars' },
    { name: 'cta', title: 'CTA' },
  ],
  fields: [
    // ── Hero ──
    defineField({
      name: 'heroBgImage',
      title: 'Hero: Background Image',
      type: 'image',
      options: { hotspot: true },
      group: 'hero',
    }),
    defineField({
      name: 'heroLabel',
      title: 'Hero: Eyebrow',
      type: 'string',
      initialValue: 'Our Commitment',
      group: 'hero',
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero: Heading',
      type: 'string',
      initialValue: 'Our Journey & Commitment to the Wild',
      group: 'hero',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero: Subtext',
      type: 'text',
      rows: 2,
      initialValue: 'Preserving Tanzania’s wild places while sharing the stories that make them worth protecting.',
      group: 'hero',
    }),

    // ── History / Commitment ──
    defineField({
      name: 'historyLabel',
      title: 'History: Eyebrow',
      type: 'string',
      initialValue: 'Where It Started',
      group: 'history',
    }),
    defineField({
      name: 'historyHeading',
      title: 'History: Heading',
      type: 'string',
      initialValue: 'From Storyteller to Steward',
      group: 'history',
    }),
    defineField({
      name: 'historyBody1',
      title: 'History: Paragraph 1',
      type: 'text',
      rows: 4,
      group: 'history',
    }),
    defineField({
      name: 'historyBody2',
      title: 'History: Paragraph 2',
      type: 'text',
      rows: 4,
      group: 'history',
    }),
    defineField({
      name: 'historyImage',
      title: 'History: Image',
      type: 'image',
      options: { hotspot: true },
      group: 'history',
    }),
    defineField({
      name: 'historyStats',
      title: 'History: Stats',
      type: 'array',
      group: 'history',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', type: 'string', title: 'Value' }),
            defineField({ name: 'label', type: 'string', title: 'Label' }),
          ],
        },
      ],
    }),

    // ── National Geographic spotlight ──
    defineField({
      name: 'natGeoLabel',
      title: 'NatGeo: Eyebrow',
      type: 'string',
      initialValue: 'National Geographic Externship',
      group: 'natgeo',
    }),
    defineField({
      name: 'natGeoHeading',
      title: 'NatGeo: Heading',
      type: 'string',
      initialValue: 'The Blue Gold Initiative',
      group: 'natgeo',
    }),
    defineField({
      name: 'natGeoBody',
      title: 'NatGeo: Body',
      type: 'text',
      rows: 5,
      group: 'natgeo',
    }),
    defineField({
      name: 'natGeoImage',
      title: 'NatGeo: Image',
      type: 'image',
      options: { hotspot: true },
      group: 'natgeo',
    }),

    // ── Pillars ──
    defineField({
      name: 'pillarsHeading',
      title: 'Pillars: Heading',
      type: 'string',
      initialValue: 'Conservation & Community',
      group: 'pillars',
    }),
    defineField({
      name: 'pillarsBody',
      title: 'Pillars: Body',
      type: 'text',
      rows: 2,
      group: 'pillars',
    }),
    defineField({
      name: 'pillars',
      title: 'Pillars: Cards',
      type: 'array',
      group: 'pillars',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'icon', type: 'string', title: 'Icon Emoji' }),
            defineField({ name: 'title', type: 'string', title: 'Title' }),
            defineField({ name: 'body', type: 'text', rows: 3, title: 'Body' }),
            defineField({ name: 'image', type: 'image', title: 'Image', options: { hotspot: true } }),
          ],
          preview: { select: { title: 'title', media: 'image' } },
        },
      ],
    }),

    // ── CTA ──
    defineField({
      name: 'ctaHeading',
      title: 'CTA: Heading',
      type: 'string',
      initialValue: 'Travel That Gives Back',
      group: 'cta',
    }),
    defineField({
      name: 'ctaBody',
      title: 'CTA: Body',
      type: 'text',
      rows: 2,
      group: 'cta',
    }),
    defineField({
      name: 'ctaBgImage',
      title: 'CTA: Background Image',
      type: 'image',
      options: { hotspot: true },
      group: 'cta',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Conservation Page' }
    },
  },
})
