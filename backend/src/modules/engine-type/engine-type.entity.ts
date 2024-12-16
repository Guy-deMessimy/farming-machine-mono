import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Engine } from '../engine/engine.entity';

@ObjectType({ description: 'engine type model' })
export class EngineTypes {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => [Engine], { nullable: true })
  engines?: Engine[];
}
