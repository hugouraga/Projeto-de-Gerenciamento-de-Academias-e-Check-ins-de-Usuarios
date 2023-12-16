import { Checkin } from '@prisma/client';
import { CheckInContractRepository } from '../repositories/check-in-contract.repository';

export class GetUserMetrics {
  constructor(private checkInsRepository: CheckInContractRepository) {}

  async execute(userId: string): Promise<number> {
    return await this.checkInsRepository.countByUserId(userId);
  }
}
