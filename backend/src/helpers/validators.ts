import Joi from 'joi';
import passwordJoiComplexity from 'joi-password-complexity';
import { ILoginJoi, IRegisterJoi } from './interfaces';

const registerJoi: IRegisterJoi = {
  fullName: Joi.string().min(3).max(50).required(),
  email: Joi.string().min(3).max(255).email()
    .required(),
  birthdayDate: Joi.date(),
  password: passwordJoiComplexity().required(),
};

const registerValidator = Joi.object<IRegisterJoi>(registerJoi);

const loginJoi: ILoginJoi = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

const loginValidator = Joi.object<ILoginJoi>(loginJoi);

export {
  registerValidator,
  loginValidator,
};
