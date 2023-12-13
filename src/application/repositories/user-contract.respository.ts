export interface UserContractRepository {
  save(user: any): Promise<any>;
}
