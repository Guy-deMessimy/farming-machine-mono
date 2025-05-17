import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/users.entity';

@ObjectType()
export class AuthPayload {
  // renvoye dans cookie
  @Field({ nullable: true })
  accessToken?: string;

  @Field(() => User, { nullable: true })
  user?: User;
  // renvoye dans cookie
  @Field({ nullable: true })
  refreshToken?: string;
}
