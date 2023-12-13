import { Prisma } from '@prisma/client';
import { UserContractRepository } from '../repositories/user-contract.respository';

export class RegisterUserUseCase {
  constructor(private userRepository: UserContractRepository) {}

  async execute(newUser: Prisma.UserCreateInput) {
    if (newUser.password.length < 6) throw new Error('password must be at least 6 characters');
    const isUserExist = await this.userRepository.findByUserEmailOrCPF(newUser.email, newUser.cpf);
    if (isUserExist) throw new Error('user already exists');
    const user = await this.userRepository.save(newUser);
    return { user };
  }
}
