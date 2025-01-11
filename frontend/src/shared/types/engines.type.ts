import { SortOrder } from '../types/enum.type';

export interface EngineQueryDto {
  limit?: number;
  offset?: number;
  cursor?: number;
  orderBy?: EngineOrderByInput;
  where?: EngineWhereInput;
}

export interface EngineModelQueryDto {
  limit?: number;
  offset?: number;
  cursor?: number;
  orderBy?: EngineModelOrderByInput;
  where?: EngineModelWhereInput;
}

export interface EngineOrderByInput {
  brandName?: string;
  id?: SortOrder;
  modelName?: SortOrder;
}

export interface EngineModelOrderByInput {
  name?: string;
  id?: SortOrder;
}

export interface EngineWhereInput {
  id?: number;
  modelName?: string;
  brandName?: string;
  engineTypeId?: number[] | null;
  engineModelId?: number[] | null;
}

export interface EngineModelWhereInput {
  id?: number;
  name?: string;
  engineTypeId?: number[] | null;
}

export interface EngineTypes {
  id: number;
  name: string;
  description: string;
  engineModels?: EngineModel[];
}

export interface EngineModel {
  id: number;
  name: string;
  description: string;
  engineType: EngineTypes;
  engines?: Engine[];
}

export interface Engine {
  id: number;
  modelName: string;
  brandName: string;
  conception: string;
  description: string;
  engineKwPower: number;
  engineCcPower: number;
  maxKmhSpeed: number;
  petrolLitreTank: number;
  TankLitre: number;
  weightKg: number;
  workingWidth: number;
  CopiesNumber: number;
  ref: string;
  imageUrl: string;
  engineModel: EngineModel;
}
