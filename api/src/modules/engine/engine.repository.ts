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
    console.log('AAA where', where.typeId)
    const prismaWhere = {
      ...where,
      typeId: where?.typeId ? { in: Array.isArray(where.typeId) ? where.typeId : [where.typeId] } : undefined,
    };
 
    console.log('prismaWhere', prismaWhere)
    return this.prisma.engine.findMany({
      skip: limit,
      take: offset,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy,
      where: prismaWhere,
      include: {
        type: true,
      },
    });
  }
}
