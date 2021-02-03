import mongoose, { Schema } from 'mongoose';
import { IMessage } from '../utils/interfaces';

const messageSchema: Schema = new mongoose.Schema({
  roomId: {
    type: Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  contentText: {
    type: String,
    required: true,
  },
}, { timestamps: {} });

const Message: mongoose.Model<IMessage> = mongoose.model('Message', messageSchema);

export default Message;
