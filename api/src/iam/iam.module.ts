import { Module, forwardRef } from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { UsersModule } from '../modules/users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { PubSubModule } from 'src/modules/pub-sub/pub-sub.module';

@Module({
  imports: [UsersModule, forwardRef(() => AuthenticationModule), PubSubModule],
  providers: [
    {
      provide: HashingService, // serve as an abstract interface, useful in case of diffrent hashing provider migration
      useClass: BcryptService, // concrete implementation of that service
    },
  ],
  exports: [HashingService, AuthenticationModule, UsersModule, PubSubModule],
})
export class IamModule {}
