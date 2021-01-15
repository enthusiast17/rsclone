import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import User from '../model/User';
import { loginValidator, registerValidator } from '../utils/validators';
import { ErrorJSON, handleError } from '../utils/error';
import { IJWTSign } from '../utils/interfaces';

const router = Router();
dotenv.config({ path: '.env' });

router.post('/register', async (req, res) => {
  try {
    const validate = registerValidator.validate(req.body);
    if (validate.error) {
      throw (new ErrorJSON(
        400, validate.error?.details[0].message, 'Please, correct your register form.',
      ));
    }

    const isUserExists = await User.findOne({ email: req.body.email });
    if (isUserExists) {
      throw new ErrorJSON(
        400, 'Email is already exists.', 'Please, choose another email address.',
      );
    }

    try {
      if (!process.env.SALT_NUMBER) {
        throw new ErrorJSON(
          500, 'Internal Error.', 'Upps! Sorry, something went wrong in internal server.',
        );
      }
      const salt = await bcrypt.genSalt(parseFloat(process.env.SALT_NUMBER));
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const user = new User({ ...req.body, password: hashedPassword, birthdayDate: null });
      await user.save();
      // eslint-disable-next-line no-underscore-dangle
      return res.status(200).send({
        status: 'success',
        statusCode: 200,
        message: 'Registration completed successfully.',
        description: 'Now, try to log in.',
      });
    } catch (error) {
      throw new ErrorJSON(
        500, 'Internal Error.', 'Upps! Sorry, something went wrong in internal server.',
      );
    }
  } catch (error) {
    if (!error.statusCode && !error.message && !error.description) {
      return handleError(new ErrorJSON(
        500, 'Internal Error.', 'Upps! Sorry, something went wrong in internal server.',
      ), req, res);
    }
    return handleError(error, req, res);
  }
});

router.post('/login', async (req, res) => {
  try {
    const validate = loginValidator.validate(req.body);
    if (validate.error) {
      throw new ErrorJSON(
        400, validate.error.details[0].message, 'Please, correct your login form.',
      );
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new ErrorJSON(
        400, 'Email or password is wrong.', 'Please, correct your email or password.',
      );
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      throw new ErrorJSON(
        400, 'Email or password is wrong.', 'Please, correct your email or password.',
      );
    }

    if (!process.env.REFRESH_TOKEN_SECRET_CODE
      || !process.env.REFRESH_TOKEN_EXPIRES_IN
      || !process.env.REFRESH_TOKEN_MAX_AGE
      || !process.env.ACCESS_TOKEN_SECRET_CODE
      || !process.env.ACCESS_TOKEN_EXPIRES_IN
      || !process.env.ACCESS_TOKEN_MAX_AGE) {
      throw new ErrorJSON(
        500, 'Internal Error.', 'Upps! Sorry, something went wrong in internal server.',
      );
    }

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.REFRESH_TOKEN_SECRET_CODE,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN },
    );
    res.cookie('refresh-token', refreshToken, {
      httpOnly: true,
      // secure: true,
      // sameSite: 'strict',
      expires: new Date(Number(new Date()) + parseFloat(process.env.REFRESH_TOKEN_MAX_AGE)),
    });

    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN_SECRET_CODE,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN },
    );
    res.cookie('access-token', accessToken, {
      httpOnly: true,
      // secure: true,
      // sameSite: 'strict',
      expires: new Date(Number(new Date()) + parseFloat(process.env.ACCESS_TOKEN_MAX_AGE)),
    });

    return res.status(200).send({
      status: 'success',
      statusCode: 200,
      message: 'Logged in successfully.',
      description: 'Please, wait a little bit.',
    });
  } catch (error: any) {
    if (!error.statusCode && !error.message && !error.description) {
      return handleError(new ErrorJSON(
        500, 'Internal Error.', 'Upps! Sorry, something went wrong in internal server.',
      ), req, res);
    }
    return handleError(error, req, res);
  }
});

router.get('/logout', async (req, res) => {
  try {
    res.clearCookie('access-token');
    res.clearCookie('refresh-token');
    return res.status(200).send({
      status: 'success',
      statusCode: 200,
      message: 'Logged out successfully.',
      description: 'Please, wait a little bit.',
    });
  } catch (error) {
    return handleError(new ErrorJSON(
      500, 'Internal Error.', 'Upps! Sorry, something went wrong in internal server.',
    ), req, res);
  }
});

router.get('/newaccesstoken', async (req, res) => {
  const refreshToken = req.cookies['refresh-token'];
  if (!process.env.REFRESH_TOKEN_SECRET_CODE
    || !process.env.ACCESS_TOKEN_SECRET_CODE
    || !process.env.ACCESS_TOKEN_MAX_AGE) {
    return handleError(new ErrorJSON(
      500, 'Internal Error.', 'Upps! Sorry, something went wrong in internal server.',
    ), req, res);
  }
  try {
    const user: string | object = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_CODE);
    const accessToken = jwt.sign(
      { userId: (user as IJWTSign).userId },
      process.env.ACCESS_TOKEN_SECRET_CODE,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN },
    );
    res.cookie('access-token', accessToken, {
      httpOnly: true,
      // secure: true,
      // sameSite: 'strict',
      expires: new Date(Number(new Date()) + parseFloat(process.env.ACCESS_TOKEN_MAX_AGE)),
    });

    return res.status(200).send({
      status: 'success',
      statusCode: 200,
      message: 'Your access token updated successfully.',
      description: '',
    });
  } catch (error) {
    return handleError(new ErrorJSON(
      500, 'Internal Error.', 'Upps! Sorry, something went wrong in internal server.',
    ), req, res);
  }
});

router.get('/me', async (req, res) => {
  const refreshToken = req.cookies['refresh-token'];

  if (!process.env.REFRESH_TOKEN_SECRET_CODE) {
    return handleError(new ErrorJSON(
      500, 'Internal Error.', 'Upps! Sorry, something went wrong in internal server.',
    ), req, res);
  }

  try {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_CODE);
    return res.status(200).send({
      status: 'success',
      statusCode: 200,
      message: 'Logged in successfully.',
      description: 'Please, wait a little bit.',
    });
  } catch (error) {
    return handleError(new ErrorJSON(
      403, 'Forbidden.', 'Please, try to log in again.',
    ), req, res);
  }
});

export default router;
