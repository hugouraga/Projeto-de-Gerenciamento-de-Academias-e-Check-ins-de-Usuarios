import { InMemoryGymRepository } from '@/tests/repositories/in-memory-gym.repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { RegisterGymUseCase } from './register-gym';
import { SearchGymsUseCase } from './search-gyms';

let gymRepository: InMemoryGymRepository;
let searchGym: SearchGymsUseCase;

describe('search gyms', () => {
  beforeEach(async () => {
    gymRepository = new InMemoryGymRepository();
    searchGym = new SearchGymsUseCase(gymRepository);
  });

  it('should be possible search gyms by title', async () => {
    await gymRepository.create({
      name: 'academia node js',
      cellphone: '81999999999',
      cnpj: '97.755.075/0001-10',
      email: 'academianode@gmail.com',
      latitude: '-8.1166336',
      longitude: '-34.89792',
    });

    await gymRepository.create({
      name: 'academia javascript js',
      cellphone: '81999999999',
      cnpj: '97.755.075/0001-11',
      email: 'academiajavscript@gmail.com',
      latitude: '-8.1166336',
      longitude: '-34.89792',
    });

    const gyms = await searchGym.execute('js', 1);
    expect(gyms.length).toEqual(2);
  });
});
