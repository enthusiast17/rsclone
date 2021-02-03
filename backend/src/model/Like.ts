import mongoose, { Schema } from 'mongoose';
import { ILike } from '../utils/interfaces';

const likeSchema: Schema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
  },
  commentId: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
  },
}, { timestamps: {} });

const Like: mongoose.Model<ILike> = mongoose.model('Like', likeSchema);

export default Like;
