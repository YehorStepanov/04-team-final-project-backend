import { Schema, model } from 'mongoose';

const stateMomSchema = new Schema(
  {
    weekNumber: { type: Number, required: true, unique: true },
    feelings: {
      states: [String],
      sensationDescr: String,
    },
    comfortTips: [
      {
        category: String,
        tip: String,
      },
    ],
  },
  { timestamps: false, versionKey: false },
);

export default model('StateMom', stateMomSchema);
