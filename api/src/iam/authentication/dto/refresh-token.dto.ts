import { Field, ObjectType } from '@nestjs/graphql';
import { AuthPayload } from './auth-payload.dto'; // réutilise le DTO de base
import { IsNotEmpty } from 'class-validator';

@ObjectType()
export class RefreshTokenDto extends AuthPayload {
  @Field()
  @IsNotEmpty()
  refreshToken: string;
}
