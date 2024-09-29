import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Engine as EngineDB } from '@prisma/client';

@ObjectType({ description: 'engine model' })
export class Engine {
  @Field(() => ID)
  id: EngineDB[`id`];

  @Field(() => String)
  modelName: EngineDB[`modelName`];

  @Field(() => String)
  brandName: EngineDB[`brandName`];

  @Field(() => String)
  conception: EngineDB[`conception`];

  @Field(() => Int)
  engineKwPower: EngineDB[`engineKwPower`];

  @Field(() => Int)
  engineCcPower: EngineDB[`engineCcPower`];

  @Field(() => Int)
  maxKmhSpeed: EngineDB[`maxKmhSpeed`];

  @Field(() => Int)
  petrolLitreTank: EngineDB[`petrolLitreTank`];

  @Field(() => Int)
  tankLitre: EngineDB[`tankLitre`];

  @Field(() => Int)
  weightKg: EngineDB[`weightKg`];

  @Field(() => Int)
  workingWidth?: EngineDB[`workingWidth`];

  @Field(() => Int)
  copiesNumber: EngineDB[`copiesNumber`];

  @Field(() => String)
  imageUrl: EngineDB[`imageUrl`];

  // see for relations
}
