import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import ListProviderService from './ListProviderService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUsersRepository: FakeUsersRepository;
let listProviderService: ListProviderService;
let fakeCacheProvider: FakeCacheProvider;

describe('List Providers', () => {
  beforeEach(()=>{
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviderService = new ListProviderService(
      fakeUsersRepository,
      fakeCacheProvider
    );
  })

  it('should be able to list The providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: "John Doe",
      email: "john@example.com",
      password: '123456'
    });
    const user2 = await fakeUsersRepository.create({
      name: "John Tre",
      email: "tre@example.com",
      password: '123456'
    });
    const user = await fakeUsersRepository.create({
      name: "John Qua",
      email: "qua@example.com",
      password: '123456'
    });

    const providers = await listProviderService.execute({
      user_id: user.id,
    })

    expect(providers).toEqual([user1, user2]);
  });

});
