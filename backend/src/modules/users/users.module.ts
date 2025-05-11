import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { GraphqlApiModule } from '../graphql-api/graphql-api.module';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [GraphqlApiModule],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
