import { Document, Schema } from 'mongoose';
import Joi from 'joi';
import { Request } from 'express';

interface IUser extends Document {
  fullName: string,
  email: string,
  birthdayDate: Date | null,
  avatar: string | null,
  password: string,
  createdDate: Date,
}

interface IRefer {
  type: Schema.Types.ObjectId,
  ref: string,
}

interface IPost extends Document {
  userId: IRefer,
  contentText: string,
  contentImage: string,
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

interface IPostJoi {
  contentText: Joi.StringSchema,
}

interface IUserRequest extends Request {
  userId?: string,
}

interface IJWTSign {
  userId: string,
  iat: number,
  exp: number
}

export {
  IUser,
  IPost,
  IRegisterJoi,
  ILoginJoi,
  IPostJoi,
  IUserRequest,
  IJWTSign,
};
