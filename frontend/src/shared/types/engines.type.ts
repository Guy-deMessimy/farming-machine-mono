import { SortOrder } from '../types/enum.type';

export interface EngineQueryDto {
  limit?: number;
  offset?: number;
  cursor?: number;
  orderBy?: EngineOrderByInput;
  where?: EngineWhereInput;
}

export interface EngineOrderByInput {
  brandName?: string;
  id?: SortOrder;
  modelName?: SortOrder;
}

export interface EngineWhereInput {
  id?: number;
  modelName?: string;
  brandName?: string;
  // engineModelId
  engineTypeId?: number[] | null;
}

export interface Engine {
  id: number;
  modelName: string;
  brandName: string;
  conception: string;
  engineKwPower: number;
  engineCcPower: number;
  MaxKmhSpeed: number;
  PetrolLitreTank: number;
  TankLitre: number;
  WeightKg: number;
  WorkingWidth: number;
  CopiesNumber: number;
  imageUrl: string;
}

export interface EngineTypes {
  id: number;
  name: string;
  description: string;
  engines?: Engine[];
}
