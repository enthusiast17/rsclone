/* eslint-disable no-underscore-dangle */
import { Router } from 'express';
import Message from '../model/Message';
import Room from '../model/Room';
import User from '../model/User';
import { ErrorJSON, handleError } from '../utils/error';
import { IMessage, IUserRequest } from '../utils/interfaces';

const router = Router();

router.get('/messages', async (req, res) => {
  try {
    const { username } = req.query;

    if (!username) {
      throw new ErrorJSON(
        400, 'Bad Request', 'Please, correct http query.',
      );
    }

    const senderUserModel = await User.findById((req as IUserRequest).userId);
    const receiverUserModel = await User.findOne({ username: username as string });
    const room = await Room.findOne().or([
      { users: [senderUserModel, receiverUserModel] },
      { users: [receiverUserModel, senderUserModel] },
    ]);

    if (!room) {
      throw new ErrorJSON(
        403, 'Forbidden', 'You have no access.',
      );
    }

    let messages = await Message.find({ roomId: room._id });
    messages = await Promise.all(
      messages.map((message: IMessage) => {
        let user;
        if (message.userId.toString() === senderUserModel._id.toString()) {
          user = {
            fullName: senderUserModel.fullName,
            email: senderUserModel.email,
            username: senderUserModel.username,
            avatar: senderUserModel.avatar,
          };
        } else {
          user = {
            fullName: receiverUserModel.fullName,
            email: receiverUserModel.email,
            username: receiverUserModel.username,
            avatar: receiverUserModel.avatar,
          };
        }
        return {
          id: message._id,
          user,
          contentText: message.contentText,
          createdDate: message.createdDate,
        };
      }),
    );

    return res.status(200).send({
      status: 'success',
      statusCode: 200,
      message: 'Messages received successfully.',
      description: 'Please, wait a little bit.',
      data: messages,
    });
  } catch (error) {
    if (error.name !== 'ErrorJSON') {
      return handleError(new ErrorJSON(
        500, 'Internal Error.', 'Upps! Sorry, something went wrong in internal server.',
      ), req, res);
    }
    return handleError(error, req, res);
  }
});

export default router;
