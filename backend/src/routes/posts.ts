/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Router } from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import Like from '../model/Like';
// import Like from '../model/Like';
import Post from '../model/Post';
import User from '../model/User';
import { ErrorJSON, handleError } from '../utils/error';
import { IUserRequest } from '../utils/interfaces';
import { postValidator } from '../utils/validators';

const router = Router();
const fileFormats = ['image/png', 'image/jpeg', 'image/gif'];

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
    fileSize: 1024 * 1024 * 4,
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

router.post('/', upload.single('contentImage'), async (req, res) => {
  try {
    if (req.file && !fileFormats.includes(req.file.mimetype)) {
      throw new ErrorJSON(
        415, 'Unsupported Media Type.', 'Please, load only jpeg or png.',
      );
    }

    delete req.body?.contentImage;

    const validate = postValidator.validate(req.body);
    if (validate.error) {
      throw new ErrorJSON(
        400, validate.error?.details[0].message, 'Please, correct your post form.',
      );
    }

    const post = new Post({
      userId: (req as IUserRequest).userId,
      contentText: req.body.contentText,
      contentImage: req.file ? req.file.path : null,
    });

    const savedPost = await post.save();
    const user = await User.findById(savedPost.userId);
    const { fullName, avatar } = user;
    const {
      _id, contentText, contentImage, createdDate,
    } = savedPost;

    return res.status(200).send({
      status: 'success',
      statusCode: 200,
      message: 'Post created successfully.',
      description: 'Please, wait a little bit.',
      data: {
        user: { fullName, avatar },
        id: _id,
        contentText,
        contentImage,
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
    const { page } = req.query;
    const currentPage = parseFloat(page as string);
    const limit = 5;
    const totalPostCount: number = await Post.countDocuments();
    const total = req.query.total ? parseFloat(req.query.total as string) : totalPostCount;
    const startIdx = ((currentPage - 1) * limit) + (totalPostCount - total);
    const endIdx = currentPage * limit;
    const nextPage = endIdx < totalPostCount ? currentPage + 1 : null;
    const pageCount = Math.ceil(totalPostCount / limit);
    const modelPosts = await Post.find()
      .sort({ _id: -1 })
      .limit(limit)
      .skip(startIdx);

    const modelNewPosts = totalPostCount === total ? null : await Post.find()
      .sort({ _id: -1 })
      .limit(totalPostCount - total);

    const posts = await Promise.all(
      modelPosts.map(async (post: any) => {
        const user = await User.findById(post.userId);
        const isLiked = await Like
          .findOne({})
          .and([{ userId: (req as IUserRequest).userId, postId: post._id }]);
        const likes = await Like.find({ postId: post._id });
        const { fullName, avatar } = user;
        const {
          _id, contentText, contentImage, createdDate,
        } = post;
        return {
          user: { fullName, avatar },
          id: _id,
          contentText,
          contentImage,
          createdDate,
          likesCount: likes.length || 0,
          isUserLiked: !!isLiked,
        };
      }),
    );

    return res.status(200).send({
      status: 200,
      message: 'Posts received successfully.',
      description: 'Please, wait a little bit.',
      data: {
        posts,
        currentPage,
        nextPage,
        totalPostCount,
        pageCount,
        newPosts: modelNewPosts,
      },
    });
  } catch (error) {
    return handleError(new ErrorJSON(
      400, 'Post page not found.', 'Please, try another post page.',
    ), req, res);
  }
});

router.get('/id/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    const user = await User.findById(post.userId);
    const isLiked = await Like
      .findOne({})
      .and([{ userId: (req as IUserRequest).userId, postId: post._id }]);
    const likes = await Like.find({ postId: post._id });
    const { fullName, avatar } = user;
    const {
      _id, contentText, contentImage, createdDate,
    } = post;
    return res.status(200).send({
      status: 200,
      message: 'Post received successfully.',
      description: 'Please, wait a little bit.',
      data: {
        user: { fullName, avatar },
        id: _id,
        contentText,
        contentImage,
        createdDate,
        likesCount: likes.length || 0,
        isUserLiked: !!isLiked,
      },
    });
  } catch (error) {
    return handleError(new ErrorJSON(
      400, 'Post not found.', 'Please, try another post id.',
    ), req, res);
  }
});

router.put('/id/:id', upload.single('contentImage'), async (req, res) => {
  try {
    const { id } = req.params;

    if (req.file && !fileFormats.includes(req.file.mimetype)) {
      throw new ErrorJSON(
        415, 'Unsupported Media Type.', 'Please, load only jpeg or png.',
      );
    }

    delete req.body?.contentImage;

    const validate = postValidator.validate(req.body);
    if (validate.error) {
      throw new ErrorJSON(
        400, validate.error?.details[0].message, 'Please, correct your post form.',
      );
    }

    const post = await Post.findById(id);

    if (post.userId !== (req as IUserRequest).userId) {
      throw new ErrorJSON(
        403, 'Forbidden', 'You have no access to edit this post.',
      );
    }

    await post.update({
      contentText: req.body.contentText,
      contentImage: req.file ? req.file.path : null,
    });

    return res.send(200).send({
      status: 200,
      message: 'Post edited successfully.',
      description: 'Please, wait a little bit',
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

router.delete('/id/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (post.userId !== (req as IUserRequest).userId) {
      throw new ErrorJSON(
        403, 'Forbidden', 'You have no access to edit this post.',
      );
    }

    await post.remove();
    return res.send(200).send({
      status: 200,
      message: 'Post deleted successfully.',
      description: 'Please, wait a little bit',
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
