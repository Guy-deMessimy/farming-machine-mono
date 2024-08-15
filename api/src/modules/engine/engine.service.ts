import { Injectable } from '@nestjs/common';
import { EngineRepository } from './engine.repository';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class EngineService {
  constructor(
    private repository: EngineRepository,
    private readonly pubSub: PubSub,
  ) {}

  async getEngineList() {
    const engineList = await this.repository.getEngines({});
    return engineList;
  }
}
