import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, MinLength, IsString } from 'class-validator';

@InputType()

export class SignInDto {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @MinLength(10)
  password: string;
}
