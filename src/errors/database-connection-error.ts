import { SerializedError } from '../models/serializedError';
import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
  statusCode: number = 500;
  private reason: string = 'Error connecting to database';

  constructor() {
    super('Db connection error');
    
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors(): SerializedError[] {
    return [{ message: this.reason }]
  }
  
}



