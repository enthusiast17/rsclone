import mongoose, { Schema } from 'mongoose';
import { IUser } from '../utils/interfaces';

const userSchema: Schema = new mongoose.Schema({
  fullName: {
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
  username: {
    type: String,
    required: true,
    min: 3,
    max: 25,
  },
  birthdayDate: {
    type: Date,
  },
  avatar: {
    type: String,
  },
  aboutme: {
    type: String,
    min: 1,
    max: 150,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 1024,
  },
}, { timestamps: {} });

const User: mongoose.Model<IUser> = mongoose.model('User', userSchema);

export default User;
