import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'
const readToken = process.env.SANITY_API_READ_TOKEN

export const isSanityConfigured =
  Boolean(projectId) &&
  projectId !== 'your_project_id_here' &&
  projectId !== 'placeholder'

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId: projectId!,
      dataset,
      apiVersion,
      useCdn: true, // always use CDN — more reliable at build time
      perspective: 'published',
      token: readToken,
      // Increase timeouts for build-time fetches
      requestTagPrefix: 'mml',
    })
  : null

const builder = isSanityConfigured && sanityClient
  ? imageUrlBuilder(sanityClient)
  : null

export function urlFor(source: any) {
  if (!builder || !source) return null
  return builder.image(source)
}

export async function sanityFetch<T = any>(
  query: string,
  params: Record<string, any> = {}
): Promise<T | null> {
  if (!isSanityConfigured || !sanityClient) {
    return null
  }
  try {
    const result = await sanityClient.fetch<T>(query, params)
    return result ?? null
  } catch (error: any) {
    const msg = error?.message || String(error)
    // Swallow all network/CORS/JSON errors — fall back to mock data
    console.warn(`[Sanity] Fetch failed (${msg.slice(0, 80)}) — using mock data`)
    return null
  }
}
