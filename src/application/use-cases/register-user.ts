import { Prisma } from '@prisma/client';
import { UserContractRepository } from '../repositories/user-contract.respository';

export class RegisterUserUseCase {
  constructor(private userRepository: UserContractRepository) {}

  async execute(newUser: Prisma.UserCreateInput) {
    const user = await this.userRepository.save(newUser);
    return { user };
  }
}
