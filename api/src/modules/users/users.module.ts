import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PubSubModule } from '../pub-sub/pub-sub.module';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UsersRepository } from './users.repository';

@Module({
  imports: [PrismaModule, PubSubModule],
  providers: [UsersRepository, UsersService, UsersResolver],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
