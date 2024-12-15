import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { EngineTypes } from '../engine-type/engine-type.entity';

@ObjectType({ description: 'engine model' })
export class Engine {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  modelName: string;

  @Field(() => String)
  brandName: string;

  @Field(() => String)
  conception: string;

  @Field(() => Int)
  engineKwPower: number;

  @Field(() => Int)
  engineCcPower: number;

  @Field(() => Int)
  maxKmhSpeed: number;

  @Field(() => Int)
  petrolLitreTank: number;

  @Field(() => Int)
  tankLitre: number;

  @Field(() => Int)
  weightKg: number;

  @Field(() => Int)
  workingWidth?: number;

  @Field(() => Int)
  copiesNumber: number;

  @Field(() => String)
  imageUrl: string;

  @Field(() => EngineTypes, { nullable: true })
  type?: EngineTypes;
}
