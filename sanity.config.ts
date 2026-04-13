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
            S.listItem()
              .title('About Content')
              .schemaType('aboutContent')
              .child(S.document().schemaType('aboutContent').documentId('aboutContent')),
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
