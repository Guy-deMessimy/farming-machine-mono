import { Injectable } from '@nestjs/common';
import { EngineModelRepository } from './engine-model.repository';
import { PubSub } from 'graphql-subscriptions';
import { EngineModelQueryDto } from './engine-model-query.dto';

@Injectable()
export class EngineModelService {
  constructor(
    private repository: EngineModelRepository,
    private readonly pubSub: PubSub,
  ) {}

  async findAllEngineModel(query?: EngineModelQueryDto) {
    console.log('QUERY in api engine model');
    const engineModelList = await this.repository.findAllEngineModel(query);
    console.log('engineTypeList in API', engineModelList);
    return engineModelList;
  }
}
