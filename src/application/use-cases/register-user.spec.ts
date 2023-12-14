import { InMemoryUserRepository } from '@/tests/repositories/in-memory-user.repository';
import { it, describe, expect, beforeEach } from 'vitest';
import { RegisterUserUseCase } from './register-user';
import { randomUUID } from 'crypto';

let userRepository: InMemoryUserRepository;
let registerUseCase: RegisterUserUseCase;

describe('user creation', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    registerUseCase = new RegisterUserUseCase(userRepository);
  });

  it('should be possible for the user to register', async () => {
    const { user } = await registerUseCase.execute({
      name: 'Hugo Uraga',
      email: 'hugouraga@gmail.com',
      cpf: '604.558.810-06',
      password: '123456',
      typeUserId: 1,
    });
    expect(user.name).toBe('Hugo Uraga');
  });

  it('should not be possible to create an account with an existing email address or cpf', async () => {
    await registerUseCase.execute({
      name: 'Hugo Uraga',
      email: 'hugouraga@gmail.com',
      cpf: '604.558.810-06',
      password: '123456',
      typeUserId: 1,
    });

    expect(async () => {
      await registerUseCase.execute({
        name: 'Hugo Uraga',
        email: 'hugouraga@gmail.com',
        cpf: '604.558.810-06',
        password: '123456',
        typeUserId: 1,
      });
    }).rejects.toThrowError('user already exists');
  });

  it('should not be possible to create an account with a password of less than 6 digits', () => {
    expect(async () => {
      await registerUseCase.execute({
        name: 'Hugo Uraga',
        email: 'hugouraga61@gmail.com',
        cpf: '11822760402',
        password: '1234',
        typeUserId: 1,
      });
    }).rejects.toThrowError('password must be at least 6 characters');
  });
});
