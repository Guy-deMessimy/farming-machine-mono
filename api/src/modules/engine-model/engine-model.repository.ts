import { Injectable } from '@nestjs/common';
import { Prisma, EngineModel } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { EngineModelQueryDto } from './engine-model-query.dto';

@Injectable()
export class EngineModelRepository {
  constructor(private prisma: PrismaService) {
    prisma.$on<any>('query', (event: Prisma.QueryEvent) => {
      console.log('Query: ' + event.query);
      console.log('Duration: ' + event.duration + 'ms');
    });
  }

  async findAllEngineModel(query: EngineModelQueryDto): Promise<EngineModel[]> {
    const { limit, offset, cursor, orderBy, where } = query || {};
    const prismaWhere: Prisma.EngineModelWhereInput = {
      ...(where && {
        ...(where?.engineTypeId && {
          engineTypeId: {
            in: where.engineTypeId,
          },
        }),
      }),
    };
    console.log('AAA where', where);
    return this.prisma.engineModel.findMany({
      skip: offset,
      take: limit,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy,
      where: prismaWhere,
      include: {
        engineType: true,
      },
    });
  }
}
