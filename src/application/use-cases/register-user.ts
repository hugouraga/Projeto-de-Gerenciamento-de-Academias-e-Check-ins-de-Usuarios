import { Prisma } from '@prisma/client';
import { UserContractRepository } from '../repositories/user-contract.repository';
import bcrypt from 'bcrypt';

export class RegisterUserUseCase {
  constructor(private userRepository: UserContractRepository) {}

  async execute(userRequest: Prisma.UserUncheckedCreateInput) {
    if (userRequest.password.length < 6) throw new Error('password must be at least 6 characters');
    const isUserExist = await this.userRepository.findByUserEmailOrCPF(
      userRequest.email,
      userRequest.cpf,
    );
    if (isUserExist) throw new Error('user already exists');
    const passwordHash = await bcrypt.hash(userRequest.password, 6);
    const user = await this.userRepository.save({
      cpf: userRequest.cpf,
      email: userRequest.email,
      name: userRequest.name,
      password: passwordHash,
      typeUserId: 1,
    });
    return { user };
  }
}
