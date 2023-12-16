import { CheckInContractRepository } from '../repositories/check-in-contract.repository';
import { GymContractRepository } from '../repositories/gym-contract.repository';
import { UserContractRepository } from '../repositories/user-contract.repository';
import { getDistanceBetweenCoordinates } from '../utils/get-distance-between-coordinates';

export class CheckInUseCase {
  constructor(
    private userRepository: UserContractRepository,
    private gymRepository: GymContractRepository,
    private checkInRepository: CheckInContractRepository,
  ) {}

  async execute(userId: string, gymId: string, userLatitude: string, userLongitude: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error('User not found');
    const gym = await this.gymRepository.findById(gymId);
    if (!gym) throw new Error('Gym not found');
    const checkInOnSomeDay = await this.checkInRepository.findByUserIdOnDate(user.id, new Date());
    if (checkInOnSomeDay) throw new Error('Check-in already on some day');
    const distanceOfBetweenUserAndGym = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: gym.latitude, longitude: gym.longitude },
    );
    const MAX_DISTANCE_IN_KM = 1;
    if (distanceOfBetweenUserAndGym > MAX_DISTANCE_IN_KM)
      throw new Error('Distance between user and gym too long');
    const checkIn = await this.checkInRepository.create(user.id, gym.id);
    return { checkIn };
  }
}
