export const revalidate = 0

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPackageBySlug, getAllPackages } from '@/lib/queries'
import PackageDetailClient from './PackageDetailClient'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const pkg = await getPackageBySlug(slug)
  if (!pkg) return { title: 'Package Not Found' }
  return {
    title: `${pkg.title} — Tanzania Travel Package`,
    description: pkg.description,
  }
}

export async function generateStaticParams() {
  try {
    const pkgs = await getAllPackages()
    return (pkgs ?? []).map((p) => ({ slug: p.slug.current }))
  } catch {
    const { mockPackages } = await import('@/lib/mockData')
    return mockPackages.map((p) => ({ slug: p.slug.current }))
  }
}

export default async function PackagePage({ params }: Props) {
  const { slug } = await params
  const pkg = await getPackageBySlug(slug)
  if (!pkg) notFound()
  return <PackageDetailClient pkg={pkg!} />
}
