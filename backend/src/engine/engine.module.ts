import { Module } from '@nestjs/common';
import { EngineResolver } from './engine.resolver';
import { EngineService } from './engine.service';
import { ApiService } from '../shared/api-service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [EngineService, ApiService, EngineResolver],
})
export class EnginesModule {}
