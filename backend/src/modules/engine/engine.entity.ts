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

  @Field(() => String, { nullable: true })
  conception: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => Int, { nullable: true })
  engineKwPower: number;

  @Field(() => Int, { nullable: true })
  engineCcPower: number;

  @Field(() => Int, { nullable: true })
  maxKmhSpeed: number;

  @Field(() => Int,{ nullable: true })
  petrolLitreTank: number;

  @Field(() => Int, { nullable: true })
  tankLitre: number;

  @Field(() => Int, { nullable: true })
  autonomyMn: number;

  @Field(() => Int, { nullable: true })
  liftingHeightMeter: number;

  @Field(() => Int, { nullable: true })
  weightKg: number;

  @Field(() => Int, { nullable: true })
  workingWidth?: number;

  @Field(() => Int)
  copiesNumber: number;

  @Field(() => String, { nullable: true })
  imageUrl: string;

  @Field(() => String, { nullable: true })
  ref: string;

  @Field(() => EngineTypes, { nullable: true })
  type?: EngineTypes;
}
