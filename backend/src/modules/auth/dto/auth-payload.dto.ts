import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/users.entity';

@ObjectType()
export class AuthPayload {
  @Field()
  accessToken: string;

  @Field(() => User)
  user: User;
}
