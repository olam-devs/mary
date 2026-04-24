import blogPost from './blogPost'
import travelPackage from './travelPackage'
import portfolioItem from './portfolioItem'
import aboutContent from './aboutContent'
import siteSettings from './siteSettings'
import homepageContent from './homepageContent'
import contactPage from './contactPage'
import portfolioSettings from './portfolioSettings'
import blogPage from './blogPage'
import packagesPage from './packagesPage'

export const schemaTypes = [
  // Singletons
  siteSettings,
  homepageContent,
  blogPage,
  packagesPage,
  contactPage,
  portfolioSettings,
  aboutContent,
  // Collections
  blogPost,
  travelPackage,
  portfolioItem,
]
