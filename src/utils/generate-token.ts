import { Request } from 'express';
import jwt from 'jsonwebtoken';

import { UserToReturn } from '../models/user';

const generateTokenAndSendCookie = (user: UserToReturn, req: Request): void => {
      // Generate jwt
      const userJwt = jwt.sign({
        id: user.id,
        email: user.email
      }, process.env.JWT_KEY!);
  
      // Store jwt on session object
      req.session = {
        jwt: userJwt
      };
}

export default generateTokenAndSendCookie;



