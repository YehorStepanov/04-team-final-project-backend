import mongoose from 'mongoose';
import { Diary } from '../models/diary.js';
import { DiaryCategory } from '../models/diaryCategory.js';

export const connectMongoDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    await mongoose.connect(mongoUrl);
    console.log('✅ MongoDB connection established successfully');

    await Promise.all([Diary.syncIndexes(), DiaryCategory.syncIndexes()]);
    console.log('✅ MongoDB indexes synced successfully');
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
};
