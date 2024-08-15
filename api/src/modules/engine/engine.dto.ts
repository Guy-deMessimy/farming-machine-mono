import { Prisma } from '@prisma/client';

export class EngineInput {
  limit?: number;
  offset?: number;
  cursor?: Prisma.PostWhereUniqueInput;
  where?: Prisma.PostWhereInput;
  orderBy?: Prisma.PostOrderByWithRelationInput;
}
