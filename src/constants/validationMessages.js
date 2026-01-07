export const EMAIL_MESSAGES = {
  'string.email': 'Email must be a valid email address',
  'string.max': 'Email must be at most 64 characters',
  'any.required': 'Email is required',
};

export const PASSWORD_MESSAGES = {
  'string.min': 'Password must be at least 8 characters',
  'string.max': 'Password must be at most 128 characters',
  'any.required': 'Password is required',
};

export const NAME_MESSAGES = {
  'string.min': 'Name must be at least 2 characters',
  'string.max': 'Name must be at most 32 characters',
  'any.required': 'Name is required',
};

export const DUE_DATE_MESSAGES = {
  'string.pattern.base': 'dueDate must be in YYYY-MM-DD format',
  'date.min': 'dueDate must be at least 1 week from today',
  'date.max': 'dueDate must be no more than 40 weeks from today',
  'any.invalid': 'dueDate must be a valid date',
};

export const LOGIN_OBJECT_MESSAGES = {
  'object.unknown': 'Only email and password are allowed',
};

export const UPDATE_NAME_MESSAGES = {
  'string.min': 'Name must be at least 2 character',
  'string.max': 'Name must be at most 32 characters',
  'string.empty': 'Name cannot be empty',
};

export const GENDER_MESSAGES = {
  'any.only': 'Gender must be one of: male, female, neutral',
};

export const THEME_MESSAGES = {
  'any.only': 'Theme must be one of: male, female, neutral',
};
