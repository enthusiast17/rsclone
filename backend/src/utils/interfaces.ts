import { Document } from 'mongoose';
import Joi from 'joi';
import { Request } from 'express';

interface IUser extends Document {
  _id: string,
  fullName: string,
  email: string,
  birthdayDate: Date | null,
  avatar: string | null,
  password: string,
  createdDate: Date,
}

interface IPost extends Document {
  _id: string
  userId: string,
  contentText: string,
  contentImage: string,
  createdDate: Date,
}

interface ILike extends Document {
  _id: string,
  userId: string,
  postId: string | null,
  commentId: string | null,
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
  ILike,
  IRegisterJoi,
  ILoginJoi,
  IPostJoi,
  IUserRequest,
  IJWTSign,
};
