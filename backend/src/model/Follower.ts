import mongoose, { Schema } from 'mongoose';
import { IFollower } from '../utils/interfaces';

const followerSchema: Schema = new mongoose.Schema({
  followingId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  followerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: {} });

const Follower: mongoose.Model<IFollower> = mongoose.model('Follower', followerSchema);

export default Follower;
