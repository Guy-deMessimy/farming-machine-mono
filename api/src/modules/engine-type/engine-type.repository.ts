import { Injectable } from '@nestjs/common';
import { Prisma, EngineTypes } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { EngineTypesQueryDto } from './engine-type-query.dto';

@Injectable()
export class EngineTypesRepository {
  constructor(private prisma: PrismaService) {
    prisma.$on<any>('query', (event: Prisma.QueryEvent) => {
      console.log('Query: ' + event.query);
      console.log('Duration: ' + event.duration + 'ms');
    });
  }

  async findAllEngineTypes(query: EngineTypesQueryDto): Promise<EngineTypes[]> {
    const { limit, offset, cursor, orderBy, where } = query || {};
    console.log('AAA where', where);
    return this.prisma.engineTypes.findMany({
      skip: offset,
      take: limit,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy,
      where,
      include: {
        engineModels: true,
      },
    });
  }
}
