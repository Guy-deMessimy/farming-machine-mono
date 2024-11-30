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

  async getEngines(query?: EngineQueryDto) {
    console.log('QUERY in api', query);
    const engineList = await this.repository.getEngines(query);
    console.log('enginelist in API', engineList);
    return engineList;
  }
}
