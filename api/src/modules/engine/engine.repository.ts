import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { Prisma, Engine } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { EngineQueryDto } from './engine-query.dto';

@Injectable()
export class EngineRepository {
  private readonly logger = new Logger(EngineRepository.name);
  constructor(private prisma: PrismaService) {}

  async findAllEngines(query: EngineQueryDto): Promise<Engine[]> {
    const { limit, offset, cursor, orderBy, where } = query || {};
    // this.logger.debug(`findAllEngines called in repository with where: ${where}`);
    const prismaWhere: Prisma.EngineWhereInput = {
      ...(where && {
        ...(where?.engineModelId && {
          engineModelId: {
            in: where.engineModelId,
          },
        }),
        ...(where?.engineTypeId && {
          engineModel: {
            engineType: {
              id: {
                in: where.engineTypeId,
              },
            },
          },
        }),
      }),
    };

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
