/* eslint-disable no-underscore-dangle */
import { Router } from 'express';
import Post from '../model/Post';
import User from '../model/User';
import { handleError, ErrorJSON } from '../utils/error';

const router = Router();

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ username: id });
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

export default router;
