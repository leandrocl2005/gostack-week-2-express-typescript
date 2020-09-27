import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';
import passwordRouter from '../infra/http/routes/password.routes';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) { }

  public async execute({ user_id, name, email, password, old_password }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) throw new AppError("User does not exist.");
    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);
    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError("E-mail already in use.");
    }
    user.name = name;
    user.email = email;

    if (password && !old_password){
      throw new AppError('Must inform old password');
    }

    if (password && old_password) {
      const passwordMatch = await this.hashProvider.compareHash(
        old_password,
        user.password
      );

      if (!passwordMatch) {
        throw new AppError("Incorrect old password")
      }

      user.password = await this.hashProvider.generateHash(password);

    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;