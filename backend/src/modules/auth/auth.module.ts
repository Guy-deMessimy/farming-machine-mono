import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { GraphqlApiModule } from '../graphql-api/graphql-api.module';
import { AuthService } from './auth.service';

@Module({
  imports: [GraphqlApiModule],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
