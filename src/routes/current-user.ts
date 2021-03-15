import express from 'express';

import currentUserController from '../controllers/current-user.controller';
import { getCurrentUserMiddleware } from '../middlewares/currentUser';

const router = express.Router();

router.get(
  '/api/users/currentuser',
  getCurrentUserMiddleware,
  currentUserController
);

export { router as currentUserRouter };
