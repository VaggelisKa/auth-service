import { Response } from 'express';

const currentUserController = (_: any, res: Response) => {
  res.send('Hi from currentUser controller');
}

export default currentUserController


