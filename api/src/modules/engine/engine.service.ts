import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { EngineRepository } from './engine.repository';
import { PubSub } from 'graphql-subscriptions';
import { EngineQueryDto } from './engine-query.dto';

@Injectable()
export class EngineService {
  private readonly logger = new Logger(EngineService.name);
  constructor(
    private repository: EngineRepository,
    private readonly pubSub: PubSub,
  ) {}

  async findAllEngines(query?: EngineQueryDto) {
    const enginesList = await this.repository.findAllEngines(query);
    // this.logger.debug(`findAllEngines called in service: ${enginesList}`);
    return enginesList;
  }
}
