import { Schema, model } from 'mongoose';
import { DATE_REGEX } from '../constants/regex.js';

const taskSchema = new Schema(
  {
    name: {
      type: String,
      minLength: 1,
      maxLength: 96,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      match: [DATE_REGEX, 'Please use the format YYYY-MM-DD'],
      default: () => new Date().toISOString().split('T')[0],
      required: true,
    },
    isDone: { type: Boolean, default: false },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { versionKey: false, timestamps: true },
);

export const Task = model('Task', taskSchema);
