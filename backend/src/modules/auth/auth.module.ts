import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { GraphqlApiModule } from '../graphql-api/graphql-api.module';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [GraphqlApiModule, UsersModule],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
