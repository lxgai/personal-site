import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Check if Sanity is configured
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

console.log('Sanity configuration:', { projectId, dataset })

export const sanityConfigured = !!(projectId && projectId !== 'your_project_id')

export const client = sanityConfigured ? createClient({
  projectId: projectId!,
  dataset: dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: false, // Disable CDN to avoid potential issues
  perspective: 'published',
}) : null

const builder = sanityConfigured && client ? imageUrlBuilder(client) : null

export const urlFor = (source: any) => {
  if (!builder) {
    throw new Error('Sanity is not configured. Please update your .env.local file.')
  }
  return builder.image(source)
}