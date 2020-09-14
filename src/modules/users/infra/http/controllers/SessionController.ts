import AuthenticateUserService from "@modules/users/services/AuthenticateUserService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class SessionController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserService = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    });

    const { password: _userPassword, ...rest } = user;

    return response.json({ user: { ...rest }, token });
  }
}
