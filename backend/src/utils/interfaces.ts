import { Document } from 'mongoose';
import Joi from 'joi';
import { Request } from 'express';

interface IUser extends Document {
  _id: string,
  fullName: string,
  email: string,
  username: string,
  birthdayDate: Date | null,
  avatar: string | null,
  aboutme: string | null,
  password: string,
  createdAt: Date,
  updatedAt: Date,
}

interface IPost extends Document {
  _id: string
  userId: string,
  contentText: string,
  contentImage: string,
  createdAt: Date,
  updatedAt: Date,
}

interface ILike extends Document {
  _id: string,
  userId: string,
  postId: string | null,
  commentId: string | null,
  createdAt: Date,
  updatedAt: Date,
}

interface IComment extends Document {
  _id: string,
  userId: string,
  postId: string,
  contentText: string,
  createdDate: Date,
  createdAt: Date,
  updatedAt: Date,
}

interface IFollower extends Document {
  _id: string,
  followingId: string,
  followerId: string,
  createdAt: Date,
  updatedAt: Date,
}

interface IRoom extends Document {
  _id: string,
  users: string[],
  createdDate: Date,
  createdAt: Date,
  updatedAt: Date,
}

interface IMessage extends Document {
  _id: string,
  roomId: string,
  userId: string,
  contentText: string,
  createdDate: Date,
  createdAt: Date,
  updatedAt: Date,
}

interface IRegisterJoi {
  fullName: Joi.StringSchema,
  email: Joi.StringSchema,
  username: Joi.StringSchema,
  birthdayDate: Joi.DateSchema,
  password: Joi.StringSchema,
}

interface ILoginJoi {
  email: Joi.StringSchema,
  password: Joi.StringSchema,
}

interface IPostJoi {
  contentText: Joi.StringSchema,
  contentImage: Joi.StringSchema,
}

interface ICommentJoi {
  postId: Joi.StringSchema,
  contentText: Joi.StringSchema,
}

interface IProfileJoi {
  fullName: Joi.StringSchema,
  email: Joi.StringSchema,
  username: Joi.StringSchema,
  birthdayDate: Joi.DateSchema,
  avatar: Joi.StringSchema,
  aboutme: Joi.StringSchema,
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
  IComment,
  IFollower,
  IRoom,
  IMessage,
  IRegisterJoi,
  ILoginJoi,
  IPostJoi,
  ICommentJoi,
  IProfileJoi,
  IUserRequest,
  IJWTSign,
};
