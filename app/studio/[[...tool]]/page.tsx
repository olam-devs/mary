/**
 * Sanity Studio embedded at /studio
 * Access at http://localhost:3000/studio after running `npm run dev`
 *
 * Set your NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local to enable.
 */
'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
