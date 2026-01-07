import { model, Schema } from 'mongoose';
import { BABY_SEX, BABY_SEX_DEFAULT } from '../constants/babySex.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
      maxlength: 64,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 128,
    },
    gender: {
      type: String,
      enum: [...BABY_SEX],
      default: BABY_SEX_DEFAULT,
    },
    theme: {
      type: String,
      enum: [...BABY_SEX],
      default: BABY_SEX_DEFAULT,
    },
    dueDate: {
      type: String,
      match: /^\d{4}-\d{2}-\d{2}$/,
    },
    avatar: {
      type: String,
      default: 'https://ac.goit.global/fullstack/react/default-avatar.jpg',
    },
  },
  { timestamps: true, versionKey: false },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('User', userSchema);
