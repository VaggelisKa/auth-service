import express from 'express';
import { body } from 'express-validator';

import signinController from '../controllers/signin.controller';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.post('/api/users/signin', [
  body('email')
    .isEmail()
    .withMessage('Email must be valid')
    .notEmpty()
    .withMessage('Email is required'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
], validateRequest, signinController);

export { router as signinRouter };