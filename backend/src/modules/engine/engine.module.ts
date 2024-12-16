import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { EngineResolver } from './engine.resolver';
import { EngineService } from './engine.service';
import { GraphqlApiModule } from '../graphql-api/graphql-api.module';

@Module({
  imports: [GraphqlApiModule],
  providers: [EngineService, EngineResolver],
})
export class EnginesModule {}
