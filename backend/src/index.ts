/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { MulterError } from 'multer';
import socketio from 'socket.io';
import http from 'http';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import authRouter from './routes/auth';
import postsRouter from './routes/posts';
import likesRouter from './routes/likes';
import commentsRouter from './routes/comments';
import profileRouter from './routes/profile';
import followersRouter from './routes/followers';
import searchRouter from './routes/search';
import roomRouter from './routes/rooms';
import authMiddleware from './middlewares/auth';
import Room from './model/Room';
import User from './model/User';
import { ErrorJSON, handleError } from './utils/error';
import { IJWTSign } from './utils/interfaces';
import Message from './model/Message';

const app = express();

dotenv.config({ path: '.env' });

mongoose.connect(
  process.env.DB_CONNECT || '',
  { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false },
).catch((error) => console.log(error));

mongoose.set('returnOriginal', false);

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(cookieParser());

app.use('/uploads', express.static('uploads'));

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

app.use('/api/comments', [authMiddleware, express.json()], commentsRouter);

app.use((err: Error, req :Request, res: Response, next: NextFunction) => {
  if (err) {
    return handleError(new ErrorJSON(
      400, '400 Bad Request', 'Please, correct your JSON data.',
    ), req, res);
  }
  return next();
});

app.use('/api/profile', authMiddleware, profileRouter);

app.use('/api/followers', authMiddleware, followersRouter);

app.use('/api/search', authMiddleware, searchRouter);

app.use('/api/rooms/', authMiddleware, roomRouter);

const server = http.createServer(app);
const io = new socketio.Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});

io.on('connection', async (socket: any) => {
  const cookies = cookie.parse(socket.handshake.headers.cookie || '');
  const refreshToken = cookies['refresh-token'];

  if (!process.env.REFRESH_TOKEN_SECRET_CODE) {
    socket.disconnect();
    return;
  }

  let verifiedUser: string | object;
  try {
    verifiedUser = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_CODE);
  } catch (error) {
    socket.disconnect();
    return;
  }

  const senderUserModel = await User.findById((verifiedUser as IJWTSign).userId);

  socket.username = senderUserModel.username;

  socket.on('ROOM:JOIN', async (data: { username: string }) => {
    if (!data.username) {
      socket.disconnect();
    }
    console.log('User is connected, ', senderUserModel.username, socket.id);
    const receiverUserModel = await User.findOne({ username: data.username });
    let room = await Room.findOne().or([
      { users: [senderUserModel, receiverUserModel] },
      { users: [receiverUserModel, senderUserModel] },
    ]);
    socket.leave(room._id.toString());
    if (!room) {
      room = new Room({
        users: [senderUserModel, receiverUserModel],
      });
      await room.save();
    }
    socket.join(room._id.toString());
  });

  socket.on('ROOM:NEW_MESSAGE', async (data: { username: string, contentText: string }) => {
    const receiverUserModel = await User.findOne({ username: data.username });
    const room = await Room.findOne().or([
      { users: [senderUserModel, receiverUserModel] },
      { users: [receiverUserModel, senderUserModel] },
    ]);
    const message = new Message({
      userId: senderUserModel._id,
      roomId: room._id,
      contentText: data.contentText,
    });
    await message.save();
    socket.broadcast.to(room._id.toString()).emit('ROOM:NEW_MESSAGE', {
      id: message._id.toString,
      user: {
        fullName: senderUserModel.fullName,
        email: senderUserModel.email,
        username: senderUserModel.username,
        avatar: senderUserModel.avatar,
      },
      contentText: message.contentText,
      createdDate: message.createdDate,
    });
  });

  socket.on('ROOM:LEAVE', async (data: { username: string }) => {
    const receiverUserModel = await User.findOne({ username: data.username });
    const room = await Room.findOne().or([
      { users: [senderUserModel, receiverUserModel] },
      { users: [receiverUserModel, senderUserModel] },
    ]);
    socket.leave(room._id.toString());
    socket.removeAllListeners('ROOM:NEW_MESSAGE');
    socket.removeAllListeners('ROOM:JOIN');
    socket.disconnect();
    console.log('User is disconnected, ', senderUserModel.username, socket.id);
  });
});

server.listen(8000, () => console.log('Server is running on http://localhost:8000/'));
