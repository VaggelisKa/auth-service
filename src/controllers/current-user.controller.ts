import { Request, Response } from 'express';

const currentUserController = (req: Request, res: Response) => {
  const { currentUser } = req;
  res.send({ currentUser: currentUser || null });
}

export default currentUserController;


