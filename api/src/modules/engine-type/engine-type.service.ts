import { Injectable } from '@nestjs/common';
import { EngineTypesRepository } from './engine-type.repository';
import { PubSub } from 'graphql-subscriptions';
import { EngineTypesQueryDto } from './engine-type-query.dto';

@Injectable()
export class EngineTypesService {
  constructor(
    private repository: EngineTypesRepository,
    private readonly pubSub: PubSub,
  ) {}

  async findAllEngineTypes(query?: EngineTypesQueryDto) {
    console.log('QUERY in api engine type');

    const engineTypesList = await this.repository.findAllEngineTypes(query);
    console.log('engineTypeList in API', engineTypesList);
    return engineTypesList;
  }
}
