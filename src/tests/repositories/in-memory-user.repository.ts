import { UserContractRepository } from '@/application/repositories/user-contract.repository';
import { Prisma, User } from '@prisma/client';

export class InMemoryUserRepository implements UserContractRepository {
  private users: any[] = [];

  async save(user: any): Promise<any> {
    this.users.push(user);
    return user;
  }

  async findByUserEmailOrCPF(email: string, cpf: string): Promise<User | null> {
    return this.users.find((user) => user.email === email && user.cpf === cpf);
  }

  async findUserByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }
}
