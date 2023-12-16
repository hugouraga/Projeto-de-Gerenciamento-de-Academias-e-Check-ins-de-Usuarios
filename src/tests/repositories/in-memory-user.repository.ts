import { UserContractRepository } from '@/application/repositories/user-contract.repository';
import { Prisma, User } from '@prisma/client';
import { randomUUID } from 'crypto';

export class InMemoryUserRepository implements UserContractRepository {
  private users: User[] = [];

  async create(data: Prisma.UserUncheckedCreateInput): Promise<any> {
    const user: User = {
      id: randomUUID(),
      cpf: data.cpf,
      email: data.email,
      name: data.name,
      password: data.password,
      typeUserId: data.typeUserId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.push(user);
    return user;
  }

  async findByUserEmailOrCPF(email: string, cpf: string): Promise<User | null> {
    return this.users.find((user) => user.email === email && user.cpf === cpf) ?? null;
  }

  async findUserByEmail(email: string) {
    return this.users.find((user) => user.email === email) ?? null;
  }

  async findById(userId: string) {
    return this.users.find((user) => user.id === userId) ?? null;
  }
}
