import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import authRoute from './routes/auth';

const app = express();

dotenv.config({ path: '.env' });

mongoose.connect(
  process.env.DB_CONNECT || '',
  { useUnifiedTopology: true, useNewUrlParser: true },
).catch((error) => console.log(error));

app.use(cors());

app.use(express.json());

app.use((err: Error, _:Request, res: Response, next: NextFunction) => {
  if (err) return res.status(400).send('400 Bad Request');
  return next();
});

app.use('/api/user', authRoute);

app.listen(3000, () => {
  console.log('Server Started at Port, 8000');
});
