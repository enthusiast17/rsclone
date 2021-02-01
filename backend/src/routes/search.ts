import { Router } from 'express';
import User from '../model/User';
import { ErrorJSON, handleError } from '../utils/error';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { value } = req.query;
    let users = [];

    if (value) {
      users = await User.find();
      users = users
        .filter((user: any) => (
          user.username.toLowerCase().includes(value.toString().toLowerCase())
        || user.fullName.toLowerCase().includes(value.toString().toLowerCase())))
        .map((user: any) => {
          const {
            fullName, email, username, avatar,
          } = user;
          return {
            fullName,
            email,
            username,
            avatar,
          };
        });
    }

    return res.status(200).send({
      status: 'success',
      statusCode: 200,
      message: 'Search result received successfully.',
      description: 'Please, wait a little bit.',
      data: users,
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
