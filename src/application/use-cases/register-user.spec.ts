import { InMemoryUserRepository } from '@/tests/repositories/in-memory-user.repository';
import { it, describe, expect } from 'vitest';
import { RegisterUserUseCase } from './register-user';
import { PrismaRegisterUserRepository } from '@/infra/database/prisma/prisma-register-user.repository';

describe('user creation', () => {
  it('should be possible for the user to register', async () => {
    const userRepository = new PrismaRegisterUserRepository();
    const registerUseCase = new RegisterUserUseCase(userRepository);

    const { user } = await registerUseCase.execute({
      name: 'Hugo Uraga',
      email: 'hugouraga6111@gmail.com',
      cpf: '118227604011',
      password: '123456',
    });

    console.log(user);

    expect(user.name).toBe('Hugo Uraga');
  });

  it('should be possible for the administrator to register a user', () => {});
  it('should not be possible to create an account with an existing email address', () => {});
  it('should not be possible to create an account with an existing cpf', () => {});
  it('should not be possible to create an account with a password of less than 6 digits', () => {});
});
