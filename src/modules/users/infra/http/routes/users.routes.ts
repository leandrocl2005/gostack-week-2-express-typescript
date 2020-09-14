import { Router } from 'express';
import { container } from 'tsyringe';

import multer from 'multer';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';


const usersRouter = Router();
const upload = multer(uploadConfig);


usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = container.resolve(CreateUserService);

  const { password: userPassword, ...rest } = await createUser.execute({
    name,
    email,
    password,
  });

  return response.json({ ...rest });
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {

    const updateUserAvatar = container.resolve(UpdateUserAvatarService);
    const { password: userPassword, ...rest } = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.json({ ...rest });
  },
);

export default usersRouter;
