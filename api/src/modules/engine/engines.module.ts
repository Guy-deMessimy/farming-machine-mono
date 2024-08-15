import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PubSubModule } from '../pub-sub/pub-sub.module';
import { EngineRepository } from './engine.repository';
import { EngineService } from './engine.service';
import { EngineResolver } from './engine.resolver';

@Module({
  imports: [PrismaModule, PubSubModule],
  providers: [EngineRepository, EngineService, EngineResolver],
  exports: [EngineService],
})
export class EnginesModule {}
