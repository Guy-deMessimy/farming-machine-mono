import { ObjectType, Field, ID } from '@nestjs/graphql';
import { EngineModel } from '../engine-model/engine-model.entity';

@ObjectType({ description: 'engine type model' })
export class EngineTypes {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  // Relation avec EngineModel
  @Field(() => [EngineModel], { nullable: true })
  engineModels?: EngineModel[];
}
