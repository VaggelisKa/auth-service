import { CustomError } from './custom-error';
import { SerializedError } from '../models/serializedError';

export class NotAuthorizedError extends CustomError {
  statusCode: number = 401;
  
  constructor() {
    super('Not authorized');

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors(): SerializedError[] {
    return [{ message: 'You have to signin or signup before you proceed' }];
  }

}



