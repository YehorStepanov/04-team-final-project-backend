import { Schema, model } from 'mongoose';

const babyStateSchema = new Schema(
  {
    weekNumber: { type: Number, required: true, unique: true },

    analogy: { type: String },
    babySize: { type: Number },
    babyWeight: { type: Number },
    image: { type: String },
    babyActivity: { type: String },
    babyDevelopment: { type: String },
    interestingFact: { type: String },
    momDailyTips: [String],
  },
  { timestamps: true, versionKey: false },
);

export default model('BabyState', babyStateSchema);
