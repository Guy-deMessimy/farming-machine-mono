import { Args, Query, Resolver } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { EngineTypesService } from './engine-type.service';
import { EngineTypes } from './engine-type.entity';
import { EngineTypesQueryDto } from './engine-type-query.dto';

@Resolver(() => EngineTypes)
export class EngineTypesResolver {
  private readonly logger = new Logger(EngineTypesResolver.name);
  constructor(
    private readonly enginesTypeService: EngineTypesService,
    private readonly pubSub: PubSub,
  ) {}

  @Query(() => [EngineTypes], { name: 'findAllEngineTypes', nullable: true })
  async findAllEngineTypes(
    @Args('query', { nullable: true }) query?: EngineTypesQueryDto,
  ): Promise<EngineTypes[]> {
    // this.logger.debug(`findAllEngineTypes called in resolver with query: ${query}`);
    return this.enginesTypeService.findAllEngineTypes(query);
  }
}
