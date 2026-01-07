import { HttpError } from 'http-errors';
import { isCelebrateError } from 'celebrate';

export function errorHandler(err, req, res, next) {
  if (isCelebrateError(err)) {
    const errorBody = err.details.get('body');
    const errorQuery = err.details.get('query');
    const errorParams = err.details.get('params');

    const validationError = errorBody || errorQuery || errorParams;

    if (validationError) {
      const message = validationError.details[0].message;
      return res.status(400).json({
        message,
      });
    }
  }

  if (err instanceof HttpError) {
    return res.status(err.status).json({
      message: err.message || err.name,
    });
  }

  res.status(500).json({
    message: err.message,
  });
}
