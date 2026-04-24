import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      initialValue: 'Mary Minza Lucas',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      initialValue: 'Affordable Adventures. Authentic Stories. Hidden Tanzania Revealed.',
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp Number',
      type: 'string',
      description: 'Include country code without + (e.g., 255712345678)',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'twitter',
      title: 'Twitter / X URL',
      type: 'url',
    }),
    defineField({
      name: 'youtube',
      title: 'YouTube URL',
      type: 'url',
    }),
    defineField({
      name: 'tiktok',
      title: 'TikTok URL',
      type: 'url',
    }),
    defineField({
      name: 'mediaKit',
      title: 'Media Kit (PDF)',
      type: 'file',
      options: { accept: '.pdf' },
      description: 'Upload your media kit PDF — will be available as a download button',
    }),
    defineField({
      name: 'theme',
      title: 'Brand Colors',
      type: 'object',
      description: 'Control the colour scheme of buttons, labels, accents, and backgrounds across the whole site',
      fields: [
        defineField({
          name: 'primaryColor',
          title: 'Primary / Accent Color',
          type: 'string',
          description: 'Hex code — used for buttons, labels, dividers, highlights (e.g. #C9A96E)',
          placeholder: '#FF6B35',
        }),
        defineField({
          name: 'primaryHover',
          title: 'Primary Color — Hover State',
          type: 'string',
          description: 'Slightly darker than primary — used when hovering buttons (e.g. #E05520)',
          placeholder: '#FF5722',
        }),
        defineField({
          name: 'darkColor',
          title: 'Dark Background Color',
          type: 'string',
          description: 'Hex code — used for dark sections, footer, header (e.g. #1C1009)',
          placeholder: '#090F1C',
        }),
        defineField({
          name: 'lightColor',
          title: 'Light Background Color',
          type: 'string',
          description: 'Hex code — used for light page backgrounds (e.g. #FAF8F5)',
          placeholder: '#F5F7FA',
        }),
        defineField({
          name: 'navbarBg',
          title: 'Navbar Background Color',
          type: 'string',
          description: 'Hex code for the navbar background (leave blank for transparent/auto)',
          placeholder: '#090F1C',
        }),
        defineField({
          name: 'footerBg',
          title: 'Footer Background Color',
          type: 'string',
          description: 'Hex code for the footer background',
          placeholder: '#090F1C',
        }),
        defineField({
          name: 'buttonTextColor',
          title: 'Primary Button Text Color',
          type: 'string',
          description: 'Text colour on primary buttons (e.g. #090F1C for dark text)',
          placeholder: '#090F1C',
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'Default SEO',
      type: 'object',
      fields: [
        defineField({ name: 'metaTitle', type: 'string', title: 'Default Meta Title' }),
        defineField({ name: 'metaDescription', type: 'text', title: 'Default Meta Description' }),
        defineField({ name: 'ogImage', type: 'image', title: 'Default OG Image' }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
