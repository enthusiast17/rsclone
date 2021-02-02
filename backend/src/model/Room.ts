import mongoose, { Schema } from 'mongoose';
import { IRoom } from '../utils/interfaces';

const roomSchema: Schema = new mongoose.Schema({
  users: [Schema.Types.ObjectId],
  createdDate: {
    type: Date,
    default: new Date(Date.now()),
  },
});

const Room: mongoose.Model<IRoom> = mongoose.model('Room', roomSchema);

export default Room;
