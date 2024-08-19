import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType({ description: 'engine model' })
export class Engine {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  modelName: string;

  @Field(() => String)
  brandName: string;

  // @Field(() => String)
  // conception: string;

  // @Field(() => Int)
  // engineKwPower: number;

  // @Field(() => Int)
  // engineCcPower: number;

  @Field(() => Int)
  MaxKmhSpeed: number;

  @Field(() => Int)
  PetrolLitreTank: number;

  // @Field(() => Int)
  // TankLitre: number;

  // @Field(() => Int)
  // WeightKg: number;

  // @Field(() => Int)
  // WorkingWidth?: number;

  @Field(() => Int)
  CopiesNumber: number;

  // see for relations
}
