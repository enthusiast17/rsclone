import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { MulterError } from 'multer';
import authRouter from './routes/auth';
import postsRouter from './routes/posts';
import likesRouter from './routes/likes';
import authMiddleware from './middlewares/auth';
import { ErrorJSON, handleError } from './utils/error';

const app = express();

dotenv.config({ path: '.env' });

mongoose.connect(
  process.env.DB_CONNECT || '',
  { useUnifiedTopology: true, useNewUrlParser: true },
).catch((error) => console.log(error));

app.use(cors({ origin: true, credentials: true }));

app.use(cookieParser());

app.use('/uploads', authMiddleware, express.static('uploads'));

app.use('/api/auth', express.json(), authRouter);

app.use((err: Error, req :Request, res: Response, next: NextFunction) => {
  if (err) {
    return handleError(new ErrorJSON(
      400, '400 Bad Request', 'Please, correct your JSON data.',
    ), req, res);
  }
  return next();
});

app.use('/api/posts', authMiddleware, postsRouter);

app.use((err: MulterError, req: Request, res: Response, next: NextFunction) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return handleError(new ErrorJSON(
      400, 'Bad Request', 'Your file size exceeds 5 MiB.',
    ), req, res);
  }
  return next();
});

app.use('/api/likes', authMiddleware, likesRouter);

app.listen(8000, () => console.log('Server is running on http://localhost:8000/'));
