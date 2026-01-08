import { Joi, Segments } from 'celebrate';

import { DATE_REGEX } from '../constants/regex.js';

export const createTaskSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(1).max(96).required(),
    date: Joi.string().pattern(DATE_REGEX).required(),
    isDone: Joi.boolean().default(false),
  }),
};

export const stateTaskSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),

  [Segments.BODY]: Joi.object({
    isDone: Joi.boolean().required(),
  }),
};
