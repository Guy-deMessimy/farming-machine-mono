import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteUserResponse {
  @Field()
  success: boolean;

  @Field()
  userId: string;

  @Field({ nullable: true })
  message?: string;
}
