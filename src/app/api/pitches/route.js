import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  try {
    if (!client.isConnected()) await client.connect();
    const db = client.db('pitchDB');
    const pitchesCollection = db.collection('pitches');

    const pitches = await pitchesCollection.find().sort({ uploadedAt: -1 }).toArray();

    res.status(200).json(pitches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }
}
