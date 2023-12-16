import { InMemoryGymRepository } from '@/tests/repositories/in-memory-gym.repository';
import { describe, expect, it } from 'vitest';
import { FetchGymsNearbyUseCase } from './fetch-nearby-gyms';

describe('fetch nearby gyms', () => {
  it('nearby gyms should return', async () => {
    const gymRepository = new InMemoryGymRepository();
    const fetchNearbyGyms = new FetchGymsNearbyUseCase(gymRepository);

    await gymRepository.create({
      name: 'academia near js',
      cellphone: '81999999999',
      cnpj: '97.755.075/0001-10',
      email: 'academianode@gmail.com',
      latitude: '-8.1166336',
      longitude: '-34.89792',
    });

    await gymRepository.create({
      name: 'academia distant js',
      cellphone: '81999999999',
      cnpj: '97.755.075/0001-11',
      email: 'academiajavscript@gmail.com',
      latitude: '-7.8940343',
      longitude: '-35.1631019',
    });

    const { gyms } = await fetchNearbyGyms.execute({
      userLatitude: '-8.1166336',
      userLongitude: '-34.89792',
    });

    expect(gyms.length).toEqual(1);
  });
});
