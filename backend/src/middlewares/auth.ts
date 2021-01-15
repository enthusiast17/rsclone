import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { ErrorJSON, handleError } from '../utils/error';
import { IUserRequest } from '../utils/interfaces';

dotenv.config({ path: '.env' });

const authMiddleware = async (req: IUserRequest, res: Response, next: NextFunction) => {
  const accessToken = req.cookies['access-token'];

  if (!process.env.ACCESS_TOKEN_SECRET_CODE) {
    return handleError(new ErrorJSON(
      500, 'Internal Error.', 'Upps! Sorry, something went wrong in internal server.',
    ), req, res);
  }

  try {
    const user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_CODE);
    req.user = user;
    next(req);
  } catch (error) {
    return handleError(new ErrorJSON(
      403, 'Forbidden.', 'Please, try to log in again.',
    ), req, res);
  }
  return res;
};

export default authMiddleware;
