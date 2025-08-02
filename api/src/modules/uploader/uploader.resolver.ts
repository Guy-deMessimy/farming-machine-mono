import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { File } from '@prisma/client';
import { UploaderService } from './uploader.service';
import { UploadedFile } from './upolad-file.entity';

@Resolver()
export class UploaderResolver {
  constructor(private readonly uploaderService: UploaderService) {}

  @Mutation(() => UploadedFile, { name: 'uploadFile' })
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ): Promise<File | undefined> {
    const uploadedFile = this.uploaderService.uploadFile(file);
    return uploadedFile;
  }
}
