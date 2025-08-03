import { Module } from '@nestjs/common';
import { GraphqlApiModule } from '../graphql-api/graphql-api.module';
import { UploaderService } from './uploader.service';
import { UploaderResolver } from './uploader.resolver';

@Module({
  imports: [GraphqlApiModule],
  providers: [UploaderService, UploaderResolver],
  exports: [],
})
export class UploaderModule {}
