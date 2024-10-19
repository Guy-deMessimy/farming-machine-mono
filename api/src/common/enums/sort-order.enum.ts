import { registerEnumType } from '@nestjs/graphql';

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

registerEnumType(SortOrder, {
  name: 'SortOrder',
  description: 'Order of sorting: ASC for ascending, DESC for descending',
});
