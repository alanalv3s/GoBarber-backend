/* eslint-disable no-shadow */
import { Router, request, response } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import ensureAuth from '../middlewares/ensureAuth';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAuth,
  upload.single('avatar'),
  async (request, response) => {
    console.log(request.file);

    return response.json({ ok: true });
  },
);

export default usersRouter;
