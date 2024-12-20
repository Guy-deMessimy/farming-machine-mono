import { Module } from '@nestjs/common';
import { EngineModelService } from './engine-model.service';
import { EngineModelResolver } from './engine-model.resolver';
import { GraphqlApiModule } from '../graphql-api/graphql-api.module';

@Module({
  imports: [GraphqlApiModule],
  providers: [EngineModelService, EngineModelResolver],
  exports: [EngineModelService],
})
export class EngineModelModule {}
