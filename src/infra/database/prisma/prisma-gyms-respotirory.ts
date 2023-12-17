import {
  GymContractRepository,
  findManyNearbyParams,
} from '@/application/repositories/gym-contract.repository';
import { prisma } from '@/infra/lib/prisma';
import { Gym, Prisma } from '@prisma/client';

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
  async findManyNearby({ userLatitude, userLongitude }: findManyNearbyParams) {
    return await prisma.$queryRaw<Gym[]>`
      SELECT * from gyms
      WHERE ( 6371 * acos( cos( radians(${userLatitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${userLongitude}) ) + sin( radians(${userLatitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;
  }
}
