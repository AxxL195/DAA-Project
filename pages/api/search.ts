import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDB } from '@/lib/mongoose';
import Product from '@/lib/models/product.model';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Connect to MongoDB
  await connectToDB();

  const { q } = req.query;

  if (!q || typeof q !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid query parameter "q"' });
  }

  try {
    // Search products by title containing the query string (case-insensitive)
    const products = await Product.find({
      title: { $regex: q, $options: 'i' },
    }).limit(20); // limit to 20 results for performance

    return res.status(200).json({ products });
  } catch (error) {
    console.error('Search error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
