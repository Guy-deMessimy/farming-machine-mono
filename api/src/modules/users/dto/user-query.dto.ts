import { InputType, Field, Int } from '@nestjs/graphql';
import {
  IsOptional,
  IsEnum,
  IsString,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BaseQueryDto } from '../../../common/dto/base-query.dto';
import { QueryOptions } from '../../../common/dto/query-options.interface';
import { SortOrder } from '../../../common/enums/sort-order.enum';

@InputType()
class UserOrderByInput {
  @Field(() => SortOrder, { nullable: true })
  @IsEnum(SortOrder)
  @IsOptional()
  id?: SortOrder;

  @Field(() => SortOrder, { nullable: true })
  @IsEnum(SortOrder)
  @IsOptional()
  email?: SortOrder;

  @Field(() => SortOrder, { nullable: true })
  @IsEnum(SortOrder)
  @IsOptional()
  name?: SortOrder;

  @Field(() => SortOrder, { nullable: true })
  @IsEnum(SortOrder)
  @IsOptional()
  createdAt?: SortOrder;
}

@InputType()
class UserWhereInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  email?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  idIn?: string[];
}

@InputType()
export class UserQueryDto
  extends BaseQueryDto<string>
  implements QueryOptions<UserOrderByInput, UserWhereInput>
{
  @Field(() => UserOrderByInput, { nullable: true })
  @IsOptional()
  @Type(() => UserOrderByInput)
  orderBy?: UserOrderByInput;

  @Field(() => UserWhereInput, { nullable: true })
  @IsOptional()
  @Type(() => UserWhereInput)
  where?: UserWhereInput;
}
