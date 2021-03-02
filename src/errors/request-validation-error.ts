import { ValidationError } from 'express-validator';
import { SerializedError } from '../models/serializedError';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  statusCode: number = 500;

  constructor(public errors: ValidationError[]) {
    super('Invalid parameters');

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors(): SerializedError[] {
    return this.errors.map(error => (
      { message: error.msg, field: error.param }
    ));
  }
}
