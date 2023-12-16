import { UserContractRepository } from '@/application/repositories/user-contract.repository';
import { Prisma } from '@prisma/client';
import { prisma } from '@/infra/lib/prisma';

export class PrismaRegisterUserRepository implements UserContractRepository {
  async create(user: Prisma.UserUncheckedCreateInput): Promise<any> {
    return await prisma.user.create({ data: user });
  }

  async findByUserEmailOrCPF(email: string, cpf: string) {
    return await prisma.user.findFirst({ where: { email, cpf } });
  }

  async findUserByEmail(email: string) {
    return await prisma.user.findFirst({ where: { email } });
  }

  async findById(userId: string) {
    return await prisma.user.findFirst({ where: { id: userId } });
  }
}
