import { Request, Response } from "express";
import { container } from "tsyringe";

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {

    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({user_id});

    const {password, ...rest} = user

    return response.json({...rest});
  }


  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password, old_password } = request.body;

    const user_id = request.user.id;

    const updateProfile = container.resolve(UpdateProfileService);

    const { password: userPassword, ...rest } = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      old_password
    });

    return response.json({ ...rest });
  }
}
