import { Module } from '@nestjs/common';
import { EngineResolver } from './engine.resolver';
import { EngineService } from './engine.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [EngineService, EngineResolver],
})
export class EnginesModule {}
