import { Checkin } from '@prisma/client';
import { CheckInContractRepository } from './../../application/repositories/check-in-contract.repository';
import { randomUUID } from 'crypto';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

export class InMemoryCheckInRepository implements CheckInContractRepository {
  private checkIns: Checkin[] = [];

  async create(userId: string, gymId: string): Promise<Checkin> {
    const checkIn: Checkin = {
      id: randomUUID(),
      gymId,
      userId,
      createdAt: new Date(),
    };

    this.checkIns.push(checkIn);
    return checkIn;
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date');
    const endOfTheDay = dayjs(date).endOf('date');
    const checkInOnSameDay = this.checkIns.find((checkin) => {
      const checkInDate = dayjs(checkin.createdAt);
      const isOnSameDay = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);
      return checkin.userId === userId && isOnSameDay;
    });
    return checkInOnSameDay ?? null;
  }

  async findManyById(userId: string): Promise<Checkin[]> {
    const checkIns: Checkin[] = this.checkIns.filter((checkIn) => checkIn.userId == userId);
    return checkIns;
  }
}
