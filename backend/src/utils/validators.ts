import Joi from 'joi';
import passwordJoiComplexity from 'joi-password-complexity';
import {
  ICommentJoi, ILoginJoi, IPostJoi, IRegisterJoi,
} from './interfaces';

const registerJoi: IRegisterJoi = {
  fullName: Joi.string().trim().min(3).max(50)
    .required(),
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

const postJoi: IPostJoi = {
  contentText: Joi.string().trim().min(1).max(1000)
    .required(),
};

const postValidator = Joi.object<IPostJoi>(postJoi);

const commentJoi: ICommentJoi = {
  postId: Joi.string().required(),
  contentText: Joi.string().trim().min(1).max(500)
    .required(),
};

const commentValidator = Joi.object<ICommentJoi>(commentJoi);

export {
  registerValidator,
  loginValidator,
  postValidator,
  commentValidator,
};
