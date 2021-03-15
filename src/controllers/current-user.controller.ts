import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const currentUserController = (req: Request, res: Response) => {
  if (!req.session?.jwt) {
    return res.status(401).send({ currentUser: null });
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    
    res.send({ currentUser: payload })
  } catch (error) {
    return res.status(401).send({ currentUser: null });
  }
}

export default currentUserController;


