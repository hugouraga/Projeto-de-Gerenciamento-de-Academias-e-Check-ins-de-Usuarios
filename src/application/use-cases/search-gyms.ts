import { GymContractRepository } from '../repositories/gym-contract.repository';

export class SearchGymsUseCase {
  constructor(private gymRepository: GymContractRepository) {}

  async execute(query: string, page: number) {
    return await this.gymRepository.searchMany(query, page);
  }
}
