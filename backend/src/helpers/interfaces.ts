import { Document } from 'mongoose';
import Joi from 'joi';

interface IUser extends Document {
  firstName: string,
  lastName: string,
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

export {
  IUser,
  IRegisterJoi,
  ILoginJoi,
};
