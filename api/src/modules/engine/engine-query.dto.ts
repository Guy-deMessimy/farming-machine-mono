import { InputType, Field, Int } from '@nestjs/graphql';
import { IsEnum, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { BaseQueryDto } from '../../common/dto/base-query.dto';
import { QueryOptions } from '../../common/dto/query-options.interface';
import { SortOrder } from '../../common/enums/sort-order.enum';

@InputType()
class EngineOrderByInput implements Prisma.EngineOrderByWithRelationInput {
  @Field(() => SortOrder, { nullable: true })
  @IsEnum(SortOrder)
  @IsOptional()
  id?: SortOrder;

  @Field(() => SortOrder, { nullable: true })
  @IsEnum(SortOrder)
  @IsOptional()
  brand?: SortOrder;

  @Field(() => SortOrder, { nullable: true })
  @IsEnum(SortOrder)
  @IsOptional()
  model?: SortOrder;
}

@InputType()
class EngineWhereInput {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  readonly id?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  readonly brand?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  readonly model?: string;
}

@InputType()
export class EngineQueryDto
  extends BaseQueryDto<number>
  implements QueryOptions<EngineOrderByInput, Prisma.EngineWhereInput>
{
  @IsOptional()
  @Field(() => EngineOrderByInput, { nullable: true })
  @Type(() => EngineOrderByInput)
  readonly orderBy?: EngineOrderByInput;
  @Field(() => EngineWhereInput, { nullable: true })
  @IsOptional()
  readonly where?: EngineWhereInput;
}
