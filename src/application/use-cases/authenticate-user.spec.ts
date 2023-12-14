import { InMemoryUserRepository } from '@/tests/repositories/in-memory-user.repository';
import { describe, expect, it } from 'vitest';
import { RegisterUserUseCase } from './register-user';
import { AuthenticateUseCase } from './authenticate-user';
import { hash } from 'bcrypt';

describe('user authentication', async () => {
  it('should be possible for the user to authenticate', async () => {
    const userRepository = new InMemoryUserRepository();
    const authenticateUseCase = new AuthenticateUseCase(userRepository);
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
  });
});
