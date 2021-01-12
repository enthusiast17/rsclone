import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { ErrorJSON, handleError } from '../helpers/error';

dotenv.config({ path: '.env' });

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies['access-token'];

  if (!process.env.ACCESS_TOKEN_SECRET_CODE) {
    return handleError(new ErrorJSON(
      500, 'Internal Error.', 'Upps! Sorry, something went wrong in internal server.',
    ), req, res);
  }

  try {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_CODE);
    next();
  } catch (error) {
    return handleError(new ErrorJSON(
      403, 'Forbidden.', 'Please, try to log in again.',
    ), req, res);
  }
  return res;
};

export default authMiddleware;
