import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const currentUserController = (req: Request, res: Response) => {
  const { currentUser } = req;
  
  if (!currentUser) {
    return res.status(401).send({ currentUser: null })
  }

  res.status(200).send({ currentUser });
}

export default currentUserController;


