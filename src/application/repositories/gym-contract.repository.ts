import { Gym, Prisma } from '@prisma/client';

export interface findManyNearbyParams {
  userLatitude: string;
  userLongitude: string;
}

export interface GymContractRepository {
  create(gym: Prisma.GymUncheckedCreateInput): Promise<Gym>;
  findByCNPJ(cnpj: string): Promise<Gym | null>;
  findByEmail(email: string): Promise<Gym | null>;
  findById(id: string): Promise<Gym | null>;
  searchMany(query: string, page: number): Promise<Gym[]>;
  findManyNearby(params: findManyNearbyParams): Promise<Gym[]>;
}
