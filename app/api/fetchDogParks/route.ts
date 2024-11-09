export const dynamic = 'force-dynamic';
// app/api/fetchDogParks/route.ts
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!lat || !lng || !apiKey) {
    return NextResponse.json({ error: 'Missing required parameters or API key' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=park&keyword=dog%20park&key=${apiKey}`
    );
    const data = await response.json();

    // Return the dog parks data
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching dog parks:', error);
    return NextResponse.json({ error: 'Failed to fetch dog parks' }, { status: 500 });
  }
}
