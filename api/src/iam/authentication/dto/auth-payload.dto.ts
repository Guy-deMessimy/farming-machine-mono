import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../../modules/users/users.entity';

@ObjectType()
export class AuthPayload {
  @Field()
  accessToken: string;

  @Field(() => User)
  user: User;

  @Field({ nullable: true })
  refreshToken?: string;
}
