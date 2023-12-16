import { CheckInContractRepository } from '../repositories/check-in-contract.repository';
import { GymContractRepository } from '../repositories/gym-contract.repository';
import { UserContractRepository } from '../repositories/user-contract.repository';

export class CheckInUseCase {
  constructor(
    private userRepository: UserContractRepository,
    private gymRepository: GymContractRepository,
    private checkInRepository: CheckInContractRepository,
  ) {}

  async execute(userId: string, gymId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error('User not found');
    const gym = await this.gymRepository.findById(gymId);
    if (!gym) throw new Error('Gym not found');
    const checkInOnSomeDay = await this.checkInRepository.findByUserIdOnDate(user.id, new Date());
    if (checkInOnSomeDay) throw new Error('Check-in already on some day');
    const checkIn = await this.checkInRepository.create(user.id, gym.id);

    return { checkIn };
  }
}
