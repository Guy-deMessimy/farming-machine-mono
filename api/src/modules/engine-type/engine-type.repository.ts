import { Injectable } from '@nestjs/common';
import { Prisma, EngineTypes } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class EngineTypesRepository {
  constructor(private prisma: PrismaService) {
    prisma.$on<any>('query', (event: Prisma.QueryEvent) => {
      console.log('Query: ' + event.query);
      console.log('Duration: ' + event.duration + 'ms');
    });
  }

  async findAllEngineTypes(): Promise<EngineTypes[]> {
    return this.prisma.engineTypes.findMany({
      include: {
        engines: true,
      },
    });
  }
}
