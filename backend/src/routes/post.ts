import { Router } from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import Post from '../model/Post';
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
    if (fileFormats.includes(file.mimetype)) {
      cb(null, true);
    } else {
      req.file = file;
      cb(null, false);
    }
  },
});

router.post('/', upload.single('contentImage'), async (req, res) => {
  if (!fileFormats.includes(req.file.mimetype)) {
    return handleError(new ErrorJSON(
      415, 'Unsupported Media Type.', 'Please, load only jpeg or png.',
    ), req, res);
  }

  try {
    const validate = postValidator.validate(req.body);
    if (validate.error) {
      throw (new ErrorJSON(
        400, validate.error?.details[0].message, 'Please, correct your post form.',
      ));
    }

    const post = new Post({
      userId: (req as IUserRequest).userId,
      contentText: req.body.contentText,
      contentImage: req.file.path,
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

export default router;
