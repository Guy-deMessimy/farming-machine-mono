import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { EngineModelRepository } from './engine-model.repository';
import { PubSub } from 'graphql-subscriptions';
import { EngineModelQueryDto } from './engine-model-query.dto';

@Injectable()
export class EngineModelService {
  private readonly logger = new Logger(EngineModelService.name);
  constructor(
    private repository: EngineModelRepository,
    private readonly pubSub: PubSub,
  ) {}

  async findAllEngineModel(query?: EngineModelQueryDto) {
    const engineModelList = await this.repository.findAllEngineModel(query);
    // this.logger.debug(`findAllEngineModel called in service: ${engineModelList}`);
    return engineModelList;
  }
}
