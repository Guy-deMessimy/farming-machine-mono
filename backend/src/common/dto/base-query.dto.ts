import { InputType, Field, Int } from '@nestjs/graphql';
import { IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class BaseQueryDto<TCursor> {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  readonly offset?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  readonly limit?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @Type(() => Number)
  readonly cursor?: TCursor;
}
