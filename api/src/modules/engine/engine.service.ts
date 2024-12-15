import { Injectable } from '@nestjs/common';
import { EngineRepository } from './engine.repository';
import { PubSub } from 'graphql-subscriptions';
import { EngineQueryDto } from './engine-query.dto';

@Injectable()
export class EngineService {
  constructor(
    private repository: EngineRepository,
    private readonly pubSub: PubSub,
  ) {}

  async findAllEngines(query?: EngineQueryDto) {
    console.log('QUERY in api', query);
    const enginesList = await this.repository.findAllEngines(query);
    console.log('enginelist in API', enginesList);
    return enginesList;
  }
}
