import { SerializedError } from '../models/serializedError';
import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
  statusCode: number = 400;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors(): SerializedError[] {
    return [{
      message: this.message
    }];
  }

}