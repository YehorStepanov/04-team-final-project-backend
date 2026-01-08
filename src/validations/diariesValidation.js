import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value)
    ? helpers.message('Invalid ObjectId format')
    : value;
};

//==========CREATE==========
export const createDiarySchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(3).max(100).required().messages({
      'string.base': 'Title must be a string',
      'string.min': 'Title should have at least {#limit} characters',
      'string.max': 'Title should have at most {#limit} characters',
      'any.required': 'Title is required',
    }),

    category: Joi.string().hex().length(24).required().messages({
      'string.hex': 'Category must be a valid ObjectId',
      'string.length': 'Category must be a valid ObjectId',
      'any.required': 'Category is required',
    }),

    content: Joi.string().max(1000).allow('').messages({
      'string.base': 'Content must be a string',
      'string.max': 'Content should have at most {#limit} characters',
    }),
  }),
};

//==========PARAMS===========
export const diaryIdParamSchema = {
  [Segments.PARAMS]: Joi.object({
    diaryId: Joi.string().custom(objectIdValidator).required(),
  }),
};

//===========UPDATE===========
export const updateDiarySchema = {
  [Segments.PARAMS]: Joi.object({
    diaryId: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(3).max(100),
    category: Joi.string().custom(objectIdValidator),
    content: Joi.string().max(1000).allow(''),
  }).min(1),
};

//===========GET (pagination + filters + sorting)===========
export const getDiariesSchema = {
  [Segments.QUERY]: Joi.object({
    // paginate
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),

    // filters
    category: Joi.string().custom(objectIdValidator),
    search: Joi.string().trim().allow(''),
    dateFrom: Joi.date().iso(),
    dateTo: Joi.date().iso(),

    // sort
    sortBy: Joi.string()
      .valid('_id', 'createdAt', 'title')
      .default('createdAt'),

    sortOrder: Joi.string().valid('asc', 'desc').default('desc'),
  }),
};
