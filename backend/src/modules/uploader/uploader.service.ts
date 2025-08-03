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
    // headers,
  }: {
    graphQlQuery: string;
    file: FileUpload;
    // headers?: string | string[] | undefined;
  }): Observable<UploadedFile | undefined> {
    // console.log("🚀 ~ UploaderService ~ uploadFile ~ headers:", headers)
    console.log("🚀 ~ UploaderService ~ uploadFile ~ file:", file)
    console.log("🚀 ~ UploaderService ~ uploadFile ~ graphQlQuery:", graphQlQuery)
    // const cleanHeaders =
    //   typeof headers === 'string' ? { authorization: headers } : undefined;
    
    const response = this.graphqlApiService.execute<UploadedFile>(
      graphQlQuery,
      {
        file,
      },
      // cleanHeaders,
    );
    return response;
  }
}
