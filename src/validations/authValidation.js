import { Joi, Segments } from 'celebrate';
import { FORTY_WEEKS, ONE_WEEK } from '../constants/time.js';
import { BABY_SEX, BABY_SEX_DEFAULT } from '../constants/babySex.js';
import {
  DUE_DATE_MESSAGES,
  EMAIL_MESSAGES,
  LOGIN_OBJECT_MESSAGES,
  NAME_MESSAGES,
  PASSWORD_MESSAGES,
} from '../constants/validationMessages.js';

export const validateDueDate = (value, helpers) => {
  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime())) {
    return helpers.error('any.invalid');
  }

  const now = new Date();
  const minDate = new Date(now.getTime() + ONE_WEEK);
  const maxDate = new Date(now.getTime() + FORTY_WEEKS);

  if (date < minDate) {
    return helpers.error('date.min');
  }
  if (date > maxDate) {
    return helpers.error('date.max');
  }

  return value;
};

const getDefaultDueDate = () =>
  new Date(Date.now() + ONE_WEEK).toISOString().slice(0, 10);

const YYYY_MM_DD_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().trim().min(2).max(32).required().messages(NAME_MESSAGES),
    email: Joi.string()
      .email()
      .trim()
      .max(64)
      .lowercase()
      .required()
      .messages(EMAIL_MESSAGES),
    password: Joi.string()
      .min(8)
      .max(128)
      .required()
      .messages(PASSWORD_MESSAGES),
    gender: Joi.string()
      .valid(...BABY_SEX)
      .default(BABY_SEX_DEFAULT),
    tema: Joi.string()
      .valid(...BABY_SEX)
      .default(BABY_SEX_DEFAULT),
    dueDate: Joi.string()
      .pattern(YYYY_MM_DD_REGEX)
      .custom(validateDueDate)
      .default(() => getDefaultDueDate())
      .messages(DUE_DATE_MESSAGES),
  }),
};

export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string()
      .email()
      .trim()
      .max(64)
      .lowercase()
      .required()
      .messages(EMAIL_MESSAGES),
    password: Joi.string()
      .min(8)
      .max(128)
      .required()
      .messages(PASSWORD_MESSAGES),
  })
    .unknown(false)
    .messages(LOGIN_OBJECT_MESSAGES),
};
