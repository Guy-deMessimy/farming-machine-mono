import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class RefreshTokenDto {
  @Field()
  @IsNotEmpty()
  refreshToken: string;

  @Field()
  @IsNotEmpty()
  sub: string;
}
