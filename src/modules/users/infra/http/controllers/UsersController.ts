import CreateUserService from "@modules/users/services/CreateUserService";
import UpdateUserAvatarService from "@modules/users/services/UpdateUserAvatarService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const { password: userPassword, ...rest } = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json({ ...rest });
  }

  async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);
    const { password: userPassword, ...rest } = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.json({ ...rest });
  }
}
