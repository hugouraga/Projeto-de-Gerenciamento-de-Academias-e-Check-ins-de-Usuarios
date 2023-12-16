import { Checkin } from '@prisma/client';

export interface CheckInContractRepository {
  create(userId: string, gymId: string): Promise<Checkin>;
  findByUserIdOnDate(userId: string, date: Date): Promise<any>;
}
