import { User } from '@prisma/client';
import { UserContractRepository } from '../repositories/user-contract.repository';

interface GetUserProfileUseCaseRequest {
  userId: string;
}

interface GetUserProfileUseCaseResponse {
  user: User;
}

export class GetUserProfileUseCase {
  constructor(private userRepository: UserContractRepository) {}

  async execute({ userId }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error('User not found');
    return { user };
  }
}
