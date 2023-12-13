import { UserContractRepository } from '@/application/repositories/user-contract.respository';
import { Prisma } from '@prisma/client';
import { prisma } from '@/infra/lib/prisma';

export class PrismaRegisterUserRepository implements UserContractRepository {
  async save(user: Prisma.UserCreateInput): Promise<any> {
    const userResponse = await prisma.user.create({
      data: user,
    });
    return userResponse;
  }

  async findByUserEmailOrCPF(email: string, cpf: string) {
    const user = await prisma.user.findFirst({
      where: {
        email,
        cpf,
      },
    });

    return user;
  }
}
