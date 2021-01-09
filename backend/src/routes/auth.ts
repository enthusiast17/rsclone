import { Router } from 'express';
import bcrypt from 'bcryptjs';
import User from '../model/User';
import { registerValidator } from '../validators';

const router = Router();

router.post('/register', async (req, res) => {
  const validate = registerValidator.validate(req.body);
  const validateError = validate.error;
  if (validateError) return res.status(400).send(validateError.details[0].message);
  const isUserExists = await User.findOne({ email: req.body.email });
  if (isUserExists) return res.status(400).send('"email" is already exists');
  const salt = await bcrypt.genSalt(10);
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

export default router;
