import { InMemoryUserRepository } from '@/tests/repositories/in-memory-user.repository';
import { it, describe, expect } from 'vitest';
import { RegisterUserUseCase } from './register-user';

describe('user creation', () => {
  it('should be possible for the user to register', async () => {
    const userRepository = new InMemoryUserRepository();
    const registerUseCase = new RegisterUserUseCase(userRepository);

    const { user } = await registerUseCase.execute({
      name: 'Hugo Uraga',
      email: 'hugouraga61@gmail.com',
      cpf: '11822760402',
      password: '123456',
    });

    expect(user.name).toBe('Hugo Uraga');
  });

  it('should not be possible to create an account with an existing email address or cpf', async () => {
    const userRepository = new InMemoryUserRepository();
    const registerUseCase = new RegisterUserUseCase(userRepository);

    await registerUseCase.execute({
      name: 'Hugo Uraga',
      email: 'hugouraga61@gmail.com',
      cpf: '11822760402',
      password: '123456',
    });

    expect(async () => {
      await registerUseCase.execute({
        name: 'Hugo Uraga',
        email: 'hugouraga61@gmail.com',
        cpf: '11822760402',
        password: '123456',
      });
    }).rejects.toThrowError();
  });

  it('should not be possible to create an account with a password of less than 6 digits', () => {
    const userRepository = new InMemoryUserRepository();
    const registerUseCase = new RegisterUserUseCase(userRepository);

    expect(async () => {
      await registerUseCase.execute({
        name: 'Hugo Uraga',
        email: 'hugouraga61@gmail.com',
        cpf: '11822760402',
        password: '1234',
      });
    }).rejects.toThrowError();
  });
});
