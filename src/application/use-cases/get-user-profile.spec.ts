import { InMemoryUserRepository } from '@/tests/repositories/in-memory-user.repository';
import { hash } from 'bcrypt';
import { describe, beforeEach, it, expect } from 'vitest';
import { GetUserProfileUseCase } from './get-user-profile';
import { randomUUID } from 'node:crypto';

let userRepository: InMemoryUserRepository;
let getUserProfile: GetUserProfileUseCase;

describe('get user profile', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    getUserProfile = new GetUserProfileUseCase(userRepository);
  });

  it('should return the user is data if he is authenticated', async () => {
    const createdUser = await userRepository.save({
      id: randomUUID(),
      name: 'Hugo Uraga',
      email: 'hugouraga@gmail.com',
      cpf: '604.558.810-06',
      password: await hash('123456', 6),
      typeUserId: 1,
    });

    const { user } = await getUserProfile.execute({
      userId: createdUser.id,
    });

    expect(user.name).toEqual('Hugo Uraga');
    expect(user.cpf).toEqual('604.558.810-06');
    expect(user.id).toEqual(expect.any(String));
  });

  it('should not be return user data for an invalid id', async () => {
    expect(async () => {
      await getUserProfile.execute({
        userId: 'non-existing-id',
      });
    }).rejects.toThrowError('User not found');
  });
});
