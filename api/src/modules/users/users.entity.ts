import { ObjectType, Field, ID } from '@nestjs/graphql';
// import { Customer } from '../../customer/entities/customer.entity'; // adapte si besoin
// import { Post } from '../../post/entities/post.entity'; // adapte si besoin

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  name?: string;

  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;

  //   @Field(() => [Post], { nullable: true })
  //   posts?: Post[];

  //   @Field(() => Customer, { nullable: true })
  //   customer?: Customer;

  // ❌ Ne surtout pas exposer :
  // password n'est PAS décoré avec @Field()
  password: string;
}
