import { Injectable } from '@nestjs/common';
import { Prisma, Engine } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { EngineQueryDto } from './engine-query.dto';

@Injectable()
export class EngineRepository {
  constructor(private prisma: PrismaService) {
    prisma.$on<any>('query', (event: Prisma.QueryEvent) => {
      console.log('Query: ' + event.query);
      console.log('Duration: ' + event.duration + 'ms');
    });
  }

  async findAllEngines(query: EngineQueryDto): Promise<Engine[]> {
    const { limit, offset, cursor, orderBy, where } = query || {};
    console.log('AAA where', where);
    const prismaWhere = {
      ...(where && {
        ...where,
        ...(where?.engineTypeId && {
          engineTypeId: Array.isArray(where.engineTypeId)
            ? { in: where.engineTypeId }
            : where.engineTypeId,
        }),
      }),
    };

    console.log('prismaWhere', prismaWhere);
    return this.prisma.engine.findMany({
      skip: limit,
      take: offset,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy,
      where: prismaWhere,
      include: {
        engineType: true,
      },
    });
  }
}
