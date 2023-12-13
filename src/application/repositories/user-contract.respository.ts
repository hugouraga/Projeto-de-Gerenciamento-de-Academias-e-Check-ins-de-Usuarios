import { Prisma } from '@prisma/client';

export interface UserContractRepository {
  save(user: Prisma.UserCreateInput): Promise<Prisma.UserCreateInput>;
  findByUserEmailOrCPF(email: string, cpf: string): Promise<Prisma.UserCreateInput | null>;
}
