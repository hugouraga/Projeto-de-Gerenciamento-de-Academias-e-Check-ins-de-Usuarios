import { CheckInContractRepository } from '../repositories/check-in-contract.repository';
import { GymContractRepository } from '../repositories/gym-contract.repository';
import { UserContractRepository } from '../repositories/user-contract.repository';

export class CheckInUseCase {
  constructor(
    private userRepository: UserContractRepository,
    private gymRepository: GymContractRepository,
    private CheckInRepository: CheckInContractRepository,
  ) {}

  async execute() {}
}
