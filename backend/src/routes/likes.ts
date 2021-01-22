import { Router } from 'express';
import Like from '../model/Like';
import { ErrorJSON, handleError } from '../utils/error';
import { IUserRequest } from '../utils/interfaces';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const postId = req.query.post ? req.query.post : null;
    const commentId = req.query.comment ? req.query.comment : null;

    if (!postId && !commentId) {
      throw new ErrorJSON(
        400, 'Bad Request', 'Please, correct http query.',
      );
    }

    const like = await Like.findOne().or([
      { $and: [{ userId: (req as IUserRequest).userId }, { postId }, { commentId: null }] },
      { $and: [{ userId: (req as IUserRequest).userId }, { postId: null }, { commentId }] },
    ]);

    if (!like) {
      await new Like({
        userId: (req as IUserRequest).userId,
        postId,
        commentId,
      }).save();
    } else {
      await Like.deleteOne({ _id: like.id });
    }

    return res.status(200).send({
      status: 200,
      message: 'Like created successfully.',
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

export default router;
