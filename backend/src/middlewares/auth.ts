import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { ErrorJSON, handleError } from '../utils/error';
import { IJWTSign, IUserRequest } from '../utils/interfaces';

dotenv.config({ path: '.env' });

const authMiddleware = async (req: IUserRequest, res: Response, next: NextFunction) => {
  if (!process.env.ACCESS_TOKEN_SECRET_CODE) {
    return handleError(new ErrorJSON(
      500, 'Internal Error.', 'Upps! Sorry, something went wrong in internal server.',
    ), req, res);
  }

  try {
    if (!req.headers.authorization) {
      throw new Error();
    }
    const tokens = req.headers.authorization.split(' ');
    const accessToken = tokens[2];
    const verifiedUser = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_CODE);
    req.userId = (verifiedUser as IJWTSign).userId;
    next();
  } catch (error) {
    return handleError(new ErrorJSON(
      401, 'Unauthorized.', 'Please, try to reload.',
    ), req, res);
  }
  return res;
};

export default authMiddleware;
