import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PubSubModule } from '../pub-sub/pub-sub.module';
import { EngineModelService } from './engine-model.service';
import { EngineModelResolver } from './engine-model.resolver';
import { EngineModelRepository } from './engine-model.repository';

@Module({
  imports: [PrismaModule, PubSubModule],
  providers: [EngineModelRepository, EngineModelService, EngineModelResolver],
  exports: [EngineModelService],
})
export class EngineModelModule {}
