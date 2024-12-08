import { SortOrder } from '../types/enum.type';

export interface EngineQueryDto {
  limit?: number;
  offset?: number;
  cursor?: number;
  orderBy?: EngineOrderByInput;
  where?: EngineWhereInput;
}

export interface EngineOrderByInput {
  brandName?: SortOrder;
  id?: SortOrder;
  modelName?: SortOrder;
}

export interface EngineWhereInput {
  id?: number;
  modelName?: string;
  brandName?: string;
}

export const DEFAULT_ENGINE_ORDER_BY: EngineOrderByInput = {
  brandName: SortOrder.DESC,
};
