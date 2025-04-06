import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationResolver } from './authentication.resolver';
import { UsersModule } from 'src/modules/users/users.module';
import { IamModule } from '../iam.module';

@Module({
  imports: [IamModule, UsersModule],
  providers: [AuthenticationService, AuthenticationResolver],
})
export class AuthenticationModule {}
