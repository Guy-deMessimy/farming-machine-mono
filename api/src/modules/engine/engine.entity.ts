import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Engine as EngineDB } from '@prisma/client';

@ObjectType({ description: 'engine model' })
export class Engine {
  @Field(() => Int)
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
  MaxKmhSpeed: EngineDB[`MaxKmhSpeed`];

  @Field(() => Int)
  PetrolLitreTank: EngineDB[`PetrolLitreTank`];

  @Field(() => Int)
  TankLitre: EngineDB[`TankLitre`];

  @Field(() => Int)
  WeightKg: EngineDB[`WeightKg`];

  @Field(() => Int)
  WorkingWidth?: EngineDB[`WorkingWidth`];

  @Field(() => Int)
  CopiesNumber: EngineDB[`CopiesNumber`];

  // see for relations
}
