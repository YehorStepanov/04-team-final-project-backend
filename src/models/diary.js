import { Schema, model } from 'mongoose';

const diarySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: 'DiaryCategory',
      required: true,
    },

    content: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

diarySchema.index({
  title: 'text',
  content: 'text',
});

export const Diary = model('Diary', diarySchema);
