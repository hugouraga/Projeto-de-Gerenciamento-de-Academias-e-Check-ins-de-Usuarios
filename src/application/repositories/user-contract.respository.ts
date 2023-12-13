import { Prisma } from '@prisma/client';

export interface UserContractRepository {
  save(user: Prisma.UserCreateInput): Promise<any>;
}
