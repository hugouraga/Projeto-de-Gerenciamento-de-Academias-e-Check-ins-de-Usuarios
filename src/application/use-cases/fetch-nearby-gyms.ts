import { Gym } from '@prisma/client';
import { GymContractRepository } from '../repositories/gym-contract.repository';

interface FetchGymsNearbyUseCaseRequest {
  userLatitude: string;
  userLongitude: string;
}

interface FetchGymsNearbyUseCaseResponse {
  gyms: Gym[];
}

export class FetchGymsNearbyUseCase {
  constructor(private gymsRepository: GymContractRepository) {}

  async execute(params: FetchGymsNearbyUseCaseRequest): Promise<FetchGymsNearbyUseCaseResponse> {
    const gyms: Gym[] = await this.gymsRepository.findManyNearby({
      userLatitude: params.userLatitude,
      userLongitude: params.userLongitude,
    });

    return { gyms };
  }
}
