import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { EngineTypesService } from './engine-type.service';
import { EngineTypesResolver } from './engine-type.resolver';

@Module({
  imports: [HttpModule],
  providers: [EngineTypesService, EngineTypesResolver],
})
export class EngineTypesModule {}
