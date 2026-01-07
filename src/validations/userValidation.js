import { Joi, Segments } from 'celebrate';
import { BABY_SEX } from '../constants/babySex.js';
import {
  UPDATE_NAME_MESSAGES,
  GENDER_MESSAGES,
  THEME_MESSAGES,
  DUE_DATE_MESSAGES,
} from '../constants/validationMessages.js';
import { validateDueDate } from './authValidation.js';

export const updateUserSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().trim().min(2).max(32).messages(UPDATE_NAME_MESSAGES),
    gender: Joi.string()
      .valid(...BABY_SEX)
      .messages(GENDER_MESSAGES),
    theme: Joi.string()
      .valid(...BABY_SEX)
      .messages(THEME_MESSAGES),
    dueDate: Joi.string()
      .pattern(/^\d{4}-\d{2}-\d{2}$/)
      .custom(validateDueDate)
      .messages(DUE_DATE_MESSAGES),
  }),
};
