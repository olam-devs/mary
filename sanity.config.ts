import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  name: 'mary-minza-lucas-studio',
  title: 'Mary Minza Lucas — Studio',
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // ── Collections ──
            S.listItem()
              .title('Blog Posts')
              .schemaType('blogPost')
              .child(S.documentTypeList('blogPost').title('Blog Posts')),
            S.listItem()
              .title('Travel Packages')
              .schemaType('travelPackage')
              .child(S.documentTypeList('travelPackage').title('Travel Packages')),
            S.listItem()
              .title('Portfolio Items')
              .schemaType('portfolioItem')
              .child(S.documentTypeList('portfolioItem').title('Portfolio Items')),

            S.divider(),

            // ── Pages ──
            S.listItem()
              .title('🏠 Homepage')
              .schemaType('homepageContent')
              .child(S.document().schemaType('homepageContent').documentId('homepageContent')),
            S.listItem()
              .title('📖 Blog Page')
              .schemaType('blogPage')
              .child(S.document().schemaType('blogPage').documentId('blogPage')),
            S.listItem()
              .title('✈️ Packages Page')
              .schemaType('packagesPage')
              .child(S.document().schemaType('packagesPage').documentId('packagesPage')),
            S.listItem()
              .title('👤 About Page')
              .schemaType('aboutContent')
              .child(S.document().schemaType('aboutContent').documentId('aboutContent')),
            S.listItem()
              .title('💼 Portfolio Page')
              .schemaType('portfolioSettings')
              .child(S.document().schemaType('portfolioSettings').documentId('portfolioSettings')),
            S.listItem()
              .title('📞 Contact Page')
              .schemaType('contactPage')
              .child(S.document().schemaType('contactPage').documentId('contactPage')),

            S.divider(),

            // ── Global ──
            S.listItem()
              .title('Site Settings')
              .schemaType('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
