import { InMemoryCheckInRepository } from '@/tests/repositories/in-memory-check-in.repository';
import { InMemoryGymRepository } from '@/tests/repositories/in-memory-gym.repository';
import { InMemoryUserRepository } from '@/tests/repositories/in-memory-user.repository';
import { afterEach, beforeEach, describe, expect, expectTypeOf, it, vi } from 'vitest';
import { CheckInUseCase } from './check-in';

let userRepository: InMemoryUserRepository;
let gymRepository: InMemoryGymRepository;
let checkInRepository: InMemoryCheckInRepository;
let checkInUseCase: CheckInUseCase;
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

describe('user check-in', () => {
  beforeEach(async () => {
    vi.useFakeTimers();
    userRepository = new InMemoryUserRepository();
    gymRepository = new InMemoryGymRepository();
    checkInRepository = new InMemoryCheckInRepository();
    checkInUseCase = new CheckInUseCase(userRepository, gymRepository, checkInRepository);

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
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be possible to check-in', async () => {
    const { checkIn } = await checkInUseCase.execute(user.id, gym.id, '-8.1166336', '-34.89792');

    expectTypeOf(checkIn.gymId).toBeString();
    expect(checkIn.gymId).toBe(gym.id);
    expect(checkIn.userId).toBe(user.id);
  });

  it('should not be possible to check in with an invalid user', async () => {
    expect(async () => {
      await checkInUseCase.execute('id-user-not-found', gym.id, '-8.1166336', '-34.89792');
    }).rejects.toThrowError('User not found');
  });

  it('should not be possible to check in with an invalid gym', async () => {
    expect(async () => {
      await checkInUseCase.execute(user.id, 'id-gym-not-found', '-8.1166336', '-34.89792');
    }).rejects.toThrowError('Gym not found');
  });

  it('should not be possible to check in on the same day', async () => {
    vi.setSystemTime(new Date(2023, 11, 16, 8, 0, 0));
    await checkInUseCase.execute(user.id, gym.id, '-8.1166336', '-34.89792');
    expect(async () => {
      await checkInUseCase.execute(user.id, gym.id, '-8.1166336', '-34.89792');
    }).rejects.toThrowError('Check-in already on some day');
  });

  it('should be possible to check in on different days', async () => {
    vi.setSystemTime(new Date(2023, 11, 16, 23, 0, 0));
    await checkInUseCase.execute(user.id, gym.id, '-8.1166336', '-34.89792');
    vi.setSystemTime(new Date(2023, 11, 17, 12, 45, 0));
    const { checkIn } = await checkInUseCase.execute(user.id, gym.id, '-8.1166336', '-34.89792');
    expect(checkIn.userId).toBe(user.id);
    expect(checkIn.gymId).toBe(gym.id);
  });

  it('should not be able to check in on distant gym', async () => {
    expect(async () => {
      await checkInUseCase.execute(user.id, gym.id, '-8.1748082', '-34.9198751');
    }).rejects.toThrowError();
  });
});
