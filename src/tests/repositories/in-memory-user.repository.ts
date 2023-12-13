import { UserContractRepository } from '@/application/repositories/user-contract.respository';

export class InMemoryUserRepository implements UserContractRepository {
  private users: any[] = [];

  async save(user: any): Promise<any> {
    this.users.push(user);
    return user;
  }
}
