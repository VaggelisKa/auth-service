import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../models/user';
import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';

const signupController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    
    const { email, password } = req.body;
  
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError('Email is already in use')
    }
  
    const user = User.build({email, password});
    await user.save();

    // Generate jwt
    const userJwt = jwt.sign({
      id: user.id,
      email: user.email
    }, process.env.JWT_KEY!);

    // Store jwt on session object
    req.session = {
      jwt: userJwt
    };
  
    res.status(201).send(user);
  } catch (error) {
    throw error;
  }
}

export default signupController;


