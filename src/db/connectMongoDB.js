import mongoose from 'mongoose';
import 'dotenv/config';

export const connectMongoDB = async () => {
  if (!process.env.MONGO_URL) {
    throw new Error('Set MONGO_URL environment variable');
  }

  try {
    const mongoUrl = process.env.MONGO_URL;

    await mongoose.connect(mongoUrl);
    console.log('✅ MongoDB connection established successfully');
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
};
