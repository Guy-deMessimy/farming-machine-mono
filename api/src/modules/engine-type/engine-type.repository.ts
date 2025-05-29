import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { EngineTypes } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { EngineTypesQueryDto } from './engine-type-query.dto';

@Injectable()
export class EngineTypesRepository {
  private readonly logger = new Logger(EngineTypesRepository.name);
  constructor(private prisma: PrismaService) {}

  async findAllEngineTypes(query: EngineTypesQueryDto): Promise<EngineTypes[]> {
    const { limit, offset, cursor, orderBy, where } = query || {};
    // this.logger.debug(`findAllEngineTypes called in repository with where: ${where}`);
    return this.prisma.engineTypes.findMany({
      skip: offset,
      take: limit,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy,
      where,
    });
  }
}
