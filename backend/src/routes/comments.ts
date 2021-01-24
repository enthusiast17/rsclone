import { Router } from 'express';
import { ErrorJSON, handleError } from '../utils/error';
import { commentValidator } from '../utils/validators';
import Comment from '../model/Comment';
import { IUserRequest } from '../utils/interfaces';
import User from '../model/User';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const validate = commentValidator.validate(req.body);
    if (validate.error) {
      throw (new ErrorJSON(
        400, validate.error?.details[0].message, 'Please, correct your comment form.',
      ));
    }

    const comment = await new Comment({
      userId: (req as IUserRequest).userId,
      postId: req.body.postId,
      contentText: req.body.contentText,
    }).save();

    const user = await User.findById(comment.userId);
    const { fullName, avatar } = user;
    const { postId, contentText, createdDate } = comment;
    return res.status(200).send({
      status: 200,
      message: 'Comment created successfully.',
      description: 'Please, wait a little bit.',
      data: {
        user: { fullName, avatar },
        postId,
        contentText,
        createdDate,
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

router.get('/', async (req, res) => {
  try {
    const post = req.query.post as string;

    if (!post) {
      throw new ErrorJSON(
        400, '400 Bad Request', 'Please, correct your request.',
      );
    }

    const modelComments = await Comment.find({ postId: post }).sort({ _id: -1 });

    const comments = await Promise.all(
      modelComments.map(async (comment: any) => {
        const user = await User.findById(comment.userId);
        const { fullName, avatar } = user;
        const { postId, contentText, createdDate } = comment;
        return {
          user: { fullName, avatar },
          postId,
          contentText,
          createdDate,
        };
      }),
    );

    return res.status(200).send({
      status: 200,
      message: 'Comments received successfully.',
      description: 'Please, wait a little bit.',
      data: comments,
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
