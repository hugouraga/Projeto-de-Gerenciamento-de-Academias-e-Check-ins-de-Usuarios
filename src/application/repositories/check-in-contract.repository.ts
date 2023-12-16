import { Checkin, Prisma } from '@prisma/client';

export interface CheckInContractRepository {
  create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin | null>;
}
