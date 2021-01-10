import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import User from '../model/User';
import { loginValidator, registerValidator } from '../validators';

const router = Router();
dotenv.config({ path: '.env' });

router.post('/register', async (req, res) => {
  const validate = registerValidator.validate(req.body);
  const validateError = validate.error;
  if (validateError) return res.status(400).send(validateError.details[0].message);
  const isUserExists = await User.findOne({ email: req.body.email });
  if (isUserExists) return res.status(400).send('"email" is already exists');
  if (!process.env.SALT_NUMBER) return res.status(500).send('500 Internal Error');
  const salt = await bcrypt.genSalt(parseInt(process.env.SALT_NUMBER, 10));
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const user = new User({ ...req.body, password: hashedPassword });
  try {
    const savedUser = await user.save();
    // eslint-disable-next-line no-underscore-dangle
    return res.status(200).send({ user: savedUser._id });
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post('/login', async (req, res) => {
  const validate = loginValidator.validate(req.body);
  const validateError = validate.error;
  if (validateError) return res.status(400).send(validateError.details[0].message);
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('"email" or "password" is wrong');
  const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
  if (!isPasswordValid) return res.status(400).send('"email" or "password" is wrong');
  if (!process.env.SECRET_CODE) return res.status(500).send('500 Internal Error');
  const token = jwt.sign({ userId: user.id }, process.env.SECRET_CODE);
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });
  return res.status(200).send({ token });
});

export default router;
