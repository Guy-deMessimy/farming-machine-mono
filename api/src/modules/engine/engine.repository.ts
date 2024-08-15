import { Injectable } from '@nestjs/common';
import { Prisma, Engine } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { EngineInput } from './engine.dto';
// import { PostInput } from './entities/post.entity';

@Injectable()
export class EngineRepository {
  constructor(private prisma: PrismaService) {
    prisma.$on<any>('query', (event: Prisma.QueryEvent) => {
      console.log('Query: ' + event.query);
      console.log('Duration: ' + event.duration + 'ms');
    });
  }

  async getEngines(params: EngineInput): Promise<Engine[]> {
    const { limit, offset, cursor, where, orderBy } = params;
    return this.prisma.engine.findMany({
      skip: limit,
      take: offset,
      // cursor,
      // where,
      orderBy,
    });
  }
}
