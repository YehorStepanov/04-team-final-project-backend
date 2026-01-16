import { Emotion } from '../models/emotion.js';

export async function getAllEmotions(req, res) {
  const emotions = await Emotion.find();
  res.status(200).json({ data: emotions });
}
