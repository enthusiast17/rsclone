import { Router } from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import Post from '../model/Post';
import User from '../model/User';
import { ErrorJSON, handleError } from '../utils/error';
import { IPost, IUser, IUserRequest } from '../utils/interfaces';
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
      return handleError(new ErrorJSON(
        415, 'Unsupported Media Type.', 'Please, load only jpeg or png.',
      ), req, res);
    }

    const validate = postValidator.validate(req.body);
    if (validate.error) {
      throw (new ErrorJSON(
        400, validate.error?.details[0].message, 'Please, correct your post form.',
      ));
    }

    const post = new Post({
      userId: (req as IUserRequest).userId,
      contentText: req.body.contentText,
      contentImage: req.file ? req.file.path : null,
    });

    await post.save();

    return res.status(200).send({
      status: 'success',
      statusCode: 200,
      message: 'Post created successfully.',
      description: 'Please, wait a little bit.',
    });
  } catch (error) {
    if (!error.statusCode && !error.message && !error.description) {
      return handleError(new ErrorJSON(
        500, 'Internal Error.', 'Upps! Sorry, something went wrong in internal server.',
      ), req, res);
    }
    return handleError(error, req, res);
  }
});

router.get('/:page', async (req, res) => {
  try {
    const currentPage = parseFloat(req.params.page);
    const limit = 5;
    const startIdx = (currentPage - 1) * limit;
    const endIdx = currentPage * limit;
    const totalPostCount = await Post.countDocuments();
    const nextPage = endIdx < totalPostCount ? currentPage + 1 : null;
    const pageCount = Math.ceil(totalPostCount / limit);
    const modelPosts = await Post.find()
      .limit(limit)
      .skip(startIdx);

    const posts = await Promise.all(
      modelPosts.map(async (post: IPost) => {
        const user: IUser = await User.findById(post.userId);
        const { fullName } = user;
        const { contentText, contentImage, createdDate } = post;
        return {
          user: { fullName },
          contentText,
          contentImage,
          createdDate,
        };
      }),
    );

    return res.status(200).send({
      status: 200,
      message: 'Posts received successfully.',
      description: '',
      data: {
        posts,
        currentPage,
        nextPage: !nextPage ? nextPage : `/post/${nextPage}`,
        totalPostCount,
        pageCount,
      },
    });
  } catch (error) {
    if (!error.statusCode && !error.message && !error.description) {
      return handleError(new ErrorJSON(
        500, 'Internal Error.', 'Upps! Sorry, something went wrong in internal server.',
      ), req, res);
    }
    return handleError(error, req, res);
  }
});

export default router;
