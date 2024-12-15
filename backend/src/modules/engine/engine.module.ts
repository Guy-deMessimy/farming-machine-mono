import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { EngineResolver } from './engine.resolver';
import { EngineService } from './engine.service';

@Module({
  imports: [HttpModule],
  providers: [EngineService, EngineResolver],
})
export class EnginesModule {}
