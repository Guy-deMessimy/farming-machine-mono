import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GraphqlApiService } from './graphql-api.service';

@Module({
  imports: [HttpModule],
  providers: [GraphqlApiService],
  exports: [GraphqlApiService],
})
export class GraphqlApiModule {}
