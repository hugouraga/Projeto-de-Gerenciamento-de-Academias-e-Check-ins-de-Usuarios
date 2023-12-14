import { User } from '@prisma/client';
import { UserContractRepository } from '../repositories/user-contract.repository';
import bcrypt from 'bcrypt';

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private userRepository: UserContractRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) throw new Error('invalid credentials error');
    const isPasswordCorrectlyHashed = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrectlyHashed) throw new Error('invalid credentials error');

    return { user };
  }
}
