import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UploadedFile } from './upload-file.entity';
import { FileUpload } from 'graphql-upload';
import { GraphqlApiService } from '../graphql-api/graphql-api.service';

@Injectable()
export class UploaderService {
  constructor(private readonly graphqlApiService: GraphqlApiService) {}

  uploadFile({
    graphQlQuery,
    file,
  }: {
    graphQlQuery: string;
    file: FileUpload;
  }): Observable<UploadedFile | undefined> {
    const response = this.graphqlApiService.execute<UploadedFile>(
      graphQlQuery,
      {
        file,
      },
    );
    return response;
  }
}
