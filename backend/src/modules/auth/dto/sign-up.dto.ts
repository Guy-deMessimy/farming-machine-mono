import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';

@InputType()
export class SignUpDto {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @MinLength(10)
  password: string;

  @Field({ nullable: true })
  name?: string;
}
