import { Query, Resolver } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { EngineModelService } from './engine-model.service';
import { EngineModel } from './engine-model.entity';

@Resolver()
export class EngineModelResolver {
  constructor(
    private readonly enginesTypeService: EngineModelService,
    private readonly pubSub: PubSub,
  ) {}

  @Query(() => [EngineModel], { name: 'findAllEngineModel' })
  async findAllEngineTypes(): Promise<EngineModel[]> {
    return this.enginesTypeService.findAllEngineModel();
  }
}
