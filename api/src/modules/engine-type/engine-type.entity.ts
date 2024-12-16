import { ObjectType, Field, ID } from '@nestjs/graphql';
import { EngineTypes as EngineTypesDB } from '@prisma/client';
import { Engine } from '../engine/engine.entity';

@ObjectType({ description: 'engine type model' })
export class EngineTypes {
  @Field(() => ID)
  id: EngineTypesDB[`id`];

  @Field(() => String)
  name: EngineTypesDB[`name`];

  @Field(() => String)
  description: EngineTypesDB[`description`];

  @Field(() => [Engine], { nullable: true })
  engines?: Engine[];
}
