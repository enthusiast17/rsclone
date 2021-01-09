import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces';

const userSchema: Schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 3,
    max: 50,
  },
  lastName: {
    type: String,
    required: true,
    min: 3,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  birthdayDate: {
    type: Date,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

const User: mongoose.Model<IUser> = mongoose.model('User', userSchema);

export default User;
