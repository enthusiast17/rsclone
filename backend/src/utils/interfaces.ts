import { Document } from 'mongoose';
import Joi from 'joi';
import { Request } from 'express';

interface IUser extends Document {
  fullName: string,
  email: string,
  birthdayDate: Date,
  password: string,
  createdDate: Date,
}

interface IRegisterJoi {
  fullName: Joi.StringSchema,
  email: Joi.StringSchema,
  birthdayDate: Joi.DateSchema,
  password: Joi.StringSchema,
}

interface ILoginJoi {
  email: Joi.StringSchema,
  password: Joi.StringSchema,
}

interface IUserRequest extends Request {
  user: string | object,
}

interface IJWTSign {
  userId: number,
  iat: number,
  exp: number
}

export {
  IUser,
  IRegisterJoi,
  ILoginJoi,
  IUserRequest,
  IJWTSign,
};
