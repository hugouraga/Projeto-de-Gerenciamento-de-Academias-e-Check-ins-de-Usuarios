import { Checkin, Prisma } from '@prisma/client';
import { CheckInContractRepository } from './../../application/repositories/check-in-contract.repository';
import { randomUUID } from 'crypto';

export class InMemoryCheckInRepository implements CheckInContractRepository {
  private checkIns: Checkin[] = [];

  async create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin> {
    const checkIn: Checkin = {
      id: randomUUID(),
      gymId: data.gymId,
      userId: data.userId,
    };

    this.checkIns.push(checkIn);
    return checkIn;
  }
}
