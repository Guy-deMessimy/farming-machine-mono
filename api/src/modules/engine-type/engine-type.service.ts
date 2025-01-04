import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { EngineTypesRepository } from './engine-type.repository';
import { PubSub } from 'graphql-subscriptions';
import { EngineTypesQueryDto } from './engine-type-query.dto';

@Injectable()
export class EngineTypesService {
  private readonly logger = new Logger(EngineTypesService.name);
  constructor(
    private repository: EngineTypesRepository,
    private readonly pubSub: PubSub,
  ) {}

  async findAllEngineTypes(query?: EngineTypesQueryDto) {
    const engineTypesList = await this.repository.findAllEngineTypes(query);
    // this.logger.debug(`findAllEngineTypes called in service: ${engineTypesList}`);
    return engineTypesList;
  }
}
