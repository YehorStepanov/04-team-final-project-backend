import { Schema, model } from 'mongoose';

const diaryCategorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true },
);

export const DiaryCategory = model('DiaryCategory', diaryCategorySchema);
