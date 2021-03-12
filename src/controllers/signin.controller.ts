import { NextFunction, Request, Response } from "express";

import { User } from '../models/user';
import { BadRequestError } from "../errors/bad-request-error";
import Password from "../utils/password";
import generateTokenAndSendCookie from "../utils/generate-token";

const signinController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError('Email or password is wrong')
    }

    const isPasswordCorrect = await Password.compareHashedAndGivenPassword(
      existingUser.password, password);
    if (!isPasswordCorrect) {
      throw new BadRequestError('Email or password is wrong');
    }

    generateTokenAndSendCookie({ id: existingUser.id, email: existingUser.email }, req);

    res.status(200).send(existingUser);
  } catch (error) {
    throw error;
  }
};

export default signinController;
