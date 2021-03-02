import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { DatabaseConnectionError } from '../errors/database-connection-error';
import { RequestValidationError } from '../errors/request-validation-error';

const signupController = (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }
  
  const { email, password } = req.body;
  console.log('Email ' + email + ' password ' + password);
  throw new DatabaseConnectionError();

  res.status(201).send({ email, password });
}

export default signupController;


