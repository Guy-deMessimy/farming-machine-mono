import { Module } from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';

@Module({
  providers: [
    {
      provide: HashingService, // serve as an abstract interface, useful in case of diffrent hashing provider migration
      useClass: BcryptService, // concrete implementation of that service
    },
  ],
  exports: [HashingService],
})
export class IamModule {}
