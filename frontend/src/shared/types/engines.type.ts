export interface EngineOrderByInput {
  brandName: SortOrder[];
  id?: SortOrder;
  modelName?: SortOrder;
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface EngineWhereInput {
  id?: number;
  modelName?: string;
  brandName?: string;
}

export interface EngineQueryDto {
  limit?: number;
  offset?: number;
  cursor?: number;
  orderBy?: EngineOrderByInput;
  where?: EngineWhereInput;
}
