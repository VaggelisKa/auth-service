import { SerializedError } from "../models/serializedError";
import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode: number = 404;

  constructor() {
    super('Route not found');

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors(): SerializedError[] {
    return [{ message: 'Not found' }];
  }

}


