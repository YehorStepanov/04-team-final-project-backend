import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

import { DATE_REGEX } from '../constants/regex.js';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const createTaskSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(1).max(96).required(),
    date: Joi.string().pattern(DATE_REGEX).required(),
    isDone: Joi.boolean().default(false),
  }),
};

export const stateTaskSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().custom(objectIdValidator).required(),
  }),

  [Segments.BODY]: Joi.object({
    isDone: Joi.boolean().required(),
  }),
};
