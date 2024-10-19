import { Query, Resolver, Args } from '@nestjs/graphql';
import { EngineService } from './engine.service';
import { PubSub } from 'graphql-subscriptions';
import { Engine } from './engine.entity';
import { EngineQueryDto } from './engine-query.dto';

@Resolver()
export class EngineResolver {
  constructor(
    private readonly engineService: EngineService,
    private readonly pubSub: PubSub,
  ) {}

  @Query(() => [Engine])
  async getEngines(@Args('query') query: EngineQueryDto) {
    console.log('Query received in API');
    return this.engineService.getEngines(query);
  }
}
