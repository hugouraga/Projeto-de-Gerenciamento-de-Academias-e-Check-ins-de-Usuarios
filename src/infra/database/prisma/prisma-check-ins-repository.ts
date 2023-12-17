import { CheckInContractRepository } from '@/application/repositories/check-in-contract.repository';
import { prisma } from '@/infra/lib/prisma';
import dayjs from 'dayjs';

export class PrimasCheckInsRepository implements CheckInContractRepository {
  async create(userId: string, gymId: string) {
    return await prisma.checkin.create({ data: { userId, gymId } });
  }
  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date');
    const endOfTheDay = dayjs(date).endOf('date');
    return await prisma.checkin.findFirst({
      where: { userId, createdAt: { gte: startOfTheDay.toDate(), lte: endOfTheDay.toDate() } },
    });
  }
  async findManyById(userId: string) {
    return await prisma.checkin.findMany({ where: { userId } });
  }
  async countByUserId(userId: string) {
    return await prisma.checkin.count({ where: { userId } });
  }
}
