import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { UsersModule } from '../modules/users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { PubSubModule } from '../modules/pub-sub/pub-sub.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './authentication/guards/access-token/access-token.guard';
import { AuthenticationGuard } from './authentication/guards/authentication/authentication.guard';
import { RefreshTokenGuard } from './authentication/guards/refresh-token-guard/refresh-token-guard.guard';

@Module({
  imports: [
    UsersModule,
    forwardRef(() => AuthenticationModule),
    PubSubModule,
    JwtModule.registerAsync(jwtConfig.asProvider()), // configure Jwt service with env value via jwtConfig
    ConfigModule.forFeature(jwtConfig),
  ],
  providers: [
    {
      provide: HashingService, // serve as an abstract interface, useful in case of diffrent hashing provider migration
      useClass: BcryptService, // concrete implementation of that service
    },
    {
      provide: APP_GUARD, // guard global qui lit la metadata @auth et applique dynamiquement les guards correspondant
      useClass: AuthenticationGuard,
    },
    AccessTokenGuard, // Tu fourni l’AccessTokenGuard pour qu’il soit injecté dans AuthenticationGuard.
    RefreshTokenGuard,
  ],
  exports: [
    HashingService,
    AuthenticationModule,
    UsersModule,
    PubSubModule,
    JwtModule,
  ],
})
export class IamModule {}
