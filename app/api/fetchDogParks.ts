// pages/api/fetchDogParks.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lat, lng } = req.query;  // Get latitude and longitude from the query parameters
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!lat || !lng || !apiKey) {
    return res.status(400).json({ error: 'Missing required parameters or API key' });
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=park&keyword=dog%20park&key=${apiKey}`
    );
    const data = await response.json();

    // Return the dog parks data
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching dog parks:', error);
    res.status(500).json({ error: 'Failed to fetch dog parks' });
  }
}
