import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { File } from '@prisma/client';
import { UploaderService } from './uploader.service';
import { UploadedFile } from './upload-file.entity';
import { Auth } from 'src/iam/authentication/decorators/auth.decorator';
import { AuthType } from 'src/iam/authentication/enums/auth-type.enum';


@Resolver()
export class UploaderResolver {
  constructor(private readonly uploaderService: UploaderService) {}
  @Auth(AuthType.None) 
  @Mutation(() => UploadedFile, { name: 'uploadFile' })
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ): Promise<File | undefined> {
    const uploadedFile = await this.uploaderService.uploadFile(file);
    return uploadedFile;
  }
}
