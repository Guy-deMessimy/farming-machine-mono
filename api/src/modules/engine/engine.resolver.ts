import { Query, Resolver, Args } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { EngineService } from './engine.service';
import { Engine } from './engine.entity';
import { EngineQueryDto } from './engine-query.dto';

@Resolver()
export class EngineResolver {
  private readonly logger = new Logger(EngineResolver.name);

  constructor(
    private readonly engineService: EngineService,
    private readonly pubSub: PubSub,
  ) {}

  @Query(() => [Engine], { name: 'findAllEngines', nullable: true })
  async findAllEngines(
    @Args('query', { nullable: true }) query?: EngineQueryDto,
  ) {
    // this.logger.debug(`findAllEngines called in resolver with query: ${query}`);
    return this.engineService.findAllEngines(query);
  }
}
