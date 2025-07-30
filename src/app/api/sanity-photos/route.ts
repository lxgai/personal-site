import { NextResponse } from 'next/server';
import { getPhotos } from '@/lib/sanity.queries';

export async function GET() {
  try {
    const photos = await getPhotos();
    return NextResponse.json({ photos, success: true });
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      success: false 
    }, { status: 500 });
  }
}