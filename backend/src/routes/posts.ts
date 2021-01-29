/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import Like from '../model/Like';
import Post from '../model/Post';
import User from '../model/User';
import Comment from '../model/Comment';
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
    let currentUser = null;
    if (req.query.username) {
      currentUser = await User.findOne({ username: req.query.username as string });
    }
    const totalPostCount: number = await Post.countDocuments(
      currentUser ? { userId: currentUser } : {},
    );
    const total = req.query.total ? parseFloat(req.query.total as string) : totalPostCount;
    const startIdx = ((currentPage - 1) * limit) + (totalPostCount - total);
    const endIdx = currentPage * limit;
    const nextPage = endIdx < totalPostCount ? currentPage + 1 : null;
    const pageCount = Math.ceil(totalPostCount / limit);

    let posts = [];
    if (req.query.username) {
      posts = await Post.find({ userId: currentUser })
        .sort({ _id: -1 })
        .limit(limit)
        .skip(startIdx);
    } else {
      posts = await Post.find()
        .sort({ _id: -1 })
        .limit(limit)
        .skip(startIdx);
    }

    const newPosts = totalPostCount === total ? null : await Post.find()
      .sort({ _id: -1 })
      .limit(totalPostCount - total);

    posts = await Promise.all(
      posts.map(async (post: any) => {
        const user = await User.findById(post.userId);
        const isLiked = await Like
          .findOne({})
          .and([{ userId: (req as IUserRequest).userId, postId: post._id }]);
        const likes = await Like.find({ postId: post._id });
        const comments = await Comment.find({ postId: post._id });
        const {
          fullName, email, username, avatar,
        } = user;
        const {
          _id, contentText, contentImage, createdDate,
        } = post;
        return {
          user: {
            fullName, email, username, avatar,
          },
          id: _id,
          contentText,
          contentImage,
          createdDate,
          likesCount: likes.length || 0,
          isUserLiked: !!isLiked,
          commentsCount: comments.length || 0,
        };
      }),
    );

    return res.status(200).send({
      status: 'success',
      statusCode: 200,
      message: 'Posts received successfully.',
      description: 'Please, wait a little bit.',
      data: {
        posts,
        currentPage,
        nextPage,
        totalPostCount,
        pageCount,
        newPosts,
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
    const comments = await Comment.find({ postId: post._id });
    const {
      fullName, email, username, avatar,
    } = user;
    const {
      _id, contentText, contentImage, createdDate,
    } = post;
    return res.status(200).send({
      status: 'success',
      statusCode: 200,
      message: 'Post received successfully.',
      description: 'Please, wait a little bit.',
      data: {
        user: {
          fullName, email, username, avatar,
        },
        id: _id,
        contentText,
        contentImage,
        createdDate,
        likesCount: likes.length || 0,
        isUserLiked: !!isLiked,
        commentsCount: comments.length || 0,
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
        415, 'Unsupported Media Type.', 'Please, load only jpeg, png and gif.',
      );
    }

    const validate = postValidator.validate(req.body);
    if (validate.error) {
      throw new ErrorJSON(
        400, validate.error?.details[0].message, 'Please, correct your post form.',
      );
    }

    let post = await Post.findById(id);
    if (!post) {
      throw new ErrorJSON(
        400, 'Post not found.', 'Please, try another post id.',
      );
    }
    if (post.userId.toString() !== (req as IUserRequest).userId) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      throw new ErrorJSON(
        403, 'Forbidden', 'You have no access to edit this post.',
      );
    }

    let contentImage = null;
    if (req.body.contentImage === post.contentImage) contentImage = post.contentImage;
    if ((req.file && post.contentImage) || (!contentImage && post.contentImage)) {
      fs.unlinkSync(post.contentImage);
    }

    post = await Post.findByIdAndUpdate(
      id,
      {
        contentText: req.body.contentText,
        contentImage: req.file ? req.file.path : contentImage,
      },
    );

    return res.status(200).send({
      status: 'success',
      statusCode: 200,
      message: 'Post edited successfully.',
      description: 'Please, wait a little bit',
      data: {
        contentText: post.contentText,
        contentImage: post.contentImage,
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

router.delete('/id/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      throw new ErrorJSON(
        400, 'Post not found.', 'Please, try another post id.',
      );
    }

    if (post.userId.toString() !== (req as IUserRequest).userId) {
      throw new ErrorJSON(
        403, 'Forbidden', 'You have no access to edit this post.',
      );
    }

    if (post.contentImage) {
      fs.unlinkSync(post.contentImage);
    }

    await Comment.deleteMany({ postId: post._id });
    await Like.deleteMany({ postId: post._id });
    await post.deleteOne();

    return res.status(200).send({
      status: 'success',
      statusCode: 200,
      message: 'Post deleted successfully.',
      description: 'Please, wait a little bit',
      data: null,
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
