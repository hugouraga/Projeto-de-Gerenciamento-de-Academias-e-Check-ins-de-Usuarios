import { InMemoryCheckInRepository } from '@/tests/repositories/in-memory-check-in.repository';
import { InMemoryGymRepository } from '@/tests/repositories/in-memory-gym.repository';
import { InMemoryUserRepository } from '@/tests/repositories/in-memory-user.repository';
import { beforeEach, describe, it } from 'vitest';

let userRepository: InMemoryUserRepository;
let gymRepository: InMemoryGymRepository;
let checkInRepository: InMemoryCheckInRepository;

describe('user check-in', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    gymRepository = new InMemoryGymRepository();
    checkInRepository = new InMemoryCheckInRepository();
  });

  it('should be possible to check-in', async () => {
    const { user } = await userRepository.create({
      name: 'Hugo Uraga',
      email: 'hugouraga@gmail.com',
      cpf: '604.558.810-06',
      password: '123456',
      typeUserId: 1,
    });
    const { gym } = await gymRepository.create({
      name: 'academia node js',
      cellphone: '81999999999',
      cnpj: '97.755.075/0001-14',
      email: 'academianode@gmail.com',
      latitude: '-8.1166336',
      longitude: '-34.89792',
    });
  });
});
