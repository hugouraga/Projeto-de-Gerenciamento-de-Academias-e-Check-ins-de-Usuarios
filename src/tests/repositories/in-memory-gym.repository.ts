import { GymContractRepository } from '@/application/repositories/gym-contract.repository';
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
}
