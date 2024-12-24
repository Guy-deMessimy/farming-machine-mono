import { InputType, Field, Int } from '@nestjs/graphql';
import { ArrayNotEmpty, IsArray, IsEnum, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { BaseQueryDto } from '../../common/dto/base-query.dto';
import { QueryOptions } from '../../common/dto/query-options.interface';
import { SortOrder } from '../../common/enum/sort-order.enum';

@InputType()
class EngineModelOrderByInput {
  @Field(() => SortOrder, { nullable: true })
  @IsEnum(SortOrder)
  @IsOptional()
  id?: SortOrder;

  @Field(() => SortOrder, { nullable: true })
  @IsEnum(SortOrder)
  @IsOptional()
  name?: SortOrder;
}

@InputType()
class EngineModelWhereInput {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  readonly id?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  readonly name?: string;

  @Field(() => [Int], { nullable: true })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  readonly engineTypeId?: number[];
}

@InputType()
export class EngineModelQueryDto
  extends BaseQueryDto<number>
  implements QueryOptions<EngineModelOrderByInput, EngineModelWhereInput>
{
  @Field(() => EngineModelOrderByInput, { nullable: true })
  @IsOptional()
  @Type(() => EngineModelOrderByInput)
  readonly orderBy?: EngineModelOrderByInput;

  @Field(() => EngineModelWhereInput, { nullable: true })
  @IsOptional()
  @Type(() => EngineModelWhereInput)
  readonly where?: EngineModelWhereInput;
}
