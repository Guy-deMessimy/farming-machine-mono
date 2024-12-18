import { ObjectType, Field, ID } from '@nestjs/graphql';
import { EngineModel as EngineModelDB } from '@prisma/client';
import { EngineTypes } from '../engine-type/engine-type.entity';
import { Engine } from '../engine/engine.entity';

@ObjectType({ description: 'engine model' })
export class EngineModel {
  @Field(() => ID)
  id: EngineModelDB[`id`];

  @Field(() => String)
  name: EngineModelDB[`name`];

  @Field(() => String)
  description: EngineModelDB[`description`];

  // Relation avec EngineTypes
  @Field(() => EngineTypes, { nullable: true })
  engineType?: EngineTypes;

  // Relation avec Engine
  @Field(() => [Engine], { nullable: true })
  engines?: Engine[];
}
