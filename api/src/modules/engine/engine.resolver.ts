import { Query, Resolver } from '@nestjs/graphql';
import { EngineService } from './engine.service';
import { PubSub } from 'graphql-subscriptions';
import { Engine } from './engine.entity';

@Resolver()
export class EngineResolver {
  constructor(
    private readonly engineService: EngineService,
    private readonly pubSub: PubSub,
  ) {}

  @Query(() => [Engine])
  async getEngines() {
    console.log('Query received in API');
    return this.engineService.getEngineList();
  }
}
