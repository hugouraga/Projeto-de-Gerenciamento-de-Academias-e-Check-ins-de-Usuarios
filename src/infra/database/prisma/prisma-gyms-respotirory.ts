import {
  GymContractRepository,
  findManyNearbyParams,
} from '@/application/repositories/gym-contract.repository';
import { prisma } from '@/infra/lib/prisma';
import { Prisma } from '@prisma/client';

export class PrismaGymsRepository implements GymContractRepository {
  async create(gym: Prisma.GymUncheckedCreateInput) {
    return await prisma.gym.create({ data: gym });
  }
  async findByCNPJ(cnpj: string) {
    return await prisma.gym.findUnique({ where: { cnpj } });
  }
  async findByEmail(email: string) {
    return await prisma.gym.findUnique({ where: { email } });
  }
  async findById(id: string) {
    return await prisma.gym.findUnique({ where: { id } });
  }
  async searchMany(query: string, page: number) {
    return await prisma.gym.findMany({
      where: { name: { contains: query } },
      take: 20,
      skip: (page - 1) * 20,
    });
  }
  async findManyNearby(params: findManyNearbyParams) {
    return await prisma.gym.findMany({ take: 20, skip: 0 });
  }
}
