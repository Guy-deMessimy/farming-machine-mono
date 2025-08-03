import { Args, Mutation, Resolver, Context } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { Logger } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { UseDynamicInterceptor } from '../auth/decorators/interceptor.decorator';
import { UploaderService } from './uploader.service';
import { UploadedFile } from './upload-file.entity';
import { InterceptorType } from '../auth/enums/interceptor-type.enum';
import { Public } from 'src/common/decorators/public.decorator';

@Resolver()
export class UploaderResolver {
  private readonly logger = new Logger(UploaderResolver.name);
  constructor(private readonly uploaderService: UploaderService) {}

  @Mutation(() => UploadedFile, { name: 'uploadFile' })
  @Public() // desactiver pour activer auth ici
  @UseDynamicInterceptor(InterceptorType.None) // activer auth ici avec InterceptorType.default
  uploadFile(
    @Context() context: { req: Request },
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ): Observable<UploadedFile | undefined> {
    try {
      const graphQlQuery = context.req.body.query;
      console.log("🚀 ~ UploaderResolver ~ uploadFile ~ graphQlQuery:", graphQlQuery)
      console.log("🚀 ~ UploaderResolver ~ uploadFile ~ file:", file)
      const uploadedFile = this.uploaderService.uploadFile({
        graphQlQuery,
        file,
        // headers: context.req.headers['authorization'],
      });
      console.log("🚀 ~ UploaderResolver ~ uploadFile ~ uploadedFile:", uploadedFile)
      return uploadedFile;
    } catch (error) {
      this.logger.error('Resolver: uploadFile error:', error.stack);
      throw error;
    }
  }
}
