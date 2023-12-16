import { Checkin } from '@prisma/client';
import { CheckInContractRepository } from '../repositories/check-in-contract.repository';

export class FetchUserCheckInsUseCase {
  constructor(private checkInsRepository: CheckInContractRepository) {}

  async execute(userId: string): Promise<Checkin[]> {
    const checkIns = await this.checkInsRepository.findManyById(userId);
    return checkIns;
  }
}
