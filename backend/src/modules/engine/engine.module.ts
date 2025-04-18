import { Module } from '@nestjs/common';
import { EngineResolver } from './engine.resolver';
import { EngineService } from './engine.service';
import { GraphqlApiModule } from '../graphql-api/graphql-api.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [GraphqlApiModule],
  providers: [EngineService, EngineResolver],
})
export class EnginesModule {}
