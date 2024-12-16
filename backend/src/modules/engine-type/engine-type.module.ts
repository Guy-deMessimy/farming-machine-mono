import { Module } from '@nestjs/common';
import { EngineTypesService } from './engine-type.service';
import { EngineTypesResolver } from './engine-type.resolver';
import { GraphqlApiModule } from '../graphql-api/graphql-api.module';

@Module({
  imports: [GraphqlApiModule],
  providers: [EngineTypesService, EngineTypesResolver],
  exports: [EngineTypesService],
})
export class EngineTypesModule {}
