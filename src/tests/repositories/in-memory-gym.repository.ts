import { GymContractRepository } from '@/application/repositories/gym-contract.repository';
import { Gym, Prisma } from '@prisma/client';

export class InMemoryGymRepository implements GymContractRepository {
  private gyms: Gym[] = [];

  async register(gym: Gym): Promise<any> {
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
}
