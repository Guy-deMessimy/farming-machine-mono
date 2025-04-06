import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsEmail, IsString } from 'class-validator';

@InputType({ description: 'User input model for querying by ID or email' })
export class GetUserInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString() // car `cuid()` est un string non UUID
  id?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;
}
