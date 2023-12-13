import { UserContractRepository } from '@/application/repositories/user-contract.respository';
import { Prisma } from '@prisma/client';

export class InMemoryUserRepository implements UserContractRepository {
  private users: any[] = [];

  async save(user: any): Promise<any> {
    this.users.push(user);
    return user;
  }

  async findByUserEmailOrCPF(email: string, cpf: string): Promise<Prisma.UserCreateInput | null> {
    return this.users.find((user) => user.email === email && user.cpf === cpf);
  }
}
