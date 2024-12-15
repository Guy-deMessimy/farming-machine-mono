import { Query, Resolver } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { EngineTypesService } from './engine-type.service';
import { EngineTypes } from './engine-type.entity';

@Resolver()
export class EngineTypesResolver {
  constructor(
    private readonly enginesTypeService: EngineTypesService,
    private readonly pubSub: PubSub,
  ) {}

  @Query(() => [EngineTypes], { name: 'findAllEngineTypes' })
  async findAllEngineTypes(): Promise<EngineTypes[]> {
    return this.enginesTypeService.findAllEngineTypes();
  }
}
