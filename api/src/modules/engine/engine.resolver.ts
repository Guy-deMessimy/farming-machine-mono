import { Query, Resolver, Args } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { EngineService } from './engine.service';
import { Engine } from './engine.entity';
import { EngineQueryDto } from './engine-query.dto';

@Resolver()
export class EngineResolver {
  constructor(
    private readonly engineService: EngineService,
    private readonly pubSub: PubSub,
  ) {}

  @Query(() => [Engine], { name: 'findAllEngines', nullable: true })
  async findAllEngines(
    @Args('query', { nullable: true }) query?: EngineQueryDto,
  ) {
    console.log('Query received in API', query);
    return this.engineService.findAllEngines(query);
  }
}
