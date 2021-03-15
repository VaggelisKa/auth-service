import { NextFunction, Request, Response } from "express";
import { NotAuthorizedError } from '../errors/not-authorized-error'

export const checkUserAuth = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  next();
};


