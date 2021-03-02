import express from 'express';

import currentUserController from '../controllers/current-user.controller';

const router = express.Router();

router.get('/api/users/currentuser', currentUserController);

export { router as currentUserRouter };
