import { Prisma } from '@prisma/client';
import { GymContractRepository } from '../repositories/gym-contract.repository';

export class RegisterGymUseCase {
  constructor(private gymRepository: GymContractRepository) {}

  async execute(gym: Prisma.GymCreateInput) {
    const isGymFindCNPJ = await this.gymRepository.findByCNPJ(gym.cnpj);
    if (isGymFindCNPJ) throw new Error('CNPJ already exists');
    const isGymFindEmail = await this.gymRepository.findByEmail(gym.email);
    if (isGymFindEmail) throw new Error('Email already exists');
    const registerGym = await this.gymRepository.register(gym);
    return registerGym;
  }
}
