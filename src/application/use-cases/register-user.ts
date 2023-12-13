import { UserContractRepository } from '../repositories/user-contract.respository';

export class RegisterUserUseCase {
  constructor(private userRepository: UserContractRepository) {}

  async execute(newUser: any) {
    const user = await this.userRepository.save(newUser);
    return { user };
  }
}
