import { EngineOrderByInput } from '../types/engines.type';

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export const DEFAULT_ORDER_BY: EngineOrderByInput = {
  brandName: [SortOrder.DESC],
};
