import { client, urlFor, sanityConfigured } from './sanity.client'
import { SanityPhoto, Photo } from '@/types/photo'

export async function getPhotos(): Promise<Photo[]> {
  // Return empty array if Sanity is not configured
  if (!sanityConfigured || !client) {
    console.log('Sanity is not configured yet. Using mock data.')
    return []
  }

  const query = `*[_type == "photo"] | order(date desc) {
    _id,
    title,
    image,
    location,
    locationName,
    caption,
    date
  }`

  try {
    console.log('Fetching photos with query:', query)
    const sanityPhotos: SanityPhoto[] = await client.fetch(query)
    console.log('Fetched photos from Sanity:', sanityPhotos)
    
    // Transform Sanity data to our Photo format
    return sanityPhotos.map(photo => ({
      id: photo._id,
      url: urlFor(photo.image).width(1200).url(),
      thumbnail: urlFor(photo.image).width(400).height(400).url(),
      location: {
        name: photo.locationName,
        coordinates: [photo.location.lat, photo.location.lng]
      },
      caption: photo.caption,
      date: photo.date
    }))
  } catch (error) {
    console.error('Error fetching photos from Sanity:', error)
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    // Return empty array if there's an error
    return []
  }
}