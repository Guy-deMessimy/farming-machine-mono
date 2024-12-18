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
    const prismaWhere: Prisma.EngineWhereInput  = {
      ...(where && {
        ...(where?.engineModelId && {
          engineModelId: {
            in: where.engineModelId
          }
        }),
        ...(where?.engineTypeId && {
          engineModel: {
            engineType: {
              id: {
                in: where.engineTypeId
              }
            }
          }
        }),
      }),
    };

    console.log('prismaWhere', prismaWhere);
    return this.prisma.engine.findMany({
      skip: offset,
      take: limit,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy,
      where: prismaWhere,
      include: {
        engineModel: {
          include: {
            engineType: true,
          },
        },
      },
    });
    
  }
}
