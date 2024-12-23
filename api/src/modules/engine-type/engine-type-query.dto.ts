import { InputType, Field, Int } from '@nestjs/graphql';
import { ArrayNotEmpty, IsArray, IsEnum, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { BaseQueryDto } from '../../common/dto/base-query.dto';
import { QueryOptions } from '../../common/dto/query-options.interface';
import { SortOrder } from '../../common/enums/sort-order.enum';

@InputType()
class EngineTypesOrderByInput
  implements Prisma.EngineTypesOrderByWithRelationInput
{
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
class EngineTypesWhereInput {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  readonly id?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  readonly name?: string;
}

@InputType()
export class EngineTypesQueryDto
  extends BaseQueryDto<number>
  implements QueryOptions<EngineTypesOrderByInput, EngineTypesWhereInput>
{
  @Field(() => EngineTypesOrderByInput, { nullable: true })
  @IsOptional()
  @Type(() => EngineTypesOrderByInput)
  readonly orderBy?: EngineTypesOrderByInput;

  @Field(() => EngineTypesWhereInput, { nullable: true })
  @IsOptional()
  @Type(() => EngineTypesWhereInput)
  readonly where?: EngineTypesWhereInput;
}
