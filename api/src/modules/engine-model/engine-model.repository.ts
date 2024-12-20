import { Injectable } from '@nestjs/common';
import { Prisma, EngineModel } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class EngineModelRepository {
  constructor(private prisma: PrismaService) {
    prisma.$on<any>('query', (event: Prisma.QueryEvent) => {
      console.log('Query: ' + event.query);
      console.log('Duration: ' + event.duration + 'ms');
    });
  }

  async findAllEngineModel(): Promise<EngineModel[]> {
    return this.prisma.engineModel.findMany({
      include: {
        engineType: true,
      },
    });
  }
}
