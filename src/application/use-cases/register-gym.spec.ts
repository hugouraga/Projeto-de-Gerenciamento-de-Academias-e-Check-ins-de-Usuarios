import { InMemoryGymRepository } from '@/tests/repositories/in-memory-gym.repository';
import { InMemoryUserRepository } from '@/tests/repositories/in-memory-user.repository';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';
import { randomUUID } from 'crypto';
import { beforeEach, describe, expect, it } from 'vitest';
import { RegisterGymUseCase } from './register-gym';

let userRepository: InMemoryUserRepository;
let gymRepository: InMemoryGymRepository;
let registerGymUseCase: RegisterGymUseCase;
let user: User;

describe('register gym', () => {
  beforeEach(async () => {
    userRepository = new InMemoryUserRepository();
    gymRepository = new InMemoryGymRepository();
    registerGymUseCase = new RegisterGymUseCase(gymRepository);

    user = await userRepository.save({
      id: randomUUID(),
      name: 'Hugo Uraga',
      email: 'hugouraga@gmail.com',
      cpf: '604.558.810-06',
      password: await hash('123456', 6),
      typeUserId: 1,
    });
  });

  it('should be possible to register gym', async () => {
    const gym = await registerGymUseCase.execute({
      name: 'academia node js',
      cellphone: '81999999999',
      cnpj: '97.755.075/0001-14',
      email: 'academianode@gmail.com',
      latitude: '-8.1166336',
      longitude: '-34.89792',
    });

    expect(gym.name).toBe('academia node js');
  });

  it('It should not be possible to register two academies with the same CNPJ', async () => {
    await registerGymUseCase.execute({
      name: 'academia node js',
      cellphone: '81999999999',
      cnpj: '97.755.075/0001-14',
      email: 'academianode@gmail.com',
      latitude: '-8.1166336',
      longitude: '-34.89792',
    });

    expect(async () => {
      await registerGymUseCase.execute({
        name: 'academia node js',
        cellphone: '81999999999',
        cnpj: '97.755.075/0001-14',
        email: 'academianode@gmail.com',
        latitude: '-8.1166336',
        longitude: '-34.89792',
      });
    }).rejects.toThrowError('CNPJ already exists');
  });

  it('It should not be possible to register two academies with the same EMAIL', async () => {
    await registerGymUseCase.execute({
      name: 'academia node js',
      cellphone: '81999999999',
      cnpj: '97.755.075/0001-13',
      email: 'academianode@gmail.com',
      latitude: '-8.1166336',
      longitude: '-34.89792',
    });

    expect(async () => {
      await registerGymUseCase.execute({
        name: 'academia node js',
        cellphone: '81999999999',
        cnpj: '97.755.075/0001-14',
        email: 'academianode@gmail.com',
        latitude: '-8.1166336',
        longitude: '-34.89792',
      });
    }).rejects.toThrowError('Email already exists');
  });
});
