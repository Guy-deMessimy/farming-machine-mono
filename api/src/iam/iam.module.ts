import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { UsersModule } from '../modules/users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { PubSubModule } from 'src/modules/pub-sub/pub-sub.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    forwardRef(() => AuthenticationModule),
    PubSubModule,
    JwtModule.registerAsync(jwtConfig.asProvider()), // configure Jwt service with env value via jwtConfig
  ],
  providers: [
    {
      provide: HashingService, // serve as an abstract interface, useful in case of diffrent hashing provider migration
      useClass: BcryptService, // concrete implementation of that service
    },
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
