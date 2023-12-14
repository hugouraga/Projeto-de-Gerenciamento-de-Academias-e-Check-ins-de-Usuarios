import { Prisma, User } from '@prisma/client';

export interface UserContractRepository {
  save(user: Prisma.UserCreateInput): Promise<User>;
  findByUserEmailOrCPF(email: string, cpf: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
  findById(userId: string): Promise<User | null>;
}
