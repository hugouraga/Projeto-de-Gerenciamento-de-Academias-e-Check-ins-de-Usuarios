import { InMemoryCheckInRepository } from '@/tests/repositories/in-memory-check-in.repository';
import { InMemoryGymRepository } from '@/tests/repositories/in-memory-gym.repository';
import { InMemoryUserRepository } from '@/tests/repositories/in-memory-user.repository';
import { Checkin } from '@prisma/client';
import { beforeEach, describe, expect, it } from 'vitest';
import { FetchUserCheckInsUseCase } from './fetch-user-check-ins-history';

let userRepository: InMemoryUserRepository;
let gymRepository: InMemoryGymRepository;
let checkInRepository: InMemoryCheckInRepository;
let fetchUserCheckIns: FetchUserCheckInsUseCase;
let user: {
  id: any;
  name?: string;
  email?: string;
  cpf?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date | null;
  typeUserId?: number;
};
let gym: {
  id: any;
  name?: string;
  email?: string;
  cellphone?: string;
  cnpj?: string;
  latitude?: string;
  longitude?: string;
  createdAt?: Date;
  updatedAt?: Date | null;
};
let checkIn: Checkin;

describe('fetch user check-ins history', () => {
  beforeEach(async () => {
    userRepository = new InMemoryUserRepository();
    gymRepository = new InMemoryGymRepository();
    checkInRepository = new InMemoryCheckInRepository();
    fetchUserCheckIns = new FetchUserCheckInsUseCase(checkInRepository);

    user = await userRepository.create({
      name: 'Hugo Uraga',
      email: 'hugouraga@gmail.com',
      cpf: '604.558.810-06',
      password: '123456',
      typeUserId: 1,
    });

    gym = await gymRepository.create({
      name: 'academia node js',
      cellphone: '81999999999',
      cnpj: '97.755.075/0001-14',
      email: 'academianode@gmail.com',
      latitude: '-8.1166336',
      longitude: '-34.89792',
    });
    await checkInRepository.create(user.id, gym.id);
    await checkInRepository.create(user.id, gym.id);
    checkIn = await checkInRepository.create(user.id, gym.id);
  });

  it('should return the user are check-ins history', async () => {
    const checkIns = await fetchUserCheckIns.execute(user.id);
    expect(checkIns.length).toEqual(3);
  });
});
