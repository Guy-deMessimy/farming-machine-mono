import { ObjectType, Field, ID } from '@nestjs/graphql';
import { EngineTypes as EngineTypesDB } from '@prisma/client';
import { EngineModel } from '../engine-model/engine-model.entity';

@ObjectType({ description: 'engine type model' })
export class EngineTypes {
  @Field(() => ID)
  id: EngineTypesDB[`id`];

  @Field(() => String)
  name: EngineTypesDB[`name`];

  @Field(() => String)
  description: EngineTypesDB[`description`];

  // Relation avec EngineModel
  @Field(() => [EngineModel], { nullable: true })
  engineModels?: EngineModel[];
}
