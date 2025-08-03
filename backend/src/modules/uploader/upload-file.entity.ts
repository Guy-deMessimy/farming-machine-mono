import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'File model' })
export class UploadedFile {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  fileName: string;

  @Field(() => String)
  fileUrl: string;

  // @Field(() => String)
  // key: FileDB[`key`];

  @Field(() => String, {
    nullable: true,
    deprecationReason: 'Internal use only',
  })
  key?: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
