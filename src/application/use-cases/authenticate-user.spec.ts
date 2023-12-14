import { InMemoryUserRepository } from '@/tests/repositories/in-memory-user.repository';
import { describe, expect, it, beforeEach } from 'vitest';
import { RegisterUserUseCase } from './register-user';
import { AuthenticateUseCase } from './authenticate-user';
import { hash } from 'bcrypt';

let userRepository: InMemoryUserRepository;
let authenticateUseCase: AuthenticateUseCase;

describe('user authentication', async () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    authenticateUseCase = new AuthenticateUseCase(userRepository);
  });

  it('should be possible for the user to authenticate', async () => {
    await userRepository.save({
      name: 'Hugo Uraga',
      email: 'hugouraga@gmail.com',
      cpf: '604.558.810-06',
      password: await hash('123456', 6),
    });

    const { user } = await authenticateUseCase.execute({
      email: 'hugouraga@gmail.com',
      password: '123456',
    });

    expect(user.name).toBe('Hugo Uraga');
    expect(user.email).toBe('hugouraga@gmail.com');
  });

  it('should not allow authentication for invalid email', async () => {
    expect(async () => {
      await authenticateUseCase.execute({
        email: 'hugouraga@gmail.com',
        password: '123456',
      });
    }).rejects.toThrowError('invalid credentials error');
  });

  it('should not allow authentication for invalid password', async () => {
    await userRepository.save({
      name: 'Hugo Uraga',
      email: 'hugouraga@gmail.com',
      cpf: '604.558.810-06',
      password: await hash('123456', 6),
    });

    expect(async () => {
      await authenticateUseCase.execute({
        email: 'hugouraga@gmail.com',
        password: '222222',
      });
    }).rejects.toThrowError('invalid credentials error');
  });
});
