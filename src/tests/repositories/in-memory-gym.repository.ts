import {
  GymContractRepository,
  findManyNearbyParams,
} from '@/application/repositories/gym-contract.repository';
import { getDistanceBetweenCoordinates } from '@/application/utils/get-distance-between-coordinates';
import { Gym, Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';

export class InMemoryGymRepository implements GymContractRepository {
  private gyms: Gym[] = [];

  async create(data: Prisma.GymUncheckedCreateInput): Promise<Gym> {
    const gym: Gym = {
      id: randomUUID(),
      cellphone: data.cellphone,
      cnpj: data.cnpj,
      email: data.email,
      latitude: data.latitude,
      longitude: data.longitude,
      name: data.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.gyms.push(gym);
    return gym;
  }

  async findByCNPJ(cnpj: string) {
    const gym = this.gyms.find((gym) => gym.cnpj === cnpj);
    return gym ? gym : null;
  }

  async findByEmail(email: string) {
    const gym = this.gyms.find((gym) => gym.email === email);
    return gym ? gym : null;
  }

  async findById(id: string) {
    const gym = this.gyms.find((gym) => gym.id === id);
    return gym ? gym : null;
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    return this.gyms.filter((gym) => gym.name.includes(query)).slice((page - 1) * 20, page * 20);
  }

  async findManyNearby(params: findManyNearbyParams): Promise<Gym[]> {
    const MAX_DISTANCE_IN_KM = 10;
    const gyms: Gym[] = this.gyms.filter((gym) => {
      const distanceOfBetweenUserAndGym = getDistanceBetweenCoordinates(
        { latitude: params.userLatitude, longitude: params.userLongitude },
        { latitude: gym.latitude, longitude: gym.longitude },
      );
      if (distanceOfBetweenUserAndGym <= MAX_DISTANCE_IN_KM) return gym;
    });

    return gyms;
  }
}
