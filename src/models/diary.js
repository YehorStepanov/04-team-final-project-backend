import { Schema, model } from 'mongoose';
import { DATE_REGEX } from '../constants/regex.js';

const diarySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      minLength: 1,
      maxLength: 64,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      minLength: 1,
      maxLength: 1000,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      match: [DATE_REGEX, 'Please use the format YYYY-MM-DD'],
      default: () => new Date().toISOString().split('T')[0],
      required: true,
    },
    emotions: {
      type: [Schema.Types.ObjectId], 
      ref: 'emotions',
      required: true,
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length >= 1 && v.length <= 12;
        },
        message: 'Emotions must be an array of ObjectIds (min 1, max 12 items)',
      },
    },
  },
  { versionKey: false, timestamps: true },
);

diarySchema.index({ userId: 1, date: -1 });

export const Diary = model('Diary', diarySchema);