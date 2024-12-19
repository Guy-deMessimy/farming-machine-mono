import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { EngineTypes } from '../engine-type/engine-type.entity';
import { Engine } from '../engine/engine.entity';

@ObjectType({ description: 'engine model' })
export class EngineModel {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  // Relation avec EngineTypes
  @Field(() => EngineTypes, { nullable: true })
  engineType?: EngineTypes;

  // Relation avec Engine
  @Field(() => [Engine], { nullable: true })
  engines?: Engine[];
}
