import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { Prisma, EngineModel } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { EngineModelQueryDto } from './engine-model-query.dto';

@Injectable()
export class EngineModelRepository {
  private readonly logger = new Logger(EngineModelRepository.name);
  constructor(private prisma: PrismaService) {}

  async findAllEngineModel(query: EngineModelQueryDto): Promise<EngineModel[]> {
    const { limit, offset, cursor, orderBy, where } = query || {};
    // this.logger.debug(`findAllEngineModel called in repository with where: ${where}`);
    const prismaWhere: Prisma.EngineModelWhereInput = {
      ...(where && {
        ...(where?.engineTypeId && {
          engineTypeId: {
            in: where.engineTypeId,
          },
        }),
      }),
    };
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
