import { Joi, Segments } from 'celebrate';
import { DATE_REGEX } from '../constants/regex.js';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const createDiarySchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).max(64).required(),
    description: Joi.string().min(1).max(1000).required(),
    date: Joi.string().pattern(DATE_REGEX).optional(),
    emotions: Joi.array()
      .items(Joi.string().custom(objectIdValidator)) 
      .min(1)
      .max(12)
      .required(),
  }),
};

export const updateDiarySchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).max(64),
    description: Joi.string().min(1).max(1000),
    date: Joi.string().pattern(DATE_REGEX),
    emotions: Joi.array()
      .items(Joi.string().custom(objectIdValidator))
      .min(1)
      .max(12),
  }).min(1),
};