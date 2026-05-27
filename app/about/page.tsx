export const revalidate = 0

import type { Metadata } from 'next'
import { getAboutContent } from '@/lib/queries'
import AboutPageClient from './AboutPageClient'

export const metadata: Metadata = {
  title: 'About Mary Minza Lucas',
  description:
    'Content creator, digital marketing strategist, and Tanzania explorer. Mary Minza Lucas explores hidden gems in Dar es Salaam, Zanzibar, Serengeti, and beyond, making adventure accessible.',
}

export default async function AboutPage() {
  const about = await getAboutContent()

  const stats = about.stats ?? [
    { value: '50K+', label: 'Social Followers' },
    { value: '120+', label: 'Destinations Covered' },
    { value: '30+', label: 'Brand Partnerships' },
    { value: '4+', label: 'Years Creating' },
  ]

  const timeline = about.timeline ?? []

  const beliefs = about.beliefs ?? [
    {
      icon: '🌍',
      title: 'Affordable Adventures',
      description: "Proving that extraordinary experiences don't require extraordinary budgets.",
    },
    {
      icon: '🍽️',
      title: 'Authentic Restaurants',
      description: 'Chasing the real flavors of Tanzania, not the tourist menu.',
    },
    {
      icon: '🏨',
      title: 'Boutique Hotels',
      description: 'Small properties with soul, where the host knows your name.',
    },
  ]

  return (
    <AboutPageClient
      about={about}
      stats={stats}
      timeline={timeline}
      beliefs={beliefs}
    />
  )
}
