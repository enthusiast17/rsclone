import mongoose, { Schema } from 'mongoose';
import { IComment } from '../utils/interfaces';

const commentSchema: Schema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  contentText: {
    type: String,
    required: true,
  },
}, { timestamps: {} });

const Comment: mongoose.Model<IComment> = mongoose.model('Comment', commentSchema);

export default Comment;
