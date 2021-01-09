import Joi from 'joi';
import { ILoginJoi, IRegisterJoi } from './interfaces';

const registerJoi: IRegisterJoi = {
  firstName: Joi.string().min(3).max(50).required(),
  lastName: Joi.string().min(3).max(50).required(),
  email: Joi.string().min(3).max(255).email()
    .required(),
  birthdayDate: Joi.date().required(),
  password: Joi.string().min(6).required(),
};

const registerValidator = Joi.object<IRegisterJoi>(registerJoi);

const loginJoi: ILoginJoi = {
  email: Joi.string().min(3).max(255).email()
    .required(),
  password: Joi.string().min(6).required(),
};

const loginValidator = Joi.object<ILoginJoi>(loginJoi);

export {
  registerValidator,
  loginValidator,
};
