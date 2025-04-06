import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType({ description: 'user input model' })
export class GetUserInput {
  @Field()
  @IsNotEmpty()
  id: string;
}
