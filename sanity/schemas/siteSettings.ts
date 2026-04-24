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
