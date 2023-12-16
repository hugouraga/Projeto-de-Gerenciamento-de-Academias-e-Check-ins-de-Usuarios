import { Gym, Prisma } from '@prisma/client';
import { GymContractRepository } from '../repositories/gym-contract.repository';

interface RegisterGymUseCaseRequest {
  name: string;
  cellphone: string;
  cnpj: string;
  email: string;
  latitude: string;
  longitude: string;
}
interface RegisterGymUseCaseResponse {
  gym: Gym;
}

export class RegisterGymUseCase {
  constructor(private gymRepository: GymContractRepository) {}

  async execute(registerGym: RegisterGymUseCaseRequest): Promise<RegisterGymUseCaseResponse> {
    const isGymFindCNPJ = await this.gymRepository.findByCNPJ(registerGym.cnpj);
    if (isGymFindCNPJ) throw new Error('CNPJ already exists');
    const isGymFindEmail = await this.gymRepository.findByEmail(registerGym.email);
    if (isGymFindEmail) throw new Error('Email already exists');
    const gym = await this.gymRepository.create(registerGym);
    return { gym };
  }
}
