import { Injectable } from '@nestjs/common';
import { EngineModelRepository } from './engine-model.repository';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class EngineModelService {
  constructor(
    private repository: EngineModelRepository,
    private readonly pubSub: PubSub,
  ) {}

  async findAllEngineModel() {
    console.log('QUERY in api engine model');
    const engineModelList = await this.repository.findAllEngineModel();
    console.log('engineTypeList in API', engineModelList);
    return engineModelList;
  }
}
