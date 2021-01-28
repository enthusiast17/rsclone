/* eslint-disable no-underscore-dangle */
import { Router } from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import Post from '../model/Post';
import User from '../model/User';
import { handleError, ErrorJSON } from '../utils/error';
import { IUserRequest } from '../utils/interfaces';
import { profileValidator } from '../utils/validators';

const router = Router();

router.get('/username/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      throw new ErrorJSON(
        400, 'Profile not found.', 'Please, try another prfoile username.',
      );
    }
    const postsCount = await Post.countDocuments({ userId: user._id });
    const {
      fullName,
      email,
      username,
      birthdayDate,
      avatar,
      aboutme,
    } = user;
    return res.status(200).send({
      status: 'success',
      statusCode: 200,
      message: 'Proile received successfully.',
      description: 'Please, wait a little bit.',
      data: {
        fullName,
        email,
        username,
        birthdayDate,
        avatar,
        aboutme,
        postsCount,
        followersCount: 0,
        followingCount: 0,
        groupsCount: 0,
      },
    });
  } catch (error) {
    if (error.name !== 'ErrorJSON') {
      return handleError(new ErrorJSON(
        500, 'Internal Error.', 'Upps! Sorry, something went wrong in internal server.',
      ), req, res);
    }
    return handleError(error, req, res);
  }
});

const fileFormats = ['image/png', 'image/jpeg'];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().toISOString().replace(/:|\./g, '')}-${uuidv4()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 3,
  },
  fileFilter: (req, file, cb) => {
    if (file === undefined || fileFormats.includes(file.mimetype)) {
      cb(null, true);
    } else {
      req.file = file;
      cb(null, false);
    }
  },
});

router.put('/username/:username', upload.single('avatar'), async (req, res) => {
  try {
    if (req.file && !fileFormats.includes(req.file.mimetype)) {
      throw new ErrorJSON(
        415, 'Unsupported Media Type.', 'Please, load only jpeg or png.',
      );
    }

    if (req.body.birthdayDate === 'null') req.body.birthdayDate = null;
    if (req.body.aboutme === 'null' || req.body.aboutme === '') req.body.aboutme = null;

    const validate = profileValidator.validate(req.body);
    if (!req.body || validate.error) {
      throw new ErrorJSON(
        400, validate.error?.details[0].message || 'Bad Request', 'Please, correct your profile form.',
      );
    }

    let user = await User.findOne({ username: req.params.username });
    if (!user) {
      throw new ErrorJSON(
        400, 'Profile not found.', 'Please, try another profile username.',
      );
    }

    if (user._id.toString() !== (req as IUserRequest).userId) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      throw new ErrorJSON(
        403, 'Forbidden', 'You have no access to edit this profile.',
      );
    }

    if (req.body.email !== user.email) {
      const isEmailExists = await User.findOne({ email: req.body.email });
      if (isEmailExists) {
        throw new ErrorJSON(
          400, 'Email is already exists.', 'Please, choose another email address.',
        );
      }
    }

    if (req.body.username !== user.username) {
      const isUsernameExists = await User.findOne({ username: req.body.username });
      if (isUsernameExists) {
        throw new ErrorJSON(
          400, 'Username is already exists.', 'Please, choose another username.',
        );
      }
    }

    let avatar = null;
    if (req.body.avatar === user.avatar) avatar = user.avatar;
    if ((req.file && user.avatar) || (!avatar && user.avatar)) {
      fs.unlinkSync(user.avatar);
    }

    user = await User.findOneAndUpdate({
      username: req.params.username,
    },
    {
      ...req.body,
      birthdayDate: req.body?.birthdayDate ? req.body.birthdayDate : null,
      avatar: req.file ? req.file.path : avatar,
      aboutme: req.body?.aboutme ? req.body.aboutme : null,
    });

    return res.status(200).send({
      status: 'success',
      statusCode: 200,
      message: 'Profile edited successfully.',
      description: 'Please, wait a little bit',
      data: {
        fullName: user.fullName,
        email: user.email,
        username: user.username,
        birthdayDate: user.birthdayDate,
        avatar: user.avatar,
        aboutme: user.aboutme,
      },
    });
  } catch (error) {
    if (error.name !== 'ErrorJSON') {
      return handleError(new ErrorJSON(
        500, 'Internal Error.', 'Upps! Sorry, something went wrong in internal server.',
      ), req, res);
    }
    return handleError(error, req, res);
  }
});

export default router;
