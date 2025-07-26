import { Module, forwardRef } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationResolver } from './authentication.resolver';
import { IamModule } from '../iam.module';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { PrismaModule } from '../../prisma/prisma.module';
import { RedisModule } from '../../redis/redis.module';
import { RefreshTokenIdsStorage } from './refresh-token-ids.storage/refresh-token-ids.storage';
import { ApiKeysService } from './api-keys.service';

@Module({
  imports: [
    forwardRef(() => IamModule), // get back iam services
    ConfigModule.forFeature(jwtConfig), // inject jwtConfig.KEY
    PrismaModule,
    RedisModule,
  ],
  providers: [
    AuthenticationService,
    AuthenticationResolver,
    RefreshTokenIdsStorage,
    ApiKeysService,
  ],
  exports: [ApiKeysService],
})
export class AuthenticationModule {}
