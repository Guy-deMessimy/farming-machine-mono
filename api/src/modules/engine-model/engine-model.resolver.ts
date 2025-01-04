import { Query, Resolver, Args } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { EngineModelService } from './engine-model.service';
import { EngineModel } from './engine-model.entity';
import { EngineModelQueryDto } from './engine-model-query.dto';

@Resolver()
export class EngineModelResolver {
  private readonly logger = new Logger(EngineModelResolver.name);
  constructor(
    private readonly enginesTypeService: EngineModelService,
    private readonly pubSub: PubSub,
  ) {}

  @Query(() => [EngineModel], { name: 'findAllEngineModel', nullable: true })
  async findAllEngineTypes(
    @Args('query', { nullable: true }) query?: EngineModelQueryDto,
  ): Promise<EngineModel[]> {
    // this.logger.debug(`findAllEngineTypes called in resolver with query: ${query}`);
    return this.enginesTypeService.findAllEngineModel(query);
  }
}
