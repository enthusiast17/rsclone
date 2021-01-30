/* eslint-disable no-underscore-dangle */
import { Router } from 'express';
import Follower from '../model/Follower';
import User from '../model/User';
import { ErrorJSON, handleError } from '../utils/error';
import { IUserRequest } from '../utils/interfaces';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { username } = req.query;
    const followerId = (req as IUserRequest).userId;

    if (!username) {
      throw new ErrorJSON(
        400, 'Bad Request', 'Please, correct http query.',
      );
    }

    const followingUser = await User.findOne({ username: username as string });
    if (!followingUser) {
      throw new ErrorJSON(
        400, 'User not found.', 'Please, try another username.',
      );
    }

    const followingId = followingUser._id;
    const follower = await Follower.findOne({
      followingId,
      followerId,
    });

    if (!follower) {
      await new Follower({
        followingId,
        followerId,
      }).save();
    } else {
      await follower.deleteOne();
    }

    return res.status(200).send({
      status: 'success',
      statusCode: 200,
      message: 'Follower created successfully.',
      description: null,
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

router.get('/', async (req, res) => {
  try {
    const { username } = req.query;

    if (!username) {
      throw new ErrorJSON(
        400, 'Bad Request', 'Please, correct http query.',
      );
    }

    const user = await User.findOne({ username: username as string });
    if (!user) {
      throw new ErrorJSON(
        400, 'User not found.', 'Please, try another username.',
      );
    }

    const followers = await Follower.find({ followingId: user._id });

    return res.status(200).send({
      status: 'success',
      statusCode: 200,
      message: 'Followers received successfully.',
      description: followers,
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

router.get('/following/', async (req, res) => {
  try {
    const { username } = req.query;

    if (!username) {
      throw new ErrorJSON(
        400, 'Bad Request', 'Please, correct http query.',
      );
    }

    const user = await User.findOne({ username: username as string });
    if (!user) {
      throw new ErrorJSON(
        400, 'User not found.', 'Please, try another username.',
      );
    }

    const followers = await Follower.find({ followerId: user._id });

    return res.status(200).send({
      status: 'success',
      statusCode: 200,
      message: 'Following received successfully.',
      description: followers,
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
