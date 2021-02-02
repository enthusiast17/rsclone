import mongoose, { Schema } from 'mongoose';
import { IPost } from '../utils/interfaces';

const postSchema: Schema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  contentText: {
    type: String,
    required: true,
    min: 1,
    max: 1000,
  },
  contentImage: {
    type: String,
    required: false,
  },
  createdDate: {
    type: Date,
    default: new Date(Date.now()),
  },
});

const Post: mongoose.Model<IPost> = mongoose.model('Post', postSchema);

export default Post;
