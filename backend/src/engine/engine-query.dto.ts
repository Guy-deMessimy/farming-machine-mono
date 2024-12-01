import { InputType, Field, Int } from '@nestjs/graphql';
import { IsEnum, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { BaseQueryDto } from '../common/dto/base-query.dto';
import { QueryOptions } from '../common/dto/query-options.interface';
import { SortOrder } from '../common/enum/sort-order.enum';

@InputType()
class EngineOrderByInput {
  @Field(() => SortOrder, { nullable: true })
  @IsEnum(SortOrder)
  @IsOptional()
  id?: SortOrder;

  @Field(() => SortOrder, { nullable: true })
  @IsEnum(SortOrder)
  @IsOptional()
  brandName?: SortOrder;

  @Field(() => SortOrder, { nullable: true })
  @IsEnum(SortOrder)
  @IsOptional()
  modelName?: SortOrder;
}

@InputType()
class EngineWhereInput {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  readonly id?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  readonly brandName?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  readonly modelName?: string;
}

@InputType()
export class EngineQueryDto
  extends BaseQueryDto<number>
  implements QueryOptions<EngineOrderByInput, EngineWhereInput>
{
  @Field(() => EngineOrderByInput, { nullable: true })
  @IsOptional()
  @Type(() => EngineOrderByInput)
  readonly orderBy?: EngineOrderByInput;

  @Field(() => EngineWhereInput, { nullable: true })
  @IsOptional()
  @Type(() => EngineWhereInput)
  readonly where?: EngineWhereInput;
}