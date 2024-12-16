import { Injectable } from '@nestjs/common';
import { EngineTypesRepository } from './engine-type.repository';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class EngineTypesService {
  constructor(
    private repository: EngineTypesRepository,
    private readonly pubSub: PubSub,
  ) {}

  async findAllEngineTypes() {
    console.log('QUERY in api engine type');

    const engineTypesList = await this.repository.findAllEngineTypes();
    console.log('engineTypeList in API', engineTypesList);
    return engineTypesList;
  }
}
