import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Engine as EngineDB } from '@prisma/client';
import { EngineTypes } from '../engine-type/engine-type.entity';

@ObjectType({ description: 'engine model' })
export class Engine {
  @Field(() => ID)
  id: EngineDB[`id`];

  @Field(() => String)
  modelName: EngineDB[`modelName`];

  @Field(() => String)
  brandName: EngineDB[`brandName`];

  @Field(() => String, { nullable: true })
  conception: EngineDB[`conception`];

  @Field(() => String, { nullable: true })
  description: EngineDB[`description`];

  @Field(() => Int, { nullable: true })
  engineKwPower: EngineDB[`engineKwPower`];

  @Field(() => Int, { nullable: true })
  engineCcPower: EngineDB[`engineCcPower`];

  @Field(() => Int, { nullable: true })
  maxKmhSpeed: EngineDB[`maxKmhSpeed`];

  @Field(() => Int, { nullable: true })
  petrolLitreTank: EngineDB[`petrolLitreTank`];

  @Field(() => Int, { nullable: true })
  tankLitre: EngineDB[`tankLitre`];

  @Field(() => Int, { nullable: true })
  autonomyMn: EngineDB[`autonomyMn`];

  @Field(() => Int, { nullable: true })
  liftingHeightMeter: EngineDB[`liftingHeightMeter`];

  @Field(() => Int, { nullable: true })
  weightKg: EngineDB[`weightKg`];

  @Field(() => Int, { nullable: true })
  workingWidth?: EngineDB[`workingWidth`];

  @Field(() => Int)
  copiesNumber: EngineDB[`copiesNumber`];

  @Field(() => String, { nullable: true })
  imageUrl: EngineDB[`imageUrl`];

  @Field(() => String, { nullable: true })
  ref: EngineDB[`ref`];

  @Field(() => EngineTypes, { nullable: true })
  engineType?: EngineTypes;
}
