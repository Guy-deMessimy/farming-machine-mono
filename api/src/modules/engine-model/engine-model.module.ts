import { Module } from '@nestjs/common';
import { EngineModelService } from './engine-model.service';
import { EngineModelResolver } from './engine-model.resolver';

@Module({
  providers: [EngineModelService, EngineModelResolver]
})
export class EngineModelModule {}
