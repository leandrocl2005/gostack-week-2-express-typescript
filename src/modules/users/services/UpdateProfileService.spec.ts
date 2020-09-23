import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(()=>{
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    );
  })

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "john@example.com",
      password: '123456'
    });
    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: "John Tree",
      email: "tree@example.com"
    })
    expect(user.name).toBe('John Tree');
    expect(user.email).toBe('tree@example.com');
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: "John Doe",
      email: "john@example.com",
      password: '123456'
    });
    const user = await fakeUsersRepository.create({
      name: "test",
      email: "test@example.com",
      password: '123456'
    });
    await expect(
      updateProfile.execute({
        user_id: user.id,
        email: "john@example.com",
        name: user.name
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "john@example.com",
      password: '123456'
    });
    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: "John Tree",
      email: "tree@example.com",
      old_password: '123456',
      password: '123123'
    });
    expect(user.password).toBe('123123');
  });

  it('should not be able to update password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "john@example.com",
      password: '123456'
    });
    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: "John Tree",
        email: "tree@example.com",
        password: '123123'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update password without wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "john@example.com",
      password: '123456'
    });
    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: "John Tree",
        email: "tree@example.com",
        old_password: 'wrong-password',
        password: '123123'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
