import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { PubSubModule } from '../pub-sub/pub-sub.module';
import { EngineTypesService } from './engine-type.service';
import { EngineTypesResolver } from './engine-type.resolver';
import { EngineTypesRepository } from './engine-type.repository';

@Module({
  imports: [PrismaModule, PubSubModule],
  providers: [EngineTypesRepository, EngineTypesService, EngineTypesResolver],
  exports: [EngineTypesService],
})
export class EngineTypesModule {}
